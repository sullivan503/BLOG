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
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // remove #

      if (hash === '') {
        setRoute({ path: '' });
      } else if (hash === 'about') {
        setRoute({ path: 'about' });
      } else if (hash === 'library') {
        setRoute({ path: 'library' });
      } else if (hash.startsWith('geek')) {
        // Support 'geek' and 'geek/games'
        const parts = hash.split('/');
        setRoute({ path: 'geek', slug: parts[1] || 'tech' });
      } else if (hash === 'essays') {
        setRoute({ path: 'essays' });
      } else if (hash === 'projects') {
        setRoute({ path: 'projects' });
      } else if (hash === 'resume') {
        setRoute({ path: 'resume' });
      } else if (hash.startsWith('category/')) {
        const slug = hash.split('/')[1];
        setRoute({ path: 'category', slug });
      } else if (hash.startsWith('post/')) {
        const slug = hash.split('/')[1];
        setRoute({ path: 'post', slug });
      } else {
        // Instead of defaulting to Home, we identify it as an unknown route
        setRoute({ path: '404' });
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch Data logic
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        console.log(`Attempting to fetch from ${WORDPRESS_API_URL}...`);
        const wpPosts = await fetchWordPressPosts();

        if (wpPosts.length > 0) {
          setPosts(wpPosts);
          setIsUsingWordPress(true);
        } else {
          // Fallback to MOCK data if WP is empty or unreachable
          console.log("No posts found from API or API unavailable. Using Mock Data.");
          setPosts(MOCK_POSTS);
          setIsUsingWordPress(false);
        }

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

  const navigate = (path: string) => {
    // Robust navigation: Check if path is a recognized route OR already has a prefix
    if (['about', 'library', 'essays', 'projects', 'resume', ''].includes(path) || path.startsWith('geek') || path.startsWith('category/') || path.startsWith('post/')) {
      window.location.hash = path;
    } else {
      // assume it's a slug if it's just a plain string
      window.location.hash = `post/${path}`;
    }
  };

  const getPageContent = () => {
    switch (route.path) {
      case 'about':
        return <About />;
      case 'library':
        return <Library posts={posts} isLoading={isLoading} onNavigate={navigate} />;
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
          // Determine intelligent back button behavior
          let backPath = 'essays';
          let backLabel = 'Back to Articles';
          const cats = post.categories?.map(c => c.toLowerCase()) || [];

          if (cats.some(c => ['books', '书架', 'media', '影音', 'knowledge', '课程与知识'].includes(c))) {
            backPath = 'library';
            backLabel = 'Back to Library';
          } else if (cats.some(c => ['games', '游戏'].includes(c))) {
            backPath = 'geek/games';
            backLabel = 'Back to Games';
          } else if (cats.some(c => ['tech', '极客文章', 'gear'].includes(c))) {
            backPath = 'geek';
            backLabel = 'Back to Geek Space';
          } else if (cats.some(c => ['projects', 'achievements', 'project', '项目', '成果'].includes(c))) {
            backPath = 'projects';
            backLabel = 'Back to Projects';
          }

          return <PostPage post={post} onBack={() => navigate(backPath)} backLabel={backLabel} />;
        }
        // Use the new NotFound component for missing posts
        return <NotFound onNavigate={navigate} type="post" />;

      case '404':
        return <NotFound onNavigate={navigate} type="page" />;

      case '':
        return <Home posts={posts} onNavigate={navigate} isLoading={isLoading} isUsingWP={isUsingWordPress} />;

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