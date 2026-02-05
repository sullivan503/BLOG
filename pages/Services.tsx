import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { ArrowRight, CheckCircle, BarChart2, Cpu, Users, Zap, TrendingUp, Search, Activity, Layers } from 'lucide-react';

const Services: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100
            }
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans text-primary">
            <SEO
                title="Services | B2B Sales Ops & AI Automation"
                description="Engineering Order out of Sales Chaos. Expert B2B Sales Operations consulting and AI automation services."
            />

            {/* 1. Hero Section - Typography Driven */}
            <section className="relative mb-16 md:mb-24 pt-0 border-b border-gray-100 pb-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-[800px]"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 text-accent font-mono text-sm tracking-wider uppercase mb-8 bg-surface px-3 py-1 border border-gray-200">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span>Accepting New Clients for Q2 2026</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="font-display font-bold text-[2.5rem] md:text-[3.8rem] leading-[1.1] text-primary mb-8 tracking-tight">
                        Engineering Order <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500 italic">out of Sales Chaos.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="font-serif font-light text-[1.2rem] md:text-[1.35rem] text-secondary leading-relaxed relative pl-6 border-l-4 border-accent mb-10">
                        我利用 <span className="font-medium border-b-2 border-accent/20">AI Agent</span> 和 <span className="font-medium border-b-2 border-accent/20">RevOps (营收运营)</span> 的最佳实践，<br className="hidden md:block" />帮助 B2B 科技公司构建自动化的、数据驱动的营收引擎。
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://calendly.com/fengwz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-accent hover:bg-accentHover transition-all duration-300 group uppercase tracking-wider"
                        >
                            预约诊断通话
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#products"
                            className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-primary bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-300 uppercase tracking-wider"
                        >
                            了解服务体系
                        </a>
                    </motion.div>
                </motion.div>

                {/* Decorative Abstract Element */}
                <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03] pointer-events-none hidden lg:block overflow-hidden">
                    <div className="absolute top-10 right-10 rotate-12 transform scale-150">
                        <GridPattern />
                    </div>
                </div>
            </section>

            {/* 2. Philosophy Section - The "Why" */}
            <section className="bg-surface py-12 md:py-16 px-6 md:px-12 border-b border-gray-100 mb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <QuoteIcon className="w-12 h-12 text-accent mx-auto mb-6 opacity-50" />
                    <h2 className="text-2xl md:text-3xl font-serif text-primary italic leading-relaxed mb-8">
                        "我的背景在市场上很罕见：<span className="font-bold not-italic bg-yellow-50 px-1">18 年的 B2B 销售管理经验</span> + <span className="font-bold not-italic bg-blue-50 px-1">全栈开发工程思维</span>。我不仅推荐软件，我构建让软件生效的逻辑。"
                    </h2>
                    <div className="flex items-center justify-center space-x-4">
                        <img src="https://github.com/sullivan617.png" alt="Feng Shi" className="w-12 h-12 grayscale border border-gray-200" />
                        <div className="text-left">
                            <div className="font-bold text-primary text-sm">Feng Shi (石峰)</div>
                            <div className="text-xs text-secondary font-mono">Independent RevOps Architect</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Products Grid - The "What" */}
            <section id="products" className="mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3 relative inline-block">
                        Service Menu
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent/30"></span>
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary">三大核心服务体系</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {/* Service A: The Audit */}
                    <ServiceCard
                        icon={<Search className="w-8 h-8 text-primary" />}
                        title="销售体系体检"
                        subtitle="The Audit"
                        badge="Entry Level"
                        target="适合：那些没人信任自家 CRM 数据的公司。"
                        description="深度审查目前的销售技术栈、数据卫生状况以及工作流瓶颈。"
                        outcome="一份残酷而诚实的报告，指出为什么你的线索没有转化，外加一份修复路线图。"
                        link="/services/audit"
                    />
                    {/* Service B: The Build - Highlighted */}
                    <ServiceCard
                        icon={<Cpu className="w-8 h-8 text-white" />}
                        title="AI RevOps 自动化"
                        subtitle="The Build"
                        highlighter={true} // Special styling
                        target="适合：淹没在手工录入和行政琐事中的团队。"
                        description="设计并部署定制的 AI Agent（使用 n8n/Coze），自动化线索评分、数据丰富和 SDR 外呼流程。"
                        outcome="你的销售团队每周节省 10+ 小时，专注于关单，而不是打字。"
                        link="/services/build"
                    />
                    {/* Service C: The Partner */}
                    <ServiceCard
                        icon={<Users className="w-8 h-8 text-primary" />}
                        title="外聘 RevOps 架构师"
                        subtitle="The Partner"
                        badge="Retainer"
                        target="适合：成长期创业公司，需要资深指导但不需要全职 HC。"
                        description="作为外部专家加入你的周会节奏，监督战略执行和系统优化。"
                        outcome="持续的系统优化和高层级的战略监管，确保营收引擎不熄火。"
                        link="/services/partner"
                    />
                </div>
            </section>

            {/* 4. Case Studies Preview (MVP) - Light Theme with Red Accents */}
            <section className="bg-surface border-y-4 border-accent/10 py-16 px-6 md:px-12 mb-24 max-w-7xl mx-auto">
                <div className="">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-primary mb-2">过往战绩 <span className="text-accent italic font-light text-2xl">(Selected Work)</span></h2>
                            <p className="text-secondary">真实的数据，真实的增长。</p>
                        </div>
                        <div className="hidden md:block">
                            {/* Decorative line or small element */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <CaseStat
                            stat="50%"
                            label="Lead Conversion Increase"
                            desc="通过自动化清洗和分发逻辑，帮助一家 SaaS 公司将线索响应时间从 12 小时缩短至 5 分钟。"
                        />
                        <CaseStat
                            stat="10h+"
                            label="Weekly Hours Saved per Rep"
                            desc="为销售团队部署 AI 自动填报系统，彻底消灭了 CRM 手工录入的繁琐工作。"
                        />
                    </div>
                </div>
            </section>

            {/* 5. Final CTA */}
            <section className="py-20 text-center bg-white">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
                    准备好堵住收入漏洞了吗？
                </h2>
                <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
                    不需要等待季度复盘，现在就开始改变。
                </p>
                <a
                    href="https://calendly.com/fengwz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-accent hover:bg-accentHover transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                    Let's Talk
                    <ArrowRight className="ml-2 w-5 h-5" />
                </a>
            </section>

        </div>
    );
};

