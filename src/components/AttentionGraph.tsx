import React from 'react';
import { motion } from 'framer-motion';
import type { AttentionHead, TokenData } from '../types/transformer';

interface AttentionGraphProps {
  tokens: TokenData[];
  activeHead: AttentionHead;
  hoveredTokenId: number | null;
  selectedTokenId: number | null;
  onTokenHover: (tokenId: number | null) => void;
  onTokenSelect: (tokenId: number | null) => void;
}

export const AttentionGraph: React.FC<AttentionGraphProps> = ({
  tokens,
  activeHead,
  hoveredTokenId,
  selectedTokenId,
  onTokenHover,
  onTokenSelect,
}) => {
  const activeTokenId = selectedTokenId !== null ? selectedTokenId : hoveredTokenId;

  // Fixed coordinate space so lines and token boxes are 100% perfectly connected
  const viewBoxWidth = 680;
  const viewBoxHeight = Math.max(340, tokens.length * 64);
  const topMargin = 40;
  const bottomMargin = 40;
  const usableHeight = viewBoxHeight - topMargin - bottomMargin;
  const rowSpacing = tokens.length > 1 ? usableHeight / (tokens.length - 1) : 0;

  const getY = (index: number) => {
    if (tokens.length === 1) return viewBoxHeight / 2;
    return topMargin + index * rowSpacing;
  };

  const leftCardX = 16;
  const leftCardWidth = 155;
  const leftPortX = leftCardX + leftCardWidth; // 171

  const rightCardWidth = 155;
  const rightCardX = viewBoxWidth - rightCardWidth - 16; // 509
  const rightPortX = rightCardX; // 509

  return (
    <div className="h-full flex flex-col card-cluely overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-white/15 flex items-center justify-between bg-white/[0.02]">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-100 font-bold">
            Self-Attention Flow Map
          </h3>
          <p className="text-xs text-slate-300">
            {activeHead.name}
          </p>
        </div>
        <span className="text-xs font-mono text-sky-200 bg-sky-500/20 border border-sky-400/50 px-3 py-1 rounded-xl shadow-[0_0_14px_rgba(56,189,248,0.35)] font-semibold">
          Connected Bezier Network
        </span>
      </div>

      {/* Unified SVG Canvas where Token Cards & Bezier Lines share exact coordinates */}
      <div className="flex-1 relative p-3 min-h-[360px] flex items-center justify-center overflow-x-auto">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-full max-h-[460px] select-none"
        >
          <defs>
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Column Header Labels */}
          <text x={leftCardX} y={20} fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="700">
            QUERY (SOURCE)
          </text>
          <text x={rightCardX + rightCardWidth} y={20} fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="700" textAnchor="end">
            KEY (TARGET)
          </text>

          {/* 1. Bezier Connection Curves */}
          {tokens.map((sourceToken, i) => {
            return tokens.map((targetToken, j) => {
              const weight = activeHead.matrix[i]?.[j] || 0;
              if (weight < 0.02) return null;

              const sourceY = getY(i);
              const targetY = getY(j);

              const isHoveredLine = activeTokenId === sourceToken.id;
              const isTargetHovered = activeTokenId === targetToken.id;

              let opacity = 0.2 + weight * 0.4;
              let strokeWidth = 1.3 + weight * 3;
              let strokeColor = activeHead.color;
              let isGlowing = false;

              if (activeTokenId !== null) {
                if (isHoveredLine) {
                  opacity = Math.max(0.45, weight);
                  strokeWidth = 2.4 + weight * 4.5;
                  strokeColor = '#38BDF8';
                  isGlowing = true;
                } else if (isTargetHovered) {
                  opacity = Math.max(0.3, weight * 0.7);
                  strokeColor = '#06B6D4';
                } else {
                  opacity = 0.05;
                }
              }

              const cp1X = leftPortX + 110;
              const cp2X = rightPortX - 110;
              const pathD = `M ${leftPortX},${sourceY} C ${cp1X},${sourceY} ${cp2X},${targetY} ${rightPortX},${targetY}`;

              return (
                <g key={`edge-${i}-${j}`}>
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeOpacity={opacity}
                    filter={isGlowing ? 'url(#cyanGlow)' : undefined}
                    initial={false}
                    animate={{
                      strokeOpacity: opacity,
                      strokeWidth: strokeWidth,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  />

                  {isHoveredLine && weight >= 0.12 && (
                    <foreignObject
                      x={(leftPortX + rightPortX) / 2 - 24}
                      y={(sourceY + targetY) / 2 - 10}
                      width={48}
                      height={20}
                    >
                      <div className="flex items-center justify-center">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#0D1322] border border-sky-400 text-sky-200 shadow-[0_0_14px_rgba(56,189,248,0.7)]">
                          {(weight * 100).toFixed(0)}%
                        </span>
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            });
          })}

          {/* 2. Left Query Token Cards & Node Ports */}
          {tokens.map((token, idx) => {
            const y = getY(idx);
            const isActive = activeTokenId === token.id;

            return (
              <g key={`left-node-${token.id}`}>
                <foreignObject
                  x={leftCardX}
                  y={y - 18}
                  width={leftCardWidth}
                  height={36}
                >
                  <button
                    onMouseEnter={() => onTokenHover(token.id)}
                    onMouseLeave={() => onTokenHover(null)}
                    onClick={() => onTokenSelect(isActive && selectedTokenId === token.id ? null : token.id)}
                    className={`w-full h-full px-3.5 rounded-xl font-mono text-xs text-left border transition-all flex items-center justify-between ${
                      isActive
                        ? 'pill-glow font-bold'
                        : 'bg-[#0D1322]/90 border-white/15 text-slate-200 hover:border-white/30 hover:text-white shadow-md'
                    }`}
                  >
                    <span className="truncate">{token.word}</span>
                    <span className="text-[10px] text-slate-400 font-normal">Q{idx}</span>
                  </button>
                </foreignObject>

                <circle
                  cx={leftPortX}
                  cy={y}
                  r={isActive ? 4.5 : 3.5}
                  fill={isActive ? '#38BDF8' : '#475569'}
                  stroke="#0D1322"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* 3. Right Key/Value Token Cards & Node Ports */}
          {tokens.map((token, idx) => {
            const y = getY(idx);
            const receivedWeight =
              activeTokenId !== null ? activeHead.matrix[activeTokenId]?.[idx] || 0 : 0;
            const isHighAttention = activeTokenId !== null && receivedWeight >= 0.25;

            return (
              <g key={`right-node-${token.id}`}>
                <circle
                  cx={rightPortX}
                  cy={y}
                  r={isHighAttention ? 4.5 : 3.5}
                  fill={isHighAttention ? '#38BDF8' : '#475569'}
                  stroke="#0D1322"
                  strokeWidth="1.5"
                />

                <foreignObject
                  x={rightCardX}
                  y={y - 18}
                  width={rightCardWidth}
                  height={36}
                >
                  <div
                    onMouseEnter={() => onTokenHover(token.id)}
                    onMouseLeave={() => onTokenHover(null)}
                    className={`w-full h-full px-3.5 rounded-xl font-mono text-xs border transition-all flex items-center justify-between ${
                      isHighAttention
                        ? 'pill-glow font-bold'
                        : 'bg-[#0D1322]/90 border-white/15 text-slate-200 shadow-md'
                    }`}
                  >
                    <span className="truncate">{token.word}</span>
                    {activeTokenId !== null && (
                      <span className="text-[11px] font-mono text-sky-300 font-bold">
                        {(receivedWeight * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer info */}
      <div className="px-5 py-3 border-t border-white/15 bg-white/[0.02] text-xs font-mono text-slate-300 flex items-center justify-between">
        {activeTokenId !== null ? (
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Active Query:</span>
            <span className="text-sky-300 font-bold">{tokens[activeTokenId]?.word}</span>
          </div>
        ) : (
          <span>Hover over any node to trace attention curves</span>
        )}
      </div>
    </div>
  );
};
