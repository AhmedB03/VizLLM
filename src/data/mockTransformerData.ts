import type { ExampleSentence, GlobalVectorPoint, TokenData } from '../types/transformer';

function generateVector(seedWord: string, baseVals: number[] = []): number[] {
  let hash = 0;
  for (let i = 0; i < seedWord.length; i++) {
    hash = (hash << 5) - hash + seedWord.charCodeAt(i);
    hash |= 0;
  }
  const vec: number[] = [];
  for (let i = 0; i < 64; i++) {
    if (i < baseVals.length) {
      vec.push(baseVals[i]);
    } else {
      const val = Math.sin(hash + i * 13.37) * 0.85;
      vec.push(Number(val.toFixed(3)));
    }
  }
  return vec;
}

export const GLOBAL_VECTOR_CLOUD: GlobalVectorPoint[] = [
  // Drive & Core Cluster (Sky Blue neighborhood)
  { word: 'passion', x: 48, y: -32, cluster: 'Drive & Core', color: '#38BDF8' },
  { word: 'intensity', x: 52, y: -28, cluster: 'Drive & Core', color: '#38BDF8' },
  { word: 'zeal', x: 45, y: -38, cluster: 'Drive & Core', color: '#38BDF8' },
  { word: 'fervor', x: 55, y: -35, cluster: 'Drive & Core', color: '#38BDF8' },
  { word: 'burning', x: 42, y: -22, cluster: 'Drive & Core', color: '#38BDF8' },
  { word: 'focus', x: 39, y: -25, cluster: 'Drive & Core', color: '#38BDF8' },
  { word: 'energy', x: 35, y: -18, cluster: 'Drive & Core', color: '#38BDF8' },

  // Action & Catalyst Cluster (Cyan neighborhood)
  { word: 'drives', x: 15, y: 12, cluster: 'Action & Catalyst', color: '#06B6D4' },
  { word: 'propels', x: 18, y: 16, cluster: 'Action & Catalyst', color: '#06B6D4' },
  { word: 'catalyzes', x: 12, y: 22, cluster: 'Action & Catalyst', color: '#06B6D4' },
  { word: 'spurs', x: 22, y: 10, cluster: 'Action & Catalyst', color: '#06B6D4' },
  { word: 'learn', x: 5, y: 35, cluster: 'Action & Catalyst', color: '#06B6D4' },
  { word: 'transform', x: 8, y: 45, cluster: 'Action & Catalyst', color: '#06B6D4' },

  // Innovation & Systems Cluster (Indigo/Violet neighborhood)
  { word: 'innovation', x: -42, y: 38, cluster: 'Innovation & Tech', color: '#818CF8' },
  { word: 'breakthrough', x: -48, y: 42, cluster: 'Innovation & Tech', color: '#818CF8' },
  { word: 'invention', x: -38, y: 33, cluster: 'Innovation & Tech', color: '#818CF8' },
  { word: 'future', x: -52, y: 30, cluster: 'Innovation & Tech', color: '#818CF8' },
  { word: 'discovery', x: -45, y: 48, cluster: 'Innovation & Tech', color: '#818CF8' },

  // AI & Architecture Cluster (Teal/Slate neighborhood)
  { word: 'neural', x: -65, y: -50, cluster: 'AI & Computation', color: '#64748B' },
  { word: 'networks', x: -58, y: -45, cluster: 'AI & Computation', color: '#64748B' },
  { word: 'attention', x: -70, y: -35, cluster: 'AI & Computation', color: '#64748B' },
  { word: 'mechanisms', x: -60, y: -28, cluster: 'AI & Computation', color: '#64748B' },
  { word: 'intelligence', x: -75, y: -55, cluster: 'AI & Computation', color: '#64748B' },
  { word: 'artificial', x: -68, y: -62, cluster: 'AI & Computation', color: '#64748B' },
  { word: 'patterns', x: -45, y: -40, cluster: 'AI & Computation', color: '#64748B' },
];

