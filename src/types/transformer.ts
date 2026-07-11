export interface TokenData {
  id: number;
  word: string;
  pos: 'NOUN' | 'VERB' | 'ADJ' | 'ADV' | 'DET' | 'PREP';
  vectorRaw: number[]; // e.g. 768-dim mock vector
  pca2D: { x: number; y: number }; // -100 to 100 space
  cluster: string;
  clusterColor: string;
  neighbors: { word: string; similarity: number; x: number; y: number }[];
}

export interface AttentionHead {
  id: number;
  name: string;
  description: string;
  color: string;
  matrix: number[][]; // [sourceTokenIndex][targetTokenIndex]
}

export interface ExampleSentence {
  id: string;
  title: string;
  text: string;
  tokens: TokenData[];
  heads: AttentionHead[];
}

export interface GlobalVectorPoint {
  word: string;
  x: number;
  y: number;
  cluster: string;
  color: string;
}
