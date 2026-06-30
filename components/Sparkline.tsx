/**
 * Tiny dependency-free SVG sparkline. Renders an illustrative trend shape.
 * Not real market history — callers should label it as illustrative.
 */
export default function Sparkline({
  data,
  width = 120,
  height = 36,
  className = '',
}: {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1);
  const pad = 3;
  const h = height - pad * 2;

  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = pad + h - ((v - min) / span) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const up = data[data.length - 1] >= data[0];
  const stroke = up ? '#34d399' : '#f87171';
  const areaPoints = `0,${height} ${points.join(' ')} ${width},${height}`;
  const gradId = `spark-${up ? 'up' : 'down'}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="illustrative trend"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradId})`} />
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
