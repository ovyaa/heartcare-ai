import { Link } from 'react-router-dom';
import {
  Activity, TrendingUp, Users, HeartPulse, ArrowRight, ClipboardList, Gauge, Calendar,
} from 'lucide-react';
import { BarChart, DonutChart, TrendChart, RiskBadge } from '@/components/Charts';
import { mockDashboardStats, mockTrend, mockHistory } from '@/data/mockData';


const statCards = [
  { label: 'Total Predictions', value: mockDashboardStats.totalPredictions, icon: ClipboardList, color: 'brand', sub: 'All-time assessments' },
  { label: 'Average Risk Score', value: `${mockDashboardStats.avgRiskScore}%`, icon: Gauge, color: 'amber', sub: 'Across all predictions' },
  { label: 'Average Age', value: mockDashboardStats.avgAge, icon: Users, color: 'accent', sub: 'Years' },
  { label: 'High-Risk Cases', value: mockDashboardStats.highCount, icon: HeartPulse, color: 'red', sub: 'Requires attention' },
];

const colorMap: Record<string, string> = {
  brand: 'bg-brand-50 text-brand-600',
  amber: 'bg-amber-50 text-amber-600',
  accent: 'bg-accent-50 text-accent-600',
  red: 'bg-red-50 text-red-600',
};

export default function Dashboard() {
  const donutSegments = [
    { label: 'Low Risk', value: mockDashboardStats.lowCount, color: '#16a34a' },
    { label: 'Moderate Risk', value: mockDashboardStats.moderateCount, color: '#f59e0b' },
    { label: 'High Risk', value: mockDashboardStats.highCount, color: '#dc2626' },
  ];

  const barData = [
    { label: 'Low', value: mockDashboardStats.lowCount, color: '#16a34a' },
    { label: 'Moderate', value: mockDashboardStats.moderateCount, color: '#f59e0b' },
    { label: 'High', value: mockDashboardStats.highCount, color: '#dc2626' },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-eyebrow"><Activity className="h-3.5 w-3.5" /> Dashboard</span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Risk Assessment Overview</h1>
          <p className="mt-2 text-slate-500">A summary of prediction activity and risk distribution.</p>
        </div>
        <Link to="/prediction" className="btn-primary shrink-0">
          New Prediction <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="card card-hover p-5">
            <div className="flex items-center justify-between">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorMap[s.color]}`}>
                <s.icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-700">{s.label}</p>
            <p className="text-xs text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-1">
          <h2 className="text-base font-semibold text-slate-900">Risk Distribution</h2>
          <p className="mt-1 text-sm text-slate-500">Breakdown by risk category.</p>
          <div className="mt-6 flex justify-center">
            <DonutChart segments={donutSegments} size={180} />
          </div>
        </div>

        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Risk Trend</h2>
              <p className="mt-1 text-sm text-slate-500">Monthly prediction volume by risk category.</p>
            </div>
            <TrendingUp className="h-5 w-5 text-brand-500" />
          </div>
          <div className="mt-6">
            <TrendChart data={mockTrend} />
          </div>
        </div>
      </div>

      {/* Bar + recent */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-900">Risk Category Comparison</h2>
          <p className="mt-1 text-sm text-slate-500">Total count per risk level.</p>
          <div className="mt-6">
            <BarChart data={barData} height={200} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Recent Predictions</h2>
            <Link to="/history" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {mockHistory.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Calendar className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    {r.sex === 1 ? 'Male' : 'Female'}, {r.age} yrs
                  </p>
                  <p className="truncate text-xs text-slate-400">{r.topFactor}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-sm font-bold text-slate-900">{r.riskScore}%</span>
                  <RiskBadge category={r.riskCategory} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
    
      </div>
    </div>
  );
}
