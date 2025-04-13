
import React from 'react';
import { TerminalProvider, Level, useTerminal } from '../context/TerminalContext';
import Terminal from '../components/Terminal';
import WinScreen from '../components/WinScreen';

const TerminalApp: React.FC = () => {
  const { level } = useTerminal();
  
  return (
    <div className="min-h-screen bg-terminal-dark">
      {level === Level.WIN ? <WinScreen /> : <Terminal />}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <TerminalProvider>
      <TerminalApp />
    </TerminalProvider>
  );
};

export default Index;
