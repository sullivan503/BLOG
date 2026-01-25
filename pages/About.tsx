import React from 'react';
import { Mail, Coffee, History } from 'lucide-react';
import { WeiboIcon, DouyinIcon, WechatIcon, BilibiliIcon, YoutubeIcon, GithubIcon, TwitterIcon } from '../components/CustomIcons';
import SEO from '../components/SEO';
import { SOCIAL_LINKS, PROFILE } from '../constants';
import NewsletterForm from '../components/NewsletterForm';

const About: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-20">
            <SEO title="About" description="My story, current focus, and changelog." />

            {/* Dynamic Content Section (About) */}
            <section>
                <div className="flex items-center mb-8 bg-gray-50/50 p-4 border-b border-gray-100">
                    <h1 className="font-serif text-4xl font-bold text-primary mr-4">
                        My Story
                    </h1>
                    <div className="h-px bg-gray-200 flex-grow"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Static Content - Translated to Chinese */}
                    <div className="prose prose-lg prose-slate text-secondary leading-relaxed animate-fade-in max-w-none">
                        <p>
                            嗨，我是 <strong>{PROFILE.name}</strong>（暂时还没疯）。
                        </p>
                        <p>
                            职业生涯的前半段，我一直在“破圈”：从一线销售到管理高层，从业务体系到销售赋能，再到亲手开发营销系统。我从一个整天与人打交道的销售，进化为痴迷技术的“跨界者”。然而，多年的商业实践教会了我一件事：<strong>仅靠单一的“赋能”或纯粹的“技术”，都无法彻底解决复杂的商业问题。</strong>
                        </p>
                        <p>
                            于是我开始了跨界的探索——从 IDE 到 CRM，从代码逻辑到业务流程。目前，作为一名 <strong>销售运营顾问 (Sales Ops Consultant)</strong>，我通过数字化转型帮助 B2B 企业提升销售效率，用工程思维解构复杂的商业挑战。
                        </p>
                        <p>
                            这个网站，“疯文斋”，是我的 <strong>数字花园</strong>。这里没有稍纵即逝的信息流，只有随时间沉淀的思考。我书写关于：
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-secondary">
                            <li><strong>商业与运营</strong>：B2B 销售方法论，营销与销售增长策略。</li>
                            <li><strong>心智与成长</strong>：关注心理、身体和关系的健康，在无序的世界中重建内在秩序。</li>
                            <li><strong>财富与投资</strong>：在纷繁复杂的经济波动中，寻找确定性的价值。</li>
                            <li><strong>技术与工具</strong>：极客精神与数字生活。无论是游戏数码，还是 VPS 部署与自动化流，探索技术带来的无限可能。</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Now Page (Static) */}
            <section className="bg-surface border border-gray-100 p-8 relative overflow-hidden group hover:border-accent/20 transition-colors max-w-4xl mx-auto rounded-lg">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Coffee size={120} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                        Now
                    </h2>
                    <p className="text-xs font-mono text-accent mb-6 uppercase tracking-widest border-b border-accent/20 inline-block pb-1 font-bold">
                        Current Focus
                    </p>

                    {/* Static Now Content - Translated to Chinese */}
                    <div className="text-secondary prose prose-sm prose-slate max-w-none">
                        <ul className="space-y-4 list-none pl-0">
                            <li className="flex items-start">
                                <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                                <span>
                                    <strong>深度工作 (<span className="text-red-500 font-bold">Local RAG</span>)：</strong> 基于 <code className="text-red-500 font-bold bg-gray-100 px-1 rounded">AnythingLLM</code> + <code className="text-red-500 font-bold bg-gray-100 px-1 rounded">Ollama</code> 架构，构建本地化私有知识库。将过往的销售赋能工具与方法论向量化，打造可交互的“第二大脑”。
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                                <span>
                                    <strong>写作 Agent (<span className="text-red-500 font-bold">Automation</span>)：</strong> 在家庭 NAS 上部署 <code className="text-red-500 font-bold bg-gray-100 px-1 rounded">n8n</code> 自动化流。编排专属 AI Agent 矩阵，接管从素材采集、灵感发散到大纲生成的创作全链路。
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                                <span>
                                    <strong>输入 (<span className="text-red-500 font-bold">Input</span>)：</strong> 探索创造力的元逻辑。研读《最小阻力之路》、《创造》(Tony Fadell)、《像艺术家一样思考》与《Snow Leopard》，寻找艺术与工程的交汇点。
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                                <span>
                                    <strong>身心维护 (<span className="text-red-500 font-bold">Bio-hacking</span>)：</strong> 执行代谢管理饮食，修习张至顺道长的“八部金刚功”与“长寿功”，在数字洪流中通过传统智慧锚定身心秩序。
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Newsletter Section (Synced with Home style) */}
            <section className="bg-accent text-white p-8 md:p-12 mb-20">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="md:w-1/2 text-left">
                        <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">Join the Inner Circle</h3>
                        <p className="font-serif text-white/90 leading-relaxed text-sm md:text-base">
                            Weekly insights on Business Compound Interest, Mental Models, and Tech Philosophy. No noise, just signal.
                        </p>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <NewsletterForm simpleMode />
                    </div>
                </div>
            </section>

            {/* Changelog Section (Static) */}
            <section className="max-w-4xl mx-auto w-full">
                <div className="flex items-center mb-6">
                    <History className="text-accent mr-2" size={20} />
                    <h2 className="font-serif text-2xl font-bold text-primary">Changelog</h2>
                </div>

                <div className="border-l-2 border-gray-100 ml-3 space-y-8 pl-8 py-2">
                    {/* v2.1: 智慧与心流 */}
                    <div className="relative">
                        <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-accent border-4 border-white shadow-sm"></div>
                        <div>
                            <span className="font-mono text-xs text-accent font-bold mb-1 block">2026.01 - Present</span>
                            <h3 className="font-bold text-primary text-lg mb-2">v2.1: 智慧与心流 (Intelligence & Flow)</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                全站完成首页设计、核心功能及内容板块的重构，并接入 <strong className="text-red-500">Cloudflare</strong> 与 <strong className="text-red-500">Google Analytics</strong>。
                                <br />
                                引入 <strong className="text-red-500">TTS 语音朗读</strong> 与 <strong className="text-red-500">Smart Back (智能返回)</strong> 上下文导航，实现了“严格内容分区”。 标志着以“速度”与“现代化体验”为核心的全新架构正式上线。
                            </p>
                        </div>
                    </div>

                    {/* v2.0: 重构与新生 */}
                    <div className="relative">
                        <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-gray-200 border-4 border-white"></div>
                        <div>
                            <span className="font-mono text-xs text-secondary font-bold mb-1 block">2025.12</span>
                            <h3 className="font-bold text-primary text-lg mb-2">v2.0: 重构与新生 (Rebirth)</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                作为强迫症，为追求极致的个人风格、美感和加载速度，将架构从 WordPress 主题迁移至 <strong className="text-red-500">React SPA + Headless WP</strong>。
                                <br />
                                引入 <strong className="text-red-500">Gemini 3.0 Pro</strong> 模型用于 AI 摘要与评论辅助。 在 <strong className="text-red-500">Antigravity</strong> 中重设计 UI，强调“信息密度”与“留白”的平衡。
                            </p>
                        </div>
                    </div>

                    {/* v1.0: 初次上线 */}
                    <div className="relative">
                        <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-gray-200 border-4 border-white"></div>
                        <div>
                            <span className="font-mono text-xs text-gray-400 font-bold mb-1 block">2025.09</span>
                            <h3 className="font-bold text-primary text-lg mb-2">v1.0: 初次上线 (First Live)</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                在 <strong className="text-red-500">Manus</strong> 与 <strong className="text-red-500">Google AI Studio</strong> 中尝试开发前端网站，并第一次购入 VPS 与域名。
                                <br />
                                在AI辅助下，全手动部署 WordPress 并上线。之后意识到传统Wordpress主题无法满足定制化需求，成为寻求技术变革的动因。
                            </p>
                        </div>
                    </div>

                    {/* v0.5: 构思 */}
                    <div className="relative">
                        <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-gray-200 border-4 border-white"></div>
                        <div>
                            <span className="font-mono text-xs text-gray-400 font-bold mb-1 block">2025.05</span>
                            <h3 className="font-bold text-primary text-lg mb-2">v0.5: 构思启念 (Inception)</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                重启写作计划，将“搭建个人网站”列为目标。 确信并实验AI 工具创建前端界面雏形，大幅降低独立开发门槛，项目正式立项。
                            </p>
                        </div>
                    </div>

                    {/* v0.1: 种子 */}
                    <div className="relative">
                        <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-gray-200 border-4 border-white"></div>
                        <div>
                            <span className="font-mono text-xs text-gray-400 font-bold mb-1 block">2025.03</span>
                            <h3 className="font-bold text-primary text-lg mb-2">v0.1: 种子萌芽 (The Seed)</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                在家庭 NAS (群晖 DS920+) 上完成第一次 WordPress 搭建实验。 发表于本地的《Hello, World!》是这一切的起点。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section (Redesigned Compact) */}
            <section className="pt-10 border-t border-gray-100">
                <h2 className="font-serif text-2xl font-bold mb-6 text-primary">Connect</h2>

                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Unified Social Row */}
                    <div className="flex flex-col md:flex-row items-center justify-center p-6 bg-surface border border-gray-100 rounded-lg gap-8 md:gap-12">

                        {/* LEFT: WeChat Official Account */}
                        <div className="flex items-center space-x-4">
                            <div className="p-2.5 bg-white border border-gray-200 rounded-full text-primary">
                                <WechatIcon size={22} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-secondary font-bold uppercase tracking-wider mb-0.5">Official Account</span>
                                <span className="font-serif text-base font-bold text-primary">公众号：{SOCIAL_LINKS.wechatOA}</span>
                            </div>
                        </div>

                        {/* RIGHT: Social Icons Grid */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {/* Email */}
                            <a href={`mailto:${SOCIAL_LINKS.email}`} className="p-2.5 bg-white border border-gray-200 rounded-full text-secondary hover:text-accent hover:border-accent/30 hover:shadow-md transition-all group" title="Email">
                                <Mail size={20} />
                            </a>

                            {/* GitHub */}
                            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="p-2.5 bg-white border border-gray-200 rounded-full text-secondary hover:text-accent hover:border-accent/30 hover:shadow-md transition-all group" title="GitHub">
                                <GithubIcon size={20} />
                            </a>

                            {/* Twitter (X) */}
                            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="p-2.5 bg-white border border-gray-200 rounded-full text-secondary hover:text-accent hover:border-accent/30 hover:shadow-md transition-all group" title="Twitter / X">
                                <TwitterIcon size={20} />
                            </a>

                            {/* Weibo */}
                            <a href={SOCIAL_LINKS.weiboUrl} target="_blank" rel="noreferrer" className="p-2.5 bg-white border border-gray-200 rounded-full text-secondary hover:text-accent hover:border-accent/30 hover:shadow-md transition-all group" title="Weibo">
                                <WeiboIcon size={20} />
                            </a>

                            {/* Douyin (No Link) */}
                            <div className="p-2.5 bg-white border border-gray-200 rounded-full text-secondary hover:text-accent hover:border-accent/30 hover:shadow-md transition-all group cursor-default" title="Douyin">
                                <DouyinIcon size={20} />
                            </div>

                            {/* Bilibili (No Link) */}
                            <div className="p-2.5 bg-white border border-gray-200 rounded-full text-secondary hover:text-accent hover:border-accent/30 hover:shadow-md transition-all group cursor-default" title="Bilibili">
                                <BilibiliIcon size={20} />
                            </div>

                            {/* YouTube (No Link) */}
                            <div className="p-2.5 bg-white border border-gray-200 rounded-full text-secondary hover:text-accent hover:border-accent/30 hover:shadow-md transition-all group cursor-default" title="YouTube">
                                <YoutubeIcon size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;