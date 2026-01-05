import React, { useState, useMemo } from 'react';
import { Book, Film, Brain, MonitorPlay } from 'lucide-react';
import SEO from '../components/SEO';
import { BlogPost } from '../types';
import GalleryCard from '../components/GalleryCard';

interface LibraryProps {
  posts: BlogPost[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
}

const Library: React.FC<LibraryProps> = ({ posts, isLoading, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'books' | 'knowledge' | 'media'>('books');

  // Filter posts based on props
  const { books, knowledge, media } = useMemo(() => {
    const bookPosts = posts.filter(p =>
    (p.categories && p.categories.some(c =>
      c.toLowerCase() === 'books' ||
      c === '书籍推荐' ||
      c === '书架'
    ))
    );

    const knowledgePosts = posts.filter(p =>
    (p.categories && p.categories.some(c =>
      c.toLowerCase() === 'knowledge' ||
      c.toLowerCase() === 'courses' ||
      c === '课程与知识'
    ))
    );

    const mediaPosts = posts.filter(p =>
    (p.categories && p.categories.some(c =>
      c.toLowerCase() === 'media' ||
      c === '影音记录' ||
      c === '影音'
    ))
    );

    return { books: bookPosts, knowledge: knowledgePosts, media: mediaPosts };
  }, [posts]);

  // Helper to render a group of items (Notion style grouping)
  const renderGroup = (title: string, items: BlogPost[], type: 'book' | 'media') => {
    if (items.length === 0) return null;

    // Grid columns: Books (Vertical) = 5 cols; Media (Horizontal) = 3 cols (Netflix Style)
    const gridClass = type === 'book'
      ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

    return (
      <div className="mb-12 animate-fade-in">
        <div className="flex items-center mb-4 border-b border-gray-100 pb-2">
          <span className={`text-xs font-mono px-2 py-0.5 rounded mr-2 ${title.includes('5') || title.includes('Masterpiece') || title.includes('精选') ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
            {items.length}
          </span>
          <h3 className="font-bold text-primary text-lg flex items-center">
            {title}
          </h3>
        </div>
        <div className={gridClass}>
          {items.map(item => (
            <GalleryCard
              key={item.id}
              item={item}
              type={type}
              onClick={() => onNavigate(`post/${item.slug}`)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <SEO title="数字书房" description="书籍、课程与影音记录。" />

      <header className="text-center mb-8">
        <h1 className="font-serif text-4xl font-bold text-primary mb-4">数字书房</h1>
        <p className="text-secondary max-w-xl mx-auto">
          我的知识输入系统。
        </p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-surface border border-gray-200 rounded-full p-1">
          {[
            { id: 'books', label: '书架 (Books)', icon: <Book size={16} /> },
            { id: 'knowledge', label: '知识 (Knowledge)', icon: <Brain size={16} /> },
            { id: 'media', label: '影音 (Media)', icon: <MonitorPlay size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab.id
                ? 'bg-accent text-white shadow-lg'
                : 'text-secondary hover:text-primary'
                }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {isLoading && (
          <div className="text-center py-20 text-secondary animate-pulse">
            正在整理书架...
          </div>
        )}

        {/* Books Tab - Grouped by Rating */}
        {!isLoading && activeTab === 'books' && (
          <div>
            {books.length > 0 ? (
              <>
                {/* 5 Stars - Masterpiece */}
                {renderGroup("⭐⭐⭐⭐⭐ 力荐 (Masterpiece)", books.filter(b => (b.acf?.rating || 0) === 5), 'book')}

                {/* 4 Stars - Great */}
                {renderGroup("⭐⭐⭐⭐ 推荐 (Great)", books.filter(b => (b.acf?.rating || 0) === 4), 'book')}

                {/* 1-3 Stars - Good / Average */}
                {renderGroup("⭐⭐⭐ 还行 (Good)", books.filter(b => {
                  const r = b.acf?.rating || 0;
                  return r >= 1 && r <= 3;
                }), 'book')}

                {/* Unrated / Wishlist */}
                {renderGroup("📖 想读 / 未评 (Wishlist)", books.filter(b => (b.acf?.rating || 0) === 0), 'book')}
              </>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl">
                <Book size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-secondary">书架空空如也。</p>
                <p className="text-xs text-gray-400 mt-2">提示：在文章中添加 "books" 分类，并添加 "5" 或 "4" 这样的标签来打分。</p>
              </div>
            )}
          </div>
        )}

        {/* Knowledge Tab (List View remains better for courses) */}
        {!isLoading && activeTab === 'knowledge' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {knowledge.length > 0 ? (
              knowledge.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate(`post/${item.slug}`)}
                  className="group flex flex-col p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-accent/30 cursor-pointer transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                  <div className="flex items-center space-x-3 text-xs mb-3">
                    <span className="text-accent font-mono font-bold">{item.date}</span>
                    {item.categories?.slice(0, 1).map(c => (
                      <span key={c} className="bg-surface border border-gray-200 px-2 py-0.5 rounded text-secondary font-bold">{c}</span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors font-serif mb-3 flex items-center">
                    <Brain size={18} className="mr-2 text-accent" />
                    {item.title}
                  </h3>

                  <p className="text-secondary text-sm leading-relaxed line-clamp-2">
                    {item.excerpt.replace(/<[^>]+>/g, '')}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 border border-dashed border-gray-200 rounded-2xl">
                <Brain size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-secondary">暂无课程。</p>
              </div>
            )}
          </div>
        )}

        {/* Media Tab - Grouped by Rating */}
        {!isLoading && activeTab === 'media' && (
          <div>
            {media.length > 0 ? (
              <>
                {/* High Rating (5) */}
                {renderGroup("必看精选 (Selections)", media.filter(m => (m.acf?.rating || 0) === 5), 'media')}

                {/* Standard (1-4) */}
                {renderGroup("影音记录 (Records)", media.filter(m => {
                  const r = m.acf?.rating || 0;
                  return r >= 1 && r <= 4;
                }), 'media')}

                {/* Wishlist (0) */}
                {renderGroup("想看 (Wishlist)", media.filter(m => (m.acf?.rating || 0) === 0), 'media')}
              </>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl">
                <Film size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-secondary">暂无影音记录。</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;