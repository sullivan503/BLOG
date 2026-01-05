import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowUpRight, FileText, Star, Trophy, ArrowRight, X, Send, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { fetchWordPressPosts, submitConsultation } from '../services/wpService';
import { BlogPost } from '../types';
import { CTA_TITLE, CTA_DESCRIPTION, CTA_BUTTON_TEXT } from '../constants';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<BlogPost[]>([]);
    const [achievements, setAchievements] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Contact Modal State
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Updated State for split fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        wechat: '',
        message: ''
    });

    useEffect(() => {
        const loadProjects = async () => {
            setIsLoading(true);
            const posts = await fetchWordPressPosts();

            const projectPosts = posts.filter(p =>
                p.categories && p.categories.some(c =>
                    c.toLowerCase() === 'projects' ||
                    c.includes('项目') ||
                    c.toLowerCase() === 'business' ||
                    c === '商业与运营'
                )
            );

            const achievementPosts = posts.filter(p =>
                p.categories && p.categories.some(c => c.toLowerCase() === 'achievements' || c.includes('成果'))
            );

            setProjects(projectPosts.slice(0, 6));
            setAchievements(achievementPosts.slice(0, 5));

            setIsLoading(false);
        };
        loadProjects();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage('');

        // Call the WordPress API via our service
        const result = await submitConsultation(formData);

        if (result.success) {
            setFormStatus('success');
            // Clear form data on success for better UX
            setFormData({ name: '', email: '', mobile: '', wechat: '', message: '' });
        } else {
            setFormStatus('error');
            setErrorMessage(result.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-20 relative">
            <SEO title="事业与项目" description="咨询服务、案例库与个人简历。" />

            {/* --- CONTACT MODAL --- */}
            {isContactOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => { setIsContactOpen(false); setFormStatus('idle'); }}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 rounded-full z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-10">
                            {formStatus === 'success' ? (
                                <div className="text-center py-10 animate-fade-in">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary mb-2">提交成功</h3>
                                    <p className="text-secondary mb-8">
                                        感谢您的信任。您的需求已安全存储至系统，我将尽快通过您留下的联系方式与您取得联系。
                                    </p>
                                    <button
                                        onClick={() => { setIsContactOpen(false); setFormStatus('idle'); }}
                                        className="bg-gray-100 text-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        关闭窗口
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-serif font-bold text-primary mb-2">预约咨询</h3>
                                    <p className="text-secondary text-sm mb-6">请填写以下信息，我们将在 24 小时内回复。</p>

                                    <form onSubmit={handleFormSubmit} className="space-y-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">称呼 (Name) <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-surface border border-gray-200 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors"
                                                placeholder="怎么称呼您？"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">电子邮箱 (Email) <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-surface border border-gray-200 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors"
                                                placeholder="name@company.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>

                                        {/* Phone & WeChat Row */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">手机号 (Mobile) <span className="text-red-500">*</span></label>
                                                <input
                                                    type="tel"
                                                    required
                                                    className="w-full bg-surface border border-gray-200 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors"
                                                    placeholder="138..."
                                                    value={formData.mobile}
                                                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">微信号 (WeChat)</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-surface border border-gray-200 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors"
                                                    placeholder="选填"
                                                    value={formData.wechat}
                                                    onChange={e => setFormData({ ...formData, wechat: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">需求简述 (Challenge) <span className="text-red-500">*</span></label>
                                            <textarea
                                                rows={3}
                                                required
                                                className="w-full bg-surface border border-gray-200 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                                                placeholder="您当前遇到的最大痛点是什么？"
                                                value={formData.message}
                                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            />
                                        </div>

                                        {formStatus === 'error' && (
                                            <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                                                {errorMessage || "提交失败，请检查网络或稍后再试。"}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={formStatus === 'submitting'}
                                            className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-black transition-colors flex items-center justify-center disabled:opacity-70 mt-2"
                                        >
                                            {formStatus === 'submitting' ? '提交中...' : (
                                                <>发送请求 <Send size={16} className="ml-2" /></>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <header>
                <h1 className="font-serif text-4xl font-bold text-primary mb-6">事业与项目</h1>
                <p className="text-xl text-secondary leading-relaxed">
                    专注于 B2B Sales Ops 咨询与企业数字化转型。用技术手段解决商业痛点。
                </p>
            </header>

            {/* --- BUSINESS INSIGHTS (NEW) --- */}
            <section>
                <div className="flex items-center mb-8">
                    <FileText className="mr-3 text-accent" size={24} />
                    <h2 className="text-2xl font-bold text-primary">商业洞察 (Business Insights)</h2>
                </div>

                {isLoading ? (
                    <div className="text-secondary animate-pulse">Loading insights...</div>
                ) : projects.filter(p => p.categories && (p.categories.some(c => c.toLowerCase() === 'business') || p.categories.some(c => c === '商业与运营'))).length > 0 ? (
                    <div className="space-y-6 max-w-4xl">
                        {projects.filter(p => p.categories && (p.categories.some(c => c.toLowerCase() === 'business') || p.categories.some(c => c === '商业与运营'))).map((post) => (
                            <div
                                key={post.id}
                                onClick={() => window.open(`/post/${post.slug}`, '_blank')}
                                className="group flex flex-col p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-accent/30 cursor-pointer transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                                <div className="flex items-center space-x-3 text-xs mb-3">
                                    <span className="text-accent font-mono font-bold">{post.date}</span>
                                    <span className="bg-surface border border-gray-200 px-2 py-0.5 rounded text-secondary font-bold">INSIGHT</span>
                                </div>

                                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors font-serif mb-3">
                                    {post.title}
                                </h3>

                                <p className="text-secondary text-sm leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 border border-dashed border-gray-200 rounded-xl text-center text-sm text-secondary">
                        暂无商业洞察文章。请在后台添加分类为 <code>business</code> 的文章。
                    </div>
                )}
            </section>

            {/* Consulting Services / Projects List */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-primary flex items-center">
                        <Briefcase className="mr-3 text-accent" />
                        咨询与案例 (Selected Cases)
                    </h2>
                    <span className="text-xs font-mono text-secondary bg-gray-100 px-2 py-1 rounded">
                        Latest 6
                    </span>
                </div>

                {isLoading ? (
                    <div className="text-secondary animate-pulse">Loading cases...</div>
                ) : projects.filter(p => p.categories && (p.categories.some(c => c.toLowerCase() === 'projects') || p.categories.some(c => c.includes('项目')))).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.filter(p => p.categories && (p.categories.some(c => c.toLowerCase() === 'projects') || p.categories.some(c => c.includes('项目')))).map((proj) => (
                            <div key={proj.id} className="bg-white p-8 rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all flex flex-col h-full group">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">{proj.title}</h3>
                                </div>
                                <div
                                    className="text-secondary text-sm mb-6 leading-relaxed flex-grow line-clamp-4 prose prose-sm prose-slate"
                                    dangerouslySetInnerHTML={{ __html: proj.content }}
                                />
                                <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                                    <span className="text-xs font-mono text-accent uppercase tracking-wider font-bold">Project Case</span>
                                    <span className="text-xs text-gray-400">{proj.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 border border-dashed border-gray-200 rounded-2xl text-center text-secondary">
                        <Briefcase className="mx-auto mb-2 opacity-20" />
                        <p>暂无案例展示。</p>
                        <p className="text-xs mt-2 text-gray-400">在 WordPress 添加 category 为 <code>projects</code> 的文章。</p>
                    </div>
                )}
            </section>

            {/* Achievements Section */}
            <section>
                <h2 className="text-2xl font-bold text-primary mb-8 flex items-center">
                    <Trophy className="mr-3 text-accent" />
                    精选成果 (Top 5 Achievements)
                </h2>

                {isLoading ? (
                    <div className="text-secondary animate-pulse">Loading achievements...</div>
                ) : achievements.length > 0 ? (
                    <div className="space-y-4">
                        {achievements.map((ach) => (
                            <div key={ach.id} className="bg-surface border-l-4 border-accent pl-6 py-4 rounded-r-xl hover:bg-gray-100 transition-colors">
                                <h3 className="text-lg font-bold text-primary">{ach.title}</h3>
                                <div
                                    className="text-secondary text-sm mt-2 prose prose-sm prose-slate max-w-none"
                                    dangerouslySetInnerHTML={{ __html: ach.content }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Fallback Static Data to show layout style */}
                        <div className="border-l-4 border-accent bg-surface pl-6 py-4 rounded-r-xl">
                            <h3 className="text-lg font-bold text-primary">示例：某 SaaS 独角兽企业 CRM 迁移</h3>
                            <p className="text-secondary text-sm mt-2">
                                <span className="text-accent font-mono uppercase text-xs mr-2 font-bold">Result</span>
                                销售线索转化率提升 15%，数据录入时间减少 40%。
                            </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">
                            * Tip: 在 WordPress 添加 category 为 <code>achievements</code> 的文章来替换此处。
                        </p>
                    </div>
                )}
            </section>

            {/* --- NEW: CTA SECTION (Now Dynamic) --- */}
            <section className="bg-primary text-white rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h2 className="font-serif text-3xl font-bold mb-4 leading-tight">
                            {CTA_TITLE}
                        </h2>
                        <p className="text-gray-300 text-lg">
                            {CTA_DESCRIPTION}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="bg-accent hover:bg-white hover:text-accent text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg flex items-center whitespace-nowrap transform hover:scale-105"
                    >
                        {CTA_BUTTON_TEXT}
                        <ArrowRight size={18} className="ml-2" />
                    </button>
                </div>

                {/* Decorative Background Icon */}
                <div className="absolute -right-10 -bottom-10 text-white/5 pointer-events-none">
                    <MessageSquare size={200} />
                </div>
            </section>

            {/* Resume Link */}
            <section className="bg-surface border border-gray-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-primary mb-2">想要了解我的完整履历？</h2>
                    <p className="text-secondary text-sm">包含详细的项目经验、技能树与过往经历。</p>
                </div>
                <button
                    onClick={() => window.location.hash = 'resume'}
                    className="flex items-center bg-white border border-gray-200 text-primary px-6 py-3 rounded-lg font-bold hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
                >
                    <FileText size={18} className="mr-2" />
                    查看简历 PDF
                </button>
            </section>
        </div>
    );
};

export default Projects;