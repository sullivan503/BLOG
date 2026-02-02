import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { ArrowRight, CheckSquare, AlertTriangle, FileText, Search, Activity } from 'lucide-react';

const ServiceAudit: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans text-primary">
            <SEO
                title="The Audit | Sales System Diagnosis"
                description="Deep dive analysis of your B2B sales infrastructure. Find the leaks before you pour more fuel."
            />

            {/* 1. HERO */}
            <section className="pt-32 pb-20 px-6 border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block bg-accent/10 text-accent px-3 py-1 text-xs font-bold font-mono uppercase tracking-widest mb-6 border border-accent/20">
                        Service_01: The Diagnosis
                    </div>
                    <h1 className="font-display font-bold text-5xl md:text-7xl mb-8 leading-tight text-primary">
                        Stop Guessing.<br />
                        <span className="text-accent">Start Knowing.</span>
                    </h1>
                    <p className="font-serif text-xl md:text-2xl text-secondary leading-relaxed max-w-2xl border-l-4 border-accent pl-6">
                        你的 CRM 数据是否一团糟？你的销售预测是否总是靠猜？<br />
                        "The Audit" 是一次对你营收引擎的全面核磁共振。
                    </p>
                </div>
            </section>

            {/* 2. THE PROBLEM */}
            <section className="py-20 px-6 bg-surface">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-12">
                        // THE SYMPTOMS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 border border-gray-200 hover:border-accent transition-colors group">
                            <AlertTriangle className="w-8 h-8 text-red-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-xl mb-4">信任危机</h3>
                            <p className="text-secondary leading-relaxed">
                                CEO 不信 VP 的报表，VP 不信 Sales 的填报。每次周会都变成了一场关于“数据到底准不准”的辩论赛。
                            </p>
                        </div>
                        <div className="bg-white p-8 border border-gray-200 hover:border-accent transition-colors group">
                            <Search className="w-8 h-8 text-red-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-xl mb-4">漏斗黑盒</h3>
                            <p className="text-secondary leading-relaxed">
                                既然有很多线索进来，为什么最后没成交？是在如果不清楚具体的流失环节，所有的优化都是盲人摸象。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE PROCESS */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-mono text-xs font-bold text-accent uppercase tracking-widest mb-16">
                        // THE EXECUTION
                    </h2>

                    <div className="space-y-12 relative border-l border-gray-200 ml-4 md:ml-0 pl-8 md:pl-12">
                        <div className="relative">
                            <div className="absolute -left-[45px] md:-left-[59px] top-0 w-6 h-6 bg-white border-2 border-accent flex items-center justify-center text-[10px] font-bold text-accent rounded-none">1</div>
                            <h3 className="text-2xl font-bold font-serif mb-4">技术栈审查 (Tech Stack Review)</h3>
                            <p className="text-secondary mb-4">我们将深入你的 CRM (Salesforce/HubSpot)、Outreach 工具和数据库。</p>
                            <ul className="space-y-2 text-sm text-gray-500 font-mono">
                                <li className="flex items-center"><CheckSquare className="w-3 h-3 mr-2 text-accent" /> Field Utilization Analysis</li>
                                <li className="flex items-center"><CheckSquare className="w-3 h-3 mr-2 text-accent" /> Data Integrity Check</li>
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[45px] md:-left-[59px] top-0 w-6 h-6 bg-white border-2 border-accent flex items-center justify-center text-[10px] font-bold text-accent rounded-none">2</div>
                            <h3 className="text-2xl font-bold font-serif mb-4">流程访谈 (Workflow Interview)</h3>
                            <p className="text-secondary">我会直接与你的一线销售、SDR 和管理者对话，找出那些“在系统里看不见”的真实阻力。</p>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[45px] md:-left-[59px] top-0 w-6 h-6 bg-accent text-white border-2 border-accent flex items-center justify-center text-[10px] font-bold rounded-none">3</div>
                            <h3 className="text-2xl font-bold font-serif mb-4">交付报告 (The Report)</h3>
                            <p className="text-secondary">一周后，你将收到一份不留情面的诊断报告，以及一份可以直接执行的修复路线图。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PRICING & CTA */}
            <section className="py-24 bg-primary text-white text-center px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">准备好面对真相了吗？</h2>
                    <p className="text-gray-400 mb-12 text-lg">
                        通常耗时：1 Week<br />
                        适合阶段：Seed to Series B
                    </p>
                    <a
                        href="https://calendly.com/fengwz/audit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold text-white bg-accent hover:bg-white hover:text-accent transition-all duration-300 uppercase tracking-wider"
                    >
                        预约诊断 (Book Audit) <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ServiceAudit;
