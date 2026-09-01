import type { RiskCategory } from '@/data/mockData';

interface BarProps {
  data: { label: string; value: number; color: string }[];
  height?: number;
  maxValue?: number;
}

export function BarChart({ data, height = 200, maxValue }: BarProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end justify-around gap-3" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end justify-center">
            <div
              className="w-full max-w-[3rem] rounded-t-lg transition-all duration-700 ease-out"
              style={{ height: `${(d.value / max) * 100}%`, backgroundColor: d.color, minHeight: d.value > 0 ? 4 : 0 }}
            >
              <span className="block pt-1 text-center text-xs font-bold text-white">{d.value}</span>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

interface TrendProps {
  data: { month: string; low: number; moderate: number; high: number }[];
  height?: number;
}

export function TrendChart({ data, height = 220 }: TrendProps) {
  const max = Math.max(...data.map((d) => d.low + d.moderate + d.high), 1);
  return (
    <div className="space-y-3" style={{ minHeight: height }}>
      <div className="flex items-end justify-around gap-2" style={{ height: height - 40 }}>
        {data.map((d) => {
          const total = d.low + d.moderate + d.high;
          return (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full max-w-[3.5rem] flex-col-reverse overflow-hidden rounded-lg" style={{ height: `${(total / max) * (height - 40)}` }}>
                <div className="w-full bg-green-400 transition-all duration-700" style={{ height: `${(d.low / total) * 100}%` }} />
                <div className="w-full bg-amber-400 transition-all duration-700" style={{ height: `${(d.moderate / total) * 100}%` }} />
                <div className="w-full bg-red-400 transition-all duration-700" style={{ height: `${(d.high / total) * 100}%` }} />
              </div>
              <span className="text-xs font-medium text-slate-500">{d.month}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-green-400" /> Low</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-amber-400" /> Moderate</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-red-400" /> High</span>
      </div>
    </div>
  );
}

interface DonutProps {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}

export function DonutChart({ segments, size = 180 }: DonutProps) {
  const total = segments.reduce((s, d) => s + d.value, 0) || 1;
  const radius = size / 2 - 12;
  const stroke = 22;
  const circ = 2 * Math.PI * radius;
  let acc = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
        {segments.map((seg) => {
          const frac = seg.value / total;
          const dash = frac * circ;
          const el = (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-acc}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1s ease-out' }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
          acc += dash;
          return el;
        })}
        <text x={size / 2} y={size / 2 - 4} textAnchor="middle" className="fill-slate-900 font-display" style={{ fontSize: 26, fontWeight: 700 }}>
          {total}
        </text>
        <text x={size / 2} y={size / 2 + 16} textAnchor="middle" className="fill-slate-400" style={{ fontSize: 11, fontWeight: 500 }}>
          total
        </text>
      </svg>
      <div className="flex flex-col gap-2.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2.5 text-sm">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="font-medium text-slate-600">{seg.label}</span>
            <span className="ml-auto font-bold text-slate-900">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RiskBadge({ category }: { category: RiskCategory }) {
  const cls = category === 'Low' ? 'badge-low' : category === 'Moderate' ? 'badge-moderate' : 'badge-high';
  const dot = category === 'Low' ? 'bg-green-500' : category === 'Moderate' ? 'bg-amber-500' : 'bg-red-500';
  return (
    <span className={cls}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {category} Risk
    </span>
  );
}
