import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './components/ui/Button/Button';
import { Divider } from './components/ui/Divider/Divider';
import { Select } from './components/ui/Select/Select';
import { Slider } from './components/ui/Slider/Slider';
import { TabButton } from './components/ui/TabButton/TabButton';

import {
  ArrowDown,
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  ArrowUpDown,
  Circle,
  CircleOff,
  CornerDownLeft,
  ArrowUp,
  Plus,
  X,
} from 'lucide-react';

import './App.scss';

type Stop = { hex: string; pos: number; name: string };
type Orient = 'v' | 'h' | 'd1' | 'd2' | 'r' | 'rc' | 'tl' | 'rev';

const JP = [
  { jp: '濡羽色', en: 'NUREBAIRO', mean: "SHINY CROW'S FEATHER" },
  { jp: '生成り色', en: 'KINARĪRO', mean: 'DOUGH' },
  { jp: '藍色', en: 'AIIRO', mean: 'INDIGO' },
  { jp: '紅色', en: 'KURENAI', mean: 'CRIMSON' },
  { jp: '白磁', en: 'HAKUJI', mean: 'WHITE PORCELAIN' },
  { jp: '瑠璃色', en: 'RURIIRO', mean: 'LAPIS LAZULI' },
  { jp: '桜色', en: 'SAKURAIRO', mean: 'CHERRY BLOSSOM' },
  { jp: '黒', en: 'KURO', mean: 'BLACK' },
  { jp: '灰色', en: 'HAIIRO', mean: 'ASH' },
  { jp: '深緑', en: 'FUKAMIDORI', mean: 'DEEP FOREST' },
  { jp: '茜色', en: 'AKANEIRO', mean: 'MADDER RED' },
  { jp: '空色', en: 'SORAIRO', mean: 'SKY BLUE' },
  { jp: '山吹色', en: 'YAMABUKIIRO', mean: 'GOLDEN YAMABUKI' },
  { jp: '薄紫', en: 'USUMURASAKI', mean: 'PALE VIOLET' },
  { jp: '墨色', en: 'SUMIIRO', mean: 'INK STONE' },
  { jp: '朱色', en: 'SHUIRO', mean: 'VERMILION' },
  { jp: '鈍色', en: 'NIBIIRO', mean: 'DULL GREY' },
  { jp: '錆色', en: 'SABIIRO', mean: 'RUST' },
  { jp: '水色', en: 'MIZUIRO', mean: 'WATER BLUE' },
  { jp: '利休鼠', en: 'RIKYUNEZU', mean: 'RIKYŪ GREY' },
  { jp: '煤色', en: 'SUSUIRO', mean: 'SOOT' },
];

