# VizLLM — Interactive Transformer Self-Attention & Embedding Studio

<div align="center">

![VizLLM Studio](https://img.shields.io/badge/VizLLM-Transformer%20Studio-0EA5E9?style=for-the-badge)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_5-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

An interactive, high-precision visualizer designed to make **Transformer architectures, Multi-Head Self-Attention weights, and High-Dimensional Word Embeddings** intuitive and beautifully inspectable. Inspired by sleek modern AI developer tools.

</div>

---

## 📌 GitHub Repository Description (Copy & Paste)

> **Short About Description (for GitHub repo header):**  
> `An interactive visualizer for Transformer Self-Attention weights and 768-D Word Embeddings featuring Google Maps-style pan & zoom navigation and Cluely glassmorphism aesthetics.`

> **Recommended GitHub Topics / Tags:**  
> `transformers` `llm` `nlp` `react` `typescript` `vite` `tailwind-css` `data-visualization` `machine-learning` `attention-mechanism`

---

## ✨ Key Features

- **Connected Multi-Head Self-Attention Flow Map**:
  - Precision-aligned SVG Bezier network linking Query tokens (`Q`) directly to Key/Value target tokens (`K`).
  - Seamlessly switch between multiple attention heads (*Syntactic Modifiers*, *Subject-Verb-Object Predicates*, and *Global Context Cohesion*).
  - Hover or click any token to instantly illuminate dominant attention paths with live percentage weights.

- **Google Maps-Style 2D PCA Vector Space**:
  - **Click-and-Drag Pan Navigation**: Click and hold anywhere inside the scatter plot to pan across the 768-D projection space.
  - **Wheel & Toolbar Zooming**: Smoothly zoom in up to 350% or zoom out to inspect semantic clusters (*Action & Catalyst*, *AI & Computation*, *Drive & Core*, *Innovation & Tech*).
  - Hovering a token highlights its nearest semantic neighbors with animated dashed distance vectors.

- **Full-Width Token Input & Dynamic Sequence Tokenizer**:
  - Enter custom natural language sentences across a spacious full-width input bar or test pre-configured benchmark sequences.
  - Interactive Part-of-Speech (`POS`) badges and token indices.

- **Live Pairwise Cosine Similarity Probe**:
  - Calculates real-time pairwise dot-product similarities between all sequence tokens.
  - Features a Float32 dimension activation sparkline (`d_model = 768`).

- **Cluely.com Inspired Glassmorphism Aesthetic**:
  - Atmospheric dark surface illuminated by soft sky-blue and indigo ambient backlighting.
  - High-contrast floating translucent glass containers (`backdrop-blur-2xl`) and zero-scroll single-viewport layout.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/TransformerVizualizer.git
cd TransformerVizualizer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173) to explore the visualizer.

### 4. Build for Production
```bash
npm run build
```

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3.4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📐 Architecture Overview

```
src/
├── components/
│   ├── Header.tsx            # Floating VizLLM top navigation & head switcher tabs
│   ├── TokenInput.tsx        # Full-width sequence input & interactive token pills
│   ├── AttentionGraph.tsx    # Connected SVG Bezier self-attention flow diagram
│   ├── VectorPlot.tsx        # Google Maps-style pan & zoom 2D PCA semantic plot
│   └── VectorInspector.tsx   # Live pairwise cosine similarity & float32 sparklines
├── data/
│   └── mockTransformerData.ts# Multi-head attention matrices & 768-D vector embeddings
├── types/
│   └── transformer.ts        # TypeScript interfaces for Tokens, Heads, and Vectors
└── App.tsx                   # Unified zero-scroll studio container
```

---

## 📄 License

MIT License. Free for educational and portfolio use.
