import React, { useEffect, useState } from 'react';
import { Mail, Coffee, Loader2, Twitter, MessageCircle, Globe, MapPin, History } from 'lucide-react';
import SEO from '../components/SEO';
import { fetchWordPressPage } from '../services/wpService';
import { BlogPost } from '../types';
import { SOCIAL_LINKS, PROFILE } from '../constants'; // Import constants
import NewsletterForm from '../components/NewsletterForm';

const About: React.FC = () => {
  const [aboutPageData, setAboutPageData] = useState<BlogPost | null>(null);
  const [nowPageData, setNowPageData] = useState<BlogPost | null>(null);
  const [changelogPageData, setChangelogPageData] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Attempt to fetch 'about', 'now', and 'changelog' pages from WordPress
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Fetch in parallel
      const [aboutData, nowData, changelogData] = await Promise.all([
        fetchWordPressPage('about'),
        fetchWordPressPage('now'),
        fetchWordPressPage('changelog')
      ]);

      if (aboutData) setAboutPageData(aboutData);
      if (nowData) setNowPageData(nowData);
      if (changelogData) setChangelogPageData(changelogData);
      
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Check valid content
  const hasValidAboutContent = aboutPageData && aboutPageData.content && aboutPageData.content.replace(/<[^>]*>?/gm, '').trim().length > 10;
  const hasValidNowContent = nowPageData && nowPageData.content && nowPageData.content.replace(/<[^>]*>?/gm, '').trim().length > 10;
  const hasValidChangelogContent = changelogPageData && changelogPageData.content && changelogPageData.content.replace(/<[^>]*>?/gm, '').trim().length > 10;
  
  const displayTitle = aboutPageData ? aboutPageData.title : "我的故事";

  return (
    <div className="max-w-3xl mx-auto space-y-20">
      <SEO title="关于我" description="我的故事、当下状态与联系方式。" />

      {/* Dynamic Content Section (About) */}
      <section>
        <div className="flex items-center mb-8">
            <h1 className="font-serif text-4xl font-bold text-primary mr-4">
              {displayTitle}
            </h1>
            <div className="h-px bg-gray-200 flex-grow"></div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center text-secondary py-10">
            <Loader2 className="animate-spin mr-2" size={20}/>
            正在读取关于页面...
          </div>
        ) : hasValidAboutContent ? (
           <div className="prose prose-lg prose-slate text-secondary leading-relaxed animate-fade-in [&_p]:!text-secondary [&_li]:!text-secondary [&_h1]:!text-primary [&_h2]:!text-primary [&_h3]:!text-primary [&_strong]:!text-primary [&_strong]:font-bold [&_a]:!text-accent">
              <div dangerouslySetInnerHTML={{ __html: aboutPageData!.content }} />
           </div>
        ) : (
           // Fallback Static Content
           <div className="prose prose-lg prose-slate text-secondary leading-relaxed animate-fade-in">
                <p>
                    你好，我是 <strong>{PROFILE.name}</strong>。
                </p>
                <p>
                    我曾是一名追求极致代码架构的全栈工程师，热衷于 React 生态与高性能 Web 应用的构建。但在多年的技术实践中，我逐渐意识到：<strong>单纯的技术无法解决所有商业问题</strong>。
                </p>
                <p>
                    于是，我开始了一场跨越边界的探索——从 IDE 转向 CRM，从代码逻辑转向商业流程。目前，我作为一名 <strong>Sales Ops 咨询顾问</strong>，致力于帮助 B2B 企业通过数字化手段提升销售效率，用工程师的思维去解构复杂的商业挑战。
                </p>
                <p>
                    这个网站“疯文斋”，是我的<strong>数字花园</strong>。这里没有稍纵即逝的信息流，只有经过时间沉淀的思考。我在这里记录关于：
                </p>
                <ul className="list-disc pl-5 space-y-2 text-secondary">
                    <li><strong>商业与运营</strong>：B2B 销售方法论、SaaS 增长策略。</li>
                    <li><strong>心智与成长</strong>：如何在无序的世界中建立内在秩序。</li>
                    <li><strong>技术与工具</strong>：VPS 部署、自动化工作流与前端技术。</li>
                </ul>
            </div>
        )}
      </section>

      {/* Now Page (Dynamic) */}
      <section className="bg-surface border border-gray-100 rounded-xl p-8 relative overflow-hidden group hover:border-accent/20 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Coffee size={120} />
        </div>
        <div className="relative z-10">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                当下 (Now)
            </h2>
            <p className="text-xs font-mono text-accent mb-6 uppercase tracking-widest border-b border-accent/20 inline-block pb-1 font-bold">
                Current Focus
            </p>
            
            {hasValidNowContent ? (
                // Dynamic Now Content
                <div className="text-secondary prose prose-sm prose-slate max-w-none [&_li]:!text-secondary [&_strong]:!text-primary [&_strong]:font-bold" dangerouslySetInnerHTML={{ __html: nowPageData!.content }} />
            ) : (
                // Fallback Static Now Content
                <div className="text-secondary prose prose-sm prose-slate max-w-none">
                    <ul className="space-y-4 list-none pl-0">
                        <li className="flex items-start">
                            <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                            <span><strong>Deep Work:</strong> 正在为某 SaaS 客户设计新一代的 Sales Playbook (销售作战手册)。</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                            <span><strong>Coding:</strong> 重构本站的 Next.js 架构，尝试引入 Gemini AI 进行自动摘要生成。</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                            <span><strong>Life:</strong> 练习网球，保持身体的“反脆弱”性。</span>
                        </li>
                        <li className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200/50">
                            (此内容为静态演示。请在 WordPress 创建页面 slug 为 "now" 以启用动态更新)
                        </li>
                    </ul>
                </div>
            )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section>
          <NewsletterForm />
      </section>

      {/* Changelog Section (Dynamic with Static Fallback) */}
      <section>
        <div className="flex items-center mb-6">
             <History className="text-accent mr-2" size={20} />
             <h2 className="font-serif text-2xl font-bold text-primary">建站日志</h2>
        </div>
        
        {hasValidChangelogContent ? (
            // Dynamic WP Content for Changelog
            <div className="prose prose-slate prose-lg text-secondary leading-relaxed border-l-2 border-gray-100 pl-6 [&_h3]:text-primary [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-none [&_ul]:pl-0 [&_li]:mb-4 [&_strong]:text-accent [&_strong]:font-mono [&_strong]:text-xs [&_strong]:block [&_strong]:mb-1">
                <div dangerouslySetInnerHTML={{ __html: changelogPageData!.content }} />
            </div>
        ) : (
             // Fallback Static Content (The nice timeline)
            <div className="border-l-2 border-gray-100 ml-3 space-y-8 pl-8 py-2">
                <div className="relative">
                    <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-sm"></div>
                    <div>
                        <span className="font-mono text-xs text-accent font-bold mb-1 block">2024.05 - Present</span>
                        <h3 className="font-bold text-primary text-lg mb-2">v2.0: 重构与新生</h3>
                        <p className="text-secondary text-sm leading-relaxed">
                            为了追求更极致的加载速度与交互体验，将站点架构从传统 WordPress 主题迁移至 <strong>React SPA + Headless WP</strong> 方案。
                            引入了 <strong>Gemini 1.5 Pro</strong> 模型用于文章自动摘要与评论辅助。重新设计了 UI，强调“信息密度”与“留白”的平衡。
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-gray-200 border-4 border-white"></div>
                    <div>
                        <span className="font-mono text-xs text-gray-400 font-bold mb-1 block">2023.12</span>
                        <h3 className="font-bold text-primary text-lg mb-2">v1.0: 种子萌芽</h3>
                        <p className="text-secondary text-sm leading-relaxed">
                            购买了第一台 VPS (RackNerd)，手动配置 Nginx 与 MySQL。
                            搭建了基于 PHP 的 WordPress 站点。确立了“商业、心智、技术”三大内容支柱。
                        </p>
                    </div>
                </div>
                
                <p className="text-xs text-gray-300 mt-8">
                    (提示: 在 WP 创建 slug 为 "changelog" 的页面可替换此内容)
                </p>
            </div>
        )}
      </section>

      {/* Contact Grid */}
      <section className="pt-10 border-t border-gray-100">
        <h2 className="font-serif text-2xl font-bold mb-4 text-primary">保持连接</h2>
        <p className="text-secondary mb-6">
            我在互联网的这些角落游荡。欢迎来信交流技术、商业或生活。
        </p>
        
        {/* 2-Column Grid for clean layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* --- Row 1: The WeChats --- */}

            {/* 1. WeChat Official Account */}
            <div className="flex flex-row items-center justify-between text-primary bg-surface px-6 py-6 rounded-xl border border-gray-100 shadow-sm hover:border-accent/30 transition-colors group cursor-default">
                 <div className="flex flex-col justify-center mr-4">
                     <div className="flex items-center mb-2">
                         <MessageCircle size={20} className="mr-2 text-secondary group-hover:text-accent" />
                         <span className="text-xs text-secondary uppercase tracking-wider font-bold">微信公众号</span>
                     </div>
                     <span className="font-serif text-lg font-bold">{SOCIAL_LINKS.wechatOA}</span>
                     <span className="text-xs text-secondary mt-1 opacity-70">定期推送深度思考</span>
                 </div>
                 {/* OA QR Code */}
                 <div className="bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm flex-shrink-0">
                    <img 
                        src={SOCIAL_LINKS.wechatOAImage} // Use constant
                        alt={`公众号: ${SOCIAL_LINKS.wechatOA}`}
                        className="w-20 h-20 object-contain rounded-sm" 
                    />
                 </div>
            </div>

            {/* 2. Personal WeChat */}
            <div className="flex flex-row items-center justify-between text-primary bg-surface px-6 py-6 rounded-xl border border-gray-100 shadow-sm hover:border-accent/30 transition-colors group cursor-default">
                 <div className="flex flex-col justify-center mr-4">
                     <div className="flex items-center mb-2">
                         <MessageCircle size={20} className="mr-2 text-secondary group-hover:text-accent" />
                         <span className="text-xs text-secondary uppercase tracking-wider font-bold">个人微信</span>
                     </div>
                     <span className="font-mono text-lg font-bold break-all">{SOCIAL_LINKS.wechatPersonal}</span>
                     <span className="text-xs text-secondary mt-1 opacity-70">请注明来意</span>
                 </div>
                 {/* Personal QR Code */}
                 <div className="bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm flex-shrink-0">
                    <img 
                        src={SOCIAL_LINKS.wechatPersonalImage} // Use constant
                        alt={`个人微信: ${SOCIAL_LINKS.wechatPersonal}`}
                        className="w-20 h-20 object-contain rounded-sm" 
                    />
                 </div>
            </div>

            {/* --- Row 2: Socials --- */}

            {/* 3. Weibo */}
             <div className="flex items-center text-primary bg-surface px-5 py-4 rounded-xl border border-gray-100 shadow-sm hover:border-accent/30 transition-colors group cursor-default">
                <Globe size={20} className="mr-3 text-secondary group-hover:text-accent" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-secondary uppercase tracking-wider font-bold">微博 (Weibo)</span>
                    <span className="font-serif text-sm font-medium">{PROFILE.name}</span>
                </div>
            </div>

             {/* 4. X / Twitter */}
             <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="flex items-center text-primary hover:text-accent transition-colors group bg-surface px-5 py-4 rounded-xl border border-gray-100 hover:border-accent/30 shadow-sm">
                <Twitter size={20} className="mr-3 text-secondary group-hover:text-accent" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-secondary uppercase tracking-wider font-bold">X (Twitter)</span>
                    <span className="font-mono text-sm font-medium">{SOCIAL_LINKS.twitterHandle}</span>
                </div>
            </a>

            {/* --- Row 3: Email & Location --- */}

            {/* 5. Email */}
             <a href={`mailto:${SOCIAL_LINKS.email}`} className="flex items-center text-primary hover:text-accent transition-colors group bg-surface px-5 py-4 rounded-xl border border-gray-100 hover:border-accent/30 shadow-sm">
                <Mail size={20} className="mr-3 text-secondary group-hover:text-accent" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-secondary uppercase tracking-wider font-bold">Email</span>
                    <span className="font-mono text-sm font-medium">{SOCIAL_LINKS.email}</span>
                </div>
            </a>

            {/* 6. Location */}
            <div className="flex items-center text-primary bg-surface px-5 py-4 rounded-xl border border-gray-100 shadow-sm hover:border-accent/30 transition-colors group cursor-default">
                <MapPin size={20} className="mr-3 text-secondary group-hover:text-accent" />
                <div className="flex flex-col">
                     <span className="text-[10px] text-secondary uppercase tracking-wider font-bold">Location</span>
                     <span className="font-serif text-sm font-medium">{PROFILE.location}</span>
                </div>
            </div>

        </div>
      </section>
    </div>
  );
};

export default About;