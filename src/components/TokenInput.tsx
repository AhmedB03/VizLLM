import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ExampleSentence } from '../types/transformer';

interface TokenInputProps {
  currentSentence: ExampleSentence;
  presetSentences: ExampleSentence[];
  onSelectPreset: (sentence: ExampleSentence) => void;
  onCustomInputSubmit: (text: string) => void;
  hoveredTokenId: number | null;
  selectedTokenId: number | null;
  onTokenHover: (tokenId: number | null) => void;
  onTokenSelect: (tokenId: number | null) => void;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  currentSentence,
  presetSentences,
  onSelectPreset,
  onCustomInputSubmit,
  hoveredTokenId,
  selectedTokenId,
  onTokenHover,
  onTokenSelect,
}) => {
  const [inputText, setInputText] = useState(currentSentence.text);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputText.trim()) {
      onCustomInputSubmit(inputText);
    }
  };

  const handlePresetClick = (s: ExampleSentence) => {
    setInputText(s.text);
    onSelectPreset(s);
  };

  const activeTokenId = selectedTokenId !== null ? selectedTokenId : hoveredTokenId;

  return (
    <section className="w-full card-cluely p-4 sm:p-5 mb-5">
      {/* 100% Full Width Cluely-style Input Bar - Nothing to the right of it */}
      <div className="w-full relative">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Ask or type any sequence to inspect attention & embeddings..."
          className="w-full bg-[#0D1322]/90 text-slate-100 font-mono text-sm px-4 py-3 rounded-2xl border border-white/20 focus:border-sky-400 focus:bg-[#0D1322] focus:shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all outline-none pr-28 placeholder:text-slate-500"
        />
        <button
          onClick={() => onCustomInputSubmit(inputText)}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs shadow-[0_0_16px_rgba(56,189,248,0.5)] transition-all flex items-center gap-1.5"
        >
          <span>Tokenize</span>
        </button>
      </div>

      {/* Subtle Preset Sentence Selector Row Below Input */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 text-xs mr-1 font-medium">Presets:</span>
          {presetSentences.map((s) => {
            const isActive = currentSentence.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handlePresetClick(s)}
                className={`px-3 py-1 rounded-lg text-xs transition-all ${
                  isActive
                    ? 'bg-sky-500/25 text-sky-200 border border-sky-400/50 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        {selectedTokenId !== null && (
          <button
            onClick={() => onTokenSelect(null)}
            className="text-xs font-mono text-sky-300 hover:text-sky-200 underline ml-auto"
          >
            Clear Selection [Esc]
          </button>
        )}
      </div>

      {/* Interactive Cluely Token Pills Row */}
      <div className="mt-3 pt-3 border-t border-white/15 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1 font-semibold">
          Sequence Tokens:
        </span>
        {currentSentence.tokens.map((token) => {
          const isSelected = selectedTokenId === token.id;
          const isActive = activeTokenId === token.id;

          return (
            <motion.button
              key={token.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => onTokenHover(token.id)}
              onMouseLeave={() => onTokenHover(null)}
              onClick={() => onTokenSelect(isSelected ? null : token.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs border transition-all select-none ${
                isActive
                  ? 'pill-glow font-bold'
                  : 'bg-[#0D1322]/80 text-slate-200 border-white/15 hover:border-white/30 hover:text-white shadow-sm'
              }`}
            >
              <span className="text-slate-400 text-[10px]">[{token.id}]</span>
              <span className={isActive ? 'text-sky-200 font-bold' : 'text-slate-100 font-medium'}>
                {token.word}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                {token.pos}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
