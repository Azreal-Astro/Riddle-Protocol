import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the levels
export enum Level {
  BOOT = 'boot',
  LEVEL1 = 'level1',
  LEVEL2 = 'level2',
  LEVEL3 = 'level3',
  LEVEL4 = 'level4',
  FINAL = 'final',
  WIN = 'win',
}

// Define the command history entry type
export interface CommandHistoryEntry {
  command: string;
  output: string;
  isError?: boolean;
  isRiddler?: boolean;
  directory?: string; // Add directory to command history
}

// Define the unlocked commands
export interface UnlockedCommands {
  ls: boolean;
  cat: boolean;
  whoami: boolean;
  curl: boolean;
  help: boolean;
  sudo: boolean;
  cd: boolean;
  pwd: boolean;
  ps: boolean;
  uname: boolean;
  grep: boolean;
  find: boolean;
  chmod: boolean;
  mkdir: boolean;
  rm: boolean;
  touch: boolean;
  echo: boolean;
  man: boolean;
  date: boolean;
}

// Define the context type
interface TerminalContextType {
  level: Level;
  setLevel: (level: Level) => void;
  commandHistory: CommandHistoryEntry[];
  addCommandToHistory: (command: string, output: string, isError?: boolean, isRiddler?: boolean) => void;
  clearCommandHistory: () => void;
  unlockedCommands: UnlockedCommands;
  unlockCommand: (command: keyof UnlockedCommands) => void;
  currentFlag: string;
  setCurrentFlag: (flag: string) => void;
  flags: Record<Level, string>;
  setFlags: (level: Level, flag: string) => void;
  validCommands: string[];
  bootComplete: boolean;
  setBootComplete: (complete: boolean) => void;
  terminalInput: string;
  setTerminalInput: (input: string) => void;
  currentDirectory: string;
  setCurrentDirectory: (dir: string) => void;
}

// Create the context
const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

