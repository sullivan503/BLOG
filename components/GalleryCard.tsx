import React from 'react';
import { BlogPost } from '../types';
import { Star, Book, Gamepad2 } from 'lucide-react';

interface GalleryCardProps {
  item: BlogPost;
  type: 'book' | 'game' | 'media';
  onClick?: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, type, onClick }) => {
  const rating = item.rating || 0;
  
  // Decide Icon based on type if no image
  const FallbackIcon = type === 'game' ? Gamepad2 : Book;
  
  // Aspect ratio: Books are usually taller (2/3), Games usually wider (16/9)
  const imageAspectClass = type === 'book' ? 'aspect-[3/4]' : 'aspect-video';

  return (
    <div 
        className={`group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300 flex flex-col h-full ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={onClick}
    >
      
      {/* 1. Cover Image Area - Notion Style */}
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
         
         {/* Tag overlay on image (Notion style typically clean, but let's keep it subtle) */}
         <div className="absolute top-2 left-2">
            {item.tags.length > 0 && !item.tags[0].match(/^\d/) && (
                <span className="bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold">
                    {item.tags.find(t => !t.match(/^\d/)) || item.tags[0]}
                </span>
            )}
         </div>
      </div>

      {/* 2. Content Area */}
      <div className="p-4 flex flex-col flex-grow">
         
         {/* Title */}
         <h3 className="font-bold text-primary text-base leading-tight mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {item.title}
         </h3>

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
            <div dangerouslySetInnerHTML={{__html: item.excerpt}} />
         </div>
      </div>
    </div>
  );
};

export default GalleryCard;