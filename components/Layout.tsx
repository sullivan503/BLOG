import React, { useState } from 'react';
import { Menu, X, Github, Twitter, Terminal, ChevronDown } from 'lucide-react';
import { BLOG_NAME, WORDPRESS_API_URL, SOCIAL_LINKS, PROFILE } from '../constants';

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
    { name: '心智与成长', slug: 'category/mind', short: 'Mind' },
    { name: '身体使用手册', slug: 'category/body', short: 'Body' },
    { name: '财富与策略', slug: 'category/wealth', short: 'Wealth' },
    { name: '随笔', slug: 'category/journal', short: 'Journal' },
  ];

  const handleNav = (value: string) => {
    onNavigate(value);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-primary bg-background selection:bg-red-100 selection:text-black">
      {/* Navigation - White background with subtle border */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer group flex items-center"
              onClick={() => handleNav('')}
            >
              {/* Red Box Logo */}
              <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center mr-3 transition-transform group-hover:scale-105">
                <span className="font-serif font-bold text-white text-xl">斋</span>
              </div>
              <div className="font-serif font-bold text-2xl tracking-tight text-primary flex flex-col leading-none">
                <span className="group-hover:text-accent transition-colors">{BLOG_NAME}</span>
                <span className="text-[10px] text-secondary font-sans uppercase tracking-widest font-normal mt-1">Digital Garden</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">

              {/* Dropdown for Essays */}
              <div className="relative group">
                <button
                  onClick={() => handleNav('essays')}
                  className={`text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${currentRoute === 'essays' || currentRoute.startsWith('category')
                      ? 'text-accent'
                      : 'text-secondary hover:text-accent'
                    }`}
                >
                  <span>思考与文章</span>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>

                {/* Dropdown Content - White background, shadow */}
                <div className="absolute left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden">
                    <div className="py-1">
                      <button onClick={() => handleNav('essays')} className="block w-full text-left px-4 py-3 text-sm text-primary hover:bg-surface border-b border-gray-50 font-bold">
                        浏览全部文章
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={(e) => { e.stopPropagation(); handleNav(cat.slug); }}
                          className="block w-full text-left px-4 py-2.5 text-sm text-secondary hover:text-accent hover:text-accent hover:bg-surface transition-colors"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleNav('library')}
                className={`text-sm font-medium transition-all duration-200 ${currentRoute === 'library' ? 'text-accent' : 'text-secondary hover:text-accent'}`}
              >
                数字书房
              </button>

              <button
                onClick={() => handleNav('geek')}
                className={`text-sm font-medium transition-all duration-200 ${currentRoute === 'geek' ? 'text-accent' : 'text-secondary hover:text-accent'}`}
              >
                数字生活
              </button>

              <button
                onClick={() => handleNav('projects')}
                className={`text-sm font-medium transition-all duration-200 ${currentRoute === 'projects' ? 'text-accent' : 'text-secondary hover:text-accent'}`}
              >
                商业咨询
              </button>

              <button
                onClick={() => handleNav('about')}
                className={`text-sm font-medium transition-all duration-200 ${currentRoute === 'about' ? 'text-accent' : 'text-secondary hover:text-accent'}`}
              >
                关于
              </button>

              <div className="w-px h-4 bg-gray-200 mx-4"></div>
              <div className="flex space-x-5 text-secondary">
                {/* GitHub Link: Only render if URL is present */}
                {SOCIAL_LINKS.github && (
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-primary hover:scale-110 cursor-pointer transition-all duration-200">
                    <Github size={18} />
                  </a>
                )}
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="hover:text-[#1DA1F2] hover:scale-110 cursor-pointer transition-all duration-200">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-primary hover:text-accent focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-xl z-50 h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-4 pt-4 pb-12 space-y-2">
              <div className="py-2 border-b border-gray-100">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full text-left px-3 py-3 text-lg font-bold text-primary flex justify-between items-center"
                >
                  思考与文章
                  <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="pl-6 space-y-1 mb-2 animate-fade-in">
                    <button onClick={() => handleNav('essays')} className="w-full text-left px-3 py-2 text-sm text-secondary hover:text-accent">
                      全部文章
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => handleNav(cat.slug)}
                        className="w-full text-left px-3 py-2 text-sm text-secondary hover:text-accent flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-accent/50 rounded-full mr-2"></span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => handleNav('library')} className="w-full text-left px-3 py-4 text-lg font-medium text-secondary hover:text-accent border-b border-gray-100">
                数字书房
              </button>

              <button onClick={() => handleNav('geek')} className="w-full text-left px-3 py-4 text-lg font-medium text-secondary hover:text-accent border-b border-gray-100">
                数字生活
              </button>

              <button onClick={() => handleNav('projects')} className="w-full text-left px-3 py-4 text-lg font-medium text-secondary hover:text-accent border-b border-gray-100">
                商业咨询
              </button>

              <button onClick={() => handleNav('about')} className="w-full text-left px-3 py-4 text-lg font-medium text-secondary hover:text-accent border-b border-gray-100">
                关于
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {children}
      </main>

      {/* Footer - Minimalist White */}
      <footer className="bg-surface border-t border-gray-200 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="font-serif font-bold text-lg text-primary tracking-wider">{BLOG_NAME}.</p>
            <p className="text-secondary text-sm mt-2 flex items-center justify-center md:justify-start">
              <Terminal size={12} className="mr-2 text-accent" />
              Running on VPS • Debian 12
            </p>
          </div>
          <div className="flex space-x-8 text-secondary text-sm">
            <button onClick={() => handleNav('resume')} className="hover:text-accent transition-colors font-medium">个人简历</button>

            {/* RSS Link: Points to WordPress /feed */}
            <a
              href={WORDPRESS_API_URL ? `${WORDPRESS_API_URL}/feed` : '#'}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors font-medium"
            >
              RSS 订阅
            </a>

            {/* Email Contact: Points to mailto */}
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="hover:text-accent transition-colors font-medium"
            >
              邮件通讯
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;