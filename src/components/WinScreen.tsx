
import React, { useEffect, useState } from 'react';
import TypingEffect from './TypingEffect';
import { useTerminal } from '../context/TerminalContext';
import { Shield, Trophy, Rotate3D } from 'lucide-react';

const WinScreen: React.FC = () => {
  const [playLaugh, setPlayLaugh] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { flags } = useTerminal();

  useEffect(() => {
    // Show initial animations
    const laughTimer = setTimeout(() => {
      setPlayLaugh(true);
    }, 3000);
    
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 1500);

    return () => {
      clearTimeout(laughTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  // Construct the complete flag from fragments
  const completeFlag = `${flags.level1}${flags.level2}${flags.level3}${flags.level4}${flags.final}`;

  const winMessages = [
    'SYSTEM OVERRIDE COMPLETE.',
    'THE RIDDLER HAS BEEN OUTWITTED.',
    'GOTHAM IS SAFE… FOR NOW.',
    '',
    'All flag fragments collected:',
    `- ${flags.level1}`,
    `- ${flags.level2}`,
    `- ${flags.level3}`,
    `- ${flags.level4}`,
    `- ${flags.final}`,
    '',
    `Complete flag: ${completeFlag}`,
    '',
    'But wait... what is that sound?'
  ];

  // Random confetti elements
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    const confettiItems = [];
    const colors = ['#00FF00', '#6A0DAD', '#FFFFFF', '#FFD700'];
    
    for (let i = 0; i < 50; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
      };
      
      confettiItems.push(
        <div 
          key={i} 
          className="absolute rounded-full animate-confetti opacity-70"
          style={style}
        />
      );
    }
    
    return confettiItems;
  };

  return (
    <div className="min-h-screen bg-terminal-dark text-terminal-green flex flex-col items-center justify-center crt p-8 relative overflow-hidden">
      <div className="scanline animate-scanline"></div>
      {renderConfetti()}
      
      <div className="max-w-2xl text-center space-y-4 relative z-10">
        <div className="flex justify-center mb-8">
          <Shield className="text-terminal-green animate-pulse h-16 w-16" />
          <Trophy className="text-terminal-green animate-bounce h-16 w-16 mx-4" />
          <Rotate3D className="text-terminal-green animate-spin h-16 w-16" />
        </div>
        
        <div className="animate-textGlitch mb-8">
          <h1 className="text-4xl font-bold mb-2 animate-scale-in">MISSION ACCOMPLISHED</h1>
          <div className="text-lg">
            {winMessages.map((message, index) => (
              <div key={index} className="mt-2 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <TypingEffect text={message} typingSpeed={30} />
              </div>
            ))}
          </div>
        </div>
        
        {playLaugh && (
          <div className="mt-8 animate-glitch text-terminal-purple text-xl border border-terminal-purple p-4 bg-black bg-opacity-50">
            "HA HA HA HA HA... DID YOU REALLY THINK IT WOULD BE THAT EASY?"
          </div>
        )}
        
        <div className="mt-16 opacity-70 animate-fade-in" style={{ animationDelay: '4s' }}>
          <p className="hover:scale-110 transition-transform duration-300">Hint: The next challenge might be hiding in plain sight...</p>
          <p className="mt-4 hover:text-terminal-purple transition-colors duration-300">Refresh the page to play again</p>
        </div>
      </div>
    </div>
  );
};

export default WinScreen;
