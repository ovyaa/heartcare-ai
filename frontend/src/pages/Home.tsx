import { Link } from 'react-router-dom';
import {
  Activity, Brain, ShieldCheck, HeartPulse, ClipboardList, BarChart3,
  History, ArrowRight, Sparkles, LineChart, UserCheck, Stethoscope,
  TrendingUp,
} from 'lucide-react';
import Disclaimer from '@/components/Disclaimer';

const features = [
  { icon: ClipboardList, title: 'Guided Risk Input', desc: 'A clean, multi-section form walks you through each clinical parameter with helpful hints.' },
  { icon: Brain, title: 'AI Risk Assessment', desc: 'A machine-learning model estimates your relative heart disease risk from your inputs.' },
  { icon: Sparkles, title: 'Explainable Results', desc: 'See not just the score, but which factors pushed it up or down — in plain language.' },
  { icon: BarChart3, title: 'Insight Dashboard', desc: 'Track risk distribution, trends and summary statistics across all your predictions.' },
  { icon: History, title: 'Prediction History', desc: 'Every assessment is saved so you can review and compare past results over time.' },
  { icon: ShieldCheck, title: 'Privacy-First', desc: 'Your inputs are used only to generate your prediction — no accounts required to try it.' },
];

const steps = [
  { icon: UserCheck, title: 'Enter Your Parameters', desc: 'Fill in a short, guided form with your health and clinical details.' },
  { icon: Activity, title: 'AI Analyzes Your Data', desc: 'The model evaluates your inputs and calculates a relative risk score.' },
  { icon: LineChart, title: 'Review Your Result', desc: 'See your risk category, contributing factors and a clear explanation.' },
  { icon: Stethoscope, title: 'Consult a Professional', desc: 'Use the insight as a conversation starter with a qualified healthcare provider.' },
];

const xaiPoints = [
  { icon: TrendingUp, title: 'Factor Breakdown', desc: 'Each input is shown with its direction and relative weight on the final score.' },
  { icon: HeartPulse, title: 'Risk & Protective Factors', desc: 'Inputs are grouped into factors that increase or decrease your assessed risk.' },
  { icon: Sparkles, title: 'Plain-Language Summary', desc: 'A short, jargon-free explanation accompanies every prediction result.' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -left-24 top-40 h-80 w-80 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-in-up">
            <span className="section-eyebrow">
              <HeartPulse className="h-3.5 w-3.5" /> AI-Powered Heart Health
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl text-balance">
              Understand your <span className="text-brand-600">heart disease risk</span> with AI
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              HeartCare AI turns clinical parameters into a clear, explainable risk
              assessment — so you can take informed steps toward better heart health.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/prediction" className="btn-primary text-base">
                Check Your Heart Risk <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/dashboard" className="btn-secondary text-base">
                <BarChart3 className="h-5 w-5" /> View Dashboard
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-500" /> Informational only</span>
              <span className="flex items-center gap-2"><Brain className="h-4 w-4 text-brand-500" /> Explainable AI</span>
            </div>
          </div>

          {/* Hero visual: ECG card */}
          <div className="relative animate-scale-in">
            <div className="card relative overflow-hidden p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                    <Activity className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-bold text-slate-900">Live Heart Monitor</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-green-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Active
                </span>
              </div>

              <svg viewBox="0 0 600 180" className="mt-4 w-full">
                <defs>
                  <linearGradient id="ecg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1c6df5" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,90 L80,90 L100,90 L110,40 L120,140 L130,90 L200,90 L220,90 L230,60 L240,90 L320,90 L340,90 L350,30 L360,150 L370,90 L440,90 L460,90 L470,70 L480,90 L600,90"
                  fill="none"
                  stroke="url(#ecg-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1200"
                  className="animate-ecg"
                />
              </svg>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-400">Risk Score</p>
                  <p className="mt-0.5 text-xl font-bold text-slate-900">28%</p>
                </div>
                <div className="rounded-xl bg-green-50 p-3 text-center">
                  <p className="text-xs text-green-600">Category</p>
                  <p className="mt-0.5 text-xl font-bold text-green-700">Low</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-400">Confidence</p>
                  <p className="mt-0.5 text-xl font-bold text-slate-900">86%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow"><Sparkles className="h-3.5 w-3.5" /> Features</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
            Everything you need to assess heart risk
          </h2>
          <p className="mt-3 text-slate-500">
            A complete toolkit for understanding cardiovascular risk — from input to insight.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card card-hover p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <f.icon className="h-5.5 w-5.5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explainable AI */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="section-eyebrow"><Brain className="h-3.5 w-3.5" /> Explainable AI</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
              Not just a number — understand the "why"
            </h2>
            <p className="mt-4 text-slate-600">
              HeartCare AI doesn't stop at a score. Every prediction comes with a
              clear breakdown of which factors mattered most, so the result is
              transparent and actionable.
            </p>
            <div className="mt-8 space-y-5">
              {xaiPoints.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card ring-1 ring-slate-100">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{p.title}</h3>
                    <p className="mt-0.5 text-sm text-slate-500">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Sample Prediction</h3>
              <span className="badge-moderate">Moderate Risk</span>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <span className="font-display text-5xl font-bold text-slate-900">52%</span>
              <span className="mb-1.5 text-sm text-slate-400">risk score</span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { label: 'Exercise-Induced Angina', w: 12, neg: true },
                { label: 'Flat ST Slope', w: 4, neg: true },
                { label: 'High Max Heart Rate', w: 6, neg: false },
              ].map((f) => (
                <div key={f.label}>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-600">{f.label}</span>
                    <span className={f.neg ? 'text-red-500' : 'text-green-500'}>{f.neg ? '+' : '−'}{f.w}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${f.neg ? 'bg-red-400' : 'bg-green-400'}`} style={{ width: `${(f.w / 12) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
              Your inputs suggest a moderate relative risk profile. Consider discussing
              these factors with a healthcare professional.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow"><Activity className="h-3.5 w-3.5" /> How It Works</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
            Four simple steps to clarity
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative card p-6">
              <span className="absolute right-5 top-5 font-display text-3xl font-bold text-slate-100">
                {i + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Ready to check your heart risk?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-100">
              It takes less than two minutes. Get an explainable, AI-based risk
              assessment you can discuss with your doctor.
            </p>
            <Link to="/prediction" className="btn mt-8 bg-white px-7 py-3.5 text-base text-brand-700 hover:bg-brand-50 active:scale-[0.98]">
              Check Your Heart Risk <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container-page pb-16">
        <Disclaimer variant="card" />
      </section>
    </div>
  );
}
