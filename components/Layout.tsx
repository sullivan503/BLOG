import React, { useState } from 'react';
import { Menu, X, Github, Twitter } from 'lucide-react';
import { BLOG_NAME, SOCIAL_LINKS, WORDPRESS_API_URL } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentRoute: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentRoute }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Category Configuration
  const categories = [
    { name: 'Mind & Growth', slug: 'category/mind', short: 'Mind' },
    { name: 'Body Manual', slug: 'category/body', short: 'Body' },
    { name: 'Wealth Strategy', slug: 'category/wealth', short: 'Wealth' },
    { name: 'Journal', slug: 'category/journal', short: 'Journal' },
  ];

  const handleNav = (value: string) => {
    onNavigate(value);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-serif text-primary bg-background selection:bg-red-100 selection:text-black">

      {/* Design Constraint: Max Width 1100px, Centered */}
      <div className="w-full max-w-[1100px] mx-auto px-6 md:px-8">

        {/* Navigation - Matches 'nav' structure but with restored functionality */}
        <nav className="flex justify-between items-center py-10 mb-12 md:mb-20 border-b border-border text-sm font-mono uppercase tracking-[0.1em]">
          {/* Logo */}
          <div
            className="cursor-pointer group"
            onClick={() => handleNav('')}
          >
            <span className="font-display font-bold text-2xl md:text-3xl text-primary group-hover:text-accent transition-colors normal-case tracking-normal">
              {BLOG_NAME}<span className="text-accent">.</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            {/* Essays Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                onClick={() => handleNav('essays')}
                className={`transition-colors duration-200 flex items-center gap-1 ${currentRoute === 'essays' || currentRoute.startsWith('category') ? 'text-accent' : 'text-secondary hover:text-accent'}`}
              >
                Essays
              </button>

              {/* Dropdown Content */}
              <div className={`absolute left-1/2 -translate-x-1/2 pt-4 w-48 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="bg-white border border-border p-2 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => handleNav('essays')} className="text-left px-4 py-2 text-xs font-bold text-primary hover:bg-surface hover:text-accent">
                      All Articles
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={(e) => { e.stopPropagation(); handleNav(cat.slug); }}
                        className="text-left px-4 py-2 text-xs font-serif italic normal-case text-secondary hover:text-accent transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => handleNav('library')} className={currentRoute === 'library' ? 'text-accent' : 'text-secondary hover:text-accent'}>Library</button>
            <button onClick={() => handleNav('geek')} className={currentRoute === 'geek' ? 'text-accent' : 'text-secondary hover:text-accent'}>Digital Life</button>
            <button onClick={() => handleNav('projects')} className={currentRoute === 'projects' ? 'text-accent' : 'text-secondary hover:text-accent'}>Consulting</button>
            <button onClick={() => handleNav('about')} className={currentRoute === 'about' ? 'text-accent' : 'text-secondary hover:text-accent'}>About</button>

            {/* Separator */}
            <div className="w-px h-4 bg-gray-200 ml-2"></div>

            {/* Social Icons */}
            <div className="flex gap-4 text-secondary">
              {SOCIAL_LINKS.github && (
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  <Github size={16} />
                </a>
              )}
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:text-accent focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden mb-10 border-b border-border pb-8 animate-fade-in font-mono uppercase tracking-widest text-sm space-y-6">
            <div className="space-y-4">
              <div className="text-xs text-gray-400 font-bold mb-2">Navigation</div>
              <button onClick={() => handleNav('essays')} className="block text-xl font-serif text-primary hover:text-accent hover:italic transition-all normal-case">Essays</button>
              {categories.map((cat) => (
                <button key={cat.slug} onClick={() => handleNav(cat.slug)} className="block text-sm text-secondary pl-4 hover:text-accent normal-case font-serif italic">• {cat.name}</button>
              ))}
              <button onClick={() => handleNav('library')} className="block text-xl font-serif text-primary hover:text-accent hover:italic transition-all normal-case">Library</button>
              <button onClick={() => handleNav('geek')} className="block text-xl font-serif text-primary hover:text-accent hover:italic transition-all normal-case">Digital Life</button>
              <button onClick={() => handleNav('projects')} className="block text-xl font-serif text-primary hover:text-accent hover:italic transition-all normal-case">Consulting</button>
              <button onClick={() => handleNav('about')} className="block text-xl font-serif text-primary hover:text-accent hover:italic transition-all normal-case">About</button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="w-full pb-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-10 border-t border-border mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm font-mono text-secondary">
            <div>&copy; {new Date().getFullYear()} {BLOG_NAME}.</div>
            <div className="flex space-x-6 mt-4 md:mt-0 uppercase tracking-wider">
              <button onClick={() => onNavigate('resume')} className="hover:text-accent transition-colors">Resume</button>
              <a href={WORDPRESS_API_URL ? `${WORDPRESS_API_URL}/feed` : '#'} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">RSS</a>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-accent transition-colors">Email</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Layout;