// Component: Service Card
const ServiceCard = ({ icon, title, subtitle, target, description, outcome, link, badge, highlighter = false }: any) => (
    <div className={`relative flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 border ${highlighter ? 'bg-accent text-white border-accent shadow-2xl scale-105 z-10' : 'bg-white text-primary border-gray-200 hover:border-accent hover:shadow-lg'}`}>
        {badge && (
            <div className={`absolute top-0 right-0 mt-4 mr-4 px-3 py-1 text-xs font-bold uppercase tracking-wider ${highlighter ? 'bg-white text-accent' : 'bg-gray-100 text-gray-500'}`}>
                {badge}
            </div>
        )}

        <div className={`mb-6 p-3 w-fit ${highlighter ? 'bg-white/20' : 'bg-opacity-10 bg-gray-500'}`}>
            {icon}
        </div>

        <h3 className="text-2xl font-bold font-serif mb-1">{title}</h3>
        <div className={`text-sm font-mono font-bold uppercase tracking-wider mb-6 ${highlighter ? 'text-red-100' : 'text-accent'}`}>{subtitle}</div>

        <div className="space-y-6 flex-grow">
            <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${highlighter ? 'text-red-100/70' : 'text-gray-400'}`}>For Who</h4>
                <p className={`text-base leading-relaxed ${highlighter ? 'text-white' : 'text-secondary'}`}>{target}</p>
            </div>
            <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${highlighter ? 'text-red-100/70' : 'text-gray-400'}`}>What I Do</h4>
                <p className={`text-base leading-relaxed ${highlighter ? 'text-white' : 'text-secondary'}`}>{description}</p>
            </div>
            <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${highlighter ? 'text-red-100/70' : 'text-gray-400'}`}>Outcome</h4>
                <p className={`text-base leading-relaxed font-medium ${highlighter ? 'text-white' : 'text-primary'}`}>{outcome}</p>
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 flex justify-end">
            <button onClick={() => window.location.href = link} className={`inline-flex items-center text-sm font-bold hover:underline ${highlighter ? 'text-white' : 'text-accent'}`}>
                了解详情 <ArrowRight className="ml-1 w-4 h-4" />
            </button>
        </div>
    </div>
);

// Component: Case Stat (Refined Light Theme)
const CaseStat = ({ stat, label, desc }: any) => (
    <div className="group border-l-4 border-accent pl-6 hover:bg-white hover:shadow-sm transition-all p-4">
        <div className="text-5xl md:text-6xl font-bold text-accent mb-4 font-serif">
            {stat}
        </div>
        <div className="text-xl font-bold text-primary mb-3">{label}</div>
        <div className="text-lg text-secondary leading-relaxed max-w-sm">
            {desc}
        </div>
    </div>
);

// Icon: Grid Pattern
const GridPattern = () => (
    <svg width="404" height="404" fill="none" viewBox="0 0 404 404" role="img" aria-labelledby="grid-pattern">
        <title id="grid-pattern">Grid Pattern</title>
        <defs>
            <pattern id="xc4" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
            </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#xc4)" />
    </svg>
);

// Icon: Quote
const QuoteIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
    </svg>
);

export default Services;
