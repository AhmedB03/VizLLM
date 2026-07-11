import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TokenInput } from './components/TokenInput';
import { AttentionGraph } from './components/AttentionGraph';
import { VectorPlot } from './components/VectorPlot';
import { VectorInspector } from './components/VectorInspector';
import { EXAMPLE_SENTENCES, generateCustomSentenceData } from './data/mockTransformerData';
import type { ExampleSentence } from './types/transformer';

export function App() {
  const [currentSentence, setCurrentSentence] = useState<ExampleSentence>(EXAMPLE_SENTENCES[0]);
  const [selectedHeadIndex, setSelectedHeadIndex] = useState<number>(0);
  const [hoveredTokenId, setHoveredTokenId] = useState<number | null>(null);
  // Default selected token #2 ('passion') so screenshots instantly show live glowing Bezier curves & vector neighbors!
  const [selectedTokenId, setSelectedTokenId] = useState<number | null>(2);

  const handleCustomInputSubmit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const existingPreset = EXAMPLE_SENTENCES.find(
      (s) => s.text.toLowerCase() === trimmed.toLowerCase()
    );
    if (existingPreset) {
      setCurrentSentence(existingPreset);
    } else {
      const customData = generateCustomSentenceData(trimmed);
      setCurrentSentence(customData);
    }
    setHoveredTokenId(null);
    setSelectedTokenId(0);
  };

  const handleSelectPreset = (sentence: ExampleSentence) => {
    setCurrentSentence(sentence);
    setHoveredTokenId(null);
    setSelectedTokenId(2 < sentence.tokens.length ? 2 : 0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTokenId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeHead = currentSentence.heads[selectedHeadIndex] || currentSentence.heads[0];
  const activeTokenId = selectedTokenId !== null ? selectedTokenId : hoveredTokenId;
  const activeToken =
    activeTokenId !== null ? currentSentence.tokens.find((t) => t.id === activeTokenId) || null : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1322] text-slate-100 selection:bg-sky-500/20">
      {/* Sleek VizLLM Header */}
      <Header
        selectedHeadIndex={selectedHeadIndex}
        onSelectHead={(idx) => setSelectedHeadIndex(idx)}
        headNames={currentSentence.heads.map((h) => h.name.split(':')[0])}
      />

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col">
        {/* Full-width Spacious Token Input Bar */}
        <TokenInput
          currentSentence={currentSentence}
          presetSentences={EXAMPLE_SENTENCES}
          onSelectPreset={handleSelectPreset}
          onCustomInputSubmit={handleCustomInputSubmit}
          hoveredTokenId={hoveredTokenId}
          selectedTokenId={selectedTokenId}
          onTokenHover={(id) => setHoveredTokenId(id)}
          onTokenSelect={(id) => setSelectedTokenId(id)}
        />

        {/* Studio Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
          {/* Left Column: Self-Attention Flow Map */}
          <div className="lg:col-span-6 flex flex-col h-[465px]">
            <AttentionGraph
              tokens={currentSentence.tokens}
              activeHead={activeHead}
              hoveredTokenId={hoveredTokenId}
              selectedTokenId={selectedTokenId}
              onTokenHover={(id) => setHoveredTokenId(id)}
              onTokenSelect={(id) => setSelectedTokenId(id)}
            />
          </div>

          {/* Right Column: 2D PCA Vector Plot (top) + Embedding Probe (bottom) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-[465px]">
            <VectorPlot
              tokens={currentSentence.tokens}
              hoveredTokenId={hoveredTokenId}
              selectedTokenId={selectedTokenId}
              onTokenHover={(id) => setHoveredTokenId(id)}
              onTokenSelect={(id) => setSelectedTokenId(id)}
            />
            <VectorInspector
              token={activeToken}
              allTokens={currentSentence.tokens}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/15 bg-[#0D1322] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div>VIZLLM &bull; Interactive Self-Attention &amp; Embedding Studio</div>
          <div className="flex items-center space-x-4">
            <span className="text-sky-300">&bull; Multi-Head Attention</span>
            <span className="text-slate-300">&bull; Pairwise Cosine Similarity</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
