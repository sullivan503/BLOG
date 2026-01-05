import React, { useEffect } from 'react';
import { BLOG_NAME } from '../constants';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  useEffect(() => {
    // Update Title
    document.title = `${title} | ${BLOG_NAME}`;

    // Update Meta Tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateOgMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) {
      updateMeta('description', description);
      updateOgMeta('og:description', description);
    }
    
    updateOgMeta('og:title', title);
    
    if (image) {
      updateOgMeta('og:image', image);
    }
    
    if (url) {
        updateOgMeta('og:url', url);
    }

  }, [title, description, image, url]);

  return null; // This component doesn't render anything visible
};

export default SEO;