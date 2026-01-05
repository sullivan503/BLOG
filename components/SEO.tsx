
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BLOG_NAME, BLOG_DESCRIPTION } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website'
}) => {
  const siteTitle = BLOG_NAME;
  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || BLOG_DESCRIPTION;
  // Use a reliable default image if none provided
  const metaImage = image || "https://fengwz.me/default-og-image.jpg";
  const metaUrl = url || "https://fengwz.me";

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;