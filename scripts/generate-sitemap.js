import { createWriteStream } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import fetch from 'node-fetch';

// Configuration
const SITE_URL = 'https://fengwz.me';
const WORDPRESS_API_URL = 'https://api.fengwz.me';

async function generateSitemap() {
    console.log('🗺️  Generating Sitemap...');

    const smStream = new SitemapStream({ hostname: SITE_URL });
    const writeStream = createWriteStream('./public/sitemap.xml');

    smStream.pipe(writeStream);

    // 1. Add Static Pages
    const staticPages = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/#/about', changefreq: 'monthly', priority: 0.8 },
        { url: '/#/projects', changefreq: 'weekly', priority: 0.9 },
        { url: '/#/geek', changefreq: 'weekly', priority: 0.9 },
        { url: '/#/library', changefreq: 'weekly', priority: 0.8 },
        { url: '/#/essays', changefreq: 'weekly', priority: 0.8 },
    ];

    staticPages.forEach(page => {
        smStream.write(page);
    });

    // 2. Fetch Dynamic Posts from WordPress
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?per_page=100&_fields=slug,date,modified`);
        const posts = await response.json();

        if (Array.isArray(posts)) {
            console.log(`📝 Found ${posts.length} posts.`);
            posts.forEach(post => {
                smStream.write({
                    url: `/#/post/${post.slug}`,
                    lastmod: post.modified || post.date,
                    changefreq: 'weekly',
                    priority: 0.7
                });
            });
        }
    } catch (error) {
        console.error("❌ Error fetching posts:", error);
    }

    smStream.end();

    const buffer = await streamToPromise(smStream);
    console.log('✅ sitemap.xml generated successfully in /public folder.');
}

generateSitemap();
