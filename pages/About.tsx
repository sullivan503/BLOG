import React, { useEffect, useState } from 'react';
import { Mail, Coffee, Loader2, MapPin, History } from 'lucide-react';
import { WeiboIcon, DouyinIcon, WechatIcon, BilibiliIcon, YoutubeIcon, GithubIcon, TwitterIcon } from '../components/CustomIcons';
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

    const displayTitle = aboutPageData ? aboutPageData.title : "My Story";

    return (
        <div className="max-w-6xl mx-auto space-y-20">
            <SEO title="About" description="My story, current focus, and changelog." />

            {/* Dynamic Content Section (About) */}
            <section>
                <div className="flex items-center mb-8 bg-gray-50/50 p-4 border-b border-gray-100">
                    <h1 className="font-serif text-4xl font-bold text-primary mr-4">
                        {displayTitle}
                    </h1>
                    <div className="h-px bg-gray-200 flex-grow"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {isLoading ? (
                        <div className="flex items-center text-secondary py-10">
                            <Loader2 className="animate-spin mr-2" size={20} />
                            Loading About...
                        </div>
                    ) : hasValidAboutContent ? (
                        <div className="prose prose-lg prose-slate text-secondary leading-relaxed animate-fade-in max-w-none [&_p]:!text-secondary [&_li]:!text-secondary [&_h1]:!text-primary [&_h2]:!text-primary [&_h3]:!text-primary [&_strong]:!text-primary [&_strong]:font-bold [&_a]:!text-accent">
                            <div dangerouslySetInnerHTML={{ __html: aboutPageData!.content }} />
                        </div>
                    ) : (
                        // Fallback Static Content
                        <div className="prose prose-lg prose-slate text-secondary leading-relaxed animate-fade-in max-w-none">
                            <p>
                                Hi, I'm <strong>{PROFILE.name}</strong>.
                            </p>
                            <p>
                                I used to be a full-stack engineer obsessed with code architecture, passionate about React and high-performance web apps. However, years of practice taught me one thing: <strong>Education and Technology alone cannot solve all business problems.</strong>
                            </p>
                            <p>
                                So I began an exploration across boundaries—from IDE to CRM, from code logic to business processes. Currently, as a <strong>Sales Ops Consultant</strong>, I help B2B enterprises improve sales efficiency through digital transformation, deconstructing complex business challenges with an engineering mindset.
                            </p>
                            <p>
                                This website, "Feng's Blog", is my <strong>Digital Garden</strong>. No fleeting feeds here, only thoughts settled over time. I write about:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-secondary">
                                <li><strong>Business & Ops</strong>: B2B Sales Methodologies, SaaS Growth Strategies.</li>
                                <li><strong>Mind & Growth</strong>: Establishing internal order in a chaotic world.</li>
                                <li><strong>Tech & Tools</strong>: VPS Deployment, Automation Workflows, and Frontend Tech.</li>
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* Now Page (Dynamic) */}
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

                    {hasValidNowContent ? (
                        // Dynamic Now Content
                        <div className="text-secondary prose prose-sm prose-slate max-w-none [&_li]:!text-secondary [&_strong]:!text-primary [&_strong]:font-bold" dangerouslySetInnerHTML={{ __html: nowPageData!.content }} />
                    ) : (
                        // Fallback Static Now Content
                        <div className="text-secondary prose prose-sm prose-slate max-w-none">
                            <ul className="space-y-4 list-none pl-0">
                                <li className="flex items-start">
                                    <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                                    <span><strong>Deep Work:</strong> Designing a next-gen Sales Playbook for a SaaS client.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                                    <span><strong>Coding:</strong> Refactoring this site's architecture, experimenting with Gemini AI for auto-summaries.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-accent mt-1.5 font-bold">▪</span>
                                    <span><strong>Life:</strong> Tennis practice, maintaining physical "Antifragility".</span>
                                </li>
                                <li className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200/50">
                                    (Static Demo Content. Create a WP page with slug "now" to enable dynamic updates)
                                </li>
                            </ul>
                        </div>
                    )}
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

            {/* Changelog Section (Dynamic with Static Fallback) */}
            <section className="max-w-4xl mx-auto w-full">
                <div className="flex items-center mb-6">
                    <History className="text-accent mr-2" size={20} />
                    <h2 className="font-serif text-2xl font-bold text-primary">Changelog</h2>
                </div>

                {hasValidChangelogContent ? (
                    // Dynamic WP Content for Changelog
                    <div className="prose prose-slate prose-lg text-secondary leading-relaxed border-l-2 border-gray-100 pl-6 max-w-none [&_h3]:text-primary [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-none [&_ul]:pl-0 [&_li]:mb-4 [&_strong]:text-accent [&_strong]:font-mono [&_strong]:text-xs [&_strong]:block [&_strong]:mb-1">
                        <div dangerouslySetInnerHTML={{ __html: changelogPageData!.content }} />
                    </div>
                ) : (
                    // Fallback Static Content
                    <div className="border-l-2 border-gray-100 ml-3 space-y-8 pl-8 py-2">
                        <div className="relative">
                            <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-accent border-4 border-white shadow-sm"></div>
                            <div>
                                <span className="font-mono text-xs text-accent font-bold mb-1 block">2024.05 - Present</span>
                                <h3 className="font-bold text-primary text-lg mb-2">v2.0: Rebirth</h3>
                                <p className="text-secondary text-sm leading-relaxed">
                                    Migrated from WordPress Theme to <strong>React SPA + Headless WP</strong> for extreme performance.
                                    Integrated <strong>Gemini 1.5 Pro</strong> for auto-summaries. Redesigned UI with "Information Density" & "Whitespace" balance.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-gray-200 border-4 border-white"></div>
                            <div>
                                <span className="font-mono text-xs text-gray-400 font-bold mb-1 block">2023.12</span>
                                <h3 className="font-bold text-primary text-lg mb-2">v1.0: Seed</h3>
                                <p className="text-secondary text-sm leading-relaxed">
                                    First VPS (RackNerd), Nginx & MySQL manual setup.
                                    Standard PHP WordPress. Established the 3 content pillars: Business, Mind, Tech.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
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