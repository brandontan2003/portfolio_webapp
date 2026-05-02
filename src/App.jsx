import React from 'react';
import Terminal from './components/Terminal';
import BentoGrid from './components/BentoGrid';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Circuit Board Grid */}
      <div className="absolute inset-0 bg-circuit-board opacity-[0.15] pointer-events-none"></div>

      {/* Global Scanline Overlay */}
      <div className="scanline-overlay"></div>

      <main className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center">
        {/* Terminal Hero Section */}
        <Terminal />

        {/* Skills Matrix */}
        <BentoGrid />

        {/* Experience Timeline */}
        <Timeline />

        {/* Active Projects */}
        <Projects />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Local AI Chatbot Interface */}
      <ChatInterface />

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 border-t border-primary/20 bg-background">
        <p className="text-slate-500 font-mono text-xs">
          SYS_LOG: BRANDON PORTFOLIO // END_OF_FILE
        </p>
      </footer>
    </div>
  );
}

export default App;
