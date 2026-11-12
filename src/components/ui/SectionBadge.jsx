import React from "react";

export function SectionBadge({ text, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 backdrop-blur-sm ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
      </span>
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent">
        {text}
      </span>
    </div>
  );
}

export default SectionBadge;
