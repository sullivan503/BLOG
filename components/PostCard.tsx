import React from 'react';
import { BlogPost } from '../types';
import { Clock, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  onClick: (slug: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <article 
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-accent/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg"
      onClick={() => onClick(post.slug)}
    >
      <div className="h-52 overflow-hidden relative">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-20 flex space-x-2">
            {post.tags.slice(0, 1).map(tag => (
                <span key={tag} className="bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-mono text-accent border border-gray-200 rounded-md font-bold shadow-sm">
                    {tag}
                </span>
            ))}
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center text-xs font-mono text-secondary mb-4 space-x-3">
          <span>{post.date}</span>
          <span className="text-gray-300">|</span>
          <div className="flex items-center">
            <Clock size={12} className="mr-1.5" />
            {post.readTime}
          </div>
        </div>
        <h3 className="font-serif font-bold text-2xl text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
          {post.title}
        </h3>
        <p className="text-secondary text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center text-primary font-bold text-sm mt-auto group-hover:translate-x-2 transition-transform">
          <span className="border-b-2 border-accent pb-0.5">Read Article</span> 
          <ArrowRight size={16} className="ml-2 text-accent" />
        </div>
      </div>
    </article>
  );
};

export default PostCard;