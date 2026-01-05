import React, { useState, useEffect } from 'react';
import { Comment } from '../types';
import { User, MessageSquare } from 'lucide-react';
import { suggestComment } from '../services/geminiService';

interface CommentSectionProps {
  postId: string;
  postContent: string; // Needed for AI suggestion
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, postContent }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Load comments from local storage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${postId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      author: authorName,
      content: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
    setNewComment('');
  };

  const handleAiSuggest = async () => {
    setIsAiLoading(true);
    const suggestion = await suggestComment(postContent);
    setNewComment(suggestion);
    setIsAiLoading(false);
  };

  return (
    <div className="mt-16 pt-12 border-t border-gray-100">
      <h3 className="text-2xl font-serif font-bold mb-8 flex items-center text-primary">
        <MessageSquare className="mr-3 text-accent" size={24} />
        Discussions ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="bg-surface border border-gray-100 rounded-xl p-6 mb-12">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-xs font-mono text-secondary mb-2 uppercase tracking-wide font-bold">Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Identify yourself"
              className="w-full px-4 py-3 bg-white text-primary rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent placeholder-gray-400 transition-colors"
              required
            />
          </div>
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-mono text-secondary uppercase tracking-wide font-bold">Message</label>
                <button 
                    type="button" 
                    onClick={handleAiSuggest}
                    disabled={isAiLoading}
                    className="text-xs text-accent hover:text-accentHover flex items-center disabled:opacity-50 transition-colors font-bold"
                >
                    {isAiLoading ? 'Thinking...' : '✨ AI Suggest'}
                </button>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="w-full px-4 py-3 bg-white text-primary rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent placeholder-gray-400 transition-colors"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
                type="submit"
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-black transition-colors"
            >
                Post Comment
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.length === 0 ? (
          <div className="text-center py-8 opacity-50">
             <p className="text-secondary italic">No signals yet. Initiate the conversation.</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4 animate-fade-in group">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-secondary border border-gray-200 font-bold">
                  <User size={18} />
                </div>
              </div>
              <div className="flex-grow bg-white p-4 rounded-xl border border-gray-100 shadow-sm group-hover:border-gray-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-primary text-sm">{comment.author}</h4>
                  <span className="text-xs text-secondary font-mono">{comment.date}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;