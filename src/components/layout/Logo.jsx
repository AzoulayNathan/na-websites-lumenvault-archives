import React from 'react';

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Minimal vault/light symbol */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
        <rect x="2" y="2" width="24" height="24" rx="1" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
        <rect x="6" y="6" width="16" height="16" rx="0.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <line x1="14" y1="0" x2="14" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        <line x1="0" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="0.75" className="text-gold" />
        <line x1="14" y1="8" x2="14" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-gold" opacity="0.7" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-serif text-sm tracking-[0.25em] font-medium">LUMENVAULT</span>
        <span className="font-mono text-[9px] tracking-[0.35em] text-dust mt-0.5">ARCHIVES</span>
      </div>
    </div>
  );
}