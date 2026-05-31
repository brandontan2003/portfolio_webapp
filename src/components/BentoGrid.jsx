import React from 'react';
import { motion } from 'framer-motion';
import { Server, Bot, PenTool, Search, Cloud } from 'lucide-react';

const skillsData = [
  {
    id: 'systems',
    title: 'Systems',
    icon: <Server className="w-8 h-8 text-primary mb-4" />,
    skills: ['Java', 'Spring Boot', 'Microservices', 'Spring Batch', 'REST APIs', 'SQL', 'Docker', 'Git', 'GitHub Actions'],
    colSpan: 'md:col-span-3 md:row-span-2',
    color: 'primary'
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: <Bot className="w-8 h-8 text-secondary mb-4" />,
    skills: ['RedHat PAM (BPMN/DMN)', 'Robot Framework', 'Python'],
    colSpan: 'md:col-span-3',
    color: 'secondary'
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: <Cloud className="w-8 h-8 text-primary mb-4" />,
    skills: ['AWS', 'Vercel', 'Railway', 'Google Cloud Platform'],
    colSpan: 'md:col-span-3',
    color: 'primary'
  },
  {
    id: 'design',
    title: 'Design',
    icon: <PenTool className="w-8 h-8 text-secondary mb-4" />,
    skills: ['OpenAPI Specs', 'Swagger', 'UX/UI'],
    colSpan: 'md:col-span-3',
    color: 'secondary'
  },
  {
    id: 'research',
    title: 'Research',
    icon: <Search className="w-8 h-8 text-primary mb-4" />,
    skills: ['Machine Learning', 'NLTK'],
    colSpan: 'md:col-span-3',
    color: 'primary'
  }
];

export default function BentoGrid() {
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
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 sm:mb-20 px-4 md:px-0">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-10 text-center neon-text-primary uppercase tracking-wider sm:tracking-widest">
        <span className="text-secondary">&lt;</span> Tech_Matrix <span className="text-secondary">/&gt;</span>
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 auto-rows-auto md:auto-rows-[200px]"
      >
        {skillsData.map((sector) => (
          <motion.div
            key={sector.id}
            variants={itemVariants}
            whileHover={{ scale: 0.98 }}
            className={`glass-panel p-4 sm:p-6 flex flex-col justify-between group cursor-crosshair min-h-[160px] md:min-h-0 ${sector.colSpan} ${sector.color === 'secondary' ? 'hover:border-secondary/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'glass-panel-hover'
              }`}
          >
            <div>
              <div className="flex justify-between items-start">
                {sector.icon}
                <span className="text-xs font-mono opacity-50 bg-slate-900/80 px-2 py-1 rounded">SEC_{sector.id.toUpperCase().substring(0, 3)}</span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${sector.color === 'secondary' ? 'text-secondary group-hover:neon-text-secondary' : 'text-primary group-hover:neon-text-primary'
                } transition-all duration-300`}>
                {sector.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {sector.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded bg-slate-900/80 border ${sector.color === 'secondary' ? 'border-secondary/30 text-secondary/90' : 'border-primary/30 text-primary/90'
                    }`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Corner Accent */}
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${sector.color === 'secondary' ? 'border-secondary' : 'border-primary'
              }`}></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
