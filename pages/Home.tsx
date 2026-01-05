import React, { useMemo } from 'react';
import { BlogPost } from '../types';
import PostCard from '../components/PostCard';
import { BLOG_DESCRIPTION, HERO_SECTION, PROFILE } from '../constants';
import { Sparkles, ArrowRight, ArrowUpRight, MapPin, Briefcase, Terminal, Book, MonitorPlay } from 'lucide-react';
import SEO from '../components/SEO';
import NewsletterForm from '../components/NewsletterForm';

interface HomeProps {
    posts: BlogPost[];
    onNavigate: (page: string) => void;
    isLoading: boolean;
    isUsingWP: boolean;
}

// Internal Component for Typewriter Effect
const TypewriterExample = () => {
    const [text, setText] = React.useState('');
    const fullText = `${HERO_SECTION.titleLine1}\n${HERO_SECTION.titleLine2} ${HERO_SECTION.titleAccent}`;
    const [isTyping, setIsTyping] = React.useState(true);

    React.useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
            }
        }, 50); // Speed: 50ms per character

        return () => clearInterval(typingInterval);
    }, [fullText]);

    return (
        <span className="whitespace-pre-line block">
            {text.split(HERO_SECTION.titleAccent)[0]}
            <span className="text-accent italic">
                {text.includes(HERO_SECTION.titleAccent) ? HERO_SECTION.titleAccent : text.split(HERO_SECTION.titleLine2 + ' ')[1] || ''}
            </span>
            <span className={`inline-block w-1 h-8 md:h-10 ml-1 bg-accent align-middle ${isTyping ? 'animate-pulse' : 'opacity-0'}`}></span>
        </span>
    );
};

