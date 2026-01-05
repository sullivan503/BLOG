
import { BlogPost } from './types';

// ==============================================================================
// 1. GLOBAL SITE CONFIGURATION (核心设置)
// ==============================================================================

export const BLOG_NAME = "疯文斋";
export const BLOG_DESCRIPTION = "构建数字花园，在无序的世界里寻找秩序。关注商业、心智、技术与财富的复利效应。";

// [PRODUCTION] API CONNECTION
// 已经完成 SSL 配置，正式启用 HTTPS 域名
export const WORDPRESS_API_URL = "https://api.fengwz.me";

// Contact Form 7 IDs (请确保在 WP 后台创建了对应的表单)
export const WP_CONTACT_FORM_ID = "34";
export const WP_NEWSLETTER_FORM_ID = "40";

// ==============================================================================
// 2. PROFILE & SOCIAL (个人信息与社交)
// ==============================================================================

export const PROFILE = {
    name: "Feng",
    title: "Sales Ops Consultant & Frontend Engineer",
    location: "Beijing, China",
    status: "Open to Work",
    avatar: "https://picsum.photos/seed/feng/200/200",
};

export const SOCIAL_LINKS = {
    email: "sullivan503@gmail.com",
    twitter: "https://x.com/sullivan617",
    twitterHandle: "@sullivan617",
    github: "https://github.com/sullivan503", // 请更新为你真实的 Github 链接
    wechatOA: "疯文斋",
    wechatOAImage: "/oa-qr.jpg",
    wechatPersonal: "Fengwenzhai503",
    wechatPersonalImage: "/wechat-qr.jpg"
};

// ==============================================================================
// 3. HOME PAGE SLOGANS
// ==============================================================================

export const HERO_SECTION = {
    titleLine1: "Building Order",
    titleLine2: "out of",
    titleAccent: "Chaos.",
    description: "在无序的商业世界与复杂心智中，寻找构建系统与秩序的方法论。"
};

// ==============================================================================
// 4. CTA & NEWSLETTER
// ==============================================================================

export const CTA_TITLE = "Ready to build order out of chaos?";
export const CTA_DESCRIPTION = "如果您正在面临 Sales Ops 体系搭建、CRM 实施或企业数字化转型的挑战，我们可以聊聊。";
export const CTA_BUTTON_TEXT = "预约咨询 (Book a Call)";

export const NEWSLETTER_SUBJECT = "New Newsletter Subscriber";

// ==============================================================================
// 5. RESUME DATA
// ==============================================================================

export const RESUME_DATA = {
    header: {
        name: "Feng (Zenith)",
        title: PROFILE.title,
        email: SOCIAL_LINKS.email,
        website: "fengwz.me",
        location: PROFILE.location
    },
    summary: "具备 5 年以上技术开发与商业运营复合经验。擅长将复杂的商业流程转化为高效的技术解决方案。从全栈开发转型为 Sales Ops 专家，致力于帮助 B2B 企业通过数字化手段提升销售人效。拥有构建高可用 Web 应用（React/Node.js）与实施企业级 CRM 系统的双重能力。",
    experience: [
        {
            role: "Senior Solutions Consultant",
            company: "TechFlow Consulting Ltd., Shanghai",
            years: "2022 - Present",
            details: [
                "主导某 SaaS 独角兽企业的 CRM 迁移项目（Salesforce to Self-hosted），通过自动化清洗 10W+ 脏数据，使销售线索流转效率提升 40%。",
                "设计并开发 'Sales Cockpit' 仪表盘，集成 ERP 与 CRM 数据，为管理层提供实时 ARR/MRR 预测，决策响应速度缩短 3 天。",
                "建立销售团队的技术培训体系，编写超过 50 篇内部 SOP 文档，降低新员工 Onboarding 时间 20%。"
            ]
        },
        {
            role: "Full Stack Engineer",
            company: "Creative Web Studio",
            years: "2019 - 2022",
            details: [
                "基于 React 和 Node.js 为 10+ 客户构建高性能官网与后台管理系统。",
                "优化前端性能，将核心页面的 LCP (Largest Contentful Paint) 从 2.5s 优化至 0.8s，显著提升 SEO 排名。",
                "负责 VPS 服务器的维护与自动化部署（CI/CD），确保服务 99.9% 可用性。"
            ]
        }
    ],
    keyProjects: [
        {
            name: "Fengwz.me (Digital Garden)",
            techStack: "React, Tailwind, WordPress Headless, VPS",
            description: "设计并开发个人数字花园。实现了基于 WordPress REST API 的无头 CMS 架构，前端采用 SPA 单页应用模式，包含动态分类过滤、Bento Grid 布局与暗色模式设计。"
        }
    ],
    skills: {
        development: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Next.js', 'WordPress API'],
        operations: ['Sales Ops', 'CRM Architecture', 'SQL', 'Data Analysis', 'Process Optimization']
    },
    education: {
        degree: "B.S. Computer Science",
        school: "University of Technology",
        years: "2015 - 2019"
    },
    languages: [
        { name: "Chinese", level: "Native" },
        { name: "English", level: "Professional" }
    ],
    interests: "Reading (History & Econ), Tennis, Indie Hacking, Coffee Brewing."
};

// ==============================================================================
// 6. MOCK DATA (仅作为 API 失效时的回退)
// ==============================================================================

export const MOCK_POSTS: BlogPost[] = [
    {
        id: 'welcome-1',
        title: '你好，世界：我的数字花园开垦计划',
        slug: 'hello-world',
        excerpt: '这是您的第一篇博客文章。如果您看到了这段文字，说明您的 React 前端已经成功部署到了 VPS 上！',
        content: `<p>欢迎来到我的数字花园。这里正在通过 Headless WordPress 架构进行驱动。</p>`,
        author: 'Feng',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        readTime: '1 min read',
        tags: ['Welcome'],
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
    }
];
