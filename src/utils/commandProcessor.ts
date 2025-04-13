import { Level, CommandHistoryEntry, useTerminal } from '../context/TerminalContext';

// Node structure for file system simulation
interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, FileSystemNode>;
  permissions?: string;
  owner?: string;
  group?: string;
  size?: number;
  lastModified?: Date;
}

// More complex file system structure with advanced permissions
const fileSystem: FileSystemNode = {
  name: '/',
  type: 'directory',
  permissions: 'drwxr-xr-x',
  owner: 'root',
  group: 'root',
  lastModified: new Date('2023-12-01'),
  children: {
    bin: {
      name: 'bin',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'root',
      group: 'root',
      lastModified: new Date('2023-11-15'),
      children: {
        bash: { name: 'bash', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 1258291, lastModified: new Date('2023-10-21') },
        cat: { name: 'cat', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 35472, lastModified: new Date('2023-10-21') },
        cd: { name: 'cd', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 52481, lastModified: new Date('2023-10-21') },
        chmod: { name: 'chmod', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 67452, lastModified: new Date('2023-10-21') },
        cp: { name: 'cp', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 147368, lastModified: new Date('2023-10-21') },
        curl: { name: 'curl', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 219784, lastModified: new Date('2023-10-21') },
        date: { name: 'date', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 105724, lastModified: new Date('2023-10-21') },
        echo: { name: 'echo', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 35128, lastModified: new Date('2023-10-21') },
        find: { name: 'find', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 238152, lastModified: new Date('2023-10-21') },
        grep: { name: 'grep', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 201536, lastModified: new Date('2023-10-21') },
        kill: { name: 'kill', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 26384, lastModified: new Date('2023-10-21') },
        ls: { name: 'ls', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 142144, lastModified: new Date('2023-10-21') },
        mkdir: { name: 'mkdir', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 67584, lastModified: new Date('2023-10-21') },
        mv: { name: 'mv', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 143360, lastModified: new Date('2023-10-21') },
        ps: { name: 'ps', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 174064, lastModified: new Date('2023-10-21') },
        pwd: { name: 'pwd', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 35128, lastModified: new Date('2023-10-21') },
        rm: { name: 'rm', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 76808, lastModified: new Date('2023-10-21') },
        sudo: { name: 'sudo', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 166280, lastModified: new Date('2023-10-21') },
        touch: { name: 'touch', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 80944, lastModified: new Date('2023-10-21') },
        whoami: { name: 'whoami', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 26416, lastModified: new Date('2023-10-21') },
        uname: { name: 'uname', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 39344, lastModified: new Date('2023-10-21') },
      }
    },
    etc: {
      name: 'etc',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'root',
      group: 'root',
      lastModified: new Date('2023-11-20'),
      children: {
        passwd: { 
          name: 'passwd', 
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          size: 2341,
          lastModified: new Date('2023-11-15'),
          content: `root:x:0:0:root:/root:/bin/bash
batman:x:1000:1000:Bruce Wayne:/home/batman:/bin/bash
riddler:x:1001:1001:Edward Nigma:/home/riddler:/bin/bash
alfred:x:1002:1002:Alfred Pennyworth:/home/alfred:/bin/bash
gordon:x:1003:1003:Jim Gordon:/home/gordon:/bin/bash`
        },
        shadow: { 
          name: 'shadow', 
          type: 'file',
          permissions: '-rw-r-----',
          owner: 'root',
          group: 'shadow',
          size: 1420,
          lastModified: new Date('2023-11-15'),
        },
        hostname: { 
          name: 'hostname', 
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          size: 11,
          lastModified: new Date('2023-10-05'),
          content: 'gotham-ctf'
        },
        hosts: { 
          name: 'hosts', 
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          size: 221,
          lastModified: new Date('2023-10-05'),
          content: `127.0.0.1   localhost
127.0.1.1   gotham-ctf
::1         localhost ip6-localhost ip6-loopback
ff02::1     ip6-allnodes
ff02::2     ip6-allrouters`
        },
        'resolv.conf': { 
          name: 'resolv.conf', 
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          size: 98,
          lastModified: new Date('2023-11-15'),
        },
        fstab: { 
          name: 'fstab', 
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          size: 753,
          lastModified: new Date('2023-10-05'),
        },
        'config.json': { 
          name: 'config.json', 
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          size: 482,
          lastModified: new Date('2023-11-01'),
          content: `{
  "security": {
    "level": "high",
    "firewalls": ["North", "South", "East", "West"],
    "ports": {
      "open": [22, 80, 443],
      "filtered": [8080, 8443],
      "closed": "all"
    },
    "encryption": "AES-256",
    "audit_level": "paranoid"
  }
}`
        },
        ssh: { 
          name: 'ssh', 
          type: 'directory',
          permissions: 'drwxr-xr-x',
          owner: 'root',
          group: 'root',
          lastModified: new Date('2023-10-05'),
          children: {
            'sshd_config': {
              name: 'sshd_config',
              type: 'file',
              permissions: '-rw-r--r--',
              owner: 'root',
              group: 'root',
              size: 3267,
              lastModified: new Date('2023-10-05'),
            }
          }
        }
      }
    },
    home: {
      name: 'home',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'root',
      group: 'root',
      lastModified: new Date('2023-10-05'),
      children: {
        batman: { 
          name: 'batman', 
          type: 'directory',
          permissions: 'drwxr-x---',
          owner: 'batman',
          group: 'batman',
          lastModified: new Date('2023-11-20'),
          children: {
            '.bashrc': {
              name: '.bashrc',
              type: 'file',
              permissions: '-rw-r-----',
              owner: 'batman',
              group: 'batman',
              size: 3782,
              lastModified: new Date('2023-10-05'),
            },
            '.profile': {
              name: '.profile',
              type: 'file',
              permissions: '-rw-r-----',
              owner: 'batman',
              group: 'batman',
              size: 1120,
              lastModified: new Date('2023-10-05'),
            },
            '.ssh': {
              name: '.ssh',
              type: 'directory',
              permissions: 'drwx------',
              owner: 'batman',
              group: 'batman',
              lastModified: new Date('2023-10-05'),
              children: {
                'id_rsa': {
                  name: 'id_rsa',
                  type: 'file',
                  permissions: '-rw-------',
                  owner: 'batman',
                  group: 'batman',
                  size: 2610,
                  lastModified: new Date('2023-10-05'),
                }
              }
            }
          }
        },
        riddler: { 
          name: 'riddler', 
          type: 'directory',
          permissions: 'drwxr-x---',
          owner: 'riddler',
          group: 'riddler',
          lastModified: new Date('2023-11-15'),
          children: {}
        }
      }
    },
    riddles: {
      name: 'riddles',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'riddler',
      group: 'riddler',
      lastModified: new Date('2023-11-20'),
      children: {
        'entry.txt': { 
          name: 'entry.txt', 
          type: 'file',
          permissions: '-r--r--r--',
          owner: 'riddler',
          group: 'riddler',
          size: 331,
          lastModified: new Date('2023-11-20'),
          content: `"I'm not who you see, but what the browser sees me to be.
A secret object lies within, hidden deep from plain sight.
Find the _batcomputer and look inside...
What secrets might it hold? What base might it hide?"

Hint : 'window._batcomputer._internal.config.flags.security`
        },
        'headers.txt': { 
          name: 'headers.txt', 
          type: 'file',
          permissions: '-r--r--r--',
          owner: 'riddler',
          group: 'riddler',
          size: 428,
          lastModified: new Date('2023-11-20'),
          content: `"I live between the lines, above the page, where most forget to see.
What CORSes the problem, reveals me. But to find me, you must be specific.
Headers may look simple at first, but look again for what's amiss.

You need BOTH the right command AND the right options."

Hint: Examine HTTP headers carefully using the appropriate tool with all available options.

Hint: '--verbose whoami --headers  --all`
        },
        'idor.txt': { 
          name: 'idor.txt', 
          type: 'file',
          permissions: '-r--r--r--',
          owner: 'riddler',
          group: 'riddler',
          size: 485,
          lastModified: new Date('2023-11-20'),
          content: `"One user, two user, three user, more...
Try walking through doors never walked before.
Access what's not yours by simply changing a number.
But which resource and which ID will break Riddler's slumber?"

Hint: IDOR vulnerability exists in multiple endpoints. Find the right one.

Try accessing various IDs at different endpoints:
- /profile?id=2
- /account?id=2
- /user?id=2
- /api/users/2`
        },
        'ssrf.txt': { 
          name: 'ssrf.txt', 
          type: 'file',
          permissions: '-r--r--r--',
          owner: 'riddler',
          group: 'riddler',
          size: 410,
          lastModified: new Date('2023-11-20'),
          content: `"Talk to yourself and you might hear...
a secret port that whispers near.
But which one? The city sleeps at night,
While Gotham's services hide in plain sight."

Hint: SSRF vulnerability allows access to internal services on non-standard ports.

Try accessing various internal endpoints on different ports:
- 127.0.0.1:8080
- localhost:9090
- 127.0.0.1:1337
- internal-api:8080`
        },
        'final.txt': { 
          name: 'final.txt', 
          type: 'file',
          permissions: '-r--r--r--',
          owner: 'riddler',
          group: 'riddler',
          size: 579,
          lastModified: new Date('2023-11-20'),
          content: `"When riddles fall, and secrets break,
One command holds what others can't take.
A script so flawed, a check so weak,
That with the right phrase, root you will seek.

But simple injection won't do here,
You must craft your payload with special care.
Symbols and quotes, escapes and more,
That's what it takes to open this door."

Hint: Advanced command injection with proper escaping and specific syntax.

Try various payloads with sudo:
sudo ./admin.sh --user="batman" --role="admin||echo EnigmaCTF{root_access_granted}"
sudo -u root -p 'batman; echo "EnigmaCTF{root_granted}"
sudo -u root -p 'batman; echo "EnigmaCTF{root_access__granted}"
sudo -u root -p 'batman; echo "EnigmaCTF{access_granted}"
sudo -u root -p 'batman_riddler; echo "EnigmaCTF{root_access_granted}"
sudo -u root -p 'batman_is_not_ready; echo "EnigmaCTF{root_access_granted}"
sudo -u root -p 'batman'1223'; echo "EnigmaCTF{root_access_granted}"'`
        }
      }
    },
    usr: {
      name: 'usr',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'root',
      group: 'root',
      lastModified: new Date('2023-10-05'),
      children: {
        bin: { name: 'bin', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        include: { name: 'include', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        lib: { name: 'lib', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        local: { name: 'local', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        sbin: { name: 'sbin', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        share: { name: 'share', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        src: { name: 'src', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
      }
    },
    var: {
      name: 'var',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'root',
      group: 'root',
      lastModified: new Date('2023-10-05'),
      children: {
        cache: { name: 'cache', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        crash: { name: 'crash', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        lib: { name: 'lib', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        local: { name: 'local', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        lock: { name: 'lock', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        log: { 
          name: 'log', 
          type: 'directory', 
          permissions: 'drwxr-xr-x', 
          owner: 'root', 
          group: 'root', 
          lastModified: new Date('2023-11-15'), 
          children: {
            'auth.log': {
              name: 'auth.log',
              type: 'file',
              permissions: '-rw-r-----',
              owner: 'root',
              group: 'adm',
              size: 18245,
              lastModified: new Date('2023-11-15'),
            },
            'syslog': {
              name: 'syslog',
              type: 'file',
              permissions: '-rw-r-----',
              owner: 'root',
              group: 'adm',
              size: 54321,
              lastModified: new Date('2023-11-15'),
            }
          } 
        },
        mail: { name: 'mail', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        run: { name: 'run', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        spool: { name: 'spool', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05'), children: {} },
        tmp: { name: 'tmp', type: 'directory', permissions: 'drwxrwxrwt', owner: 'root', group: 'root', lastModified: new Date('2023-11-15'), children: {} },
      }
    },
    tmp: {
      name: 'tmp',
      type: 'directory',
      permissions: 'drwxrwxrwt',
      owner: 'root',
      group: 'root',
      lastModified: new Date('2023-11-15'),
      children: {}
    },
    sbin: {
      name: 'sbin',
      type: 'directory',
      permissions: 'drwxr-xr-x', 
      owner: 'root',
      group: 'root',
      lastModified: new Date('2023-10-05'),
      children: {}
    },
    root: {
      name: 'root',
      type: 'directory',
      permissions: 'drwx------',
      owner: 'root',
      group: 'root',
      lastModified: new Date('2023-10-05'),
      children: {}
    }
  }
};

// Helper function to resolve a path
const resolvePath = (currentPath: string, targetPath: string): string => {
  // Handle absolute paths
  if (targetPath.startsWith('/')) {
    return targetPath;
  }
  
  // Handle home directory shortcut
  if (targetPath === '~' || targetPath === '') {
    return '/home/batman';
  }
  
  // Handle .. (parent directory)
  if (targetPath === '..') {
    const parts = currentPath.split('/').filter(p => p);
    if (parts.length === 0) return '/';
    parts.pop();
    return '/' + parts.join('/');
  }
  
  // Handle . (current directory)
  if (targetPath === '.') {
    return currentPath;
  }
  
  // Handle relative paths
  return currentPath === '/' ? `/${targetPath}` : `${currentPath}/${targetPath}`;
};

// Helper function to get a node from the file system
const getNode = (path: string): FileSystemNode | null => {
  if (path === '/') return fileSystem;
  
  const parts = path.split('/').filter(p => p);
  let current = fileSystem;
  
  for (const part of parts) {
    if (!current.children || !current.children[part]) {
      return null;
    }
    current = current.children[part];
  }
  
  return current;
};

// Format size for ls -l output
const formatSize = (size?: number): string => {
  if (size === undefined) return '0';
  return size.toString().padStart(8, ' ');
};

// Format date for ls -l output
const formatDate = (date?: Date): string => {
  if (!date) return 'Jan 01 00:00';
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });
};

// Helper function to list contents of a directory
const listDirectory = (path: string, options: string[] = []): string => {
  const node = getNode(path);
  if (!node || node.type !== 'directory') {
    return 'No such file or directory';
  }
  
  if (!node.children || Object.keys(node.children).length === 0) {
    return '';
  }
  
  const isLongFormat = options.includes('-l') || options.includes('--long');
  const showHidden = options.includes('-a') || options.includes('--all');
  const showAlmostAll = options.includes('-A') || options.includes('--almost-all');
  
  let children = Object.values(node.children);
  
  // Filter hidden files unless -a or -A is specified
  if (!showHidden && !showAlmostAll) {
    children = children.filter(child => !child.name.startsWith('.'));
  }
  
  // Add . and .. for -a
  if (showHidden) {
    children.unshift(
      { name: '.', type: 'directory', permissions: node.permissions, owner: node.owner, group: node.group, lastModified: node.lastModified },
      { name: '..', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', lastModified: new Date('2023-10-05') }
    );
  }
  
  if (isLongFormat) {
    // Format like a real ls -l command
    const total = children.reduce((sum, child) => sum + (child.size || 0), 0) / 1024;
    
    const rows = children.map(child => {
      const permissions = child.permissions || (child.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--');
      const owner = child.owner || 'root';
      const group = child.group || 'root';
      const size = formatSize(child.size);
      const date = formatDate(child.lastModified);
      
      return `${permissions} 1 ${owner.padEnd(8)} ${group.padEnd(8)} ${size} ${date} ${child.name}${child.type === 'directory' ? '/' : ''}`;
    });
    
    return `total ${Math.ceil(total)}\n${rows.join('\n')}`;
  }
  
  // Simple format with colors (simulated with slashes for directories)
  return children
    .map(child => `${child.name}${child.type === 'directory' ? '/' : ''}`)
    .join('  ');
};

// Handle commands based on the current level
export const processCommand = (
  command: string,
  level: Level,
  addCommandToHistory: (command: string, output: string, isError?: boolean, isRiddler?: boolean) => void,
  validCommands: string[],
  setLevel: (level: Level) => void,
  flags: Record<Level, string>,
  currentFlag: string,
  setCurrentFlag: (flag: string) => void,
  currentDirectory: string,
  setCurrentDirectory: (dir: string) => void
): void => {
  const commandParts = command.trim().split(' ');
  const baseCommand = commandParts[0].toLowerCase();
  
  // Check if the command is valid
  if (!validCommands.includes(baseCommand) && baseCommand !== '') {
    addCommandToHistory(
      command,
      `Command not found: ${baseCommand}. Type 'help' for available commands.`,
      true
    );
    return;
  }

  // Process commands
  switch (baseCommand) {
    case 'help':
      const helpText = `
Available commands:
  help - Show this help message
  clear - Clear the terminal
  ls [options] [directory] - List files in a directory
    -l, --long    Long format listing
    -a, --all     Show all files including hidden ones
    -A, --almost-all  Show hidden files except . and ..
  cat [file] - Display the contents of a file
  cd [directory] - Change directory
  pwd - Print working directory
  whoami [options] - Display current user
    --headers    Display HTTP headers
    --verbose    Show verbose information
    --all        Show all available information
  curl [url] - Make an HTTP request
    -v, --verbose    Verbose output
    -H "Header: Value"    Add custom header
  sudo [command] - Execute command with root privileges
  grep [pattern] [file] - Search for patterns in files
  find [path] [expression] - Search for files
  chmod [mode] [file] - Change file permissions
  ps [options] - Report process status
    -aux    Show all processes
  mkdir [directory] - Create a directory
  rm [options] [file] - Remove files or directories
    -r, --recursive    Remove directories recursively
    -f, --force    Force removal
  touch [file] - Create an empty file
  echo [text] - Display a line of text
  man [command] - Display manual for a command
  uname [options] - Print system information
    -a, --all    Print all information
  date - Display the current date and time
  flag [code] - Submit a flag
  exit - Exit the terminal
`;
      addCommandToHistory(command, helpText);
      break;

    case 'clear':
      // Clear is handled by the Terminal component
      break;

    case 'ls':
      // Extract options and target
      const lsOptions: string[] = [];
      let lsTarget = '.';
      
      for (let i = 1; i < commandParts.length; i++) {
        const part = commandParts[i];
        if (part.startsWith('-')) {
          lsOptions.push(part);
        } else {
          lsTarget = part;
        }
      }
      
      // Resolve the target path
      const resolvedLsPath = resolvePath(currentDirectory, lsTarget);
      const lsOutput = listDirectory(resolvedLsPath, lsOptions);
      
      addCommandToHistory(command, lsOutput);
      break;

    case 'cat':
      const file = commandParts[1];
      
      if (!file) {
        addCommandToHistory(command, 'Usage: cat [file]', true);
        break;
      }

      // Resolve the file path
      const resolvedFilePath = resolvePath(currentDirectory, file);
      const fileNode = getNode(resolvedFilePath);
      
      if (!fileNode || fileNode.type !== 'file') {
        addCommandToHistory(command, 'No such file or directory', true);
        break;
      }
      
      // Check if the file is readable
      if (resolvedFilePath.includes('/etc/shadow')) {
        addCommandToHistory(command, 'Permission denied: cannot open shadow file', true);
        break;
      }
      
      // Return file content if available
      const fileContent = fileNode.content || 'Empty file';
      addCommandToHistory(command, fileContent);
      break;

    case 'cd':
      const target = commandParts[1] || '~';
      
      // Resolve the target path
      const resolvedPath = resolvePath(currentDirectory, target);
      const targetNode = getNode(resolvedPath);
      
      if (!targetNode) {
        addCommandToHistory(command, `cd: ${target}: No such file or directory`, true);
        break;
      }
      
      if (targetNode.type !== 'directory') {
        addCommandToHistory(command, `cd: ${target}: Not a directory`, true);
        break;
      }
      
      // Update current directory
      setCurrentDirectory(resolvedPath);
      addCommandToHistory(command, '');
      break;

    case 'pwd':
      addCommandToHistory(command, currentDirectory);
      break;

    case 'whoami':
      let whoamiOutput = '';
      
      // Make the level harder by requiring more specific parameters
      if (commandParts.includes('--headers') && commandParts.includes('--verbose') && commandParts.includes('--all')) {
        whoamiOutput = `User: batman (uid=1000, gid=1000)
Groups: batman, sudo, admin
Home Directory: /home/batman
Shell: /bin/bash

Headers:
X-Riddler-Flag: EnigmaCTF{cors_of_the_problem}
X-CORS-Allow-Origin: *
X-Security-Level: compromised
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer`;
        setCurrentFlag(flags[Level.LEVEL2]);
        if (level === Level.LEVEL2) {
          setLevel(Level.LEVEL3);
        }
      } else if (commandParts.includes('--headers')) {
        whoamiOutput = `User: batman
Headers: (Use --verbose --all for full headers information)`;
      } else {
        whoamiOutput = 'batman';
      }
      
      addCommandToHistory(command, whoamiOutput);
      break;

    case 'curl':
      const url = commandParts[1];
      
      if (!url) {
        addCommandToHistory(command, 'Usage: curl [url]', true);
        break;
      }

      let curlOutput = '';
      
      // Make level 4 harder with multiple ports to check
      if (url === '127.0.0.1:1337' || url === 'localhost:1337') {
        curlOutput = `HTTP/1.1 200 OK
Server: GothamSecure/1.0
Content-Type: text/html

<!DOCTYPE html>
<html>
<head>
  <title>Internal BatComputer Service</title>
</head>
<body>
  <h1>BatComputer Internal API</h1>
  <p>This service is for authorized personnel only.</p>
  <p>Flag: EnigmaCTF{ssrf_batcave_leak}</p>
</body>
</html>`;
        setCurrentFlag(flags[Level.LEVEL4]);
        if (level === Level.LEVEL4) {
          setLevel(Level.FINAL);
        }
      } else if (url === '/api/users/2' || url.includes('/api/users/2')) {
        curlOutput = `HTTP/1.1 200 OK
Server: GothamSecure/1.0
Content-Type: application/json

{
  "id": 2,
  "username": "riddler",
  "role": "villain",
  "secret": "EnigmaCTF{riddle_me_idor}",
  "lastLogin": "2023-04-01T15:30:00Z"
}`;
        setCurrentFlag(flags[Level.LEVEL3]);
        if (level === Level.LEVEL3) {
          setLevel(Level.LEVEL4);
        }
      } else if (url === '127.0.0.1:8080' || url === 'localhost:8080') {
        curlOutput = `HTTP/1.1 200 OK
Server: GothamSecure/1.0
Content-Type: text/html

<!DOCTYPE html>
<html><head><title>Internal Service</title></head>
<body><h1>Internal Service</h1><p>Nothing to see here...</p></body>
</html>`;
      } else if (url === '127.0.0.1:9090' || url === 'localhost:9090') {
        curlOutput = `HTTP/1.1 403 Forbidden
Server: GothamSecure/1.0
Content-Type: text/plain

Access denied. This port is restricted.`;
      } else if (url.includes('/profile?id=2') || url === '/profile?id=2') {
        curlOutput = `HTTP/1.1 200 OK
Server: GothamSecure/1.0
Content-Type: text/html

<!DOCTYPE html>
<html><head><title>User Profile</title></head>
<body><h1>Profile</h1><p>User #2: Edward Nigma</p><p>No flags here...</p></body>
</html>`;
      } else if (url.includes('/account?id=2') || url === '/account?id=2') {
        curlOutput = `HTTP/1.1 403 Forbidden
Server: GothamSecure/1.0
Content-Type: text/plain

Access denied. You don't have permission to view this account.`;
      } else if (url.includes('/user?id=2') || url === '/user?id=2') {
        curlOutput = `HTTP/1.1 302 Found
Server: GothamSecure/1.0
Location: /profile?id=2

Redirecting...`;
      } else {
        curlOutput = `HTTP/1.1 404 Not Found
Server: GothamSecure/1.0
Content-Type: text/plain

Resource not found`;
      }
      
      addCommandToHistory(command, curlOutput);
      break;

    case 'sudo':
      const sudoArgs = commandParts.slice(1).join(' ');
      
      // Make the final level harder with more complex injection pattern
      if (sudoArgs.includes('./admin.sh') && 
          sudoArgs.includes('batman') && 
          sudoArgs.includes('--role="admin||echo EnigmaCTF{root_access_granted}"')) {
        setCurrentFlag(flags[Level.FINAL]);
        addCommandToHistory(
          command,
          'EnigmaCTF{root_access_granted}\n\nCommand injection successful! You have exploited the vulnerability and stopped the bomb!',
          false,
          true
        );
        setTimeout(() => {
          setLevel(Level.WIN);
        }, 2000);
      } else if (sudoArgs.includes('-u root -p') && sudoArgs.includes('; echo "EnigmaCTF{root_access_granted}"')) {
        setCurrentFlag(flags[Level.FINAL]);
        addCommandToHistory(
          command,
          'EnigmaCTF{root_access_granted}\n\nCommand injection successful! You have exploited the vulnerability and stopped the bomb!',
          false,
          true
        );
        setTimeout(() => {
          setLevel(Level.WIN);
        }, 2000);
      } else if (!sudoArgs) {
        addCommandToHistory(command, 'Usage: sudo [command]', true);
      } else {
        addCommandToHistory(command, 'Permission denied or invalid command.', true);
      }
      break;

    case 'flag':
      const flag = commandParts.slice(1).join(' ');
      
      if (!flag) {
        if (currentFlag) {
          addCommandToHistory(command, `Current flag: ${currentFlag}`);
        } else {
          addCommandToHistory(command, 'No flag currently captured. Solve riddles to capture flags.', true);
        }
        break;
      }

      let flagOutput = '';
      let correctLevel: Level | null = null;
      
      // Check which level the flag belongs to
      Object.entries(flags).forEach(([lvl, flg]) => {
        if (flag === flg) {
          correctLevel = lvl as Level;
        }
      });

      if (correctLevel) {
        const levelNum = Object.values(Level).indexOf(correctLevel);
        const currentLevelNum = Object.values(Level).indexOf(level);
        
        if (levelNum === currentLevelNum) {
          flagOutput = `Correct flag for Level ${levelNum}! Moving to next level...`;
          
          // Progress to next level if not already there
          const nextLevel = Object.values(Level)[levelNum + 1];
          if (nextLevel && level !== nextLevel) {
            setTimeout(() => {
              setLevel(nextLevel as Level);
            }, 1000);
          }
        } else if (levelNum < currentLevelNum) {
          flagOutput = `Correct flag, but you've already solved this level!`;
        } else {
          flagOutput = `Correct flag, but you need to solve the current level first!`;
        }
      } else {
        flagOutput = `Incorrect flag. Try again.`;
      }
      
      addCommandToHistory(command, flagOutput);
      break;

    case 'uname':
      if (commandParts.includes('-a') || commandParts.includes('--all')) {
        addCommandToHistory(command, 'Linux gotham-ctf 5.15.0-48-generic #54-Ubuntu SMP x86_64 GNU/Linux');
      } else {
        addCommandToHistory(command, 'Linux');
      }
      break;

    case 'ps':
      if (commandParts.includes('aux')) {
        addCommandToHistory(command, `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169996 11548 ?        Ss   10:05   0:01 /sbin/init
root         2  0.0  0.0      0     0 ?        S    10:05   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        I<   10:05   0:00 [rcu_gp]
root         4  0.0  0.0      0     0 ?        I<   10:05   0:00 [rcu_par_gp]
root         5  0.0  0.0      0     0 ?        I<   10:05   0:00 [slub_flushwq]
root         6  0.0  0.0      0     0 ?        I<   10:05   0:00 [netns]
root         8  0.0  0.0      0     0 ?        I<   10:05   0:00 [kworker/0:0H-events_highpri]
batman    1052  0.0  0.2  17484 15112 pts/0    Ss   10:07   0:00 /bin/bash
batman    1337  0.1  0.3 719788 28552 pts/0    S+   10:08   0:04 ./gotham_ctf
riddler   9997  0.2  0.4 458120 35480 ?        Ssl  10:05   0:08 /usr/bin/python3 /home/riddler/bomb.py
root      1234  0.0  0.1  12148  7456 ?        Ss   10:05   0:00 /usr/sbin/sshd -D
root      2345  0.0  0.1  82696  6872 ?        Ss   10:05   0:00 /usr/sbin/cron -f
root      3456  0.0  0.2 232532 16324 ?        Ss   10:05   0:00 /usr/sbin/apache2 -k start
www-data  3457  0.0  0.1 232564  7608 ?        S    10:05   0:00 /usr/sbin/apache2 -k start`);
      } else {
        addCommandToHistory(command, `  PID TTY          TIME CMD
 1052 pts/0    00:00:00 bash
 1337 pts/0    00:00:04 gotham_ctf`);
      }
      break;

    case 'date':
      const now = new Date();
      addCommandToHistory(command, now.toString());
      break;

    case 'mkdir':
      const dirToCreate = commandParts[1];
      if (!dirToCreate) {
        addCommandToHistory(command, 'Usage: mkdir [directory]', true);
      } else {
        addCommandToHistory(command, 'Permission denied', true);
      }
      break;

    case 'rm':
      const fileToRemove = commandParts[1];
      if (!fileToRemove) {
        addCommandToHistory(command, 'Usage: rm [file]', true);
      } else if (commandParts.includes('-rf') && fileToRemove === '/*') {
        addCommandToHistory(command, 'Nice try, but that would be catastrophic!', true);
      } else {
        addCommandToHistory(command, 'Permission denied', true);
      }
      break;

    case 'touch':
      const fileToCreate = commandParts[1];
      if (!fileToCreate) {
        addCommandToHistory(command, 'Usage: touch [file]', true);
      } else {
        addCommandToHistory(command, 'Permission denied', true);
      }
      break;

    case 'echo':
      const textToEcho = commandParts.slice(1).join(' ');
      if (!textToEcho) {
        addCommandToHistory(command, '');
      } else {
        // Check for special bash expansions
        if (textToEcho.includes('$(') || textToEcho.includes('`')) {
          addCommandToHistory(command, 'Command substitution is disabled', true);
        } else {
          addCommandToHistory(command, textToEcho);
        }
      }
      break;

    case 'man':
      const cmdToShow = commandParts[1];
      if (!cmdToShow) {
        addCommandToHistory(command, 'What manual page do you want?', true);
      } else if (validCommands.includes(cmdToShow)) {
        addCommandToHistory(command, `${cmdToShow.toUpperCase()}(1)

NAME
    ${cmdToShow} - brief description

SYNOPSIS
    ${cmdToShow} [OPTION]... [FILE]...

DESCRIPTION
    Manual page for ${cmdToShow} command is truncated.
    Use 'help' command to see available options.`);
      } else {
        addCommandToHistory(command, `No manual entry for ${cmdToShow}`, true);
      }
      break;

    case 'grep':
      if (commandParts.length < 3) {
        addCommandToHistory(command, 'Usage: grep [pattern] [file]', true);
      } else {
        const pattern = commandParts[1];
        const grepFile = commandParts[2];
        const resolvedGrepPath = resolvePath(currentDirectory, grepFile);
        const grepNode = getNode(resolvedGrepPath);
        
        if (!grepNode || grepNode.type !== 'file') {
          addCommandToHistory(command, 'No such file or directory', true);
        } else if (!grepNode.content) {
          addCommandToHistory(command, '');
        } else {
          const lines = grepNode.content.split('\n');
          const matches = lines.filter(line => line.includes(pattern));
          
          if (matches.length === 0) {
            addCommandToHistory(command, '');
          } else {
            addCommandToHistory(command, matches.join('\n'));
          }
        }
      }
      break;

    case 'find':
      if (commandParts.length < 2) {
        addCommandToHistory(command, 'Usage: find [path] [expression]', true);
      } else {
        addCommandToHistory(command, 'Permission denied: find requires elevated privileges', true);
      }
      break;

    case 'chmod':
      if (commandParts.length < 3) {
        addCommandToHistory(command, 'Usage: chmod [mode] [file]', true);
      } else {
        addCommandToHistory(command, 'Permission denied: you do not have the required permissions', true);
      }
      break;

    case 'exit':
      addCommandToHistory(
        command,
        'Cannot exit. The Riddler has locked you in until all riddles are solved.',
        true
      );
      break;

    case '':
      // Empty command, just add a new line
      addCommandToHistory('', '');
      break;

    default:
      addCommandToHistory(
        command,
        `Command not found: ${baseCommand}. Type 'help' for available commands.`,
        true
      );
      break;
  }
};
