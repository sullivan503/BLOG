import React from 'react';
import { Mail, MapPin, Globe, ArrowLeft, Printer } from 'lucide-react';
import SEO from '../components/SEO';
import { RESUME_DATA } from '../constants'; // Import from constants

interface ResumeProps {
  onBack: () => void;
}

const Resume: React.FC<ResumeProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 print:bg-white print:p-0 print:block">
      <SEO title="个人简历" description={`${RESUME_DATA.header.name} - Resume`} />

      {/* Control Bar (Hidden when printing) */}
      <div className="w-full max-w-[210mm] flex justify-between items-center mb-6 px-4 print:hidden">
        <button 
            onClick={onBack}
            className="flex items-center text-secondary hover:text-accent transition-colors font-medium text-sm"
        >
            <ArrowLeft size={18} className="mr-2" />
            Back to Site
        </button>
        <button 
            onClick={handlePrint}
            className="flex items-center bg-primary text-white px-4 py-2 rounded font-bold hover:bg-accent transition-colors shadow-lg text-sm"
        >
            <Printer size={16} className="mr-2" />
            Save as PDF / Print
        </button>
      </div>

      {/* A4 Resume Container */}
      {/* 210mm x 297mm is standard A4 */}
      <div className="bg-white text-slate-800 w-full max-w-[210mm] min-h-[297mm] shadow-xl border border-gray-200 p-[15mm] md:p-[20mm] print:shadow-none print:border-none print:w-full print:max-w-none print:min-h-0">
        
        {/* Header */}
        <header className="border-b-2 border-primary pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
            <div className="mb-4 md:mb-0">
                <h1 className="text-4xl font-serif font-bold text-primary mb-2 tracking-tight">{RESUME_DATA.header.name}</h1>
                <p className="text-lg text-secondary font-medium">{RESUME_DATA.header.title}</p>
            </div>
            <div className="text-left md:text-right text-sm text-secondary space-y-1 w-full md:w-auto font-mono">
                <div className="flex items-center md:justify-end group cursor-pointer hover:text-accent transition-colors">
                    <Mail size={14} className="mr-2" /> {RESUME_DATA.header.email}
                </div>
                <div className="flex items-center md:justify-end group cursor-pointer hover:text-accent transition-colors">
                    <Globe size={14} className="mr-2" /> {RESUME_DATA.header.website}
                </div>
                <div className="flex items-center md:justify-end">
                    <MapPin size={14} className="mr-2" /> {RESUME_DATA.header.location}
                </div>
            </div>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Main Content (Left 2/3) */}
            <div className="col-span-2 space-y-8">
                
                {/* Summary */}
                <section>
                    <h2 className="text-xl font-bold text-primary border-b border-gray-200 pb-2 mb-3 uppercase tracking-wider font-serif">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-secondary text-justify">
                        {RESUME_DATA.summary}
                    </p>
                </section>

                {/* Experience */}
                <section>
                    <h2 className="text-xl font-bold text-primary border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">Experience</h2>
                    
                    {RESUME_DATA.experience.map((job, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-primary text-lg">{job.role}</h3>
                                <span className="text-xs text-secondary font-mono border border-gray-200 px-2 py-0.5 rounded">{job.years}</span>
                            </div>
                            <p className="text-accent font-bold text-sm mb-2">{job.company}</p>
                            <ul className="list-disc list-outside ml-4 text-sm text-secondary space-y-1.5 leading-relaxed">
                                {job.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* Projects */}
                <section>
                    <h2 className="text-xl font-bold text-primary border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">Key Projects</h2>
                    
                    {RESUME_DATA.keyProjects.map((project, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <h3 className="font-bold text-primary text-sm">{project.name}</h3>
                            <p className="text-xs text-accent font-bold mb-1">{project.techStack}</p>
                            <p className="text-sm text-secondary leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    ))}
                </section>
            </div>

            {/* Sidebar (Right 1/3) */}
            <div className="col-span-1 space-y-8">
                
                {/* Skills */}
                <section>
                    <h2 className="text-sm font-bold text-primary border-b border-gray-200 pb-2 mb-3 uppercase tracking-wider font-serif">Core Skills</h2>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-xs font-bold text-secondary mb-2 uppercase">Development</h4>
                            <div className="flex flex-wrap gap-2">
                                {RESUME_DATA.skills.development.map(s => (
                                    <span key={s} className="bg-gray-100 text-primary border border-gray-200 px-2 py-1 rounded text-xs font-medium">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-secondary mb-2 uppercase">Operations & Data</h4>
                            <div className="flex flex-wrap gap-2">
                                {RESUME_DATA.skills.operations.map(s => (
                                    <span key={s} className="bg-gray-100 text-primary border border-gray-200 px-2 py-1 rounded text-xs font-medium">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="text-sm font-bold text-primary border-b border-gray-200 pb-2 mb-3 uppercase tracking-wider font-serif">Education</h2>
                    <div className="mb-3">
                        <h3 className="font-bold text-primary text-sm">{RESUME_DATA.education.degree}</h3>
                        <p className="text-xs text-secondary">{RESUME_DATA.education.school}</p>
                        <p className="text-xs text-secondary font-mono mt-1">{RESUME_DATA.education.years}</p>
                    </div>
                </section>

                {/* Languages */}
                <section>
                    <h2 className="text-sm font-bold text-primary border-b border-gray-200 pb-2 mb-3 uppercase tracking-wider font-serif">Languages</h2>
                    <ul className="text-sm text-secondary space-y-2">
                        {RESUME_DATA.languages.map((lang, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span className="font-medium">{lang.name}</span> 
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{lang.level}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                 {/* Interests */}
                 <section>
                    <h2 className="text-sm font-bold text-primary border-b border-gray-200 pb-2 mb-3 uppercase tracking-wider font-serif">Interests</h2>
                    <div className="text-sm text-secondary leading-relaxed">
                        {RESUME_DATA.interests}
                    </div>
                </section>

            </div>
        </div>
        
        {/* Footer (Print Only) */}
        <div className="hidden print:block mt-12 pt-4 border-t border-gray-200 text-center text-xs text-secondary">
            View the live version and portfolio at <span className="font-bold text-black">https://{RESUME_DATA.header.website}</span>
        </div>

      </div>
    </div>
  );
};

export default Resume;