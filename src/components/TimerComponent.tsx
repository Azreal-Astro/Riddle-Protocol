
import React, { useState, useEffect } from 'react';
import { useTerminal, Level } from '../context/TerminalContext';
import { Clock, AlertCircle, ZoomIn, ZoomOut } from 'lucide-react';

interface TimerComponentProps {
  initialTime: number; // in seconds
  speed?: number;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ 
  initialTime, 
  speed = 1 
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const { level } = useTerminal();
  const [currentSpeed, setCurrentSpeed] = useState<number>(speed);
  
  useEffect(() => {
    if (level === Level.BOOT) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          window.location.reload();
          return 0;
        }
        
        // Set warning state when less than 60 seconds remain
        if (prev <= 60 && !isWarning) {
          setIsWarning(true);
        }
        
        return prev - 1 / currentSpeed;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [level, isWarning, currentSpeed]);
  
  const handleSpeedChange = (newSpeed: number) => {
    setCurrentSpeed(newSpeed);
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (level === Level.BOOT) return null;
  
  return (
    <div className={`fixed top-4 right-4 flex items-center space-x-2 bg-black bg-opacity-70 p-2 rounded border 
      ${isWarning ? 'border-red-500 animate-pulse' : 'border-terminal-green'} 
      transition-all duration-300 animate-fade-in z-50`}>
      <div className="flex items-center space-x-2">
        <Clock className={`${isWarning ? 'text-red-500' : 'text-terminal-green'} animate-spin`} size={18} />
        <span className={`font-mono ${isWarning ? 'text-red-500 animate-textGlitch' : 'text-terminal-green'}`}>
          {isWarning && <AlertCircle className="inline mr-1 animate-pulse" size={14} />}
          {formatTime(timeRemaining)}
        </span>
        
        <div className="flex items-center space-x-1 ml-4">
          <button 
            onClick={() => handleSpeedChange(Math.max(0, currentSpeed - 0))} 
            className="hover:bg-terminal-purple p-1 rounded transition-colors"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs text-terminal-green">Speed: {currentSpeed}x</span>
          <button 
            onClick={() => handleSpeedChange(Math.min(12, currentSpeed + 0))} 
            className="hover:bg-terminal-purple p-1 rounded transition-colors"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;