const Home: React.FC<HomeProps> = ({ posts, onNavigate, isLoading }) => {

    // Filter logic: Exclude specialized content from the main stream
    const isExcludedFromHomeStream = (post: BlogPost) => {
        if (!post.categories || post.categories.length === 0) return false;
        const excludedKeywords = [
            'books', 'reading', '书架', '书籍',
            'games', 'gaming', '游戏',
            'media', 'movies', 'films', '影音'
        ];
        return post.categories.some(category =>
            excludedKeywords.some(keyword => category.toLowerCase().includes(keyword))
        );
    };

    const homeStreamPosts = useMemo(() => {
        return posts.filter(p => !isExcludedFromHomeStream(p));
    }, [posts]);

    return (
        <div className="space-y-16">
            <SEO title="首页" description={BLOG_DESCRIPTION} />

            {/* --- SECTION 1: IDENTITY (HERO) --- */}
            {/* 仅保留个人信息与宣言，更加聚焦 */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">

                {/* BLOCK 1: Profile Card (4 cols) */}
                <div className="md:col-span-4 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-full bg-gray-200 mb-6 overflow-hidden border-2 border-white shadow-md">
                            <img src={PROFILE.avatar} alt={PROFILE.name} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="font-serif text-3xl font-bold text-primary mb-2">{PROFILE.name}</h2>
                        <p className="text-secondary font-medium mb-6 whitespace-pre-line">
                            {PROFILE.title}
                        </p>
                        <div className="flex items-center text-xs text-gray-400 font-mono space-x-4">
                            <div className="flex items-center">
                                <MapPin size={12} className="mr-1" /> {PROFILE.location}
                            </div>
                            <div className="flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                                {PROFILE.status}
                            </div>
                        </div>
                    </div>
                    {/* Abstract BG */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-50 rounded-full z-0 group-hover:scale-150 transition-transform duration-700"></div>
                </div>

                {/* BLOCK 2: Manifesto / Main Value Prop (8 cols) */}
                <div className="md:col-span-8 bg-primary text-white rounded-3xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden shadow-lg group">
                    <div className="relative z-10">
                        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6 min-h-[120px] md:min-h-[144px]">
                            <TypewriterExample />
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed animate-fade-in-up delay-300">
                            {HERO_SECTION.description}
                        </p>
                    </div>
                    <Terminal className="absolute -right-6 -bottom-6 text-white/5 w-64 h-64 transform rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                </div>

            </section>

            {/* --- SECTION 2: LATEST THINKING (STREAM) --- */}
            {/* 减少为展示 3 篇 */}
            <section className="mb-24">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <span className="text-accent font-mono text-xs font-bold tracking-widest uppercase mb-2 block">The Stream</span>
                        <h2 className="font-serif text-3xl font-bold text-primary">Latest Thoughts</h2>
                    </div>
                    <button onClick={() => onNavigate('essays')} className="group text-sm font-bold text-secondary hover:text-accent flex items-center transition-colors">
                        View Archive <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => ( // Adjusted for 2-column layout, showing 6 placeholders
                            <div key={i} className="h-40 bg-surface rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {homeStreamPosts.length > 0 ? (
                            homeStreamPosts.slice(0, 3).map((post) => (
                                <PostCard key={post.id} post={post} onClick={(slug) => onNavigate(`post/${slug}`)} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 border border-dashed border-gray-200 rounded-2xl bg-surface">
                                <p className="text-secondary font-medium">花园正在开垦中...</p>
                                <p className="text-xs text-gray-400 mt-2">Connecting to WordPress API...</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Mobile View Archive Button */}
                <div className="mt-8 md:hidden">
                    <button onClick={() => onNavigate('essays')} className="w-full py-4 text-sm text-primary font-bold border border-gray-200 rounded-xl hover:border-accent hover:text-accent flex items-center justify-center transition-colors">
                        View All Archives
                    </button>
                </div>
            </section>

            {/* --- SECTION 3: NAVIGATION BLOCKS (Moved Down) --- */}
            {/* 商业咨询 & 数字书房 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Link: Consulting */}
                <div
                    onClick={() => onNavigate('projects')}
                    className="bg-surface rounded-3xl p-8 cursor-pointer hover:bg-gray-100 transition-colors group relative overflow-hidden border border-gray-100 flex flex-col justify-between min-h-[220px]"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-white p-4 rounded-2xl shadow-sm">
                            <Briefcase size={28} className="text-primary" />
                        </div>
                        <div className="flex items-center text-xs font-mono font-bold text-gray-400 group-hover:text-accent transition-colors uppercase tracking-wider">
                            Services <ArrowUpRight className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={14} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl text-primary mb-2">商业咨询</h3>
                        <p className="text-secondary leading-relaxed">
                            Sales Ops 体系搭建、CRM 实施与企业数字化转型解决方案。
                        </p>
                    </div>
                </div>

                {/* Link: Library */}
                <div
                    onClick={() => onNavigate('library')}
                    className="bg-surface rounded-3xl p-8 cursor-pointer hover:bg-gray-100 transition-colors group relative overflow-hidden border border-gray-100 flex flex-col justify-between min-h-[220px]"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-white p-4 rounded-2xl shadow-sm flex space-x-2">
                            <Book size={28} className="text-primary" />
                            <span className="w-px h-7 bg-gray-200"></span>
                            <MonitorPlay size={28} className="text-primary" />
                        </div>
                        <div className="flex items-center text-xs font-mono font-bold text-gray-400 group-hover:text-accent transition-colors uppercase tracking-wider">
                            Input <ArrowUpRight className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={14} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl text-primary mb-2">数字书房</h3>
                        <p className="text-secondary leading-relaxed">
                            阅读记录、影音收藏与知识库。展示我的信息输入系统。
                        </p>
                    </div>
                </div>

            </section>

            {/* --- SECTION 4: FUTURE PRODUCTS PLACEHOLDER --- */}
            {/* 
          将来您可以在这里添加电子书或付费课程模块。
          示例代码结构：
          <section className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12">
             <div className="flex items-center mb-6">
                <ShoppingBag className="text-accent mr-3" />
                <h2 className="text-2xl font-bold">精选资源 (Products)</h2>
             </div>
             ... grid of products ...
          </section> 
      */}

            {/* --- SECTION 5: NEWSLETTER --- */}
            <section className="animate-fade-in">
                <NewsletterForm />
            </section>

        </div>
    );
};

export default Home;