import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ShieldAlert } from 'lucide-react';

const LOG_SEQUENCE = [
  { text: 'system // initializing edge runtime cluster ingress...', type: 'system', delay: 400 },
  { text: 'system // connecting local build node target: 192.168.29.104... [OK]', type: 'success', delay: 500 },
  { text: 'storage // mounting zero-knowledge object storage volume at files.sharexpress.in...', type: 'system', delay: 600 },
  { text: 'storage // initialized minio clustering. bandwidth capacity: 1.2 GB/s', type: 'info', delay: 400 },
  { text: 'compute // deploying interleet container sandboxes (docker swarm)...', type: 'system', delay: 800 },
  { text: 'compute // java-jdk-21, rust-1.78, go-1.22 sandbox kernels verified. [OK]', type: 'success', delay: 500 },
  { text: 'network // syncing edge cache headers to global cdn cells...', type: 'system', delay: 400 },
  { text: 'network // latency check: edge cdn cells respond at 18ms. uptime: 99.99%', type: 'info', delay: 500 },
  { text: 'system // cluster handshake complete. parent namespace sharexpress.in healthy.', type: 'success', delay: 600 },
];

export default function TerminalConsole() {
  const [history, setHistory] = useState([
    { text: 'sharexpress Core OS v4.14-stable (x86_64-linux)', type: 'system' },
    { text: 'auth // session secure. cluster handshake pending.', type: 'info' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef(null);
  const sequenceIdxRef = useRef(0);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Run initial automatic log simulation
  useEffect(() => {
    let active = true;
    const runNextLog = async () => {
      if (sequenceIdxRef.current >= LOG_SEQUENCE.length) return;
      const nextLog = LOG_SEQUENCE[sequenceIdxRef.current];
      await new Promise((resolve) => setTimeout(resolve, nextLog.delay));
      if (!active) return;
      setHistory((prev) => [...prev, { text: nextLog.text, type: nextLog.type }]);
      sequenceIdxRef.current += 1;
      runNextLog();
    };
    runNextLog();
    return () => {
      active = false;
    };
  }, []);

  const handleCommandExecute = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { text: `root@sharexpress:~# ${cmdText}`, type: 'input' }]);

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      switch (trimmed) {
        case 'help':
          setHistory((prev) => [
            ...prev,
            { text: 'Available system modules:', type: 'system' },
            { text: '  status       - query operational daemon tree metrics', type: 'info' },
            { text: '  netstat      - trace endpoint latency and packet stats', type: 'info' },
            { text: '  provision    - force synchronization of edge cluster cells', type: 'info' },
            { text: '  clear        - flush session terminal log buffers', type: 'info' },
          ]);
          break;
        case 'status':
          setHistory((prev) => [
            ...prev,
            { text: '⚡ cluster status: operational // 100% capacity', type: 'success' },
            { text: '  [✓] sharexpress.in              -> ONLINE (http 200) - API ingress :8002', type: 'info' },
            { text: '  [✓] files.sharexpress.in        -> ONLINE (http 200) - encrypted storage', type: 'info' },
            { text: '  [✓] interleet.sharexpress.in    -> ONLINE (http 200) - runtime sandboxes', type: 'info' },
            { text: '  [✓] distribution.sharexpress.in -> ONLINE (http 200) - systems integration', type: 'info' },
          ]);
          break;
        case 'netstat':
          setHistory((prev) => [
            ...prev,
            { text: 'tracing packet headers to regional edge proxies...', type: 'system' },
            { text: '  us-east-1 (ashburn)        - 14ms (100% packets delivered)', type: 'info' },
            { text: '  eu-west-1 (dublin)         - 28ms (100% packets delivered)', type: 'info' },
            { text: '  ap-south-1 (mumbai)        - 9ms  (100% packets delivered)', type: 'info' },
            { text: '  average latency: 17ms // jitter: 0.2ms', type: 'success' },
          ]);
          break;
        case 'provision':
          setHistory((prev) => [
            ...prev,
            { text: 'triggering cell reprovisioning...', type: 'system' },
            { text: '>>> pulling container hashes... verified [OK]', type: 'info' },
            { text: '>>> synchronizing static layers... synced', type: 'info' },
            { text: '>>> cluster provisioned. 0 warnings.', type: 'success' },
          ]);
          break;
        default:
          setHistory((prev) => [
            ...prev,
            { text: `system: executable '${trimmed}' not found. type 'help' for modules.`, type: 'error' },
          ]);
      }
    }, 450);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleCommandExecute(inputValue);
    setInputValue('');
  };

  return (
    <div className="w-full text-left">
      <div 
        className="bg-[#0b0b0b] border border-white/[0.04] rounded-md overflow-hidden transition-all duration-400 hover:border-white/[0.08]"
        style={{
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.01] border-b border-white/[0.03]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/30 uppercase tracking-widest font-medium">
            <TerminalIcon size={10} className="text-white/20" />
            <span>sharexpress@node-01: ~</span>
          </div>

          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            <span className="relative flex h-1 w-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-white"></span>
            </span>
            <span className="text-[8px] font-mono font-medium text-white/80 uppercase tracking-wider">Secured</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="h-[210px] p-5 overflow-y-auto font-mono text-[11px] leading-relaxed bg-[#080808]/40 select-text scrollbar-none console-scrollbar">
          <div className="space-y-1.5">
            {history.map((line, idx) => {
              let colorClass = 'text-white/50';
              if (line.type === 'input') colorClass = 'text-white';
              if (line.type === 'system') colorClass = 'text-white'; // Grayscale Accent
              if (line.type === 'success') colorClass = 'text-emerald-500/80';
              if (line.type === 'error') colorClass = 'text-rose-500/80';
              if (line.type === 'info') colorClass = 'text-white/30';

              return (
                <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
                  {line.text}
                </div>
              );
            })}
            
            {/* Processing status */}
            {isTyping && (
              <div className="text-white/20 animate-pulse flex items-center gap-1 font-mono text-[10px]">
                <span>processing cell query</span>
                <span className="w-0.5 h-0.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-0.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-0.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-2.5 bg-black/20 border-t border-white/[0.03]">
          <span className="font-mono text-[11px] text-white mr-2 select-none">
            root@sharexpress:~#
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            className="flex-1 min-w-0 bg-transparent border-none outline-none font-mono text-[11px] text-white placeholder-white/10 disabled:opacity-50"
            placeholder="Type 'status' or 'netstat'..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