export const EXAMPLE_SENTENCES: ExampleSentence[] = [
  {
    id: 'sentence-1',
    title: 'A burning passion drives innovation',
    text: 'A burning passion drives innovation',
    tokens: [
      {
        id: 0,
        word: 'A',
        pos: 'DET',
        vectorRaw: generateVector('A', [0.112, -0.045, 0.089, -0.211, 0.412, 0.031]),
        pca2D: { x: 5, y: -65 },
        cluster: 'Determiner',
        clusterColor: '#64748B',
        neighbors: [
          { word: 'The', similarity: 0.94, x: 8, y: -63 },
          { word: 'An', similarity: 0.91, x: 3, y: -68 },
        ]
      },
      {
        id: 1,
        word: 'burning',
        pos: 'ADJ',
        vectorRaw: generateVector('burning', [0.654, -0.421, 0.781, 0.112, -0.543, 0.819]),
        pca2D: { x: 42, y: -22 },
        cluster: 'Drive & Core',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'intense', similarity: 0.89, x: 40, y: -20 },
          { word: 'dynamic', similarity: 0.86, x: 45, y: -26 },
          { word: 'profound', similarity: 0.84, x: 38, y: -19 },
        ]
      },
      {
        id: 2,
        word: 'passion',
        pos: 'NOUN',
        vectorRaw: generateVector('passion', [0.824, -0.153, 0.618, -0.402, 0.731, 0.294]),
        pca2D: { x: 48, y: -32 },
        cluster: 'Drive & Core',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'intensity', similarity: 0.91, x: 52, y: -28 },
          { word: 'fervor', similarity: 0.88, x: 55, y: -35 },
          { word: 'zeal', similarity: 0.85, x: 45, y: -38 },
          { word: 'drive', similarity: 0.83, x: 42, y: -30 },
        ]
      },
      {
        id: 3,
        word: 'drives',
        pos: 'VERB',
        vectorRaw: generateVector('drives', [-0.215, 0.764, -0.198, 0.643, 0.125, -0.342]),
        pca2D: { x: 15, y: 12 },
        cluster: 'Action & Catalyst',
        clusterColor: '#06B6D4',
        neighbors: [
          { word: 'propels', similarity: 0.93, x: 18, y: 16 },
          { word: 'catalyzes', similarity: 0.89, x: 12, y: 22 },
          { word: 'spurs', similarity: 0.86, x: 22, y: 10 },
        ]
      },
      {
        id: 4,
        word: 'innovation',
        pos: 'NOUN',
        vectorRaw: generateVector('innovation', [-0.642, 0.512, 0.431, 0.812, -0.315, 0.691]),
        pca2D: { x: -42, y: 38 },
        cluster: 'Innovation & Tech',
        clusterColor: '#818CF8',
        neighbors: [
          { word: 'breakthrough', similarity: 0.92, x: -48, y: 42 },
          { word: 'invention', similarity: 0.89, x: -38, y: 33 },
          { word: 'discovery', similarity: 0.84, x: -45, y: 48 },
        ]
      }
    ],
    heads: [
      {
        id: 0,
        name: 'Head 1: Local Syntactic Modifiers',
        description: 'Adjective modifier & syntactic binding (e.g. burning -> passion)',
        color: '#38BDF8',
        matrix: [
          [0.35, 0.30, 0.25, 0.06, 0.04],
          [0.05, 0.28, 0.59, 0.05, 0.03],
          [0.03, 0.64, 0.22, 0.08, 0.03],
          [0.04, 0.11, 0.46, 0.24, 0.15],
          [0.02, 0.05, 0.18, 0.54, 0.21],
        ]
      },
      {
        id: 1,
        name: 'Head 2: Subject-Verb-Object Core',
        description: 'Semantic relation: Agent (passion) -> Action (drives) -> Outcome (innovation)',
        color: '#06B6D4',
        matrix: [
          [0.20, 0.15, 0.45, 0.12, 0.08],
          [0.04, 0.18, 0.42, 0.24, 0.12],
          [0.03, 0.14, 0.28, 0.42, 0.13],
          [0.02, 0.06, 0.44, 0.16, 0.32],
          [0.02, 0.04, 0.24, 0.48, 0.22],
        ]
      },
      {
        id: 2,
        name: 'Head 3: Global Context Distribution',
        description: 'Broad contextual attention across the entire sequence',
        color: '#818CF8',
        matrix: [
          [0.40, 0.15, 0.20, 0.15, 0.10],
          [0.04, 0.22, 0.38, 0.14, 0.22],
          [0.02, 0.31, 0.24, 0.18, 0.25],
          [0.03, 0.12, 0.32, 0.22, 0.31],
          [0.02, 0.18, 0.34, 0.26, 0.20],
        ]
      }
    ]
  },
  {
    id: 'sentence-2',
    title: 'Deep neural networks learn complex patterns',
    text: 'Deep neural networks learn complex patterns',
    tokens: [
      {
        id: 0,
        word: 'Deep',
        pos: 'ADJ',
        vectorRaw: generateVector('Deep', [-0.412, -0.631, 0.542, 0.712, -0.198, 0.441]),
        pca2D: { x: -62, y: -42 },
        cluster: 'AI & Computation',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'profound', similarity: 0.88, x: -60, y: -40 },
          { word: 'layered', similarity: 0.86, x: -64, y: -44 },
        ]
      },
      {
        id: 1,
        word: 'neural',
        pos: 'ADJ',
        vectorRaw: generateVector('neural', [-0.781, -0.542, 0.612, 0.831, -0.412, 0.691]),
        pca2D: { x: -65, y: -50 },
        cluster: 'AI & Computation',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'synaptic', similarity: 0.92, x: -67, y: -52 },
          { word: 'cognitive', similarity: 0.89, x: -63, y: -48 },
        ]
      },
      {
        id: 2,
        word: 'networks',
        pos: 'NOUN',
        vectorRaw: generateVector('networks', [-0.712, -0.481, 0.591, 0.742, -0.321, 0.618]),
        pca2D: { x: -58, y: -45 },
        cluster: 'AI & Computation',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'architectures', similarity: 0.91, x: -56, y: -47 },
          { word: 'systems', similarity: 0.88, x: -54, y: -43 },
        ]
      },
      {
        id: 3,
        word: 'learn',
        pos: 'VERB',
        vectorRaw: generateVector('learn', [0.124, 0.631, -0.312, 0.541, 0.219, -0.412]),
        pca2D: { x: 5, y: 35 },
        cluster: 'Action & Catalyst',
        clusterColor: '#06B6D4',
        neighbors: [
          { word: 'extract', similarity: 0.89, x: 7, y: 33 },
          { word: 'acquire', similarity: 0.86, x: 3, y: 37 },
        ]
      },
      {
        id: 4,
        word: 'complex',
        pos: 'ADJ',
        vectorRaw: generateVector('complex', [-0.312, 0.214, 0.642, -0.189, 0.431, 0.512]),
        pca2D: { x: -38, y: -38 },
        cluster: 'Structure',
        clusterColor: '#818CF8',
        neighbors: [
          { word: 'intricate', similarity: 0.92, x: -40, y: -36 },
          { word: 'multi-layered', similarity: 0.87, x: -36, y: -40 },
        ]
      },
      {
        id: 5,
        word: 'patterns',
        pos: 'NOUN',
        vectorRaw: generateVector('patterns', [-0.512, 0.381, 0.712, 0.214, 0.612, -0.198]),
        pca2D: { x: -45, y: -40 },
        cluster: 'AI & Computation',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'regularities', similarity: 0.91, x: -47, y: -42 },
          { word: 'features', similarity: 0.89, x: -43, y: -38 },
        ]
      }
    ],
    heads: [
      {
        id: 0,
        name: 'Head 1: Compound Noun Binding',
        description: 'Binds "Deep" + "neural" + "networks" and "complex" + "patterns"',
        color: '#38BDF8',
        matrix: [
          [0.25, 0.45, 0.22, 0.04, 0.02, 0.02],
          [0.34, 0.24, 0.36, 0.03, 0.01, 0.02],
          [0.21, 0.52, 0.18, 0.05, 0.02, 0.02],
          [0.05, 0.15, 0.42, 0.22, 0.06, 0.10],
          [0.03, 0.05, 0.08, 0.04, 0.28, 0.52],
          [0.02, 0.04, 0.12, 0.18, 0.44, 0.20],
        ]
      },
      {
        id: 1,
        name: 'Head 2: Predicate & Object Focus',
        description: 'Verb "learn" connecting architecture (networks) to target (patterns)',
        color: '#06B6D4',
        matrix: [
          [0.18, 0.22, 0.35, 0.15, 0.05, 0.05],
          [0.10, 0.20, 0.45, 0.15, 0.05, 0.05],
          [0.08, 0.18, 0.24, 0.36, 0.04, 0.10],
          [0.05, 0.12, 0.44, 0.14, 0.05, 0.20],
          [0.04, 0.06, 0.14, 0.26, 0.20, 0.30],
          [0.04, 0.08, 0.32, 0.38, 0.08, 0.10],
        ]
      },
      {
        id: 2,
        name: 'Head 3: Semantic Abstraction',
        description: 'Cross-layer attention connecting deep hierarchy with feature representation',
        color: '#818CF8',
        matrix: [
          [0.20, 0.25, 0.20, 0.10, 0.12, 0.13],
          [0.15, 0.20, 0.25, 0.12, 0.14, 0.14],
          [0.12, 0.22, 0.20, 0.16, 0.12, 0.18],
          [0.08, 0.14, 0.28, 0.18, 0.14, 0.18],
          [0.10, 0.12, 0.18, 0.15, 0.20, 0.25],
          [0.12, 0.15, 0.26, 0.18, 0.14, 0.15],
        ]
      }
    ]
  },
  {
    id: 'sentence-3',
    title: 'Attention mechanisms transform artificial intelligence',
    text: 'Attention mechanisms transform artificial intelligence',
    tokens: [
      {
        id: 0,
        word: 'Attention',
        pos: 'NOUN',
        vectorRaw: generateVector('Attention', [-0.812, -0.612, 0.742, 0.891, -0.512, 0.781]),
        pca2D: { x: -70, y: -35 },
        cluster: 'AI & Computation',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'self-attention', similarity: 0.95, x: -72, y: -37 },
          { word: 'focus', similarity: 0.88, x: -68, y: -33 },
        ]
      },
      {
        id: 1,
        word: 'mechanisms',
        pos: 'NOUN',
        vectorRaw: generateVector('mechanisms', [-0.642, -0.412, 0.581, 0.712, -0.381, 0.612]),
        pca2D: { x: -60, y: -28 },
        cluster: 'AI & Computation',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'algorithms', similarity: 0.91, x: -62, y: -30 },
          { word: 'processes', similarity: 0.87, x: -58, y: -26 },
        ]
      },
      {
        id: 2,
        word: 'transform',
        pos: 'VERB',
        vectorRaw: generateVector('transform', [0.312, 0.742, -0.189, 0.612, 0.281, -0.381]),
        pca2D: { x: 8, y: 45 },
        cluster: 'Action & Catalyst',
        clusterColor: '#06B6D4',
        neighbors: [
          { word: 'revolutionize', similarity: 0.93, x: 10, y: 47 },
          { word: 'reshape', similarity: 0.89, x: 6, y: 43 },
        ]
      },
      {
        id: 3,
        word: 'artificial',
        pos: 'ADJ',
        vectorRaw: generateVector('artificial', [-0.781, -0.691, 0.812, 0.912, -0.612, 0.841]),
        pca2D: { x: -68, y: -62 },
        cluster: 'AI & Computation',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'synthetic', similarity: 0.90, x: -66, y: -60 },
          { word: 'computational', similarity: 0.86, x: -70, y: -64 },
        ]
      },
      {
        id: 4,
        word: 'intelligence',
        pos: 'NOUN',
        vectorRaw: generateVector('intelligence', [-0.841, -0.742, 0.861, 0.942, -0.681, 0.891]),
        pca2D: { x: -75, y: -55 },
        cluster: 'AI & Computation',
        clusterColor: '#38BDF8',
        neighbors: [
          { word: 'cognition', similarity: 0.93, x: -77, y: -57 },
          { word: 'reasoning', similarity: 0.89, x: -73, y: -53 },
        ]
      }
    ],
    heads: [
      {
        id: 0,
        name: 'Head 1: Syntactic Dependencies',
        description: 'Modifier links: "Attention" -> "mechanisms" & "artificial" -> "intelligence"',
        color: '#38BDF8',
        matrix: [
          [0.30, 0.58, 0.08, 0.02, 0.02],
          [0.48, 0.28, 0.16, 0.04, 0.04],
          [0.12, 0.38, 0.22, 0.08, 0.20],
          [0.03, 0.04, 0.08, 0.26, 0.59],
          [0.04, 0.08, 0.18, 0.54, 0.16],
        ]
      },
      {
        id: 1,
        name: 'Head 2: Semantic Transformation',
        description: 'Connects catalyst ("mechanisms") via verb ("transform") to AI domain',
        color: '#06B6D4',
        matrix: [
          [0.25, 0.35, 0.22, 0.08, 0.10],
          [0.28, 0.24, 0.32, 0.06, 0.10],
          [0.18, 0.34, 0.18, 0.12, 0.18],
          [0.05, 0.10, 0.24, 0.22, 0.39],
          [0.08, 0.22, 0.38, 0.18, 0.14],
        ]
      },
      {
        id: 2,
        name: 'Head 3: Paradigm Resonance',
        description: 'Global attention showing how attention mechanisms redefine AI architecture',
        color: '#818CF8',
        matrix: [
          [0.28, 0.25, 0.18, 0.14, 0.15],
          [0.22, 0.24, 0.20, 0.16, 0.18],
          [0.16, 0.22, 0.20, 0.20, 0.22],
          [0.12, 0.16, 0.22, 0.24, 0.26],
          [0.15, 0.20, 0.24, 0.22, 0.19],
        ]
      }
    ]
  }
];