const PRESETS: Record<string, string[]> = {
  Greydient: ['#000B00', '#1a1a2e', '#8B0000', '#c8b8a8', '#FBFAF5'],
  Aurora: [
    '#DBCCC5',
    '#B391FF',
    '#550010',
    '#000524',
    '#FF5519',
    '#006EB1',
    '#CDB5FF',
    '#FFC6B2',
  ],
  Dusk: ['#f0ede8', '#e8c4c4', '#d44a6a', '#8b2252', '#3a1a3a'],
  Ink: ['#000B00', '#0d1b2e', '#1a3a5c', '#8ab4c8', '#d8e8f0'],
  Sakura: [
    '#f5f0eb',
    '#f0d8d0',
    '#e88fa0',
    '#d4537e',
    '#c8d8e8',
    '#f5f8fa',
  ],
  'Crow / Fire': [
    '#000000',
    '#0d0400',
    '#3a0a00',
    '#8B2500',
    '#d04010',
    '#e07030',
    '#e8b880',
    '#FBFAF5',
  ],
  'Navy / Rust': [
    '#020818',
    '#0c1a38',
    '#1e2a50',
    '#5a3040',
    '#a04828',
    '#c87848',
    '#ddb888',
    '#f5ece0',
  ],
  'Void / Violet': [
    '#000000',
    '#080010',
    '#200040',
    '#600090',
    '#9030c0',
    '#c070d8',
    '#ddb8ec',
    '#f8f4fc',
  ],
  'Ink / Crimson': [
    '#000000',
    '#100008',
    '#300010',
    '#800028',
    '#b80040',
    '#d06060',
    '#e0a898',
    '#f8f0e8',
  ],
  'Pine / Gold': [
    '#060e04',
    '#183018',
    '#2c5020',
    '#607838',
    '#a09030',
    '#d0b840',
    '#e0d090',
    '#f4f0e8',
  ],
  'Night / Coral': [
    '#000814',
    '#001838',
    '#103870',
    '#607090',
    '#b06858',
    '#d85030',
    '#eea080',
    '#faf0ec',
  ],
  'Obsidian / Teal': [
    '#000000',
    '#000a0a',
    '#002828',
    '#006860',
    '#00a898',
    '#50c8b8',
    '#a8e0d8',
    '#f4faf8',
  ],
  'Plum / Ember': [
    '#0e0018',
    '#2a0040',
    '#580060',
    '#900040',
    '#d03020',
    '#e86030',
    '#e8a060',
    '#f8f0e8',
  ],
  'Storm / Verm': [
    '#101828',
    '#202840',
    '#485068',
    '#886070',
    '#c02818',
    '#d85030',
    '#e09080',
    '#f8f0ee',
  ],
  'Moss / Dawn': [
    '#080a04',
    '#182810',
    '#305828',
    '#507840',
    '#78a868',
    '#98c890',
    '#b8d8c0',
    '#f0f8f8',
  ],
  Eclipse: [
    '#000000',
    '#04000a',
    '#0c0428',
    '#1a0848',
    '#2a1060',
    '#601030',
    '#b02828',
    '#d86040',
    '#e8b888',
    '#f8f0e8',
  ],
  Twilight: [
    '#001818',
    '#002840',
    '#103060',
    '#302878',
    '#6030a0',
    '#a04088',
    '#d06070',
    '#e8a0a0',
    '#f5e0e0',
    '#faf4f0',
  ],
  Shizen: [
    '#080808',
    '#0c1808',
    '#1a3010',
    '#305028',
    '#507840',
    '#808840',
    '#b0a030',
    '#d0c060',
    '#e8d898',
    '#f5f0e0',
  ],
  Umi: [
    '#000c18',
    '#001830',
    '#003850',
    '#006870',
    '#008888',
    '#30a890',
    '#80c0a0',
    '#d09070',
    '#e8b890',
    '#f5e0d0',
  ],
  'Void / Blue': [
    '#000000',
    '#04000c',
    '#100028',
    '#280060',
    '#4000a0',
    '#2030d0',
    '#1070e0',
    '#30b0e0',
    '#80d8f0',
    '#d0f0f8',
  ],
  'Kōbai': [
    '#0c0808',
    '#200c10',
    '#481020',
    '#801838',
    '#b03050',
    '#c86878',
    '#d898a0',
    '#e8c0c0',
    '#f5e0e0',
    '#faf4f2',
  ],
  Satoyama: [
    '#040c04',
    '#0c1c08',
    '#183010',
    '#2c4818',
    '#405c20',
    '#607830',
    '#8a9840',
    '#b0b060',
    '#c8c890',
    '#e0dcc0',
  ],
  Tetsu: [
    '#040408',
    '#080c18',
    '#101828',
    '#203048',
    '#405878',
    '#6880a0',
    '#90a8c0',
    '#b8c8d8',
    '#d8e4ec',
    '#f0f4f8',
  ],
  Kama: [
    '#0c0804',
    '#201408',
    '#401c0c',
    '#703018',
    '#a05030',
    '#c07850',
    '#d8a080',
    '#e8c8a8',
    '#f0dcc8',
    '#f8f0e8',
  ],
  Murasaki: [
    '#000000',
    '#04000c',
    '#100030',
    '#300068',
    '#6000c0',
    '#9040e0',
    '#c080f0',
    '#d8b0f8',
    '#ecd8fc',
    '#f8f4fe',
  ],
};

