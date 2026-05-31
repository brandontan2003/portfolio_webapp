import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, FolderOpen } from 'lucide-react';

const projectsData = [
  {
    id: 'brainhack2026',
    title: 'Brainhack 2026 Hackathon',
    status: 'In Progress',
    description: 'Developing innovative, secure, and performant solutions under tight deadlines using cutting-edge technologies.',
    tags: ['Hackathon', 'Competition', 'Innovation'],
    color: 'primary'
  }
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
    <div className="w-full max-w-4xl mx-auto mb-16 sm:mb-20 px-4 md:px-0">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-10 text-center neon-text-primary uppercase tracking-wider sm:tracking-widest">
        <span className="text-secondary">&lt;</span> Active_Projects <span className="text-secondary">/&gt;</span>
      </h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className={`glass-panel p-4 sm:p-6 relative group overflow-hidden ${
              project.color === 'secondary' ? 'glass-panel-purple' : 'glass-panel-hover'
            }`}
          >
            {/* Responsive Card Header: Icon & Status Badge */}
            <div className="flex justify-between items-center mb-4">
              <FolderOpen className={`w-8 h-8 ${
                project.color === 'secondary' ? 'text-secondary' : 'text-primary'
              }`} />
              <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1 rounded border border-primary/30 shrink-0">
                <Activity className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-mono text-primary uppercase">{project.status}</span>
              </div>
            </div>

            <h3 className={`text-xl font-bold mb-3 ${
              project.color === 'secondary' ? 'neon-text-secondary' : 'neon-text-primary'
            }`}>
              {project.title}
            </h3>

            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-slate-800/80 text-slate-300 border border-slate-700 rounded">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Scanline effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
