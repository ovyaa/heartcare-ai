import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, History as HistoryIcon, ArrowRight, Inbox, Calendar, Filter } from 'lucide-react';
import { mockHistory, type RiskCategory } from '@/data/mockData';
import { RiskBadge } from '@/components/Charts';


type FilterValue = 'all' | RiskCategory;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function History() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = useMemo(() => {
    return mockHistory.filter((r) => {
      const matchesFilter = filter === 'all' || r.riskCategory === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        r.topFactor.toLowerCase().includes(q) ||
        `${r.age}`.includes(q) ||
        (r.sex === 1 ? 'male' : 'female').includes(q) ||
        r.id.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  const filterOptions: { value: FilterValue; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'Low', label: 'Low' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'High', label: 'High' },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-eyebrow"><HistoryIcon className="h-3.5 w-3.5" /> History</span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Prediction History</h1>
          <p className="mt-2 text-slate-500">Review and compare your past heart risk assessments.</p>
        </div>
        <Link to="/prediction" className="btn-primary shrink-0">
          New Prediction <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Search + filter */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by factor, age, sex, or ID…"
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
            {filterOptions.map((o) => (
              <button
                key={o.value}
                onClick={() => setFilter(o.value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === o.value ? 'bg-white text-brand-700 shadow-card' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <Inbox className="h-8 w-8 text-slate-400" />
          </span>
          <h2 className="mt-6 text-xl font-semibold text-slate-900">
            {query || filter !== 'all' ? 'No matching predictions' : 'No predictions yet'}
          </h2>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            {query || filter !== 'all'
              ? 'Try adjusting your search or filter to find what you’re looking for.'
              : 'Run your first heart risk assessment to start building your history.'}
          </p>
          <Link to="/prediction" className="btn-primary mt-6">
            Check Your Heart Risk <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of {mockHistory.length} predictions
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-100">
            {/* Table header — desktop */}
            <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:grid">
              <div className="col-span-1">ID</div>
              <div className="col-span-3">Date & Time</div>
              <div className="col-span-2">Patient</div>
              <div className="col-span-3">Top Factor</div>
              <div className="col-span-1 text-center">Score</div>
              <div className="col-span-2 text-right">Risk</div>
            </div>

            {filtered.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-1 gap-2 border-b border-slate-50 bg-white px-6 py-4 transition-colors last:border-0 hover:bg-slate-50 sm:grid-cols-12 sm:items-center sm:gap-4"
              >
                <div className="col-span-1 font-mono text-xs text-slate-400">#{r.id.replace('p-', '')}</div>
                <div className="col-span-3 flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="h-3.5 w-3.5 text-slate-300" />
                  {formatDate(r.date)} · {formatTime(r.date)}
                </div>
                <div className="col-span-2 text-sm text-slate-600">
                  {r.sex === 1 ? 'Male' : 'Female'}, {r.age} yrs
                </div>
                <div className="col-span-3 truncate text-sm text-slate-600">{r.topFactor}</div>
                <div className="col-span-1 text-center">
                  <span className="font-display text-base font-bold text-slate-900">{r.riskScore}%</span>
                </div>
                <div className="col-span-2 flex sm:justify-end">
                  <RiskBadge category={r.riskCategory} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8">
      
      </div>
    </div>
  );
}
