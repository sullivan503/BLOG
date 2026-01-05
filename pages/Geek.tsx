import React, { useState, useMemo, useEffect } from 'react';
import { Cpu, Gamepad2, Server, Database, Code, Terminal, Tv, Mic, Monitor, Layout, HardDrive, Smartphone, Zap } from 'lucide-react';
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
  <div className="w-full bg-white rounded-xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative">
    <div className="absolute top-0 right-0 p-4 opacity-5">
      <Code size={120} />
    </div>
    
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
      
      {/* 1. The Backend (Source) */}
      <div className="flex-1 w-full md:w-auto bg-surface border border-gray-200 rounded-lg p-6 relative group">
        <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-mono font-bold text-secondary border border-gray-200 rounded">
          BACKEND
        </div>
        <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#21759b]/10 text-[#21759b] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Database size={32} />
            </div>
            <h3 className="font-bold text-primary mb-1">WordPress Core</h3>
            <p className="text-xs text-secondary font-mono">MySql + PHP</p>
            <div className="mt-4 w-full bg-white border border-dashed border-gray-300 rounded p-2 text-[10px] text-left font-mono text-gray-500 overflow-hidden">
               wp_posts table<br/>
               wp_options<br/>
               ...
            </div>
        </div>
        {/* Connector Dot */}
        <div className="hidden md:block absolute top-1/2 -right-1.5 w-3 h-3 bg-gray-300 rounded-full translate-x-1/2 border-2 border-white z-20"></div>
      </div>

      {/* 2. The Bridge (API) */}
      <div className="flex-1 w-full md:w-auto flex flex-col items-center justify-center relative">
          {/* Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
          <div className="md:hidden absolute left-1/2 top-0 w-0.5 h-full bg-gray-200 -z-10"></div>
          
          <div className="bg-white border border-accent/20 px-4 py-2 rounded-full shadow-sm flex items-center space-x-2 z-10 animate-fade-in">
             <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
             <span className="font-mono text-xs font-bold text-accent">REST API (JSON)</span>
          </div>

          <div className="mt-4 md:mt-2 text-[10px] font-mono text-gray-400 bg-surface px-2 py-1 rounded">
             GET /wp-json/wp/v2/posts
          </div>
      </div>

      {/* 3. The Frontend (Destination) */}
      <div className="flex-1 w-full md:w-auto bg-primary text-white rounded-lg p-6 relative group shadow-xl">
        <div className="absolute -top-3 right-4 bg-accent px-2 text-xs font-mono font-bold text-white rounded shadow-sm">
          HEAD (CLIENT)
        </div>
        <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center mb-4 group-hover:rotate-180 transition-transform duration-700">
               <Layout size={32} />
            </div>
            <h3 className="font-bold text-white mb-1">React / Vite</h3>
            <p className="text-xs text-gray-400 font-mono">SPA Rendering</p>
            
            {/* Visualizing Components */}
            <div className="mt-4 flex gap-2 w-full justify-center">
                <div className="w-8 h-10 bg-white/20 rounded-sm border border-white/10"></div>
                <div className="w-8 h-10 bg-white/20 rounded-sm border border-white/10"></div>
                <div className="w-8 h-10 bg-accent rounded-sm shadow-lg border border-white/20 transform -translate-y-2"></div>
            </div>
        </div>
        {/* Connector Dot */}
        <div className="hidden md:block absolute top-1/2 -left-1.5 w-3 h-3 bg-accent rounded-full -translate-x-1/2 border-2 border-primary z-20"></div>
      </div>

    </div>

    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-xs text-secondary">
        <div className="font-mono">
            <span className="text-accent font-bold">Latency:</span> ~120ms
        </div>
        <div className="font-mono flex items-center">
            <Server size={12} className="mr-1" />
            Running on Nginx / Debian
        </div>
    </div>
  </div>
);


const Geek: React.FC<GeekProps> = ({ posts, isLoading, onNavigate, initialTab }) => {
  const [activeTab, setActiveTab] = useState<'tech' | 'games'>('tech');

  // Sync with initialTab prop when it changes or on mount
  useEffect(() => {
    if (initialTab === 'games') {
        setActiveTab('games');
    } else {
        setActiveTab('tech');
    }
  }, [initialTab]);

  // Handle Tab Click - Update URL for persistence
  const handleTabChange = (tab: 'tech' | 'games') => {
      setActiveTab(tab);
      if (tab === 'games') onNavigate('geek/games');
      else onNavigate('geek');
  };

  // Filter posts based on props
  const { gamePosts } = useMemo(() => {
    const games = posts.filter(p => 
        (p.categories && p.categories.some(c => c.toLowerCase() === 'games' || c === '游戏'))
    );
    return { gamePosts: games };
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
          <br/>
          展示我的技术架构、生产力装备与数字游乐场。
        </p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-surface border border-gray-200 rounded-full p-1">
          {[
            { id: 'tech', label: '技术与装备 (Tech & Gear)', icon: <Cpu size={16} /> },
            { id: 'games', label: '游戏收藏 (Games)', icon: <Gamepad2 size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`flex items-center px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === tab.id
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