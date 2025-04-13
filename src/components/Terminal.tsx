import React, { useRef, useEffect, KeyboardEvent } from 'react';
import { useTerminal, Level } from '../context/TerminalContext';
import { processCommand } from '../utils/commandProcessor';
import BootSequence from './BootSequence';
import TypingEffect from './TypingEffect';
import TimerComponent from './TimerComponent';
import { X, MinusSquare, SquareCode } from 'lucide-react';

const Terminal: React.FC = () => {
  const { 
    level,
    setLevel,
    commandHistory,
    addCommandToHistory,
    clearCommandHistory,
    validCommands,
    bootComplete,
    flags,
    currentFlag,
    setCurrentFlag,
    terminalInput,
    setTerminalInput,
    currentDirectory,
    setCurrentDirectory
  } = useTerminal();
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommandSubmit = () => {
    if (terminalInput.trim() === 'clear') {
      clearCommandHistory();
    } else if (terminalInput.trim() === '12344321@pp') {
      // Skip code to advance levels for testing
      const skipMsg = 'ADMIN CODE ACCEPTED: Level skipping enabled';
      addCommandToHistory('SYSTEM', skipMsg, false, true);
      
      // Ask which level to skip to
      addCommandToHistory('SYSTEM', 'Enter level number (1-5) or "win" to jump to win screen:', false, true);
      
      // Set up a special mode to handle the next input as a level skip
      localStorage.setItem('awaitingLevelSkip', 'true');
      
    } else if (localStorage.getItem('awaitingLevelSkip') === 'true') {
      // Handle level skip selection
      localStorage.removeItem('awaitingLevelSkip');
      const selection = terminalInput.trim().toLowerCase();
      
      // Map input to level
      if (selection === '1') {
        setLevel(Level.LEVEL1);
        addCommandToHistory('SYSTEM', 'Skipped to Level 1', false, true);
      } else if (selection === '2') {
        setLevel(Level.LEVEL2);
        addCommandToHistory('SYSTEM', 'Skipped to Level 2', false, true);
      } else if (selection === '3') {
        setLevel(Level.LEVEL3);
        addCommandToHistory('SYSTEM', 'Skipped to Level 3', false, true);
      } else if (selection === '4') {
        setLevel(Level.LEVEL4);
        addCommandToHistory('SYSTEM', 'Skipped to Level 4', false, true);
      } else if (selection === '5') {
        setLevel(Level.FINAL);
        addCommandToHistory('SYSTEM', 'Skipped to Final Level', false, true);
      } else if (selection === 'win') {
        setLevel(Level.WIN);
        addCommandToHistory('SYSTEM', 'Skipped to Win Screen', false, true);
      } else {
        addCommandToHistory('SYSTEM', 'Invalid level selection. Continuing game.', true, false);
      }
    } else {
      processCommand(
        terminalInput,
        level,
        addCommandToHistory,
        validCommands,
        setLevel,
        flags,
        currentFlag,
        setCurrentFlag,
        currentDirectory,
        setCurrentDirectory
      );
    }
    setTerminalInput('');
  };

  const formatPrompt = () => {
    return `batman@gotham:${currentDirectory === '/home/batman' ? '~' : currentDirectory}$`;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommandSubmit();
    }
  };

  useEffect(() => {
    if (bootComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootComplete]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    if (bootComplete && level === Level.LEVEL1) {
      // Make level 1 harder by hiding the secretKey better
      // Create the secret object with the base64 encoded flag
      const secretObj = { _internal: { config: { flags: { security: window.btoa("EnigmaCTF{g0th4m_") } } } };
      // Attach it to window
      // @ts-ignore
      window._batcomputer = secretObj;
      
      // Add a listener for the console.log event
      const originalConsoleLog = console.log;
      console.log = (...args: any[]) => {
        const logStr = args.join(' ');
        if (logStr.includes("EnigmaCTF{g0th4m_") || 
            (typeof args[0] === 'string' && args[0] === window.btoa("EnigmaCTF{g0th4m_"))) {
          // If the decoded string or the encoded string is logged, count it as found
          setCurrentFlag(flags.level1);
          addCommandToHistory(
            'Console',
            'Flag fragment found: EnigmaCTF{g0th4m_',
            false,
            true
          );
          
          // Set a timeout to move to the next level
          setTimeout(() => {
            setLevel(Level.LEVEL2);
          }, 1500);
        }
        return originalConsoleLog(...args);
      };
      
      return () => {
        console.log = originalConsoleLog;
      };
    }
  }, [bootComplete, level, flags, setCurrentFlag, addCommandToHistory, setLevel]);

  // Display collected flag fragments
  const displayFlagFragments = () => {
    const collectedFragments = [];
    
    if (level === Level.LEVEL2 || level === Level.LEVEL3 || level === Level.LEVEL4 || level === Level.FINAL || level === Level.WIN) {
      collectedFragments.push(flags.level1); // First fragment
    }
    
    if (level === Level.LEVEL3 || level === Level.LEVEL4 || level === Level.FINAL || level === Level.WIN) {
      collectedFragments.push(flags.level2); // Second fragment
    }
    
    if (level === Level.LEVEL4 || level === Level.FINAL || level === Level.WIN) {
      collectedFragments.push(flags.level3); // Third fragment
    }
    
    if (level === Level.FINAL || level === Level.WIN) {
      collectedFragments.push(flags.level4); // Fourth fragment
    }
    
    if (level === Level.WIN) {
      collectedFragments.push(flags.final); // Final fragment
    }
    
    return collectedFragments.join('');
  };

  return (
    <div className="flex flex-col h-screen bg-terminal-dark text-terminal-green relative overflow-hidden">
      {/* Add animated glitch effect overlay */}
      <div className="absolute inset-0 bg-terminal-dark opacity-10 z-10 pointer-events-none animate-glitch"></div>
      
      {/* Add timer component with speed control */}
      <TimerComponent initialTime={480} speed={1} /> {/* 8 minutes = 480 seconds */}
      
      <div className="flex items-center justify-between p-2 bg-black bg-opacity-50 border-b border-terminal-gray z-20">
        <div className="text-sm font-bold terminal-title animate-textGlitch">G.C.P.D Portal</div>
        <div className="flex space-x-2">
          <button className="text-terminal-gray hover:text-terminal-white transition-colors duration-300">
            <MinusSquare size={16} className="animate-pulse" />
          </button>
          <button className="text-terminal-gray hover:text-terminal-white transition-colors duration-300">
            <SquareCode size={16} className="hover:animate-spin" />
          </button>
          <button className="text-terminal-gray hover:text-terminal-white transition-colors duration-300">
            <X size={16} className="hover:animate-bounce" />
          </button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm crt relative z-20"
      >
        <div className="scanline animate-scanline"></div>
        
        {!bootComplete ? (
          <BootSequence />
        ) : (
          <>
            {commandHistory.map((entry, index) => (
              <div key={index} className="mb-2 animate-fade-in">
                {entry.command && (
                  <div className="terminal-line">
                    <span className="terminal-line-prompt">
                      {entry.directory === '/home/batman' ? 'batman@gotham:~$' : `batman@gotham:${entry.directory}$`}
                    </span>
                    <span className="terminal-line-input">{entry.command}</span>
                  </div>
                )}
                {entry.output && (
                  <div 
                    className={`terminal-line ${entry.isError ? 'terminal-line-error' : ''} ${entry.isRiddler ? 'riddler-text' : ''}`}
                  >
                    {entry.output}
                  </div>
                )}
              </div>
            ))}
            
            <div className="terminal-line flex animate-blink">
              <span className="terminal-line-prompt">{formatPrompt()}</span>
              <input
                ref={inputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent flex-1 focus:outline-none terminal-line-input caret-terminal-green"
                autoFocus={bootComplete}
              />
            </div>
          </>
        )}
      </div>
      
      <div className="p-2 bg-black bg-opacity-50 border-t border-terminal-gray flex justify-between text-xs z-20">
        <div className="animate-textGlitch">
          {level !== 'boot' && `Current Level: ${level}`}
        </div>
        <div className="animate-pulse">
          {level !== 'boot' && `Flag fragments: ${displayFlagFragments()}`}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
