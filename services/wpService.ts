
import { BlogPost } from '../types';
import { WORDPRESS_API_URL, WP_CONTACT_FORM_ID, WP_NEWSLETTER_FORM_ID } from '../constants';

// Helper to format WP post to our interface
const formatPost = (post: any): BlogPost => {
  // Priority 1: The custom field we added in functions.php (fastest & cleanest)
  let imageUrl = post.featured_media_url;

  // Priority 2: Standard embedded media (fallback if custom field fails)
  if (!imageUrl && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }

  // Priority 3: Extract first image from content (User Request)
  if (!imageUrl && post.content && post.content.rendered) {
    const contentImgMatch = post.content.rendered.match(/<img[^>]+src="([^">]+)"/);
    if (contentImgMatch && contentImgMatch[1]) {
      imageUrl = contentImgMatch[1];
    }
  }

  // Priority 4: Default placeholder
  if (!imageUrl) {
    imageUrl = 'https://picsum.photos/seed/wp/800/400';
  }

  let author = 'Admin';
  if (post._embedded && post._embedded['author'] && post._embedded['author'][0]) {
    author = post._embedded['author'][0].name;
  }

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Extract Tags
  const tags: string[] = [];
  if (post._embedded && post._embedded['wp:term']) {
    // term[0] usually categories, term[1] usually tags
    const terms = post._embedded['wp:term'].flat();
    terms.forEach((term: any) => {
      if (term.taxonomy === 'post_tag') tags.push(term.name);
    });
  }

  // Extract Categories
  const categories: string[] = [];
  if (post._embedded && post._embedded['wp:term']) {
    const terms = post._embedded['wp:term'].flat();
    terms.forEach((term: any) => {
      if (term.taxonomy === 'category') categories.push(term.name);
    });
  }

  // Extract Rating from Tags
  let rating = 0;
  let ratingTagFound = "";

  const numericTag = tags.find(t => /^\d+(\.\d+)?$/.test(t));
  if (numericTag) {
    rating = parseFloat(numericTag);
    ratingTagFound = numericTag;
  } else {
    const looseTag = tags.find(t => /^\d+(\.\d+)?(star|stars|星|分)$/i.test(t));
    if (looseTag) {
      rating = parseFloat(looseTag);
      ratingTagFound = looseTag;
    }
  }

  const displayTags = tags.filter(t => t !== ratingTagFound);

  return {
    id: post.id.toString(),
    title: post.title.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 150) + '...',
    content: post.content.rendered,
    author: author,
    date: date,
    readTime: `${Math.ceil(post.content.rendered.length / 1000)} min read`,
    tags: displayTags,
    categories: categories,
    imageUrl: imageUrl,
    // Use ACF rating if available, otherwise fall back to tag-based rating
    rating: post.acf?.rating ? Number(post.acf.rating) : rating,
    // Pass through all ACF fields
    acf: post.acf
  };
};

export const fetchWordPressPosts = async (): Promise<BlogPost[]> => {
  if (!WORDPRESS_API_URL) return [];

  try {
    // Added _timestamp to bypass cache
    const cacheBuster = `&_cb=${new Date().getTime()}`;
    const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&per_page=100${cacheBuster}`);
    if (!response.ok) {
      throw new Error(`WordPress API returned ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(formatPost);
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    return [];
  }
};

export const fetchWordPressPage = async (slug: string): Promise<BlogPost | null> => {
  if (!WORDPRESS_API_URL) return null;

  try {
    const cacheBuster = `&_cb=${new Date().getTime()}`;
    const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=${slug}&_embed${cacheBuster}`);
    if (!response.ok) {
      throw new Error(`WordPress API page fetch failed: ${response.status}`);
    }
    const data = await response.json();

    if (data && data.length > 0) {
      return formatPost(data[0]);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching WordPress page '${slug}':`, error);
    return null;
  }
};

export interface ConsultationFormData {
  name: string;
  email: string;
  mobile: string;
  wechat?: string;
  message: string;
}

const submitToCF7 = async (formData: FormData, formId: string): Promise<{ success: boolean; message: string }> => {
  if (!WORDPRESS_API_URL || !formId) {
    return { success: false, message: "Configuration Error: API URL or Form ID missing." };
  }

  const apiUrl = `${WORDPRESS_API_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

  formData.append('_wpcf7', formId);
  formData.append('_wpcf7_version', '5.9.3');
  formData.append('_wpcf7_locale', 'zh_CN');
  formData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p0-o1`);
  formData.append('_wpcf7_container_post', '0');

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.status === 'mail_sent') {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Submission failed. Please check your inputs." };
    }
  } catch (error) {
    console.error("CF7 Submission Error:", error);
    return { success: false, message: "Network error. Please try again later." };
  }
};

export const submitConsultation = async (data: ConsultationFormData): Promise<{ success: boolean; message: string }> => {
  const formData = new FormData();
  formData.append('your-name', data.name);
  formData.append('your-email', data.email);
  formData.append('mobile', data.mobile);
  formData.append('wechat', data.wechat || '');
  formData.append('your-message', data.message);
  formData.append('your-subject', `Consultation Request: ${data.name}`);

  return submitToCF7(formData, WP_CONTACT_FORM_ID);
};

export const submitNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  const formData = new FormData();
  formData.append('your-email', email);
  formData.append('your-subject', 'New Newsletter Subscription');

  return submitToCF7(formData, WP_NEWSLETTER_FORM_ID);
};