// Create the provider
export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [level, setLevel] = useState<Level>(Level.BOOT);
  const [commandHistory, setCommandHistory] = useState<CommandHistoryEntry[]>([]);
  const [unlockedCommands, setUnlockedCommands] = useState<UnlockedCommands>({
    ls: true, // Start with basic commands enabled
    cat: false,
    whoami: false,
    curl: true, // Ensure curl is enabled from the start
    help: true,
    sudo: false,
    cd: true,
    pwd: true,
    ps: true,
    uname: true,
    grep: true,
    find: true,
    chmod: true,
    mkdir: true,
    rm: true,
    touch: true,
    echo: true,
    man: true,
    date: true,
  });
  const [currentFlag, setCurrentFlag] = useState<string>('');
  const [flags, setFlagsState] = useState<Record<Level, string>>({
    [Level.BOOT]: '',
    [Level.LEVEL1]: 'EnigmaCTF{g0th4m_',
    [Level.LEVEL2]: 'h4ck3d_',
    [Level.LEVEL3]: 'by_',
    [Level.LEVEL4]: 'th3_',
    [Level.FINAL]: 'r1dd13r}',
    [Level.WIN]: '',
  });
  const [bootComplete, setBootComplete] = useState<boolean>(false);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [currentDirectory, setCurrentDirectory] = useState<string>('/home/batman');

  // Valid commands based on current level
  const validCommands = [
    'help',
    ...(unlockedCommands.ls ? ['ls'] : []),
    ...(unlockedCommands.cat ? ['cat'] : []),
    ...(unlockedCommands.whoami ? ['whoami'] : []),
    ...(unlockedCommands.curl ? ['curl'] : []),
    ...(unlockedCommands.sudo ? ['sudo'] : []),
    ...(unlockedCommands.cd ? ['cd'] : []),
    ...(unlockedCommands.pwd ? ['pwd'] : []),
    ...(unlockedCommands.ps ? ['ps'] : []),
    ...(unlockedCommands.uname ? ['uname'] : []),
    ...(unlockedCommands.grep ? ['grep'] : []),
    ...(unlockedCommands.find ? ['find'] : []),
    ...(unlockedCommands.chmod ? ['chmod'] : []),
    ...(unlockedCommands.mkdir ? ['mkdir'] : []),
    ...(unlockedCommands.rm ? ['rm'] : []),
    ...(unlockedCommands.touch ? ['touch'] : []),
    ...(unlockedCommands.echo ? ['echo'] : []),
    ...(unlockedCommands.man ? ['man'] : []),
    ...(unlockedCommands.date ? ['date'] : []),
    'clear',
    'exit',
    'flag',
  ];

  // Add a command to history
  const addCommandToHistory = (
    command: string, 
    output: string, 
    isError: boolean = false,
    isRiddler: boolean = false
  ) => {
    setCommandHistory((prev) => [...prev, { 
      command, 
      output, 
      isError, 
      isRiddler, 
      directory: currentDirectory 
    }]);
  };

  // Clear command history
  const clearCommandHistory = () => {
    setCommandHistory([]);
  };

  // Unlock a command
  const unlockCommand = (command: keyof UnlockedCommands) => {
    setUnlockedCommands((prev) => ({ ...prev, [command]: true }));
  };

  // Set flag for a level
  const setFlags = (level: Level, flag: string) => {
    setFlagsState((prev) => ({ ...prev, [level]: flag }));
  };

  // When changing levels, add appropriate messages to history
  useEffect(() => {
    if (level === Level.LEVEL1 && bootComplete) {
      addCommandToHistory(
        'System',
        'Level 1: "Hidden Secrets" unlocked\nType "cat /riddles/entry.txt" to see the riddle',
        false,
        true
      );
      unlockCommand('cat');
    } else if (level === Level.LEVEL2) {
      addCommandToHistory(
        'System',
        'Level 2: "Header Games" unlocked\nType "cat /riddles/headers.txt" to see the riddle\nFlag fragment obtained: EnigmaCTF{g0th4m_',
        false,
        true
      );
      unlockCommand('whoami');
    } else if (level === Level.LEVEL3) {
      addCommandToHistory(
        'System',
        'Level 3: "Insecure References" unlocked\nType "cat /riddles/idor.txt" to see the riddle\nFlag fragment obtained: h4ck3d_',
        false,
        true
      );
    } else if (level === Level.LEVEL4) {
      addCommandToHistory(
        'System',
        'Level 4: "Internal Services" unlocked\nType "cat /riddles/ssrf.txt" to see the riddle\nFlag fragment obtained: by_',
        false,
        true
      );
    } else if (level === Level.FINAL) {
      addCommandToHistory(
        'System',
        'Final Level: "Root of All Evil" unlocked\nType "cat /riddles/final.txt" to see the riddle\nFlag fragment obtained: th3_',
        false,
        true
      );
      unlockCommand('sudo');
    } else if (level === Level.WIN) {
      addCommandToHistory(
        'System',
        'SYSTEM OVERRIDE COMPLETE.\nTHE RIDDLER HAS BEEN OUTWITTED.\nGOTHAM IS SAFE… FOR NOW.\n\nFinal flag fragment obtained: r1dd13r}\n\nComplete flag: EnigmaCTF{g0th4m_h4ck3d_by_th3_r1dd13r}\n\nCongratulations, Batman! You have defeated the Riddler and saved Gotham City!',
        false,
        true
      );
    }
  }, [level, bootComplete]);

  return (
    <TerminalContext.Provider
      value={{
        level,
        setLevel,
        commandHistory,
        addCommandToHistory,
        clearCommandHistory,
        unlockedCommands,
        unlockCommand,
        currentFlag,
        setCurrentFlag,
        flags,
        setFlags,
        validCommands,
        bootComplete,
        setBootComplete,
        terminalInput,
        setTerminalInput,
        currentDirectory,
        setCurrentDirectory,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

// Create the hook
export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};
