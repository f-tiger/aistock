'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { scoreBand, type ScoreBand } from '@/lib/data/score';

/**
 * CompassGauge — the site's signature visual. A 270° radial dial (a "罗盘"/compass)
 * that renders a Consensus Score 0–100 with an animated fill and count-up number.
 * Pure SVG, no dependencies; degrades to a static dial where JS/animation is off.
 */

const BAND_COLOR: Record<ScoreBand, string> = {
  strong: '#34d399',
  consensus: '#38bdf8',
  split: '#fbbf24',
  weak: '#94a3b8',
};

const CX = 100;
const CY = 100;
const R = 80;
const C = 2 * Math.PI * R; // full circumference
const ARC = 0.75 * C; // 270° track length
const START_DEG = 135; // track begins bottom-left, sweeps clockwise through the top

// point on the ring at a clockwise angle (degrees) measured from east (3 o'clock)
function ring(deg: number, radius = R): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)];
}

export default function CompassGauge({
  score,
  ticker,
  locale,
  size = 240,
  label,
}: {
  score: number;
  ticker: string;
  locale: Locale;
  size?: number;
  /** Overrides the band label shown under the number (e.g. a conviction band). */
  label?: string;
}) {
  // n animates 0 → score on mount; the fill and dot are derived from it so the
  // dial "counts up" and fills in one motion (no synchronous effect setState).
  const [n, setN] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    let startTs = 0;
    const dur = 1100;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min(1, (ts - startTs) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(score * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [score]);

  const band = scoreBand(score);
  const color = BAND_COLOR[band];
  const p = Math.max(0, Math.min(100, n)) / 100;

  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const [dotX, dotY] = ring(START_DEG + p * 270);

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={`${ticker} ${dict.score.name[locale]} ${score}`}
      className="max-w-full"
    >
      {/* faint outer halo */}
      <circle cx={CX} cy={CY} r={R + 8} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1} />

      {/* rotated group so the 90° gap sits at the bottom */}
      <g transform={`rotate(${START_DEG - 90} ${CX} ${CY})`}>
        {/* track */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${ARC} ${C}`}
        />
        {/* animated fill */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${ARC * p} ${C}`}
          style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
      </g>

      {/* tick marks */}
      {ticks.map((tp) => {
        const [x1, y1] = ring(START_DEG + tp * 270, R - 15);
        const [x2, y2] = ring(START_DEG + tp * 270, R - 8);
        return <line key={tp} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.22)" strokeWidth={2} />;
      })}

      {/* live position dot travels along the arc as the value counts up */}
      <circle cx={dotX} cy={dotY} r={4.5} fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />

      {/* scale labels */}
      <text x={ring(START_DEG, R + 12)[0]} y={ring(START_DEG, R + 12)[1] + 3} textAnchor="middle" fontSize={9} fill="#64748b">0</text>
      <text x={ring(45, R + 12)[0]} y={ring(45, R + 12)[1] + 3} textAnchor="middle" fontSize={9} fill="#64748b">100</text>

      {/* center readout */}
      <text x={CX} y={82} textAnchor="middle" fontSize={13} fontWeight={700} fill="#cbd5e1" className="font-mono">
        {ticker}
      </text>
      <text x={CX} y={120} textAnchor="middle" fontSize={42} fontWeight={800} fill={color} className="font-mono">
        {Math.round(n)}
      </text>
      <text x={CX} y={140} textAnchor="middle" fontSize={11} fill="#94a3b8">
        {label ?? dict.score.bands[band][locale]}
      </text>
    </svg>
  );
}
