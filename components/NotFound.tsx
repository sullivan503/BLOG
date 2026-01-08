import React, { useMemo } from 'react';
import { FileQuestion, ArrowLeft, Home, Compass } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (path: string) => void;
  type?: 'post' | 'page';
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigate, type = 'page' }) => {

  // Random Zen quotes about getting lost
  const quote = useMemo(() => {
    const quotes = [
      "Not all those who wander are lost. — J.R.R. Tolkien",
      "In the middle of the journey of our life I came to myself within a dark wood where the straight way was lost. — Dante",
      "Getting lost is just another way of saying 'going exploring'.",
      "The void is not empty. It is full of possibilities.",
      "Sometimes you have to lose yourself to find yourself.",
      "404: Order not found in this chaos."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-24 px-4 text-center min-h-[60vh] overflow-hidden">

      {/* Background Decorative "404" Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[200px] text-gray-50 select-none pointer-events-none z-0">
        404
      </div>

      <div className="relative z-10 animate-fade-in flex flex-col items-center">
        <div className="bg-surface p-6 mb-8 shadow-sm">
          {type === 'post' ? (
            <FileQuestion size={48} className="text-secondary" />
          ) : (
            <Compass size={48} className="text-accent" />
          )}
        </div>

        <h1 className="font-serif text-5xl font-bold text-primary mb-4 tracking-tight">
          {type === 'post' ? '文章未找到' : '迷路了吗？'}
        </h1>

        <p className="text-secondary max-w-md mb-8 leading-relaxed text-lg">
          {type === 'post'
            ? '这篇文章似乎消失在了数据流中，或者链接已失效。'
            : '这里是数字花园的荒原。没有代码，没有文字，只有无尽的虚空。'}
        </p>

        {/* The Zen Quote */}
        <div className="mb-10 py-4 px-8 border-l-2 border-accent/30 bg-gray-50 italic text-secondary text-sm font-serif">
          "{quote}"
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => onNavigate('')}
            className="flex items-center justify-center bg-primary text-white px-8 py-3.5 font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home size={18} className="mr-2" />
            返回首页
          </button>
          <button
            onClick={() => onNavigate('essays')}
            className="flex items-center justify-center bg-white border border-gray-200 text-primary px-8 py-3.5 font-bold hover:border-accent hover:text-accent transition-all shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={18} className="mr-2" />
            浏览文章
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;