import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { ArrowRight, Users, TrendingUp, Target, MessageCircle } from 'lucide-react';

const ServicePartner: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans text-primary">
            <SEO
                title="The Partner | Fractional RevOps Architect"
                description="Your external Head of RevOps. Ongoing strategy, system optimization, and leadership coaching."
            />

            {/* 1. HERO */}
            <section className="pt-32 pb-20 px-6 border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block bg-accent/10 text-accent px-3 py-1 text-xs font-bold font-mono uppercase tracking-widest mb-6 border border-accent/20">
                        Service_03: The Partner
                    </div>
                    <h1 className="font-display font-bold text-5xl md:text-7xl mb-8 leading-tight text-primary">
                        Your External<br />
                        <span className="text-accent">Head of RevOps.</span>
                    </h1>
                    <p className="font-serif text-xl md:text-2xl text-secondary leading-relaxed max-w-2xl border-l-4 border-accent pl-6">
                        不需要全职 HC 的预算，也能拥有顶级的营收运营架构师。<br />
                        我加入你的 Slack，参加你的周会，确保战略落地不走样。
                    </p>
                </div>
            </section>

            {/* 2. THE ENGAGEMENT MODEL */}
            <section className="py-24 px-6 bg-surface">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-12">
                        // HOW WE WORK TOGETHER
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Weekly Sync */}
                        <div className="bg-white p-8 border border-gray-200">
                            <Users className="w-10 h-10 text-accent mb-6" />
                            <h3 className="font-bold text-xl mb-4">周会坐镇 (Weekly Sync)</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                我会参加你的一线销售周会和管理层复盘会。我不只是听，我会直接指出 Pipeline 中的虚假承诺和风险。
                            </p>
                        </div>
                        {/* System Owner */}
                        <div className="bg-white p-8 border border-gray-200">
                            <Target className="w-10 h-10 text-accent mb-6" />
                            <h3 className="font-bold text-xl mb-4">系统主理 (System Owner)</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                CRM 架构调整、新工具选型、自动化流程维护。我是你技术栈的最终负责人，确保它们为业务服务，而不是制造摩擦。
                            </p>
                        </div>
                        {/* Strategy Coach */}
                        <div className="bg-white p-8 border border-gray-200">
                            <TrendingUp className="w-10 h-10 text-accent mb-6" />
                            <h3 className="font-bold text-xl mb-4">战略参谋 (Strategy Coach)</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                从 GTM 策略调整到激励制度设计 (Commission Plan)，我提供基于数据的第三方客观建议，帮你通过 B 轮、C 轮。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. IDEAL CLIENT PROFILE */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto border-l-4 border-gray-200 pl-8">
                    <h2 className="font-serif font-bold text-2xl mb-6">适合此服务的团队画像：</h2>
                    <ul className="space-y-4 text-secondary text-lg">
                        <li className="flex items-start">
                            <CheckSquare className="w-5 h-5 text-accent mr-3 mt-1" />
                            <span>ARR 在 $1M - $10M 之间的成长期 B2B 科技公司。</span>
                        </li>
                        <li className="flex items-start">
                            <CheckSquare className="w-5 h-5 text-accent mr-3 mt-1" />
                            <span>拥有 5-20 人的销售团队，但缺乏专门的 Sales Ops / RevOps 角色。</span>
                        </li>
                        <li className="flex items-start">
                            <CheckSquare className="w-5 h-5 text-accent mr-3 mt-1" />
                            <span>创始人/VP Sales 意识到“原本那一套带不动了”，急需引入系统化打法。</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* 4. CTA */}
            <section className="py-24 bg-primary text-white text-center px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Let's Scale Together.</h2>
                    <p className="text-gray-400 mb-12 text-lg">
                        仅限 2 个席位 (Retainer Slots Available: 2)<br />
                        按月付费，灵活取消。
                    </p>
                    <a
                        href="https://calendly.com/fengwz/partner"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold text-white bg-accent hover:bg-white hover:text-accent transition-all duration-300 uppercase tracking-wider"
                    >
                        申请合作名额 (Apply Now) <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </section>
        </div>
    );
};

// Helper Icon
const CheckSquare = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default ServicePartner;
