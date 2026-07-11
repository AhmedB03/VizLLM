import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TokenData } from '../types/transformer';

interface VectorInspectorProps {
  token: TokenData | null;
  allTokens: TokenData[];
}

function computeCosineSimilarity(vecA: number[], vecB: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < Math.min(vecA.length, vecB.length); i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return Number((dot / (Math.sqrt(normA) * Math.sqrt(normB))).toFixed(2));
}

export const VectorInspector: React.FC<VectorInspectorProps> = ({ token, allTokens }) => {
  return (
    <div className="card-cluely overflow-hidden flex flex-col h-[175px]">
      {/* Header Bar */}
      <div className="px-4 py-2 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.01]">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
            Embedding &amp; Cosine Similarity Probe
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500">Pairwise dot-product</span>
      </div>

      {/* Content Area */}
      <div className="p-3 bg-[#06080D]/90 flex-1 flex flex-col justify-between overflow-hidden">
        <AnimatePresence mode="wait">
          {token ? (
            <motion.div
              key={token.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {/* Pairwise sentence similarity tags */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>Cosine Similarity against sentence tokens:</span>
                  <span className="text-sky-300 font-semibold">{token.word} [POS: {token.pos}]</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {allTokens.map((other) => {
                    const sim = computeCosineSimilarity(token.vectorRaw, other.vectorRaw);
                    const isSelf = other.id === token.id;
                    return (
                      <div
                        key={other.id}
                        className={`flex items-center justify-between px-2 py-1 rounded border font-mono text-[11px] ${
                          isSelf
                            ? 'bg-sky-500/15 border-sky-500/40 text-sky-300 font-semibold'
                            : sim >= 0.5
                            ? 'bg-white/5 border-white/15 text-slate-200'
                            : 'bg-white/[0.02] border-white/5 text-slate-400'
                        }`}
                      >
                        <span className="truncate pr-1">{other.word}</span>
                        <span className={isSelf || sim >= 0.5 ? 'text-sky-400' : 'text-slate-500'}>
                          {isSelf ? '1.0' : sim.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sparkline profile */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>Float32 Vector Dimensions (0..31 of 768)</span>
                  <span>[{token.vectorRaw.slice(0, 4).map((v) => v.toFixed(2)).join(', ')}...]</span>
                </div>
                <div className="grid grid-cols-32 gap-0.5 h-6 bg-[#0B0F19] rounded p-1 border border-white/10 items-end">
                  {token.vectorRaw.slice(0, 32).map((val, idx) => {
                    const absVal = Math.min(1, Math.abs(val));
                    const heightPct = Math.max(15, absVal * 100);
                    return (
                      <div
                        key={idx}
                        style={{ height: `${heightPct}%` }}
                        className={`w-full rounded-t-sm ${
                          val >= 0 ? 'bg-sky-400 opacity-90' : 'bg-indigo-400 opacity-80'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-slate-500 font-mono text-xs">
              Hover any token node or word tag to inspect its live sentence similarities
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
