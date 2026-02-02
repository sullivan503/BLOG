import React, { useMemo, useState } from 'react';
import { BlogPost } from '../types';
import { Tag, Folder, Clock, Search, BookOpen, ChevronRight, Hash } from 'lucide-react';
import SEO from '../components/SEO';

interface EssaysProps {
    posts: BlogPost[];
    onNavigate: (slug: string) => void;
    categorySlug?: string;
}

const Essays: React.FC<EssaysProps> = ({ posts, onNavigate, categorySlug }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const categoryMap: Record<string, string[]> = {
        'business': ['商业与运营', 'Business', '商业', '运营'],
        // Merged 'Mind' and 'Body' keywords into one category view
        'mind': ['心智与成长', 'Mind', '心智', '心理', 'Self', '身体使用手册', 'Body', 'Life', '健康', 'Body & Life'],
        'body': ['身体使用手册', 'Body', 'Life', '健康', 'Body & Life'], // Kept for backward compatibility if accessed directly
        'wealth': ['财富与策略', 'Wealth', '投资', 'Strategy'],
        'journal': ['随笔', 'Journal', '生活与随笔', '生活', 'Daily', 'Notes', 'Uncategorized', '未分类']
    };

    const getCategoryTitle = (slug: string) => {
        switch (slug) {
            case 'business': return '商业与运营';
            case 'mind': return '心智与身体 (Mind & Body)'; // Updated Title
            case 'body': return '身体使用手册';
            case 'wealth': return '财富与策略';
            case 'journal': return '随笔';
            default: return '文章列表';
        }
    };

    const getCategoryDesc = (slug: string) => {
        switch (slug) {
            case 'business': return '用工程思维解构商业挑战。从 B2B 销售方法论到数字化转型，关于增长的实战复盘。';
            case 'mind': return '在无序的世界中重建内在秩序。从焦虑自救到 Body Bio-hacking，用传统智慧与科学锚定身心。';
            case 'body': return '中医视角、亲密关系与精力管理';
            case 'wealth': return '在纷繁复杂的经济波动中，寻找确定性的价值。关于复利、周期与资产配置的思考。';
            case 'journal': return '日常碎片、灵感记录与未归档的思考';
            default: return '商业、心智、身体与财富的复利笔记。';
        }
    };

    // Filter Logic:
    // "Think & Write" should ONLY contain: Mind, Body, Wealth, Journal.
    // STRICTLY EXCLUDE: Tech, Games, Books, Media, Projects, Business.
    const isEssayContent = (post: BlogPost) => {
        const allowedKeywords = ['mind', '心智', 'body', '身体', 'wealth', '财富', 'journal', '随笔', 'life', '生活'];
        const forbiddenKeywords = ['tech', '技术', 'game', '游戏', 'book', '书', 'read', 'media', '影音', 'business', '商业', 'project', '项目', 'achievement', '成果'];

        // Must have an allowed keyword
        const hasAllowed = post.categories?.some(c => allowedKeywords.some(k => c.toLowerCase().includes(k)));

        // Must NOT have a forbidden keyword (Safety check)
        const hasForbidden = post.categories?.some(c => forbiddenKeywords.some(k => c.toLowerCase().includes(k)));

        return hasAllowed && !hasForbidden;
    };

    // Filter Logic: Category -> then Search
    const filteredPosts = useMemo(() => {
        // Strict Filter: Only show Essay Content
        let results = posts.filter(post => isEssayContent(post));

        // 1. Filter by Category Slug
        if (categorySlug) {
            const targetNames = categoryMap[categorySlug];
            if (targetNames) {
                results = results.filter(post => {
                    if (!post.categories) return false;
                    return post.categories.some(catName =>
                        targetNames.some(target => catName.toLowerCase().includes(target.toLowerCase()))
                    );
                });
            }
        }

        // 2. Filter by Search Query
        if (!categorySlug && searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            results = results.filter(p =>
                p.title.toLowerCase().includes(lowerQuery) ||
                p.tags.some(t => t.toLowerCase().includes(lowerQuery))
            );
        }

        return results;
    }, [posts, categorySlug, searchQuery]);

    // Generate Category Cloud Counts
    const categories = useMemo(() => {
        const catMap = new Map<string, number>();
        const validPosts = posts.filter(post => isEssayContent(post));

        validPosts.forEach(post => {
            if (post.categories) {
                post.categories.forEach(cat => {
                    catMap.set(cat, (catMap.get(cat) || 0) + 1);
                });
            }
        });

        return Array.from(catMap.entries()).map(([name, count]) => ({
            name,
            count
        }));
    }, [posts]);

    // Reusable Post List Renderer
    const renderPostList = () => (
        <div className="space-y-6">
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        onClick={() => onNavigate(`post/${post.slug}`)}
                        className="group flex flex-col p-6 bg-white border border-gray-100 hover:shadow-lg hover:border-accent/30 cursor-pointer transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Decorative hover line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                        <div className="flex items-center space-x-3 text-xs mb-3">
                            <span className="text-accent font-mono font-bold">{post.date}</span>
                            {post.categories?.slice(0, 1).map(c => (
                                <span key={c} className="bg-surface border border-gray-200 px-2 py-0.5 text-secondary font-bold">{c}</span>
                            ))}
                            <span className="text-gray-300">|</span>
                            <span className="text-secondary flex items-center">
                                <Clock size={12} className="mr-1" />
                                {post.readTime}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors font-serif mb-3">
                            {post.title}
                        </h3>

                        <p className="text-secondary text-sm leading-relaxed line-clamp-2">
                            {post.excerpt}
                        </p>

                        <div className="mt-4 flex items-center text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                            阅读全文 <ChevronRight size={14} />
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-20 border border-dashed border-gray-200 bg-surface">
                    <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-secondary font-medium">没有找到相关文章。</p>
                    {searchQuery && !categorySlug && (
                        <p className="text-sm text-gray-400 mt-2">试试更换搜索关键词？</p>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            <SEO
                title={categorySlug ? getCategoryTitle(categorySlug) : "思考与文章"}
                description={categorySlug ? getCategoryDesc(categorySlug) : "商业、心智、身体与财富的复利笔记。"}
            />

            {/* Page Header */}
            <header className="mb-12 border-b border-gray-100 pb-8">
                <div className="flex items-center space-x-2 mb-4">
                    {categorySlug ? (
                        <span className="px-3 py-1 bg-accent text-white font-bold text-xs uppercase tracking-wider">
                            {categorySlug.toUpperCase()}
                        </span>
                    ) : (
                        <span className="px-3 py-1 bg-gray-100 text-secondary font-mono text-xs uppercase font-bold">
                            ESSAYS
                        </span>
                    )}
                </div>
                <h1 className="font-serif text-4xl font-bold text-primary mb-4">
                    {categorySlug ? getCategoryTitle(categorySlug) : "思考与文章"}
                </h1>
                {/* Fixed Max-Width here from max-w-2xl to max-w-4xl */}
                <p className="text-xl text-secondary max-w-4xl leading-relaxed">
                    {categorySlug ? getCategoryDesc(categorySlug) : "这里汇集了我所有的长文思考。在无序的世界里寻找秩序。"}
                </p>
            </header>

            {/* CONDITIONAL LAYOUT */}

            {categorySlug ? (
                /* --- Single Column Layout (For Categories) --- */
                /* Changed from max-w-4xl to max-w-5xl for wider content area */
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center mb-6">
                        <Folder className="text-accent mr-2" size={20} />
                        <h2 className="text-xl font-bold text-primary">
                            收录文章
                            <span className="text-secondary text-sm font-normal ml-2">({filteredPosts.length})</span>
                        </h2>
                    </div>
                    {renderPostList()}
                </div>
            ) : (
                /* --- Two Column Layout (For Main Index) --- */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Post List (8 Cols) */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center mb-6 justify-between">
                            <div className="flex items-center">
                                <Folder className="text-accent mr-2" size={20} />
                                <h2 className="text-xl font-bold text-primary">
                                    {searchQuery ? '搜索结果' : '文章列表'}
                                    <span className="text-secondary text-sm font-normal ml-2">({filteredPosts.length})</span>
                                </h2>
                            </div>
                        </div>
                        {renderPostList()}
                    </div>

                    {/* Right Column: Sidebar (4 Cols) */}
                    <aside className="lg:col-span-4 space-y-10">
                        {/* Component 1: Search */}
                        <div className="bg-white p-6 border border-gray-100 shadow-sm sticky top-24">
                            <h3 className="font-bold text-primary mb-4 flex items-center">
                                <Search size={18} className="mr-2 text-accent" />
                                搜索 (Search)
                            </h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="输入关键词..."
                                    className="w-full bg-surface border border-gray-200 pl-10 pr-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>

                        {/* Component 2: Categories */}
                        <div className="pl-2">
                            <h3 className="font-bold text-primary mb-6 flex items-center">
                                <Hash size={18} className="mr-2 text-accent" />
                                分类索引 (Topics)
                            </h3>

                            {categories.length === 0 ? (
                                <p className="text-xs text-secondary">Loading topics...</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat.name}
                                            className="group flex items-center justify-between w-full p-2 hover:bg-surface transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                                            onClick={() => setSearchQuery(cat.name)} // Quick filter by clicking category
                                        >
                                            <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                                                {cat.name}
                                            </span>
                                            <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-0.5 group-hover:bg-accent group-hover:text-white transition-colors">
                                                {cat.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Component 3: Quote */}
                        <div className="bg-primary text-white p-6 shadow-lg relative overflow-hidden hidden lg:block">
                            <div className="relative z-10">
                                <p className="font-serif italic text-sm text-gray-300 leading-relaxed">
                                    "Writing is the process of discovering what you believe."
                                </p>
                                <p className="text-accent text-xs font-bold mt-3 uppercase tracking-wider">— David Perell</p>
                            </div>
                            <div className="absolute -bottom-4 -right-4 text-white/5 transform rotate-12">
                                <BookOpen size={100} />
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default Essays;