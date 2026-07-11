import React from 'react';

interface HeaderProps {
  selectedHeadIndex: number;
  onSelectHead: (index: number) => void;
  headNames: string[];
}

export const Header: React.FC<HeaderProps> = ({
  selectedHeadIndex,
  onSelectHead,
  headNames,
}) => {
  return (
    <header className="w-full border-b border-white/15 bg-[#0D1322]/85 backdrop-blur-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 py-2.5 flex items-center justify-between">
        {/* Short Sleek Brand: VizLLM */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-400 to-indigo-500 flex items-center justify-center shadow-[0_0_16px_rgba(56,189,248,0.55)]">
              <div className="w-3 h-3 rounded-full bg-[#0D1322]" />
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
              VizLLM
            </h1>
          </div>
          <span className="hidden sm:inline-block text-white/25">/</span>
          <p className="hidden sm:inline-block text-xs text-slate-300 font-medium">
            Self-Attention &amp; Vector Embedding Studio
          </p>
        </div>

        {/* Cluely-style Floating Pill Switcher for Attention Heads */}
        <div className="flex items-center space-x-1.5 bg-[#141D33] border border-white/15 rounded-xl p-1 shadow-inner">
          {headNames.map((_, idx) => {
            const isSelected = selectedHeadIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelectHead(idx)}
                className={`px-3.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 ${
                  isSelected
                    ? 'bg-sky-500 text-white font-semibold shadow-[0_0_14px_rgba(56,189,248,0.6)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Head {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
