import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, Tag, Sparkles, Star, Clock, Gamepad2, Book, MonitorPlay } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import { generatePostSummary } from '../services/geminiService';
import SEO from '../components/SEO';

interface PostPageProps {
    post: BlogPost;
    onBack: () => void;
    backLabel?: string;
}

const PostPage: React.FC<PostPageProps> = ({ post, onBack, backLabel = "Back to Articles" }) => {
    const [summary, setSummary] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Scroll to top when post opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleGenerateSummary = async () => {
        setIsGenerating(true);
        const result = await generatePostSummary(post.content);
        setSummary(result);
        setIsGenerating(false);
    };

    // Check if this is a "Product/Review" type post (Books, Games, Media)
    const isGame = post.categories?.some(c => ['games', '游戏'].some(k => c.toLowerCase().includes(k)));
    const isBook = post.categories?.some(c => ['books', '书架'].some(k => c.toLowerCase().includes(k)));
    const isMedia = post.categories?.some(c => ['media', '影音'].some(k => c.toLowerCase().includes(k)));
    const isReviewType = isGame || isBook || isMedia;

    // Determine Type Icon
    let TypeIcon = Star;
    if (isGame) TypeIcon = Gamepad2;
    else if (isBook) TypeIcon = Book;
    else if (isMedia) TypeIcon = MonitorPlay;

    return (
        <div className="max-w-4xl mx-auto">
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.imageUrl}
                url={`https://fengwz.me/#post/${post.slug}`}
            />

            <button
                onClick={onBack}
                className="flex items-center text-secondary hover:text-accent mb-8 transition-colors group text-sm font-bold"
            >
                <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform text-accent" />
                {backLabel}
            </button>

            {/* CONDITIONAL LAYOUT */}

            {isReviewType ? (
                /* --- AMAZON / DOUBAN STYLE LAYOUT FOR REVIEWS --- */
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Left: Product Image */}
                        <div className="w-full md:w-56 flex-shrink-0">
                            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100 relative bg-gray-50 aspect-[3/4] md:aspect-auto">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Right: Info Header */}
                        <div className="flex-grow w-full">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map(tag => (
                                    !tag.match(/^\d/) && (
                                        <span key={tag} className="bg-surface text-secondary px-2 py-0.5 rounded text-xs font-mono border border-gray-200">
                                            {tag}
                                        </span>
                                    )
                                ))}
                            </div>

                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 leading-tight flex items-center">
                                <TypeIcon className="mr-3 text-accent hidden md:block" size={32} />
                                {post.title}
                            </h1>

                            <div className="flex items-center text-sm text-secondary mb-6 space-x-4 border-b border-gray-100 pb-4">
                                <span className="font-bold text-primary">{post.author}</span>
                                <span>|</span>
                                <span>{post.date}</span>
                            </div>

                            {/* Rating if available */}
                            {((post.acf?.rating || post.rating) && (post.acf?.rating || post.rating || 0) > 0) && (
                                <div className="flex items-center mb-6">
                                    <div className="flex mr-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={20}
                                                fill={i < Math.floor((post.acf?.rating || post.rating) || 0) ? "#fbbf24" : "none"}
                                                className={i < Math.floor((post.acf?.rating || post.rating) || 0) ? "text-yellow-400" : "text-gray-200"}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-bold text-primary font-mono text-2xl">{post.acf?.rating || post.rating}</span>
                                    <span className="text-gray-300 text-lg ml-1">/ 5.0</span>
                                </div>
                            )}

                            {/* AI Summary embedded in right column */}
                            <div className="bg-surface border border-gray-100 rounded-lg p-5 relative">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center text-accent font-bold text-xs uppercase tracking-wide">
                                        <Sparkles size={14} className="mr-1.5" />
                                        {isGame ? 'AI Game Brief' : 'AI Summary'}
                                    </div>
                                    {!summary && (
                                        <button
                                            onClick={handleGenerateSummary}
                                            disabled={isGenerating}
                                            className="text-[10px] bg-white text-accent border border-accent/30 px-3 py-1 rounded-full hover:bg-accent hover:text-white transition-all disabled:opacity-50 font-bold"
                                        >
                                            {isGenerating ? 'Thinking...' : 'Generate'}
                                        </button>
                                    )}
                                </div>
                                {isGenerating ? (
                                    <div className="space-y-2 animate-pulse">
                                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                ) : (
                                    <p className="text-primary text-sm leading-relaxed italic opacity-80">
                                        "{summary || post.excerpt}"
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* --- STANDARD BLOG LAYOUT FOR ESSAYS --- */
                <>
                    {/* Post Header */}
                    <header className="mb-12 text-center max-w-2xl mx-auto">
                        <div className="flex justify-center items-center space-x-3 mb-6">
                            {post.tags.map(tag => (
                                <span key={tag} className="border border-gray-200 bg-surface text-secondary px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center text-secondary text-sm space-x-6 font-mono border-t border-b border-gray-100 py-4 inline-flex px-8">
                            <div className="flex items-center">
                                <span className="font-bold text-primary">{post.author}</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <div className="flex items-center">
                                <Calendar size={14} className="mr-2" />
                                {post.date}
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <div>{post.readTime}</div>
                        </div>
                    </header>

                    {/* Feature Image */}
                    <div className="rounded-xl overflow-hidden mb-12 shadow-lg border border-gray-100">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
                    </div>

                    {/* AI Summary Section */}
                    <div className="bg-surface border-l-4 border-accent p-6 mb-12 relative overflow-hidden rounded-r-xl">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="flex items-center text-accent font-bold">
                                <Sparkles size={18} className="mr-2" />
                                AI Insight
                            </div>
                            {!summary && (
                                <button
                                    onClick={handleGenerateSummary}
                                    disabled={isGenerating}
                                    className="text-xs bg-white text-accent border border-accent/30 px-4 py-1.5 rounded-full hover:bg-accent hover:text-white transition-all disabled:opacity-50 font-medium"
                                >
                                    {isGenerating ? 'Analyzing...' : 'Generate Summary'}
                                </button>
                            )}
                        </div>

                        {isGenerating ? (
                            <div className="flex space-x-2 animate-pulse mt-2">
                                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        ) : summary ? (
                            <p className="text-primary text-sm leading-relaxed animate-fade-in italic">
                                "{summary}"
                            </p>
                        ) : (
                            <p className="text-secondary text-sm">
                                Unlock the key takeaways of this article instantly with Gemini AI.
                            </p>
                        )}
                    </div>
                </>
            )}

            {/* Content - Prose Normal (Dark Text) */}
            <article className="prose prose-lg prose-slate max-w-none mb-16 prose-headings:font-serif prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Author Bio (Small) */}
            <div className="bg-surface border border-gray-100 rounded-xl p-8 mb-12 flex items-center shadow-sm">
                <div className="relative">
                    <img
                        src="https://picsum.photos/seed/user/100/100"
                        alt={post.author}
                        className="w-16 h-16 rounded-full mr-6 border-2 border-accent"
                    />
                </div>

                <div>
                    <h4 className="font-bold text-primary text-lg mb-1">{post.author}</h4>
                    <p className="text-secondary text-sm">Full-Stack Engineer & Digital Minimalist. Building high-performance web applications on the edge.</p>
                </div>
            </div>

            {/* Comments */}
            <CommentSection postId={post.id} postContent={post.content} />
        </div>
    );
};

export default PostPage;