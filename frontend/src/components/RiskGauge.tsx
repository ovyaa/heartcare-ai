import { useEffect, useState } from 'react';

interface GaugeProps {
  value: number; // 0-100
  size?: number;
  label?: string;
}

export function RiskGauge({ value, size = 200, label }: GaugeProps) {
  const [display, setDisplay] = useState(0);
  const radius = size / 2 - 16;
  const circumference = Math.PI * radius; // semicircle
  const stroke = 14;

  useEffect(() => {
    const t = setTimeout(() => setDisplay(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  const offset = circumference - (display / 100) * circumference;
  const color = value < 35 ? '#16a34a' : value < 65 ? '#f59e0b' : '#dc2626';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
        <defs>
          <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        <path
          d={`M ${stroke / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${stroke / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <text x={size / 2} y={size / 2 - 10} textAnchor="middle" className="fill-slate-900 font-display" style={{ fontSize: size * 0.18, fontWeight: 700 }}>
          {Math.round(display)}%
        </text>
        <text x={size / 2} y={size / 2 + 10} textAnchor="middle" className="fill-slate-400" style={{ fontSize: size * 0.06, fontWeight: 500 }}>
          risk score
        </text>
      </svg>
      {label && (
        <span className="mt-1 text-sm font-semibold" style={{ color }}>
          {label}
        </span>
      )}
    </div>
  );
}
