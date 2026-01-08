import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import About from './pages/About';
import Library from './pages/Library';
import Geek from './pages/Geek';
import Essays from './pages/Essays';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import NotFound from './components/NotFound'; // Import NotFound
import { WORDPRESS_API_URL, MOCK_POSTS } from './constants';
import { BlogPost } from './types';
import { fetchWordPressPosts } from './services/wpService';

// Simple Router State
type Route = {
  path: string; // '', 'about', 'post', 'library', 'geek', 'essays', 'projects', 'category', 'resume'
  slug?: string;
};

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>({ path: '' });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingWordPress, setIsUsingWordPress] = useState(false);

  // Handle Hash Routing
  // Handle Path Routing (History API)
  useEffect(() => {
    const handleLocationChange = () => {
      // 1. Legacy Hash Redirector: Check if user arrived via classic hash link (e.g. /#/post/foo)
      if (window.location.hash.startsWith('#/')) {
        const cleanPath = window.location.hash.replace('#', '');
        window.history.replaceState(null, '', cleanPath);
        // The subsequent logic will pick up the new pathname
      }

      const path = window.location.pathname; // e.g. "/post/hello-world" or "/about"

      if (path === '/' || path === '') {
        setRoute({ path: '' });
      } else if (path === '/about') {
        setRoute({ path: 'about' });
      } else if (path.startsWith('/library')) {
        const parts = path.split('/');
        setRoute({ path: 'library', slug: parts[2] || 'books' });
      } else if (path.startsWith('/geek')) {
        // Support '/geek' and '/geek/games'
        const parts = path.split('/');
        // path is like "", "geek", "games" -> parts[0]="", parts[1]="geek", parts[2]="games"
        setRoute({ path: 'geek', slug: parts[2] || 'engineering' });
      } else if (path === '/essays') {
        setRoute({ path: 'essays' });
      } else if (path === '/projects') {
        setRoute({ path: 'projects' });
      } else if (path === '/resume') {
        setRoute({ path: 'resume' });
      } else if (path.startsWith('/category/')) {
        const slug = path.split('/')[2];
        setRoute({ path: 'category', slug });
      } else if (path.startsWith('/post/')) {
        const slug = path.split('/')[2];
        setRoute({ path: 'post', slug });
      } else {
        // Unknown route -> 404
        setRoute({ path: '404' });
      }

      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    // Initial check
    handleLocationChange();

    // Listen for browser back/forward
    window.addEventListener('popstate', handleLocationChange);

    // Listen for custom navigation events (since pushState doesn't trigger listeners by default)
    const handlePushState = () => handleLocationChange();
    window.addEventListener('pushstate', handlePushState);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handlePushState);
    };
  }, []);

  // Fetch Data logic
  const [widgetsData, setWidgetsData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        console.log(`Attempting to fetch from ${WORDPRESS_API_URL}...`);

        // Parallel Fetching
        const [wpPosts, stickyPosts, readingPosts, thoughtPosts, geekPosts] = await Promise.all([
          fetchWordPressPosts(),
          import('./services/wpService').then(m => m.fetchStickyPosts()),
          import('./services/wpService').then(m => m.fetchPostsByTag('reading-now')),
          import('./services/wpService').then(m => m.fetchPostsByTag('micro-thought')),
          // Geek Widget Strategy: Try 'digital-setup' tag first, fallback to 'geek' tag
          import('./services/wpService').then(m =>
            m.fetchPostsByTag('digital-setup', 1)
              .then(ds => ds.length > 0 ? ds : m.fetchPostsByTag('geek', 1))
          )
        ]);

        if (wpPosts.length > 0) {
          setPosts(wpPosts);
          setIsUsingWordPress(true);
        } else {
          // Fallback to MOCK data if WP is empty or unreachable
          console.log("No posts found from API or API unavailable. Using Mock Data.");
          setPosts(MOCK_POSTS);
          setIsUsingWordPress(false);
        }

        // Set Widget Data
        setWidgetsData({
          featured: stickyPosts.length > 0 ? stickyPosts[0] : null,
          reading: readingPosts.length > 0 ? readingPosts[0] : null,
          microThought: thoughtPosts.length > 0 ? thoughtPosts[0] : null,
          geek: geekPosts.length > 0 ? geekPosts[0] : null
        });

      } catch (error) {
        console.error("Error connecting to WordPress:", error);
        // Fallback to MOCK data on error
        setPosts(MOCK_POSTS);
        setIsUsingWordPress(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const navigate = (pathArg: string) => {
    // Convert abstract "pathArg" (e.g. 'about', 'post/foo') into a real URL path
    let newPath = '/';

    if (pathArg === '') {
      newPath = '/';
    } else if (['about', 'library', 'essays', 'projects', 'resume'].includes(pathArg)) {
      newPath = `/${pathArg}`;
    } else if (pathArg.startsWith('geek') || pathArg.startsWith('library') || pathArg.startsWith('category/') || pathArg.startsWith('post/')) {
      newPath = `/${pathArg}`;
    } else {
      // Fallback: assume it's a post slug if plain string
      newPath = `/post/${pathArg}`;
    }

    // Update URL and State
    window.history.pushState({}, '', newPath);
    // Dispatch custom event so our useEffect picks it up
    window.dispatchEvent(new Event('pushstate'));
  };

  const getPageContent = () => {
    switch (route.path) {
      case 'about':
        return <About />;
      case 'library':
        return <Library posts={posts} isLoading={isLoading} onNavigate={navigate} initialTab={route.slug} />;
      case 'geek':
        return <Geek posts={posts} isLoading={isLoading} onNavigate={navigate} initialTab={route.slug} />;
      case 'essays':
        return <Essays posts={posts} onNavigate={navigate} />;
      case 'category':
        return <Essays posts={posts} onNavigate={navigate} categorySlug={route.slug} />;
      case 'projects':
        return <Projects />;
      case 'post':
        let post = posts.find(p => p.slug === route.slug);
        if (isLoading) return <div className="text-center py-20 animate-pulse text-secondary">Loading content...</div>;
        if (post) {
          // Determine intelligent back button behavior based on category priority
          let backPath = 'essays';
          let backLabel = 'Back to Articles';
          const cats = post.categories?.map(c => c.toLowerCase()) || [];

          // 1. Business & Projects
          if (cats.some(c => ['business', '商业', 'projects', '项目', 'achievements', '成果'].some(k => c.includes(k)))) {
            backPath = 'projects';
            backLabel = 'Back to Business';
          }
          // 2. Geek & Digital Life
          else if (cats.some(c => ['games', '游戏'].some(k => c.includes(k)))) {
            backPath = 'geek/games';
            backLabel = 'Back to Games';
          }
          else if (cats.some(c => ['tech', 'engineering', '技术', 'gear'].some(k => c.includes(k)))) {
            backPath = 'geek';
            backLabel = 'Back to Engineering';
          }
          // 3. Digital Library (Books, Media, Knowledge)
          else if (cats.some(c => ['books', '书'].some(k => c.includes(k)))) {
            backPath = 'library/books';
            backLabel = 'Back to Books';
          }
          else if (cats.some(c => ['knowledge', '知识', 'course'].some(k => c.includes(k)))) {
            backPath = 'library/knowledge';
            backLabel = 'Back to Knowledge';
          }
          else if (cats.some(c => ['media', '影音'].some(k => c.includes(k)))) {
            backPath = 'library/media';
            backLabel = 'Back to Media';
          }
          // 4. Think & Write (Mind, Body, Wealth, Journal)
          else if (cats.some(c => ['mind', '心智', '心理'].some(k => c.includes(k)))) {
            backPath = 'category/mind';
            backLabel = 'Back to Mind';
          }
          else if (cats.some(c => ['body', '身体', 'life', '健康'].some(k => c.includes(k)))) {
            backPath = 'category/body';
            backLabel = 'Back to Body';
          }
          else if (cats.some(c => ['wealth', '财富', 'investment'].some(k => c.includes(k)))) {
            backPath = 'category/wealth';
            backLabel = 'Back to Wealth';
          }
          else if (cats.some(c => ['journal', '随笔', 'daily'].some(k => c.includes(k)))) {
            backPath = 'category/journal';
            backLabel = 'Back to Journal';
          }

          return <PostPage post={post} onBack={() => navigate(backPath)} backLabel={backLabel} />;
        }
        // Use the new NotFound component for missing posts
        return <NotFound onNavigate={navigate} type="post" />;

      case '404':
        return <NotFound onNavigate={navigate} type="page" />;

      case '':
        return <Home posts={posts} onNavigate={navigate} isLoading={isLoading} widgetsData={widgetsData} />;

      default:
        // Fallback for any unhandled state
        return <NotFound onNavigate={navigate} type="page" />;
    }
  };

  // Special case: Resume should not have the standard layout (header/footer) to ensure clean printing
  if (route.path === 'resume') {
    return <Resume onBack={() => navigate('projects')} />;
  }

  return (
    <HelmetProvider>
      <Layout onNavigate={navigate} currentRoute={route.path}>
        {getPageContent()}
      </Layout>
    </HelmetProvider>
  );
};

export default App;