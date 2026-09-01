
import { createContext, useContext, useState, type ReactNode } from 'react';

export interface FactorContribution {
  label: string;
  impact: 'positive' | 'negative';
  weight: number;
  detail: string;
}

export interface PredictionResult {
  riskScore: number;
  riskCategory: 'Low' | 'Moderate' | 'High';
  confidence: number;
  factors: FactorContribution[];
  summary: string;
}

interface PredictionContextValue {
  result: PredictionResult | null;
  setResult: (r: PredictionResult | null) => void;
}

const PredictionContext = createContext<PredictionContextValue | undefined>(undefined);

export function PredictionProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<PredictionResult | null>(null);

  return (
    <PredictionContext.Provider value={{ result, setResult }}>
      {children}
    </PredictionContext.Provider>
  );
}

export function usePrediction() {
  const ctx = useContext(PredictionContext);

  if (!ctx) {
    throw new Error('usePrediction must be used within PredictionProvider');
  }

  return ctx;
}

