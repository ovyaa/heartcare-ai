import { ShieldAlert } from 'lucide-react';

interface DisclaimerProps {
  variant?: 'banner' | 'inline' | 'card';
  className?: string;
}

export default function Disclaimer({ variant = 'inline', className = '' }: DisclaimerProps) {
  const text =
    'This tool provides an AI-based heart disease risk assessment for informational purposes only. It is not a medical diagnosis and should not replace professional medical advice.';

  if (variant === 'banner') {
    return (
      <div className={`flex items-center justify-center gap-2 bg-brand-700 px-4 py-2 text-center text-xs font-medium text-white ${className}`}>
        <ShieldAlert className="h-4 w-4 shrink-0" />
        <span>{text}</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 ${className}`}>
        <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" />
        <div>
          <h4 className="text-sm font-semibold text-amber-900">Healthcare Disclaimer</h4>
          <p className="mt-1 text-sm leading-relaxed text-amber-800">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-500 ${className}`}>
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <span>{text}</span>
    </div>
  );
}
