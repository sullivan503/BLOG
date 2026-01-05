import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Define types locally to avoid TS complexity in script
const WORDPRESS_API_URL = "https://api.fengwz.me";
const BASE_URL = "https://fengwz.me";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DESTINATION = path.resolve(__dirname, '../public/sitemap.xml');

async function fetchAll(endpoint) {
    let page = 1;
    let results = [];

    while (true) {
        try {
            console.log(`Fetching ${endpoint} page ${page}...`);
            const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`);

            if (!response.ok) {
                // If 400 bad request (usually meaning page out of bounds), stop
                if (response.status === 400) break;
                throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.length === 0) break;

            results = [...results, ...data];

            // Check headers for total pages if available, otherwise just break if less than per_page
            const totalPages = response.headers.get('x-wp-totalpages');
            if (totalPages && page >= parseInt(totalPages)) break;

            page++;
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            break;
        }
    }
    return results;
}

async function generateSitemap() {
    console.log("Starting sitemap generation...");

    const smStream = new SitemapStream({ hostname: BASE_URL });
    const writeStream = createWriteStream(DESTINATION);

    // Pipe to file
    smStream.pipe(writeStream);

    // 1. Static Pages
    const staticPages = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/about', changefreq: 'monthly', priority: 0.8 },
        { url: '/consulting', changefreq: 'monthly', priority: 0.8 },
        { url: '/geek', changefreq: 'weekly', priority: 0.8 },
        { url: '/library', changefreq: 'weekly', priority: 0.8 },
        { url: '/essays', changefreq: 'weekly', priority: 0.8 },
        { url: '/projects', changefreq: 'weekly', priority: 0.8 },
    ];

    staticPages.forEach(page => smStream.write(page));

    // 2. Fetch Blog Posts
    console.log("Fetching posts from WordPress...");
    try {
        const posts = await fetchAll('posts');
        console.log(`Found ${posts.length} posts.`);

        posts.forEach((post) => {
            smStream.write({
                url: `/post/${post.slug}`,
                lastmod: post.modified,
                changefreq: 'weekly',
                priority: 0.7
            });
        });
    } catch (err) {
        console.error("Error fetching posts, skipping dynamic posts in sitemap:", err);
    }

    // End stream
    smStream.end();

    // Wait for stream to finish
    await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });

    console.log(`Sitemap generated successfully at ${DESTINATION}`);
}

generateSitemap().catch(console.error);
