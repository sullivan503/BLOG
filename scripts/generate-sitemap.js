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

    // Create the promise BEFORE writing anything to avoid race conditions
    const sitemapPromise = streamToPromise(smStream);

    smStream.pipe(writeStream);

    // 1. Add Static Pages (Guaranteed content)
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
        console.log('Fetching posts from WordPress...');
        // Add User-Agent to avoid 403 Forbidden from some WP security plugins
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?per_page=100&_fields=slug,date,modified`, {
            headers: {
                'User-Agent': 'Node.js/SitemapGenerator'
            },
            timeout: 10000 // 10 second timeout
        });

        if (!response.ok) {
            console.warn(`⚠️ Warning: Failed to fetch posts. Status: ${response.status}`);
        } else {
            const posts = await response.json();
            if (Array.isArray(posts)) {
                console.log(`📝 Found ${posts.length} posts from WordPress.`);
                posts.forEach(post => {
                    smStream.write({
                        url: `/#/post/${post.slug}`,
                        lastmod: post.modified || post.date,
                        changefreq: 'weekly',
                        priority: 0.7
                    });
                });
            }
        }
    } catch (error) {
        // Don't crash the build, just log the error and proceed with static pages
        console.error("❌ Error fetching posts for sitemap (continuing with static pages only):", error.message);
    }

    // 3. End the stream
    smStream.end();

    // 4. Wait for stream to finish
    try {
        await sitemapPromise;
        console.log('✅ sitemap.xml generated successfully in /public folder.');
    } catch (e) {
        console.error('❌ Sitemap Stream Error:', e);
        // In this specific case, if writing the file failed, we might want to exit 1,
        // but for now, let's keep it safe.
    }
}

generateSitemap();
