import React, { useState, useMemo, useEffect } from 'react';
import { Cpu, Gamepad2, Server, Database, Code, Terminal, Tv, Mic, Monitor, Layout, HardDrive, Smartphone, Zap, Globe, Shield, GitBranch, Workflow, Cloud } from 'lucide-react';
import SEO from '../components/SEO';
import { BlogPost } from '../types';
import GalleryCard from '../components/GalleryCard';

interface GeekProps {
    posts: BlogPost[];
    isLoading: boolean;
    onNavigate: (path: string) => void;
    initialTab?: string;
}

// --- Custom SVG Architecture Component ---
const HeadlessArchDiagram = () => (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all overflow-hidden relative group">
        {/* Background Grid & Noise */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute top-0 right-0 p-4 opacity-[0.05] text-primary">
            <Code size={180} />
        </div>

        {/* Header Status Bar */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 text-xs font-mono text-gray-500 relative z-10">
            <div className="flex items-center space-x-4">
                <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <span>SYSTEM_STATUS: <span className="text-green-600 font-bold">ONLINE</span></span>
            </div>
            <div className="flex items-center space-x-4 hidden sm:flex">
                <span className="flex items-center"><Server size={10} className="mr-1" /> NGINX/DEBIAN</span>
                <span className="flex items-center"><Zap size={10} className="mr-1" /> LATENCY: ~120ms</span>
            </div>
        </div>

        {/* Main Flow Diagram */}
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-4">

            {/* 1. CI/CD Pipeline (Source) */}
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors relative group/ci">
                <div className="absolute -top-3 left-4 bg-blue-50 text-blue-600 px-2 py-0.5 text-[10px] font-mono font-bold border border-blue-100 rounded uppercase tracking-wider">
                    CI/CD Pipeline
                </div>
                <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600"><GitBranch size={24} /></div>
                        <Workflow size={16} className="text-gray-400 group-hover/ci:text-blue-500 transition-colors" />
                    </div>
                    <div>
                        <h3 className="text-primary font-bold text-sm mb-1">GitHub Actions</h3>
                        <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
                            git push origin main<br />
                            npm run build<br />
                            rsync deploy
                        </p>
                    </div>
                </div>
                {/* Arrow to Next */}
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-200 to-transparent z-0"></div>
            </div>

            {/* 2. Backend Core */}
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors relative group/be">
                <div className="absolute -top-3 left-4 bg-indigo-50 text-indigo-600 px-2 py-0.5 text-[10px] font-mono font-bold border border-indigo-100 rounded uppercase tracking-wider">
                    Data Core
                </div>
                <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-indigo-100/50 rounded-lg text-indigo-600"><Database size={24} /></div>
                        <div className="bg-indigo-50 px-1.5 py-0.5 rounded text-[10px] text-indigo-500 font-mono border border-indigo-100">WP-JSON</div>
                    </div>
                    <div>
                        <h3 className="text-primary font-bold text-sm mb-1">WordPress Headless</h3>
                        <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
                            REST API Endpoint<br />
                            Content Management<br />
                            MySQL Database
                        </p>
                    </div>
                </div>
                {/* Connection Line */}
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-indigo-200 to-transparent z-0"></div>
            </div>

            {/* 3. The Edge (Cloudflare) - Wraps Frontend */}
            <div className="flex-[1.5] relative p-[1px] rounded-lg bg-gradient-to-r from-orange-200 to-transparent">
                <div className="absolute -top-3 right-4 z-20 flex items-center bg-white text-orange-600 border border-orange-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    <Shield size={10} className="mr-1" /> Cloudflare Secured
                </div>

                <div className="h-full bg-white rounded-lg p-5 border border-gray-100 relative overflow-hidden group/fe shadow-sm">
                    {/* Background Glint */}
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-orange-50/50 blur-[50px] rounded-full group-hover/fe:bg-orange-100/50 transition-all"></div>

                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Globe size={24} /></div>
                            <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping"></div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-primary font-bold text-sm mb-1 flex items-center">
                                React Frontend
                                <span className="ml-2 text-[10px] bg-gray-100 px-1.5 rounded text-gray-500 font-normal">Vite Bundled</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                    <div className="text-[9px] text-gray-400 uppercase font-mono">Assets</div>
                                    <div className="text-xs text-green-600 font-mono flex items-center"><Zap size={10} className="mr-1" /> Cached</div>
                                </div>
                                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                    <div className="text-[9px] text-gray-400 uppercase font-mono">Dynamic</div>
                                    <div className="text-xs text-blue-600 font-mono flex items-center"><ActivityDot /> Live</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Footer Code Stream */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center overflow-hidden">
            <div className="font-mono text-[9px] text-gray-400 whitespace-nowrap overflow-hidden w-full flex">
                <span className="animate-marquee inline-block">
                    GET /wp-json/wp/v2/posts 200 OK • POST /admin-ajax.php 200 OK • HIT fengwz.me/assets/index.js (CF-CACHE) • GET /sitemap.xml 200 OK •
                </span>
            </div>
        </div>
    </div>
);
// Helper for the diagram
const ActivityDot = () => (
    <span className="relative flex h-2 w-2 mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
    </span>
);


const Geek: React.FC<GeekProps> = ({ posts, isLoading, onNavigate, initialTab }) => {
    const [activeTab, setActiveTab] = useState<'tech' | 'games' | 'engineering'>('tech');

    // Sync with initialTab prop when it changes or on mount
    useEffect(() => {
        if (initialTab === 'games') {
            setActiveTab('games');
        } else {
            setActiveTab('tech');
        }
    }, [initialTab]);

    // Handle Tab Click - Update URL for persistence
    const handleTabChange = (tab: 'tech' | 'games' | 'engineering') => {
        setActiveTab(tab);
        if (tab === 'games') onNavigate('geek/games');
        else onNavigate('geek');
    };

    // Filter posts based on props
    const { gamePosts, techPosts } = useMemo(() => {
        const games = posts.filter(p =>
            (p.categories && p.categories.some(c => c.toLowerCase() === 'games' || c === '游戏'))
        );
        const techs = posts.filter(p =>
            (p.categories && p.categories.some(c => c.toLowerCase() === 'tech' || c.toLowerCase() === 'engineering' || c === '技术'))
        );
        return { gamePosts: games, techPosts: techs };
    }, [posts]);


    // Helper to render a group of games
    const renderGameGroup = (title: string, items: BlogPost[]) => {
        if (items.length === 0) return null;
        return (
            <div className="mb-12 animate-fade-in">
                <div className="flex items-center mb-4 border-b border-gray-100 pb-2">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded mr-2 ${title.includes('神作') ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                        {items.length}
                    </span>
                    <h3 className="font-bold text-primary text-lg flex items-center">
                        {title}
                    </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {items.map(item => (
                        <GalleryCard
                            key={item.id}
                            item={item}
                            type="game"
                            onClick={() => onNavigate(`post/${item.slug}`)}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <SEO title="数字生活" description="技术架构、极客装备与游戏收藏。" />

            <header className="text-center mb-12">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">数字生活</h1>
                <p className="text-secondary max-w-xl mx-auto">
                    <span className="font-mono text-accent font-bold">&lt;Tech_Stack /&gt;</span> &
                    <span className="font-mono text-accent font-bold"> Life_Style</span>
                    <br />
                    展示我的技术架构、生产力装备与数字游乐场。
                </p>
            </header>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex bg-surface border border-gray-200 rounded-full p-1">
                    {[
                        { id: 'tech', label: '技术与装备 (Gear)', icon: <Cpu size={16} /> },
                        { id: 'engineering', label: '技术写作 (Engineering)', icon: <Terminal size={16} /> },
                        { id: 'games', label: '游戏收藏 (Games)', icon: <Gamepad2 size={16} /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id as any)}
                            className={`flex items-center px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-lg'
                                : 'text-secondary hover:text-primary'
                                }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="animate-fade-in min-h-[400px]">
                {isLoading && activeTab !== 'tech' && (
                    <div className="text-center py-20 text-secondary animate-pulse">
                        Loading data...
                    </div>
                )}

                {/* TECH TAB */}
                {activeTab === 'tech' && (
                    <div className="space-y-16">

                        {/* 1. Architecture Diagram (Visual Component) */}
                        <section>
                            <div className="flex items-center mb-6">
                                <Terminal className="text-accent mr-3" size={24} />
                                <h2 className="text-2xl font-bold text-primary font-serif">本站技术架构 (This Site's Stack)</h2>
                            </div>
                            {/* Replaced Static Grid with Custom SVG Component */}
                            <HeadlessArchDiagram />
                        </section>

                        {/* 2. Hardware / Battle Station */}
                        <section>
                            <div className="flex items-center mb-6">
                                <Cpu className="text-accent mr-3" size={24} />
                                <h2 className="text-2xl font-bold text-primary font-serif">桌面与生活 (Battle Station & Life)</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Workstation */}
                                <div className="bg-surface p-6 rounded-xl border border-gray-100 hover:border-accent/20 transition-colors">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Desk Setup</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <Cpu className="mr-3 mt-1 text-primary" size={18} />
                                            <div>
                                                <div className="font-bold text-primary">Mac Mini M4</div>
                                                <div className="text-xs text-secondary">主力计算单元</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <Monitor className="mr-3 mt-1 text-primary" size={18} />
                                            <div>
                                                <div className="font-bold text-primary">LG 40WP95C</div>
                                                <div className="text-xs text-secondary">5K2K Nano IPS Ultrawide</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Mobile & Audio */}
                                <div className="bg-surface p-6 rounded-xl border border-gray-100 hover:border-accent/20 transition-colors">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Mobile & Creator</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <Smartphone className="mr-3 mt-1 text-primary" size={18} />
                                            <div>
                                                <div className="font-bold text-primary">MacBook Air</div>
                                                <div className="text-xs text-secondary">移动办公 / 咖啡厅战神</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <Mic className="mr-3 mt-1 text-primary" size={18} />
                                            <div>
                                                <div className="font-bold text-primary">Rode Wireless Pro</div>
                                                <div className="text-xs text-secondary">32-bit Float 录音</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <Zap className="mr-3 mt-1 text-primary" size={18} />
                                            <div>
                                                <div className="font-bold text-primary">iPad Mini</div>
                                                <div className="text-xs text-secondary">阅读 / 笔记</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Home Hub */}
                                <div className="bg-surface p-6 rounded-xl border border-gray-100 hover:border-accent/20 transition-colors">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Home Hub</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <HardDrive className="mr-3 mt-1 text-primary" size={18} />
                                            <div>
                                                <div className="font-bold text-primary">Synology NAS</div>
                                                <div className="text-xs text-secondary">数据中心 / Docker</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <Tv className="mr-3 mt-1 text-primary" size={18} />
                                            <div>
                                                <div className="font-bold text-primary">Apple TV 7</div>
                                                <div className="text-xs text-secondary">家庭娱乐中枢</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Play */}
                                <div className="bg-surface p-6 rounded-xl border border-gray-100 hover:border-accent/20 transition-colors">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Gaming</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center justify-between">
                                            <span className="font-bold text-primary text-sm">Xbox Series X</span>
                                            <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-mono">XGP</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="font-bold text-primary text-sm">PlayStation 5</span>
                                            <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">Pro</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="font-bold text-primary text-sm">Switch OLED</span>
                                            <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-mono">Portable</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 3. Software Stack */}
                        <section>
                            <div className="flex items-center mb-6">
                                <Code className="text-accent mr-3" size={24} />
                                <h2 className="text-2xl font-bold text-primary font-serif">软件与工具 (Software Stack)</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Knowledge */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:border-accent/30 transition-colors">
                                    <div className="font-bold text-primary mb-4 text-lg">Knowledge & Second Brain</div>
                                    <ul className="space-y-3 text-sm text-secondary">
                                        <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                                            <span className="font-bold text-primary">Obsidian</span>
                                            <span className="text-xs text-gray-400">本地化知识库</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                                            <span className="font-bold text-primary">Flomo (浮墨)</span>
                                            <span className="text-xs text-gray-400">碎片灵感捕捉</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                                            <span className="font-bold text-primary">Notion</span>
                                            <span className="text-xs text-gray-400">项目与协作</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Media & Creative */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:border-accent/30 transition-colors">
                                    <div className="font-bold text-primary mb-4 text-lg">Creative & Media</div>
                                    <ul className="space-y-3 text-sm text-secondary">
                                        <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                                            <span className="font-bold text-primary">Gemini AI</span>
                                            <span className="text-xs text-accent font-bold">My Co-pilot (Me!)</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                                            <span className="font-bold text-primary">VS Code</span>
                                            <span className="text-xs text-gray-400">Writing & Coding</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                                            <span className="font-bold text-primary">Infuse</span>
                                            <span className="text-xs text-gray-400">家庭影院播放</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                    </div>
                )}

                {/* ENGINEERING TAB (New) */}
                {activeTab === 'engineering' && (
                    <div className="space-y-8">
                        <div className="flex items-center mb-6">
                            <Terminal className="text-accent mr-3" size={24} />
                            <h2 className="text-2xl font-bold text-primary font-serif">技术笔记 (Engineering Notes)</h2>
                        </div>
                        {techPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {techPosts.map(post => (
                                    <div key={post.id} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all cursor-pointer group" onClick={() => onNavigate(`post/${post.slug}`)}>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-mono text-accent bg-accent/5 px-2 py-1 rounded">TECH</span>
                                            <span className="text-xs text-gray-400">{post.date}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
                                        <p className="text-sm text-secondary line-clamp-2 mb-4">{post.excerpt}</p>
                                        <div className="flex space-x-2">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded border border-gray-100">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
                                <Code size={48} className="mx-auto text-gray-200 mb-4" />
                                <p className="text-secondary">暂无技术文章。</p>
                                <p className="text-xs text-gray-400 mt-2">提示：在 WordPress 添加 category 为 <code>tech</code> 或 <code>engineering</code> 的文章。</p>
                            </div>
                        )}
                    </div>
                )}

                {/* GAMES TAB (Grouped Gallery) */}
                {!isLoading && activeTab === 'games' && (
                    <div>
                        {gamePosts.length > 0 ? (
                            <>
                                {/* High Rating */}
                                {renderGameGroup("⭐⭐⭐⭐⭐ 灵感神作 (Masterpiece)", gamePosts.filter(g => (g.rating || 0) >= 4.5))}

                                {/* Good */}
                                {renderGameGroup("⭐⭐⭐⭐ 值得体验 (Great)", gamePosts.filter(g => (g.rating || 0) >= 3.5 && (g.rating || 0) < 4.5))}

                                {/* Others */}
                                {renderGameGroup("⭐⭐⭐ 休闲娱乐 (Others)", gamePosts.filter(g => (g.rating || 0) < 3.5))}
                            </>
                        ) : (
                            <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl">
                                <Gamepad2 size={48} className="mx-auto text-gray-200 mb-4" />
                                <p className="text-secondary">暂无游戏记录。</p>
                                <p className="text-xs text-gray-400 mt-2">提示：记录玩过的游戏，作为交互设计的灵感库。</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Geek;