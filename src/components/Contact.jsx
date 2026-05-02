import React from 'react';
import { motion } from 'framer-motion';
import { Link, Mail, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-20 px-4 md:px-0 text-center">
      <h2 className="text-3xl font-bold mb-10 neon-text-secondary uppercase tracking-widest">
        <span className="text-primary">&lt;</span> Establish_Connection <span className="text-primary">/&gt;</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-panel p-10 relative overflow-hidden group"
      >
        <div className="relative z-10">
          <p className="text-lg text-slate-300 mb-8 font-mono">
            "Direct transmission lines are open. Ready for professional integration."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/brandon-tan03/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-8 py-4 bg-primary/10 border border-primary/50 text-primary rounded-sm hover:bg-primary/20 transition-all duration-300 group neon-border-primary"
            >
              <Link className="w-6 h-6" />
              <span className="font-bold uppercase tracking-wider">LinkedIn Profile</span>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/50"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/50"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/50"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/50"></div>
        
        {/* Animated background pulse */}
        <div className="absolute inset-0 bg-primary/5 animate-pulse opacity-20 pointer-events-none"></div>
      </motion.div>

      <footer className="mt-20 text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">
        © 2026 Brandon Tan Hup Le // V-X Dossier v1.0.4 // All Rights Reserved
      </footer>
    </div>
  );
}