const DIRECTIONS: { id: Orient; label: string; icon: React.ReactNode }[] = [
  { id: 'v', label: 'Vert', icon: <ArrowDown size={12} /> },
  { id: 'h', label: 'Horiz', icon: <ArrowRight size={12} /> },
  { id: 'rev', label: 'Reverse', icon: <ArrowUp size={12} /> },
  { id: 'd1', label: 'Diag', icon: <ArrowDownRight size={12} /> },
  { id: 'd2', label: 'Diag', icon: <ArrowUpRight size={12} /> },
  // { id: 'tl', label: 'Corner', icon: <CornerDownLeft size={12} /> },
  { id: 'r', label: 'Radial', icon: <Circle size={12} /> },
  { id: 'rc', label: 'Off-ctr', icon: <CircleOff size={12} /> },
];

const LOGO_SRC = '/logo/rennu-logo.svg';

function rndJP() {
  return JP[Math.floor(Math.random() * JP.length)];
}

function hexRgb(h: string) {
  return [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
}

function isDarkHex(hex: string) {
  const [r8, g8, b8] = hexRgb(hex);
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const r = toLin(r8);
  const g = toLin(g8);
  const b = toLin(b8);
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L < 0.18;
}

function rgbHex(r: number, g: number, b: number) {
  const to = (v: number) =>
    Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

function lerpHex(h1: string, h2: string, t: number) {
  const [r1, g1, b1] = hexRgb(h1);
  const [r2, g2, b2] = hexRgb(h2);
  return rgbHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

function hslToHex(h: number, s: number, l: number) {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return `#${[f(0), f(8), f(4)]
    .map((v) => Math.round(v * 255).toString(16).padStart(2, '0'))
    .join('')}`;
}

function gradCss(hexes: string[]) {
  const s = [
    hexes[0],
    hexes[Math.floor(hexes.length / 2)],
    hexes[hexes.length - 1],
  ];
  return `linear-gradient(135deg,${s.join(',')})`;
}

function makeGradient(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  stopsToUse: Stop[],
  orient: Orient,
) {
  const sorted = [...stopsToUse].sort((a, b) => a.pos - b.pos);
  let grd: CanvasGradient;
  if (orient === 'v') grd = ctx.createLinearGradient(0, 0, 0, H);
  else if (orient === 'h') grd = ctx.createLinearGradient(0, 0, W, 0);
  else if (orient === 'd1') grd = ctx.createLinearGradient(0, 0, W, H);
  else if (orient === 'd2') grd = ctx.createLinearGradient(W, 0, 0, H);
  else if (orient === 'tl') grd = ctx.createLinearGradient(W, H, 0, 0);
  else if (orient === 'rev') grd = ctx.createLinearGradient(0, H, 0, 0);
  else if (orient === 'r') {
    const cx = W / 2,
      cy = H / 2;
    const r = Math.max(W, H) * 0.72;
    grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  } else {
    grd = ctx.createRadialGradient(
      W * 0.35,
      H * 0.38,
      0,
      W * 0.35,
      H * 0.38,
      Math.max(W, H) * 0.85,
    );
  }

  sorted.forEach((s) =>
    grd.addColorStop(Math.min(1, Math.max(0, s.pos)), s.hex),
  );
  return grd;
}

export default function App() {
  const stopsInitial = useMemo<Stop[]>(() => {
    const hexes = PRESETS.Greydient;
    return hexes.map((hex, i, a) => ({
      hex,
      pos: i / (a.length - 1),
      name: rndJP().en,
    }));
  }, []);

  const [stops, setStops] = useState<Stop[]>(stopsInitial);
  const [noiseA, setNoiseA] = useState(28);
  const [blurA, setBlurA] = useState(40);
  const [orient, setOrient] = useState<Orient>('v');
  const [activePreset, setActivePreset] = useState<string>('Greydient');
  const [initialStops, setInitialStops] = useState<Stop[]>(stopsInitial);

  const [expFmt, setExpFmt] = useState<'png' | 'jpg'>('png');
  const [expAr, setExpAr] = useState<'free' | '1x1' | '4x3' | '16x9' | '3x2' | '9x16'>('free');
  const [expSc, setExpSc] = useState(2);
  const [exportOpen, setExportOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const noiseCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  function buildNoise(w: number, h: number, amt: number) {
    if (!noiseCanvasRef.current) {
      noiseCanvasRef.current = document.createElement('canvas');
      noiseCtxRef.current = noiseCanvasRef.current.getContext('2d');
    }
    const nCvs = noiseCanvasRef.current!;
    const nCtx = noiseCtxRef.current!;
    nCvs.width = w;
    nCvs.height = h;
    const id = nCtx.createImageData(w, h);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() - 0.5) * amt * 2.55;
      d[i] = d[i + 1] = d[i + 2] = 128 + v;
      d[i + 3] = Math.round(amt * 1.8);
    }
    nCtx.putImageData(id, 0, 0);
    return nCvs;
  }

  function sampleAt(t: number) {
    const s = [...stops].sort((a, b) => a.pos - b.pos);
    if (t <= s[0].pos) return s[0].hex;
    if (t >= s[s.length - 1].pos) return s[s.length - 1].hex;
    for (let i = 0; i < s.length - 1; i++) {
      if (t >= s[i].pos && t <= s[i + 1].pos) {
        return lerpHex(s[i].hex, s[i + 1].hex, (t - s[i].pos) / (s[i + 1].pos - s[i].pos));
      }
    }
    return '#000';
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = canvasWrapRef.current;
    if (!canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const W = Math.max(Math.round(rect.width || wrap.clientWidth || 800), 1);
    const H = Math.max(Math.round(rect.height || wrap.clientHeight || window.innerHeight), 1);

    canvas.width = W * 2;
    canvas.height = H * 2;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(2, 0, 0, 2, 0, 0);

    if (stops.length < 2) return;

    ctx.fillStyle = makeGradient(ctx, W, H, stops, orient);
    ctx.fillRect(0, 0, W, H);

    if (blurA > 0) {
      const bands = 6 + Math.floor(blurA / 15);
      for (let b = 0; b < bands; b++) {
        const t = b / bands;
        const col = sampleAt(t);
        const bH = H * 0.12 + Math.random() * H * (blurA / 400);
        const cy = t * H + Math.random() * H * 0.06 - H * 0.03;
        const bg = ctx.createLinearGradient(0, cy - bH / 2, 0, cy + bH / 2);
        bg.addColorStop(0, col + '00');
        bg.addColorStop(0.4, col + 'a0');
        bg.addColorStop(0.5, col + 'b0');
        bg.addColorStop(1, col + '00');
        ctx.fillStyle = bg;
        ctx.fillRect(0, cy - bH / 2, W, bH);
      }
    }

    if (noiseA > 0) {
      const nc = buildNoise(W, H, noiseA);
      ctx.globalCompositeOperation = 'overlay';
      ctx.drawImage(nc, 0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
    }
  }, [stops, noiseA, blurA, orient]);

  function renderExportTo(
    ctx: CanvasRenderingContext2D,
    W: number,
    H: number,
    localStops: Stop[],
  ) {
    if (localStops.length < 2) return;

    const sorted = [...localStops].sort((a, b) => a.pos - b.pos);
    const sample = (t: number) => {
      if (t <= sorted[0].pos) return sorted[0].hex;
      if (t >= sorted[sorted.length - 1].pos) return sorted[sorted.length - 1].hex;
      for (let i = 0; i < sorted.length - 1; i++) {
        if (t >= sorted[i].pos && t <= sorted[i + 1].pos) {
          return lerpHex(
            sorted[i].hex,
            sorted[i + 1].hex,
            (t - sorted[i].pos) / (sorted[i + 1].pos - sorted[i].pos),
          );
        }
      }
      return '#000';
    };

    ctx.fillStyle = makeGradient(ctx, W, H, localStops, orient);
    ctx.fillRect(0, 0, W, H);

    if (blurA > 0) {
      const bands = 6 + Math.floor(blurA / 15);
      for (let b = 0; b < bands; b++) {
        const t = b / bands;
        const col = sample(t);
        const bH = H * 0.12 + Math.random() * H * (blurA / 400);
        const cy = t * H + Math.random() * H * 0.06 - H * 0.03;
        const bg = ctx.createLinearGradient(0, cy - bH / 2, 0, cy + bH / 2);
        bg.addColorStop(0, col + '00');
        bg.addColorStop(0.4, col + 'a0');
        bg.addColorStop(0.5, col + 'b0');
        bg.addColorStop(1, col + '00');
        ctx.fillStyle = bg;
        ctx.fillRect(0, cy - bH / 2, W, bH);
      }
    }

    if (noiseA > 0) {
      const nc = buildNoise(W, H, noiseA);
      ctx.globalCompositeOperation = 'overlay';
      ctx.drawImage(nc, 0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  function doExport() {
    const canvas = canvasRef.current;
    const wrap = canvasWrapRef.current;
    if (!canvas || !wrap) return;

    const srcW = wrap.clientWidth;
    const srcH = wrap.clientHeight;

    const ratios: Record<string, [number, number] | null> = {
      free: null,
      '1x1': [1, 1],
      '4x3': [4, 3],
      '16x9': [16, 9],
      '3x2': [3, 2],
      '9x16': [9, 16],
    };

    const ratio = ratios[expAr];
    let outW = srcW * expSc;
    let outH = srcH * expSc;

    if (ratio) {
      const [rw, rh] = ratio;
      const base = Math.min(srcW, srcH) * expSc;
      if (rw >= rh) {
        outW = base * (rw / rh);
        outH = base;
      } else {
        outW = base;
        outH = base * (rh / rw);
      }
    }

    outW = Math.round(outW);
    outH = Math.round(outH);

    const oc = document.createElement('canvas');
    oc.width = outW;
    oc.height = outH;
    const ctx = oc.getContext('2d');
    if (!ctx) return;

    renderExportTo(ctx, outW, outH, stops);

    const mime = expFmt === 'jpg' ? 'image/jpeg' : 'image/png';
    const a = document.createElement('a');
    a.download = `rennu-gradient.${expFmt}`;
    a.href = oc.toDataURL(mime, 0.95);
    a.click();

    setExportOpen(false);
  }

  function addStop(hex?: string, pos?: number) {
    const h =
      hex ??
      `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')}`;
    setStops((prev) => {
      const next = [...prev, { hex: h, pos: pos ?? 1, name: rndJP().en }];
      if (pos === undefined) {
        next.forEach((stop, i) => {
          stop.pos = next.length === 1 ? 0 : i / (next.length - 1);
        });
        return next;
      }

      next.sort((a, b) => a.pos - b.pos);
      return next;
    });
  }

  function rmStop(i: number) {
    setStops((prev) => {
      if (prev.length <= 2) return prev;
      const next = [...prev];
      next.splice(i, 1);
      return next;
    });
  }

  function upColor(i: number, hex: string) {
    setStops((prev) => prev.map((s, idx) => (idx === i ? { ...s, hex } : s)));
  }

  function reverseStops() {
    setStops((prev) => {
      const next = prev.map((s) => ({ ...s }));
      const sortedIndices = next
        .map((_, idx) => idx)
        .sort((a, b) => next[a].pos - next[b].pos);
      const positions = sortedIndices.map((idx) => next[idx].pos);
      sortedIndices.forEach((idx, i) => {
        next[idx].pos = positions[positions.length - 1 - i];
      });
      return next;
    });
  }

  function loadPreset(name: string) {
    setActivePreset(name);
    const hexes = PRESETS[name];
    const nextStops: Stop[] = hexes.map((hex, i, a) => ({
      hex,
      pos: i / (a.length - 1),
      name: rndJP().en,
    }));
    setStops(nextStops);
    setInitialStops(nextStops.map((s) => ({ ...s })));
  }

  function setOrientation(o: Orient) {
    setOrient(o);
  }

  function resetSettings() {
    setNoiseA(28);
    setBlurA(40);
    setOrient('v');
    if (initialStops.length) setStops(initialStops.map((s) => ({ ...s })));
  }

  function randomize() {
    setActivePreset('');
    const r = () => Math.random();
    const strategy = Math.floor(r() * 7);
    const n = 2 + Math.floor(r() * 7);
    let anchors: string[] = [];

    if (strategy === 0) {
      const h = r() * 360;
      const s = 8 + r() * 22;
      anchors = Array.from({ length: n }, (_, i) =>
        hslToHex(h, s * (1 - (i / (n - 1)) * 0.8), 5 + (i / (n - 1)) * 85),
      );
    } else if (strategy === 1) {
      const h1 = r() * 360;
      const h2 = h1 + 20 + r() * 25;
      const s = 12 + r() * 25;
      anchors = Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        return hslToHex(h1 + (h2 - h1) * t, s * (1 - t * 0.75), 5 + t * 84);
      });
    } else if (strategy === 2) {
      const h = r() * 360;
      const s = 30 + r() * 25;
      anchors = Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        return hslToHex(h, i === Math.floor(n / 2) ? s : s * 0.15, 5 + t * 84);
      });
    } else if (strategy === 3) {
      const h1 = r() * 360;
      const h2 = h1 + 160 + r() * 40;
      const s = 20 + r() * 25;
      anchors = Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        return hslToHex(
          t < 0.5 ? h1 : h2,
          s * (0.4 + t * 0.6) * (1 - Math.abs(t - 0.5)),
          5 + t * 84,
        );
      });
    } else if (strategy === 4) {
      const h = 15 + r() * 35;
      const s = 10 + r() * 20;
      anchors = Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        return hslToHex(h, s * (1 - t * 0.7), 5 + t * 84);
      });
    } else if (strategy === 5) {
      const h = 185 + r() * 55;
      const s = 8 + r() * 20;
      anchors = Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        return hslToHex(h, s * (1 - t * 0.6), 5 + t * 84);
      });
    } else {
      const h = r() * 360;
      const s = 25 + r() * 20;
      anchors = Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        return hslToHex(h, s * Math.sin(t * Math.PI) * 0.9 + 4, 4 + t * 88);
      });
    }

    const nextStops: Stop[] = anchors.map((hex, i) => ({
      hex,
      pos: i / (anchors.length - 1),
      name: rndJP().en,
    }));
    setStops(nextStops);
    setInitialStops(nextStops.map((s) => ({ ...s })));

    const ids = DIRECTIONS.map((d) => d.id);
    setOrient(ids[Math.floor(Math.random() * ids.length)]);
  }

  // Initialize with preset on mount
  useEffect(() => {
    draw();
  }, [stops, noiseA, blurA, orient]);

  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  useEffect(() => {
    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    const rafId = window.requestAnimationFrame(() => {
      draw();
    });

    const resizeObserver = new ResizeObserver(() => {
      draw();
    });

    resizeObserver.observe(wrap);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [draw]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;

      const target = e.target as HTMLElement | null;
      if (
        target?.closest('input, textarea, select, button, [contenteditable="true"], [role="dialog"]') ||
        target?.isContentEditable
      ) {
        return;
      }

      e.preventDefault();
      randomize();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const presetItems = useMemo(() => {
    return Object.keys(PRESETS).map((name) => ({
      value: name,
      label: name,
      dotBg: gradCss(PRESETS[name]),
    }));
  }, []);

  const triggerLabel = activePreset ? activePreset : 'Custom';
  const triggerDotBg = gradCss(PRESETS[activePreset || 'Greydient']);

  const sortedStops = useMemo(() => {
    return stops
      .map((s, idx) => ({ s, idx }))
      .sort((a, b) => a.s.pos - b.s.pos);
  }, [stops]);

  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | null>(null);

  return (
    <div className="rennu-app">
      <header className="mobileHeader">
        <div className="mobileHeader__brand">
          <img src={LOGO_SRC} alt="Rennu" />
        </div>
        <button
          type="button"
          className={['mobileMenuButton', sidebarOpen ? 'is-open' : ''].join(' ')}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <button
        type="button"
        className={['mobileBackdrop', sidebarOpen ? 'is-open' : ''].join(' ')}
        aria-label="Close menu"
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={['rennu-sidebar', sidebarOpen ? 'open' : ''].join(' ')}
        aria-label="Sidebar"
      >
        <div className="sidebar__logo">
          <img src={LOGO_SRC} alt="Rennu" />
        </div>
        <div className="sidebar__dividerWrap sidebar__logoDivider">
          <Divider />
        </div>

        <div className="sidebar__settings">
          <div className="sidebar__section">
            <div className="sidebar__sectionHeader">
              <div className="sidebar__sectionLabel sidebar__sectionLabelTight">Gradient</div>
              <div className="sidebar__sectionActions" aria-label="Gradient actions">
                <button
                  type="button"
                  className="sidebar__iconButton"
                  aria-label="Add color"
                  onClick={() => addStop()}
                >
                  <Plus size={14} />
                </button>
                <button
                  type="button"
                  className="sidebar__iconButton"
                  aria-label="Reverse stops"
                  onClick={reverseStops}
                >
                  <ArrowUpDown size={14} />
                </button>
              </div>
            </div>
            <div className="sidebar__stops" id="stop-list">
            {sortedStops.map(({ s, idx }) => (
              <div
                key={`stop-${idx}`}
                className={[
                  'stop-row',
                  dragFrom === idx ? 'dragging' : '',
                  dragOverIdx === idx && dragFrom !== null && dragFrom !== idx ? `drag-over drag-over-${dropPosition}` : ''
                ].join(' ')}
                draggable
                data-idx={idx}
                onDragStart={(e) => {
                  e.dataTransfer!.effectAllowed = 'move';
                  e.dataTransfer!.setData('text/plain', String(idx));
                  setDragFrom(idx);
                  document.body.classList.add('dragging');
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer!.dropEffect = 'move';
                  
                  if (dragFrom !== null && dragFrom !== idx) {
                    setDragOverIdx(idx);
                    
                    // Определяем позицию - если выше середины элемента, то "before", иначе "after"
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    const midpoint = rect.top + rect.height / 2;
                    
                    if (e.clientY < midpoint) {
                      setDropPosition('before');
                    } else {
                      setDropPosition('after');
                    }
                  }
                }}
                onDragLeave={() => {
                  setDragOverIdx(null);
                  setDropPosition(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverIdx(null);
                  setDropPosition(null);
                  
                  const fromIdx = parseInt(e.dataTransfer!.getData('text/plain'), 10);
                  const toIdx = idx;
                  
                  if (fromIdx === toIdx) {
                    setDragFrom(null);
                    return;
                  }
                  
                  setStops((prev) => {
                    const next = [...prev];
                    const draggedStop = next[fromIdx];
                    
                    // Удаляем из старой позиции
                    next.splice(fromIdx, 1);
                    
                    // Вставляем в новую позицию
                    let insertIdx = toIdx;
                    if (fromIdx < toIdx) {
                      insertIdx = toIdx - 1;
                    }
                    
                    // Если "after", вставляем после элемента
                    if (dropPosition === 'after') {
                      insertIdx = insertIdx + 1;
                    }
                    
                    next.splice(insertIdx, 0, draggedStop);
                    
                    // Пересчитываем позиции
                    next.forEach((stop, i) => {
                      stop.pos = i / (next.length - 1);
                    });
                    
                    return next;
                  });
                  
                  setDragFrom(null);
                }}
                onDragEnd={() => {
                  setDragFrom(null);
                  setDragOverIdx(null);
                  setDropPosition(null);
                  document.body.classList.remove('dragging');
                }}
              >
                <span className="stop-row__handle" title="Drag to reorder">
                  ⠿
                </span>
                <div
                  className={['stop-row__sw', isDarkHex(s.hex) ? 'is-dark' : ''].join(' ')}
                  style={{ background: s.hex }}
                >
                  <input
                    type="color"
                    aria-label="Stop color"
                    value={s.hex}
                    onChange={(e) => upColor(idx, e.target.value)}
                  />
                </div>
                <span className="stop-row__hex">{s.hex.toUpperCase()}</span>
                <button
                  type="button"
                  className="stop-row__del"
                  aria-label="Remove stop"
                  onClick={() => rmStop(idx)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          </div>

          <div className="sidebar__dividerWrap">
            <Divider />
          </div>

          <div className="sidebar__section">
            <div className="sidebar__sectionLabel">Presets</div>
          <Select
            items={presetItems}
            activeValue={activePreset}
            onChange={(v) => loadPreset(v)}
            triggerLabel={triggerLabel}
            triggerDotBg={triggerDotBg}
          />
          </div>

          <div className="sidebar__dividerWrap">
            <Divider />
          </div>

          <div className="sidebar__block">
            <div className="sidebar__sectionLabel sidebar__sectionLabelTight">
              Effects
            </div>
            <div className="sidebar__effects">
              <Slider
                label="Noise"
                value={noiseA}
                min={0}
                max={80}
                step={1}
                onChange={setNoiseA}
              />
              <Slider
                label="Blur"
                value={blurA}
                min={0}
                max={120}
                step={1}
                onChange={setBlurA}
              />
            </div>
          </div>

          <div className="sidebar__dividerWrap">
            <Divider />
          </div>

          <div className="sidebar__block">
            <div className="sidebar__sectionLabel sidebar__sectionLabelTight">
              Direction
            </div>
            <div className="sidebar__dirGrid">
              {DIRECTIONS.map((d) => (
                <TabButton
                  key={d.id}
                  active={d.id === orient}
                  onClick={() => setOrientation(d.id)}
                  icon={d.icon}
                >
                  {d.label}
                </TabButton>
              ))}
            </div>
          </div>

          <div className="sidebar__dividerWrap">
            <Divider />
          </div>

          <div className="sidebar__block">
            <div className="sidebar__sectionLabel sidebar__sectionLabelTight">
              Actions
            </div>
            <div className="sidebar__footerRow">
              <Button variant="secondary" onClick={randomize}>
                Random
              </Button>
              <Button variant="outline" onClick={resetSettings}>
                Reset
              </Button>
            </div>
          </div>

          <div className="sidebar__dividerWrap">
            <Divider />
          </div>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__footerDivider" />
          <Button
            variant="primary"
            onClick={() => setExportOpen(true)}
          >
            Export
          </Button>
        </div>
      </aside>

      <div className="rennu-canvas-wrap" ref={canvasWrapRef}>
        <canvas ref={canvasRef} className="rennu-canvas" />
      </div>

      {exportOpen && (
        <div
          className="exportModalOverlay open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              setExportOpen(false);
            }
          }}
        >
          <div className="exportModal">
            <div className="exportModal__header">
              <span>Export</span>
              <button
                type="button"
                className="exportModal__x"
                aria-label="Close export"
                onClick={() => setExportOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="exportModal__content">
            <div className="exportModal__columns">
                <div className="exportModal__column">
                  <label className="exportModal__label">Format</label>
                  <Select
                    items={[
                      { value: 'png', label: 'PNG', dotBg: '' },
                      { value: 'jpg', label: 'JPG', dotBg: '' },
                    ]}
                    activeValue={expFmt}
                    onChange={(v) => setExpFmt(v as 'png' | 'jpg')}
                    triggerLabel={expFmt.toUpperCase()}
                    hideDot
                  />
                </div>

                <div className="exportModal__column">
                  <label className="exportModal__label">Scale</label>
                  <Select
                    items={([0.5, 1, 2, 3, 4] as const).map((s) => ({
                      value: String(s),
                      label: `${s}×`,
                      dotBg: '',
                    }))}
                    activeValue={String(expSc)}
                    onChange={(v) => setExpSc(Number(v) as 0.5 | 1 | 2 | 3 | 4)}
                    triggerLabel={`${expSc}×`}
                    hideDot
                  />
                </div>

                <div className="exportModal__column">
                  <label className="exportModal__label">Aspect ratio</label>
                  <Select
                    items={[
                      { value: 'free', label: 'Free', dotBg: '' },
                      { value: '1x1', label: '1×1', dotBg: '' },
                      { value: '4x3', label: '4×3', dotBg: '' },
                      { value: '16x9', label: '16×9', dotBg: '' },
                      { value: '3x2', label: '3×2', dotBg: '' },
                      { value: '9x16', label: '9×16', dotBg: '' },
                    ]}
                    activeValue={expAr}
                    onChange={(v) => setExpAr(v as 'free' | '1x1' | '4x3' | '16x9' | '3x2' | '9x16')}
                    triggerLabel={
                      expAr === 'free' ? 'Free' :
                      expAr === '1x1' ? '1×1' :
                      expAr === '4x3' ? '4×3' :
                      expAr === '16x9' ? '16×9' :
                      expAr === '3x2' ? '3×2' :
                      '9×16'
                    }
                    hideDot
                  />
                </div>
              </div>
            </div>

            <div className="exportModal__divider" />

            <div className="exportModal__actions">
              <Button variant="secondary" onClick={() => setExportOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={doExport}>
                Export
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
