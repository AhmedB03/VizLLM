import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';
import type { TokenData } from '../types/transformer';
import { GLOBAL_VECTOR_CLOUD } from '../data/mockTransformerData';

interface VectorPlotProps {
  tokens: TokenData[];
  hoveredTokenId: number | null;
  selectedTokenId: number | null;
  onTokenHover: (tokenId: number | null) => void;
  onTokenSelect: (tokenId: number | null) => void;
}

export const VectorPlot: React.FC<VectorPlotProps> = ({
  tokens,
  hoveredTokenId,
  selectedTokenId,
  onTokenHover,
  onTokenSelect,
}) => {
  const activeTokenId = selectedTokenId !== null ? selectedTokenId : hoveredTokenId;
  const activeToken = activeTokenId !== null ? tokens.find((t) => t.id === activeTokenId) : null;

  // Pan & Zoom state
  const [zoom, setZoom] = useState<number>(1.15);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(3.5, prev + 0.25));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.25));
  const handleResetView = () => {
    setZoom(1.15);
    setPan({ x: 0, y: 0 });
  };

  // Google Maps style Click & Drag Panning
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left mouse button
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !svgContainerRef.current) return;

    const rect = svgContainerRef.current.getBoundingClientRect();
    const scaleFactorX = (400 / zoom) / rect.width;
    const scaleFactorY = (400 / zoom) / rect.height;

    const dx = (e.clientX - dragStartRef.current.x) * scaleFactorX;
    const dy = (e.clientY - dragStartRef.current.y) * scaleFactorY;

    // Moving mouse right should move the viewport left (camera follows drag)
    setPan((prev) => ({
      x: prev.x - dx,
      y: prev.y - dy,
    }));

    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Google Maps style Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(3.5, prev + 0.15));
    } else {
      setZoom((prev) => Math.max(0.5, prev - 0.15));
    }
  };

  // Map coordinate [-100, 100] to SVG coordinate [0, 400]
  const mapX = (x: number) => 200 + (x * 165) / 100;
  const mapY = (y: number) => 200 - (y * 165) / 100;

  // Calculate dynamic viewBox centered at (200 + pan.x, 200 + pan.y)
  const vbWidth = 400 / zoom;
  const vbHeight = 400 / zoom;
  const vbX = 200 + pan.x - vbWidth / 2;
  const vbY = 200 + pan.y - vbHeight / 2;

  const isModified = zoom !== 1.15 || pan.x !== 0 || pan.y !== 0;

  return (
    <div className="card-cluely overflow-hidden flex flex-col h-[295px] relative select-none">
      {/* Header with Zoom & Pan Controls */}
      <div className="px-4 py-2.5 border-b border-white/15 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-100 font-bold flex items-center gap-1.5">
              <span>2D PCA Vector Space</span>
              <span className="text-[10px] font-normal text-sky-400 bg-sky-500/15 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Move className="w-2.5 h-2.5" /> Drag &amp; Zoom
              </span>
            </h3>
          </div>
        </div>

        {/* Zoom Controls Bar in Top Right */}
        <div className="flex items-center space-x-1 bg-[#090D16] border border-white/20 rounded-lg p-0.5 shadow-md">
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetView}
            title="Reset View"
            className="px-1.5 py-0.5 rounded text-[10px] font-mono text-sky-300 hover:bg-white/10 transition-colors font-semibold"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {isModified && (
            <button
              onClick={handleResetView}
              title="Reset Pan & Zoom"
              className="p-1 rounded hover:bg-white/10 text-sky-400 hover:text-sky-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Google Maps Style Canvas */}
      <div
        ref={svgContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onWheel={handleWheel}
        className={`relative flex-1 bg-[#090D16]/90 overflow-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <svg
          viewBox={`${vbX} ${vbY} ${vbWidth} ${vbHeight}`}
          className={`w-full h-full mx-auto select-none ${
            isDragging ? '' : 'transition-all duration-150 ease-out'
          }`}
        >
          {/* Grid axes */}
          <line x1="200" y1="-200" x2="200" y2="600" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="-200" y1="200" x2="600" y2="200" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />

          {/* Background Vocabulary Cloud */}
          {GLOBAL_VECTOR_CLOUD.map((pt, idx) => {
            const cx = mapX(pt.x);
            const cy = mapY(pt.y);
            const isNeighbor =
              activeToken &&
              activeToken.neighbors.some((n) => n.word.toLowerCase() === pt.word.toLowerCase());

            return (
              <g key={`cloud-${idx}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isNeighbor ? 5.5 : 3}
                  fill={pt.color}
                  opacity={activeToken ? (isNeighbor ? 0.95 : 0.15) : 0.4}
                />
                <text
                  x={cx + 6}
                  y={cy + 3}
                  fontSize="8"
                  fontFamily="monospace"
                  fill={isNeighbor ? '#38BDF8' : '#64748B'}
                  opacity={activeToken ? (isNeighbor ? 1 : 0.25) : 0.65}
                >
                  {pt.word}
                </text>
              </g>
            );
          })}

          {/* Nearest Neighbor connection lines */}
          {activeToken &&
            activeToken.neighbors.map((n, i) => {
              const startX = mapX(activeToken.pca2D.x);
              const startY = mapY(activeToken.pca2D.y);
              const endX = mapX(n.x);
              const endY = mapY(n.y);

              return (
                <g key={`conn-${i}`}>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="#38BDF8"
                    strokeWidth="1.4"
                    strokeDasharray="2 3"
                    opacity="0.85"
                  />
                  <text
                    x={(startX + endX) / 2}
                    y={(startY + endY) / 2 - 5}
                    fontSize="7.5"
                    fontFamily="monospace"
                    fontWeight="700"
                    fill="#38BDF8"
                    textAnchor="middle"
                  >
                    {(n.similarity * 100).toFixed(0)}%
                  </text>
                </g>
              );
            })}

          {/* Active Sentence Tokens */}
          {tokens.map((token) => {
            const cx = mapX(token.pca2D.x);
            const cy = mapY(token.pca2D.y);
            const isActive = activeTokenId === token.id;

            return (
              <g
                key={`tok-${token.id}`}
                className="cursor-pointer"
                onMouseEnter={() => onTokenHover(token.id)}
                onMouseLeave={() => onTokenHover(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onTokenSelect(isActive && selectedTokenId === token.id ? null : token.id);
                }}
              >
                {isActive && (
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={15}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.8"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}

                <circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? 6.5 : 5}
                  fill={isActive ? '#38BDF8' : '#60A5FA'}
                  stroke="#090D16"
                  strokeWidth="1.5"
                />

                <rect
                  x={cx + 9}
                  y={cy - 9}
                  width={token.word.length * 6 + 10}
                  height={17}
                  rx={4}
                  fill={isActive ? '#38BDF8' : '#101726'}
                  stroke={isActive ? '#38BDF8' : '#475569'}
                  strokeWidth="1.2"
                />
                <text
                  x={cx + 14}
                  y={cy + 3}
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight="700"
                  fill={isActive ? '#090D16' : '#F1F5F9'}
                >
                  {token.word}
                </text>
              </g>
            );
          })}
        </svg>

        {activeToken && (
          <div className="absolute bottom-2 left-2 right-2 bg-[#0A0E18]/95 border border-sky-400/40 rounded-lg p-2 text-xs font-mono flex items-center justify-between gap-2 shadow-lg pointer-events-none">
            <div>
              <span className="text-sky-300 font-bold">● {activeToken.word}</span>
              <span className="text-slate-400 ml-1.5">[{activeToken.cluster}]</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Nearest:</span>
              {activeToken.neighbors.slice(0, 2).map((n, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-200 text-[11px] font-semibold">
                  {n.word} ({(n.similarity * 100).toFixed(0)}%)
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
