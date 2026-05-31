import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ASCII_ART = `
  ____  _____            _   _  ____   ___  _   _ 
 |  _ \\|  __ \\     /\\   | \\ | |/ __ \\ / _ \\| \\ | |
 | |_) | |__) |   /  \\  |  \\| | |  | | | | |  \\| |
 |  _ <|  _  /   / /\\ \\ | . \` | |  | | | | | . \` |
 | |_) | | \\ \\  / ____ \\| |\\  | |__| | |_| | |\\  |
 |____/|_|  \\_\\/_/    \\_\\_| \\_|\\____/ \\___/|_| \\_|
                                                  
`;

const BIO_TEXT = `Brandon Tan Hup Le | Software Engineer
> Terminal Identity: brandon@v-x-core:~$
> Class: Software Engineer
> Status: ACTIVE
> Loc: Singapore
`;

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'system', content: ASCII_ART },
    { type: 'system', content: 'Welcome to V-X Dossier. Type "help" for available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isGlitching]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add user command to history
    setHistory(prev => [...prev, { type: 'user', command: cmd }]);

    let response = '';

    switch (trimmedCmd) {
      case 'help':
        response = `Available commands:
  help    - Show this message
  about   - Brief introduction
  linkedin - Redirect to LinkedIn profile
  clear   - Clear terminal output
  whoami  - Identify current user`;
        setHistory(prev => [...prev, { type: 'system', content: response }]);
        break;
      case 'linkedin':
        response = 'INITIALIZING EXTERNAL LINK... REDIRECTING TO LINKEDIN PROFILE.';
        setHistory(prev => [...prev, { type: 'system', content: response }]);
        window.open('https://www.linkedin.com/in/brandon-tan03/', '_blank');
        break;
      case 'about':
        response = 'I am Brandon Tan Hup Le, a Software Engineer with a passion for building robust full-stack applications and creating dynamic, hacker-aesthetic interfaces. I specialize in Java, Spring Boot, and automation frameworks.';
        setHistory(prev => [...prev, { type: 'system', content: response }]);
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'whoami':
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          setHistory(prev => [...prev, { type: 'system', content: BIO_TEXT }]);
        }, 800); // 800ms glitch duration
        break;
      case '':
        break; // Do nothing for empty enter
      default:
        response = `bash: ${trimmedCmd}: command not found`;
        setHistory(prev => [...prev, { type: 'system', content: response }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto mb-10 sm:mb-16 px-4 md:px-0"
    >
      <div className="glass-panel p-4 sm:p-6 min-h-[400px] flex flex-col relative overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-primary/20">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="ml-2 text-xs text-primary/70">v-x-core ~ terminal</span>
        </div>

        {/* Terminal Content */}
        <div className={`flex-1 font-mono text-xs sm:text-sm md:text-base ${isGlitching ? 'animate-glitch text-secondary' : 'text-primary'}`}>
          {history.map((line, i) => (
            <div key={i} className="mb-2">
              {line.type === 'system' ? (
                line.content === ASCII_ART ? (
                  <pre className="whitespace-pre font-mono leading-[1.1] text-[6px] min-[360px]:text-[7px] min-[400px]:text-[8px] min-[480px]:text-[10px] sm:text-xs md:text-sm overflow-x-auto scrollbar-none">{line.content}</pre>
                ) : (
                  <pre className="whitespace-pre-wrap font-mono leading-relaxed text-xs sm:text-sm md:text-base">{line.content}</pre>
                )
              ) : (
                <div className="flex items-start">
                  <span className="text-secondary mr-2 shrink-0">
                    <span className="hidden sm:inline">brandon@v-x-core</span>
                    <span className="inline sm:hidden">brandon@v-x</span>
                    :~$
                  </span>
                  <span className="whitespace-pre-wrap text-primary break-all">{line.command}</span>
                </div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-start mt-2">
            <span className="text-secondary mr-2 shrink-0">
              <span className="hidden sm:inline">brandon@v-x-core</span>
              <span className="inline sm:hidden">brandon@v-x</span>
              :~$
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-primary caret-primary focus:ring-0 p-0 m-0 break-all text-xs sm:text-sm md:text-base"
              autoFocus
              spellCheck="false"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </motion.div>
  );
}
