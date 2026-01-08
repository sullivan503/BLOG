import React, { useMemo } from 'react';
import { BlogPost } from '../types';
import { BLOG_DESCRIPTION, HOMEPAGE_WIDGETS } from '../constants';
import SEO from '../components/SEO';
import BentoItem from '../components/BentoItem';

interface HomeProps {
    posts: BlogPost[];
    onNavigate: (page: string) => void;
    isLoading: boolean;
    widgetsData?: {
        featured: BlogPost | null;
        reading: BlogPost | null;
        microThought: BlogPost | null;
        geek: BlogPost | null;
    };
}

const Home: React.FC<HomeProps> = ({ posts, onNavigate, isLoading, widgetsData }) => {
    // Filter posts
    const isExcludedFromHomeStream = (post: BlogPost) => {
        if (!post.categories || post.categories.length === 0) return false;
        const excludedKeywords = ['books', 'reading', 'games', 'media'];
        return post.categories.some(cat =>
            excludedKeywords.some(keyword => cat.toLowerCase().includes(keyword))
        );
    };

    const homeStreamPosts = useMemo(() => {
        // If we have a specific sticky post, exclude it from the stream list to avoid duplication if it's new
        const stream = posts.filter(p => !isExcludedFromHomeStream(p));
        if (widgetsData?.featured) {
            return stream.filter(p => p.id !== widgetsData.featured?.id);
        }
        return stream;
    }, [posts, widgetsData]);

    // Priority: Dynamic Sticky -> Latest Valid Post
    const featuredPost = widgetsData?.featured || homeStreamPosts[0];

    // List should be the next 3 posts
    const listPosts = homeStreamPosts.filter(p => p.id !== featuredPost?.id).slice(0, 3);

    // Helper for 'Red Button' style
    const RedButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
        <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="bg-accent text-white px-6 py-3 font-mono font-bold text-sm rounded hover:bg-accentHover transition-colors uppercase tracking-wider"
        >
            {children}
        </button>
    );

    // Helper for 'Red Arrow Link' style
    const RedLink = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
        <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="text-accent font-mono font-bold text-sm border-b-2 border-red-100 hover:border-accent pb-0.5 transition-colors uppercase tracking-widest"
        >
            {children}
        </button>
    );

    // Merge Dynamic Data with Static Fallback
    const reading = widgetsData?.reading ? {
        title: widgetsData.reading.title,
        author: "Recommended", // WP doesn't have book author field easily, default to generic or omit
        coverUrl: widgetsData.reading.imageUrl,
        comment: widgetsData.reading.excerpt, // Use excerpt as Short Comment
        link: 'library'
    } : HOMEPAGE_WIDGETS.reading;

    const microThought = widgetsData?.microThought ? {
        label: "Business Insight",
        content: widgetsData.microThought.excerpt, // Use excerpt as content
        link: 'projects'
    } : HOMEPAGE_WIDGETS.microThought;

    const geek = widgetsData?.geek ? {
        label: "Technical Writing",
        content: widgetsData.geek.title, // Use Title for Geek Listing
        link: 'geek'
    } : HOMEPAGE_WIDGETS.geek;

    return (
        <div className="animate-fade-in">
            <SEO title="Home" description={BLOG_DESCRIPTION} />

            {/* --- HERO HEADER --- */}
            <section className="mb-16 md:mb-24 md:max-w-[800px]">
                <h1 className="font-display font-bold text-[2.5rem] md:text-[3.8rem] leading-[1.1] text-primary mb-8">
                    Digital Order vs.<br />Information Entropy<span className="text-accent">.</span>
                </h1>
                <p className="font-serif font-light text-[1.2rem] md:text-[1.35rem] leading-relaxed text-secondary relative pl-6 border-l-2 border-accent">
                    构建数字秩序，对抗信息熵增。<br />
                    <span className="text-sm md:text-base opacity-70 mt-2 block">记录关于商业逻辑、心智成长与技术哲学的长期思考。</span>
                </p>
            </section>

            {/* --- ROW 1: FEATURED & READING (Visual Anchors) --- */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-20">
                {/* 1. FEATURED ITEM (2 Cols) */}
                <div className="md:col-span-2 relative group cursor-pointer" onClick={() => featuredPost && onNavigate(`post/${featuredPost.slug}`)}>
                    {isLoading ? (
                        <div className="h-[400px] bg-surface flex items-center justify-center text-secondary font-mono">Loading Content...</div>
                    ) : featuredPost ? (
                        <div className="relative h-full bg-surface p-8 md:p-12 flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-300">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="bg-accent text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1">Featured</span>
                                    <span className="font-serif italic text-secondary text-sm">{featuredPost.date ? new Date(featuredPost.date).toLocaleDateString() : ''}</span>
                                </div>
                                <h2 className="font-display font-bold text-3xl md:text-4xl text-primary leading-tight mb-6 group-hover:text-accent transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="font-serif text-lg text-secondary/80 leading-relaxed line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                            </div>
                            <div className="mt-8 flex items-center gap-6">
                                <RedButton onClick={() => onNavigate(`post/${featuredPost.slug}`)}>Read Article</RedButton>
                                <span className="font-serif italic text-gray-400">or</span>
                                <RedLink onClick={() => onNavigate('essays')}>View Archive &rarr;</RedLink>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* 2. READING WIDGET (1 Col) */}
                <div
                    className="bg-white border border-border p-8 flex flex-col justify-between hover:border-accent hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group"
                    onClick={() => onNavigate(reading.link)}
                >
                    <div>
                        <div className="flex items-baseline justify-between mb-6">
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent">Reading Now</span>
                            <span className="font-mono text-[10px] text-gray-400">Library &rarr;</span>
                        </div>
                        <div className="flex gap-4 mb-6">
                            {/* Book Cover Placeholder */}
                            <div className="w-20 h-28 bg-gray-100 flex-shrink-0 bg-cover bg-center shadow-sm" style={{ backgroundImage: `url(${reading.coverUrl})` }}></div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-display font-bold text-lg leading-tight mb-1">{reading.title}</h3>
                                <p className="font-serif italic text-sm text-secondary">by {reading.author}</p>
                            </div>
                        </div>
                        <p className="font-serif text-sm text-primary leading-relaxed border-l-2 border-gray-200 pl-4 py-1">
                            "{reading.comment}"
                        </p>
                    </div>
                </div>
            </section>

            {/* --- ROW 2: CLEAN TEXT LIST (Latest Flow) --- */}
            <section className="mb-20">
                <div className="flex items-baseline justify-between mb-8 border-b border-border pb-4">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-secondary">Latest Writing</h3>
                    <RedLink onClick={() => onNavigate('essays')}>View Archive</RedLink>
                </div>
                <div className="flex flex-col gap-0 divide-y divide-border">
                    {listPosts.map((post) => (
                        <div
                            key={post.id}
                            className="group py-6 flex flex-col md:flex-row md:items-baseline md:justify-between cursor-pointer hover:bg-surface transition-colors -mx-4 px-4"
                            onClick={() => onNavigate(`post/${post.slug}`)}
                        >
                            <div className="md:w-3/4">
                                <h3 className="font-display text-xl md:text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                    {post.title}
                                </h3>
                                <p className="font-serif text-secondary text-sm md:text-base line-clamp-1 opacity-80">{post.excerpt}</p>
                            </div>
                            <div className="mt-2 md:mt-0 font-mono text-xs text-gray-400 uppercase tracking-widest">
                                {new Date(post.date).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- ROW 3: INSIGHTS & GEEK (Content Widgets) --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {/* 3.1 MICRO THOUGHT */}
                <div
                    className="bg-surface border-none p-8 md:p-10 flex flex-col justify-between hover:bg-[#f0f0ed] hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group"
                    onClick={() => onNavigate(microThought.link)}
                >
                    <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent mb-6">
                            {microThought.label}
                        </div>
                        <blockquote className="font-display font-medium text-xl md:text-2xl leading-relaxed text-primary">
                            "{microThought.content}"
                        </blockquote>
                    </div>
                    <div className="mt-8">
                        <span className="font-mono text-xs text-secondary border-b border-secondary/30 pb-0.5 group-hover:border-accent transition-colors">Explore Consulting &rarr;</span>
                    </div>
                </div>

                {/* 3.2 GEEK / DIGITAL SETUP */}
                <div
                    className="bg-background border border-border p-8 md:p-10 flex flex-col justify-between hover:border-accent hover:translate-y-[-2px] transition-all duration-300 cursor-pointer"
                    onClick={() => onNavigate(geek.link)}
                >
                    <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent mb-6">
                            {geek.label}
                        </div>
                        <div className="font-serif text-lg text-secondary leading-relaxed mb-4">
                            {geek.content}
                        </div>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                        <RedLink onClick={() => onNavigate(geek.link)}>View Digital Life</RedLink>
                        <div className="font-mono text-xs text-gray-300">V.2024.1</div>
                    </div>
                </div>
            </section>

            {/* --- ROW 4: NEWSLETTER (Flat) --- */}
            <section className="bg-accent text-white p-8 md:p-12 mb-20">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="md:w-1/2 text-left">
                        <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">Join the Inner Circle</h3>
                        <p className="font-serif text-white/90 leading-relaxed text-sm md:text-base">
                            每周分享关于商业复利、心智模型与技术哲学的深度思考。拒绝噪音，只有信号。
                        </p>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 bg-white/10 border border-white/30 text-white placeholder-white/60 px-4 py-3 font-mono text-sm focus:outline-none focus:border-white transition-colors"
                                />
                                <button className="bg-white text-accent px-6 py-3 font-mono font-bold text-sm uppercase tracking-wider hover:bg-red-50 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <p className="font-mono text-[10px] text-white/50 text-right">No spam. Unsubscribe anytime.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;