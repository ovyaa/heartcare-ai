import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, TrendingUp, TrendingDown, Stethoscope, Sparkles, AlertTriangle } from 'lucide-react';
import { usePrediction } from '@/context/PredictionContext';
import { RiskGauge } from '@/components/RiskGauge';
import { RiskBadge } from '@/components/Charts';
import Disclaimer from '@/components/Disclaimer';

export default function Result() {
  const { result } = usePrediction();
  const navigate = useNavigate();

  if (!result) {
    return (
      <div className="container-page flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <Stethoscope className="h-8 w-8 text-slate-400" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">No prediction yet</h1>
        <p className="mt-2 max-w-md text-slate-500">
          You haven't run a prediction yet. Fill in your health parameters to see
          your heart disease risk assessment.
        </p>
        <button onClick={() => navigate('/prediction')} className="btn-primary mt-6">
          Go to Prediction Form
        </button>
      </div>
    );
  }

  const { riskScore, riskCategory, confidence, factors, summary } = result;
  const negative = factors.filter((f) => f.impact === 'negative');
  const positive = factors.filter((f) => f.impact === 'positive');
  const maxWeight = Math.max(...factors.map((f) => f.weight), 1);

  return (
    <div className="container-page py-10 sm:py-14">
      <Link to="/prediction" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" /> Back to form
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Score panel */}
        <div className="card p-6 sm:p-8 lg:col-span-2 animate-scale-in">
          <span className="section-eyebrow">
            <Sparkles className="h-3.5 w-3.5" /> Prediction Result
          </span>
          <div className="mt-6 flex flex-col items-center">
            <RiskGauge value={riskScore} size={240} label={`${riskCategory} Risk`} />
            <div className="mt-4">
              <RiskBadge category={riskCategory} />
            </div>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-500">
              {summary}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{confidence}%</p>
              <p className="text-xs text-slate-400">Model Confidence</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{factors.length}</p>
              <p className="text-xs text-slate-400">Factors Analyzed</p>
            </div>
          </div>
        </div>

        {/* Factors panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="card p-6 sm:p-8 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-slate-900">Contributing Factors</h2>
            <p className="mt-1 text-sm text-slate-500">
              The main inputs that influenced your risk score, ranked by relative impact.
            </p>
            <div className="mt-6 space-y-4">
              {factors.slice(0, 6).map((f) => {
                const isNeg = f.impact === 'negative';
                return (
                  <div key={f.label}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {isNeg ? (
                          <TrendingUp className="h-4 w-4 text-red-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-500" />
                        )}
                        <span className="text-sm font-semibold text-slate-700">{f.label}</span>
                      </div>
                      <span className={`text-xs font-bold ${isNeg ? 'text-red-500' : 'text-green-500'}`}>
                        {isNeg ? '+' : '−'}{f.weight}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${isNeg ? 'bg-red-400' : 'bg-green-400'}`}
                        style={{ width: `${(f.weight / maxWeight) * 100}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{f.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-red-700">
                <AlertTriangle className="h-4 w-4" /> Risk Factors
              </h3>
              <ul className="mt-3 space-y-2">
                {negative.length ? negative.map((f) => (
                  <li key={f.label} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {f.detail}
                  </li>
                )) : <li className="text-sm text-slate-400">No significant risk factors detected.</li>}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <TrendingDown className="h-4 w-4" /> Protective Factors
              </h3>
              <ul className="mt-3 space-y-2">
                {positive.length ? positive.map((f) => (
                  <li key={f.label} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                    {f.detail}
                  </li>
                )) : <li className="text-sm text-slate-400">No notable protective factors.</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer variant="card" />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button onClick={() => navigate('/prediction')} className="btn-primary">
          <RotateCcw className="h-4 w-4" /> Run Another Prediction
        </button>
        <Link to="/dashboard" className="btn-secondary">View Dashboard</Link>
      </div>
    </div>
  );
}