export function generateCustomSentenceData(text: string): ExampleSentence {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return EXAMPLE_SENTENCES[0];
  }

  const clusters = [
    { name: 'Subject & Actor', color: '#38BDF8' },
    { name: 'Action & Catalyst', color: '#06B6D4' },
    { name: 'Descriptor', color: '#818CF8' },
    { name: 'Entity & Concept', color: '#64748B' },
  ];

  const tokens: TokenData[] = words.map((w, idx) => {
    const cleanWord = w.replace(/[^a-zA-Z0-9]/g, '');
    const clusterObj = clusters[idx % clusters.length];
    const raw = generateVector(cleanWord);
    const angle = (idx / words.length) * Math.PI * 2 + 0.5;
    const dist = 35 + ((idx * 17) % 35);
    const x = Number((Math.cos(angle) * dist).toFixed(1));
    const y = Number((Math.sin(angle) * dist).toFixed(1));

    return {
      id: idx,
      word: w,
      pos: idx === 0 ? 'NOUN' : idx === 1 ? 'VERB' : idx % 2 === 0 ? 'ADJ' : 'NOUN',
      vectorRaw: raw,
      pca2D: { x, y },
      cluster: clusterObj.name,
      clusterColor: clusterObj.color,
      neighbors: [
        { word: `${w}_syn1`, similarity: 0.89, x: x + 4, y: y - 3 },
        { word: `${w}_syn2`, similarity: 0.84, x: x - 5, y: y + 4 },
      ]
    };
  });

  const n = tokens.length;
  const createMatrix = (focusMode: 'local' | 'verb' | 'global') => {
    const mat: number[][] = [];
    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      let sum = 0;
      for (let j = 0; j < n; j++) {
        let val = 0.1;
        if (i === j) val += 0.2;
        if (focusMode === 'local' && Math.abs(i - j) === 1) val += 0.45;
        if (focusMode === 'verb' && (j === 1 || j === Math.floor(n / 2))) val += 0.5;
        if (focusMode === 'global') val += (n - Math.abs(i - j)) * 0.08;
        row.push(val);
        sum += val;
      }
      mat.push(row.map(v => Number((v / sum).toFixed(3))));
    }
    return mat;
  };

  return {
    id: 'custom-' + Date.now(),
    title: text,
    text,
    tokens,
    heads: [
      {
        id: 0,
        name: 'Head 1: Syntactic Neighborhood',
        description: 'Strong attention between adjacent syntactic modifiers & nouns',
        color: '#38BDF8',
        matrix: createMatrix('local'),
      },
      {
        id: 1,
        name: 'Head 2: Central Predicate Links',
        description: 'Focus centered on primary verb/action tokens',
        color: '#06B6D4',
        matrix: createMatrix('verb'),
      },
      {
        id: 2,
        name: 'Head 3: Global Context Distribution',
        description: 'Broad contextual attention across the entire sequence',
        color: '#818CF8',
        matrix: createMatrix('global'),
      }
    ]
  };
}
