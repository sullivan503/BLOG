import React from 'react';
import { BlogPost } from '../types';
import { Star, Book, Gamepad2, MonitorPlay } from 'lucide-react';

interface GalleryCardProps {
  item: BlogPost;
  type: 'book' | 'game' | 'media';
  onClick?: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, type, onClick }) => {
  const rating = item.acf?.rating || 0;

  // Decide Icon based on type
  let FallbackIcon = Book;
  if (type === 'game') FallbackIcon = Gamepad2;
  else if (type === 'media') FallbackIcon = MonitorPlay;

  // Aspect ratio
  // Books: Vertical (Standard 2:3)
  // Games & Media: Horizontal (16:9 - Netflix/Steam Style)
  const imageAspectClass = type === 'book' ? 'aspect-[2/3]' : 'aspect-video';

  // Get metadata badge content
  const getBadgeContent = () => {
    if (type === 'game' && item.acf?.platform) {
      const platform = Array.isArray(item.acf.platform) ? item.acf.platform[0] : item.acf.platform;
      return platform;
    }
    if (type === 'book' && item.acf?.status) {
      return item.acf.status === 'reading' ? 'In Progress' :
        item.acf.status === 'wishlist' ? 'Wishlist' : 'Read';
    }
    return null;
  };
  const badgeContent = getBadgeContent();

  return (
    <div
      className={`group bg-white border border-gray-200 overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300 flex flex-col h-full ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={onClick}
    >

      {/* 1. Cover Image Area */}
      <div className={`w-full ${imageAspectClass} bg-gray-50 relative overflow-hidden border-b border-gray-100`}>
        {item.imageUrl && !item.imageUrl.includes('picsum') ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <FallbackIcon size={48} opacity={0.5} />
          </div>
        )}

        {/* Metadata Badge */}
        <div className="absolute top-2 left-2 flex gap-1">
          {badgeContent && (
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wide">
              {badgeContent}
            </span>
          )}
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Title */}
        <h3 className="font-bold text-primary text-base leading-tight mb-1 group-hover:text-accent transition-colors line-clamp-2">
          {item.title}
        </h3>

        {/* Author / Creator (Sub-title) */}
        {item.acf?.creator && (
          <div className="text-xs text-gray-400 mb-2 font-mono">
            {item.acf.creator}
          </div>
        )}

        {/* Rating Row */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.floor(rating) ? "#fbbf24" : "none"}
              className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}
            />
          ))}
          {rating > 0 && (
            <span className="text-xs text-secondary ml-1 font-mono pt-0.5">{rating}</span>
          )}
        </div>

        {/* Excerpt/Description (Mini) */}
        <div className="text-xs text-secondary line-clamp-3 leading-relaxed mt-auto opacity-80">
          <div dangerouslySetInnerHTML={{ __html: item.excerpt }} />
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;