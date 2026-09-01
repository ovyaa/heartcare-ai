import { Link } from 'react-router-dom';
import { Activity, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Activity className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold text-slate-900">
                HeartCare<span className="text-brand-600"> AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              An AI-powered heart disease risk assessment tool designed to make
              cardiovascular risk easier to understand — built as a final-year
              AI/ML project.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Navigate</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/" className="text-slate-500 hover:text-brand-700">Home</Link></li>
              <li><Link to="/prediction" className="text-slate-500 hover:text-brand-700">Prediction</Link></li>
              <li><Link to="/dashboard" className="text-slate-500 hover:text-brand-700">Dashboard</Link></li>
              <li><Link to="/history" className="text-slate-500 hover:text-brand-700">History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">About</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><span className="text-slate-500">AI-based risk assessment</span></li>
              <li><span className="text-slate-500">Explainable predictions</span></li>

            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />

        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} HeartCare AI
        </div>
      </div>
    </footer>
  );
}
