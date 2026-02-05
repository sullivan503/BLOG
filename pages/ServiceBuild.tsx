import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { ArrowRight, Cpu, Zap, Layers, GitMerge } from 'lucide-react';

interface ServicePageProps {
    onNavigate: (page: string) => void;
}

const ServiceBuild: React.FC<ServicePageProps> = ({ onNavigate }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans text-primary">
            <SEO
                title="The Build | AI RevOps Automation"
                description="Automate your sales workflows with AI Agents. From lead scoring to automated outreach."
            />

            {/* 1. HERO - Dark Theme for "The Build" to match its premium status */}
            <section className="bg-primary text-white pt-0 pb-20 px-6 border-b border-gray-800">
                <div className="max-w-4xl mx-auto pt-10">
                    <button
                        onClick={() => onNavigate('services')}
                        className="mb-8 text-accent font-mono font-bold text-sm border-b-2 border-red-900 hover:border-accent pb-0.5 transition-colors uppercase tracking-widest"
                    >
                        ← Back to Service Menu
                    </button>
                    <div className="inline-block bg-accent text-white px-3 py-1 text-xs font-bold font-mono uppercase tracking-widest mb-6 block w-fit">
                        Service_02: The Build
                    </div>
                    <h1 className="font-display font-bold text-[2.5rem] md:text-[3.8rem] leading-[1.1] mb-8">
                        Automate the Boring.<br />
                        <span className="text-gray-500">Close the Deal.</span>
                    </h1>
                    <p className="font-serif font-light text-[1.2rem] md:text-[1.35rem] text-gray-400 leading-relaxed max-w-2xl border-l-4 border-accent pl-6">
                        别让你的精英销售把时间浪费在填表格上。<br />
                        我们构建 AI Agent，让数据录入、线索清洗和外呼跟进自动发生。
                    </p>
                </div>
            </section>

            {/* 2. AUTOMATION SHOWCASE */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-mono text-xs font-bold text-accent uppercase tracking-widest mb-6">
                                // USE CASE: INBOUND LEAD
                            </h2>
                            <h3 className="font-display font-bold text-3xl mb-6">秒级响应，零人工介入。</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start">
                                    <div className="p-2 bg-accent/10 text-accent mr-4 mt-1"><Zap size={18} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg">1. 捕获 (Capture)</h4>
                                        <p className="text-secondary text-sm">Typeform/网站表单提交，Webhook 瞬间触发。</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="p-2 bg-accent/10 text-accent mr-4 mt-1"><Cpu size={18} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg">2. 丰富 (Enrich)</h4>
                                        <p className="text-secondary text-sm">AI 自动调用 Apollo/LinkedIn API，补全公司规模、融资轮次等信息。</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="p-2 bg-accent/10 text-accent mr-4 mt-1"><GitMerge size={18} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg">3. 路由 (Route)</h4>
                                        <p className="text-secondary text-sm">高分线索直接推送到 Slack 并艾特销售；低分线索进入 Nurture 序列。</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Visual Representation */}
                        <div className="bg-surface p-8 border border-gray-200 relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
                            <div className="font-mono text-xs text-secondary mb-4 space-y-2">
                                <div className="flex justify-between"><span>WEBHOOK_RECEIVED</span> <span className="text-green-600">200 OK</span></div>
                                <div className="flex justify-between"><span>ENRICH_DATA</span> <span className="text-blue-600">PROCESSING...</span></div>
                                <div className="border-l-2 border-gray-300 pl-4 py-2 my-2 text-xs text-gray-500 italic">
                                    "Lead identified: VP of Sales @ TechCorp. Scored: 85/100."
                                </div>
                                <div className="flex justify-between"><span>SLACK_NOTIFY</span> <span className="text-green-600">SENT</span></div>
                                <div className="flex justify-between"><span>CRM_UPDATE</span> <span className="text-green-600">SYNCED</span></div>
                            </div>
                            <div className="mt-8 text-center">
                                <span className="inline-block px-4 py-2 bg-white border border-gray-200 text-xs font-bold text-primary shadow-sm">
                                    Total Time: 0.8s
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. TECH STACK */}
            <section className="py-20 bg-surface px-6 border-y border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif font-bold text-2xl mb-12">我们使用的武器库 (The Arsenal)</h2>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70">
                        <span className="px-6 py-3 bg-white border border-gray-200 font-bold text-primary">n8n</span>
                        <span className="px-6 py-3 bg-white border border-gray-200 font-bold text-primary">Make</span>
                        <span className="px-6 py-3 bg-white border border-gray-200 font-bold text-primary">OpenAI</span>
                        <span className="px-6 py-3 bg-white border border-gray-200 font-bold text-primary">Clay</span>
                        <span className="px-6 py-3 bg-white border border-gray-200 font-bold text-primary">Supabase</span>
                    </div>
                </div>
            </section>

            {/* 4. PRICING & CTA */}
            <section className="py-24 text-center px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-primary">构建你的自动印钞机</h2>
                    <p className="text-secondary mb-12 text-lg">
                        项目制交付，按结果付费。不只是一套代码，而是一套资产。
                    </p>
                    <a
                        href="https://calendly.com/fengwz/build"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold text-white bg-accent hover:bg-accentHover transition-all duration-300 uppercase tracking-wider"
                    >
                        评估自动化潜力 (Book Call) <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ServiceBuild;
