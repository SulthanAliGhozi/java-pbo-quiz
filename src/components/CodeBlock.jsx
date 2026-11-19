// src/components/CodeBlock.jsx
import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export function CodeBlock({ code, title = 'Java' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-lg shadow-black/40">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-amber-400" />
          <span className="font-semibold text-slate-300">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Salin kode"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Tersalin</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span className="text-[11px]">Salin</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono">
        <pre className="text-slate-200">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
