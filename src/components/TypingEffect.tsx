
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  typingSpeed = 30, 
  className = '', 
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete && onComplete();
    }
  }, [currentIndex, text, typingSpeed, onComplete, isComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <span className={`${className} ${!isComplete ? 'typing-effect' : ''}`}>
      {displayedText}
    </span>
  );
};

export default TypingEffect;
