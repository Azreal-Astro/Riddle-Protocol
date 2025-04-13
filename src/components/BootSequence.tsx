
import React, { useState, useEffect } from 'react';
import TypingEffect from './TypingEffect';
import { Level, useTerminal } from '../context/TerminalContext';

const bootSequenceLines = [
  'G.C.P.D VM v3.1 [Bootloader]',
  'Initializing system...',
  'Checking system integrity... WARNING: Tampering detected!',
  'Mounting /etc/riddles/',
  'Loading challenge modules...',
  'Injecting mind games...',
  'Setting up firewall... BYPASSED!',
  'Setting up timer... 08:00 minutes remaining',
  'Launching interface...',
  'Welcome, Detective.'
];

const BootSequence: React.FC = () => {
  const { setBootComplete, setLevel } = useTerminal();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showLines, setShowLines] = useState<string[]>([]);

  useEffect(() => {
    if (currentLineIndex < bootSequenceLines.length) {
      setShowLines((prev) => [...prev, bootSequenceLines[currentLineIndex]]);
    } else {
      // Boot sequence is complete
      setTimeout(() => {
        setBootComplete(true);
        setLevel(Level.LEVEL1);
      }, 1000);
    }
  }, [currentLineIndex, setBootComplete, setLevel]);

  const handleLineComplete = () => {
    setCurrentLineIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col space-y-2 p-4">
      {showLines.map((line, index) => (
        <div key={index} className="terminal-line">
          {index < currentLineIndex ? (
            <span>{line}</span>
          ) : (
            <TypingEffect 
              text={line} 
              typingSpeed={40} 
              onComplete={handleLineComplete}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BootSequence;
