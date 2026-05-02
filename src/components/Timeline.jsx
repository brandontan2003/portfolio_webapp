import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, ChevronRight } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    type: 'work',
    title: 'App Developer',
    organization: 'Accenture',
    period: 'Mar 2024 - Aug 2024',
    description: 'Developed and maintained enterprise-scale applications. Focus areas included OpenAPI Specs, Microservices, Spring Batch, and RedHat PAM (BPMN/DMN).',
    icon: <Briefcase className="w-5 h-5 text-secondary" />,
    color: 'secondary'
  },
  {
    id: 2,
    type: 'work',
    title: 'Software Engineer Intern',
    organization: 'Accenture',
    period: 'Apr 2023 - Mar 2024',
    description: 'Built robust automation solutions and APIs. Key projects included an API Automation Framework (Python/Robot), Lemmatization API (NLTK), and Business Rules implementation (FEEL).',
    icon: <Briefcase className="w-5 h-5 text-primary" />,
    color: 'primary'
  },
  {
    id: 3,
    type: 'education',
    title: 'Diploma in Business & FinTech',
    organization: 'Nanyang Polytechnic',
    period: 'Apr 2021 - Mar 2024',
    description: "GPA 3.98/4.0. Achieved top honors including OCBC Bank Silver Medalist, Diploma with Merit, and 3x Director's List.",
    icon: <GraduationCap className="w-5 h-5 text-primary" />,
    color: 'primary'
  }
];

export default function Timeline() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-20 relative">
      <h2 className="text-3xl font-bold mb-10 text-center neon-text-primary uppercase tracking-widest">
        <span className="text-secondary">&lt;</span> Experience_Log <span className="text-secondary">/&gt;</span>
      </h2>
      
      <div className="relative pl-8 md:pl-0">
        {/* Vertical Data-Trace Line */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 transform md:-translate-x-1/2 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        
        {timelineData.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative mb-12 md:mb-24 flex md:justify-between items-center w-full ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Center Node */}
            <div className="absolute left-[39px] md:left-1/2 w-10 h-10 rounded-full border-2 border-background transform -translate-x-1/2 flex items-center justify-center z-10 bg-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.8)]">
              {item.icon}
            </div>

            {/* Content Box */}
            <div className="w-full md:w-[45%] ml-16 md:ml-0 relative group">
              {/* Connector line for desktop */}
              <div className={`hidden md:block absolute top-5 w-8 h-[2px] bg-primary/40 ${
                index % 2 === 0 ? '-left-8' : '-right-8'
              }`}></div>
              
              <div className={`glass-panel p-6 relative overflow-hidden ${item.color === 'secondary' ? 'glass-panel-purple' : 'glass-panel-hover'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-xl font-bold ${item.color === 'secondary' ? 'neon-text-secondary' : 'neon-text-primary'}`}>
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono bg-slate-900/50 px-2 py-1 rounded">
                    {item.period}
                  </span>
                </div>
                
                <h4 className="text-lg text-slate-300 mb-4 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1 text-primary" />
                  {item.organization}
                </h4>
                
                <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-primary/30 pl-4 py-1">
                  {item.description}
                </p>
                
                {/* Decorative corner element */}
                <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-50 ${
                  item.color === 'secondary' ? 'border-secondary' : 'border-primary'
                }`}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
