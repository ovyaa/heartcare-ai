import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, RotateCcw, Brain, ChevronRight, Info } from 'lucide-react';

import {
  FIELD_GROUPS,
  FIELD_META,
  SEX_OPTIONS,
  CHEST_PAIN_OPTIONS,
  FASTING_BS_OPTIONS,
  RESTING_ECG_OPTIONS,
  ANGINA_OPTIONS,
  SLOPE_OPTIONS,
  VESSELS_OPTIONS,
  THAL_OPTIONS,
} from '@/data/fieldOptions';

import {
  validateForm,
  emptyForm,
  type HeartFormData,
  type ValidationErrors,
} from '@/utils/validation';

import { usePrediction } from '@/context/PredictionContext';


const SELECT_MAP: Record<string, { value: string; label: string }[]> = {
  sex: SEX_OPTIONS,
  cp: CHEST_PAIN_OPTIONS,
  fbs: FASTING_BS_OPTIONS,
  restecg: RESTING_ECG_OPTIONS,
  exang: ANGINA_OPTIONS,
  slope: SLOPE_OPTIONS,
  ca: VESSELS_OPTIONS,
  thal: THAL_OPTIONS,
};

const NUMERIC_FIELDS = new Set([
  'age',
  'trestbps',
  'chol',
  'thalach',
  'oldpeak',
]);

function Field({
  name,
  value,
  error,
  onChange,
}: {
  name: keyof HeartFormData;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  const meta = FIELD_META[name];
  const fieldId = `field-${name}`;

  return (
    <div>
      <label htmlFor={fieldId} className="input-label">
        {meta.label}
        {meta.unit && (
          <span className="ml-1 text-xs font-normal text-slate-400">
            ({meta.unit})
          </span>
        )}
      </label>

      {SELECT_MAP[name] ? (
        <select
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`input-field cursor-pointer ${error ? 'input-error' : ''
            }`}
        >
          <option value="">Select…</option>

          {SELECT_MAP[name].map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          type="number"
          inputMode="decimal"
          step={
            NUMERIC_FIELDS.has(name) && name === 'oldpeak'
              ? '0.1'
              : '1'
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter value"
          className={`input-field ${error ? 'input-error' : ''}`}
        />
      )}

      {error ? (
        <p className="input-error-text">{error}</p>
      ) : (
        meta.hint && <p className="input-hint">{meta.hint}</p>
      )}
    </div>
  );
}

export default function PredictionForm() {
  const navigate = useNavigate();
  const { setResult } = usePrediction();

  const [data, setData] = useState<HeartFormData>(emptyForm);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const update = (name: keyof HeartFormData, v: string) => {
    setData((d) => ({ ...d, [name]: v }));

    if (touched) {
      setErrors(validateForm({ ...data, [name]: v }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const v = validateForm(data);

    setErrors(v);
    setTouched(true);

    if (Object.keys(v).length > 0) {
      const firstError = document.querySelector('.input-error');

      firstError?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://heartcare-ai-hf56.onrender.com/predict',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            age: Number(data.age),
            sex: Number(data.sex),
            cp: Number(data.cp),
            trestbps: Number(data.trestbps),
            chol: Number(data.chol),
            fbs: Number(data.fbs),
            restecg: Number(data.restecg),
            thalach: Number(data.thalach),
            exang: Number(data.exang),
            oldpeak: Number(data.oldpeak),
            slope: Number(data.slope),
            ca: Number(data.ca),
            thal: Number(data.thal),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || 'Prediction request failed'
        );
      }

      const apiResult = await response.json();

      const riskScore = Math.round(
        Number(apiResult.probability)
      );

      const riskCategory =
        apiResult.risk_category === 'Low'
          ? 'Low'
          : apiResult.risk_category === 'Medium'
            ? 'Moderate'
            : 'High';

      setResult({
        riskScore,
        riskCategory,
        confidence: Math.round(Number(apiResult.probability)),
        factors: [],
        summary:
          riskCategory === 'Low'
            ? 'The ML model predicts a lower probability of heart disease based on the provided parameters.'
            : riskCategory === 'Moderate'
              ? 'The ML model predicts a moderate probability of heart disease based on the provided parameters.'
              : 'The ML model predicts a higher probability of heart disease based on the provided parameters.',
      });

      navigate('/result');
    } catch (error) {
      console.error('Prediction error:', error);

      alert(
        error instanceof Error
          ? error.message
          : 'Unable to connect to the prediction server.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setData(emptyForm);
    setErrors({});
    setTouched(false);
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-eyebrow">
          <Brain className="h-3.5 w-3.5" /> Risk Assessment
        </span>

        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Heart Disease Risk Prediction
        </h1>

        <p className="mt-3 text-base leading-relaxed text-slate-500">
          Enter your health and clinical parameters below. Our AI model
          evaluates your inputs to estimate your relative heart disease risk.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-3xl space-y-6"
      >
        {FIELD_GROUPS.map((group) => (
          <section
            key={group.id}
            className="card p-6 sm:p-7 animate-fade-in-up"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {group.title}
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                  {group.description}
                </p>
              </div>

              <span className="hidden shrink-0 rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 sm:block">
                {group.fields.length} fields
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {group.fields.map((f) => (
                <Field
                  key={f}
                  name={f as keyof HeartFormData}
                  value={data[f as keyof HeartFormData]}
                  error={errors[f as keyof HeartFormData]}
                  onChange={(v) =>
                    update(f as keyof HeartFormData, v)
                  }
                />
              ))}
            </div>
          </section>
        ))}

        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />

            <p className="text-sm text-slate-500">
              All fields are required. Your data is processed only to
              generate this prediction.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="btn-ghost"
              disabled={loading}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  Predict Risk
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
