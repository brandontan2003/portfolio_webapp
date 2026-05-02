import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Send, ShieldAlert } from 'lucide-react';

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: 'SECURE CHANNEL ESTABLISHED.' },
    { role: 'assistant', content: 'V-X Dossier AI initialized. You may query my capabilities, experience, or achievements.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Scaffolding for local FastAPI endpoint
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.response || 'Connection established but no valid data returned.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: 'ERROR: CONNECTION TO LOCALHOST:8000 FAILED. PLEASE ENSURE FASTAPI SERVER IS RUNNING WITH RESUME_DATA.TXT.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full glass-panel-purple z-40 ${isOpen ? 'hidden' : 'block'}`}
      >
        <Terminal className="w-6 h-6 text-secondary animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] z-50 glass-panel flex flex-col overflow-hidden shadow-2xl shadow-primary/20"
          >
            {/* Header */}
            <div className="bg-slate-900/80 p-3 border-b border-primary/30 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none"></div>
              <div className="flex items-center text-primary font-bold text-sm">
                <ShieldAlert className="w-4 h-4 mr-2 text-red-500 animate-pulse" />
                SECURE_CHANNEL_AI
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded p-3 ${
                    msg.role === 'user' 
                      ? 'bg-primary/20 text-primary border border-primary/30 rounded-br-none' 
                      : msg.role === 'system'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30 w-full text-xs font-bold text-center'
                        : 'bg-slate-800/80 text-slate-300 border border-slate-700 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 border border-slate-700 text-slate-400 rounded rounded-bl-none p-3 text-xs flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-slate-900/90 border-t border-primary/30 flex items-center gap-2">
              <span className="text-secondary text-xs font-mono">&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query agent..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-primary placeholder-primary/30 focus:ring-0"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="text-primary hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
