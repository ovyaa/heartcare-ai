// Mock prediction engine.
// Produces a deterministic risk score and contributing factors from form input.
// This is a placeholder so the UI is fully functional until the real ML backend is connected.

import type { HeartFormData } from './validation';
import type { RiskCategory } from '@/data/mockData';

export interface FactorContribution {
  label: string;
  impact: 'positive' | 'negative';
  weight: number; // 0-100 relative contribution
  detail: string;
}

export interface PredictionResult {
  riskScore: number;
  riskCategory: RiskCategory;
  confidence: number;
  factors: FactorContribution[];
  summary: string;
}

const n = (v: string) => Number(v);

export function runMockPrediction(data: HeartFormData): PredictionResult {
  let score = 0;
  const factors: FactorContribution[] = [];

  const age = n(data.age);
  if (age > 55) {
    const w = Math.min(20, (age - 55) * 1.2);
    score += w;
    factors.push({ label: 'Age', impact: 'negative', weight: w, detail: 'Risk rises with age, especially above 55.' });
  } else {
    factors.push({ label: 'Age', impact: 'positive', weight: 8, detail: 'Younger age is associated with lower baseline risk.' });
  }

  if (data.sex === '1') {
    score += 6;
    factors.push({ label: 'Sex', impact: 'negative', weight: 6, detail: 'Male sex is associated with a slightly higher baseline risk.' });
  } else {
    factors.push({ label: 'Sex', impact: 'positive', weight: 4, detail: 'Female sex is associated with a slightly lower baseline risk.' });
  }

  const cp = n(data.cp);
  if (cp === 0) {
    score += 16;
    factors.push({ label: 'Chest Pain Type', impact: 'negative', weight: 16, detail: 'Typical angina is a strong risk indicator.' });
  } else if (cp === 3) {
    score += 10;
    factors.push({ label: 'Chest Pain Type', impact: 'negative', weight: 10, detail: 'Asymptomatic presentation can mask underlying disease.' });
  } else {
    factors.push({ label: 'Chest Pain Type', impact: 'positive', weight: 6, detail: 'Atypical or non-anginal pain is less strongly associated.' });
  }

  const trestbps = n(data.trestbps);
  if (trestbps > 140) {
    const w = Math.min(14, (trestbps - 140) * 0.4);
    score += w;
    factors.push({ label: 'Resting Blood Pressure', impact: 'negative', weight: w, detail: 'Elevated resting blood pressure strains the heart.' });
  } else {
    factors.push({ label: 'Resting Blood Pressure', impact: 'positive', weight: 5, detail: 'Within a healthier range.' });
  }

  const chol = n(data.chol);
  if (chol > 240) {
    const w = Math.min(14, (chol - 240) * 0.1);
    score += w;
    factors.push({ label: 'Cholesterol', impact: 'negative', weight: w, detail: 'High serum cholesterol contributes to arterial plaque.' });
  } else {
    factors.push({ label: 'Cholesterol', impact: 'positive', weight: 5, detail: 'Within a healthier range.' });
  }

  if (data.fbs === '1') {
    score += 6;
    factors.push({ label: 'Fasting Blood Sugar', impact: 'negative', weight: 6, detail: 'Elevated fasting blood sugar is linked to metabolic risk.' });
  } else {
    factors.push({ label: 'Fasting Blood Sugar', impact: 'positive', weight: 4, detail: 'Within normal range.' });
  }

  const restecg = n(data.restecg);
  if (restecg === 1 || restecg === 2) {
    score += 8;
    factors.push({ label: 'Resting ECG', impact: 'negative', weight: 8, detail: 'Abnormal resting ECG may indicate structural concerns.' });
  } else {
    factors.push({ label: 'Resting ECG', impact: 'positive', weight: 6, detail: 'Normal resting ECG.' });
  }

  const thalach = n(data.thalach);
  if (thalach < 100) {
    score += 8;
    factors.push({ label: 'Max Heart Rate', impact: 'negative', weight: 8, detail: 'A low peak heart rate can indicate reduced cardiac capacity.' });
  } else {
    factors.push({ label: 'Max Heart Rate', impact: 'positive', weight: 6, detail: 'Good exercise heart-rate response.' });
  }

  if (data.exang === '1') {
    score += 12;
    factors.push({ label: 'Exercise-Induced Angina', impact: 'negative', weight: 12, detail: 'Angina during exercise is a significant risk signal.' });
  } else {
    factors.push({ label: 'Exercise-Induced Angina', impact: 'positive', weight: 6, detail: 'No exercise-induced angina reported.' });
  }

  const oldpeak = n(data.oldpeak);
  if (oldpeak > 2) {
    const w = Math.min(12, (oldpeak - 2) * 3);
    score += w;
    factors.push({ label: 'ST Depression', impact: 'negative', weight: w, detail: 'Greater ST depression suggests reduced blood flow.' });
  } else {
    factors.push({ label: 'ST Depression', impact: 'positive', weight: 5, detail: 'Minimal ST depression.' });
  }

  const slope = n(data.slope);
  if (slope === 2) {
    score += 10;
    factors.push({ label: 'ST Slope', impact: 'negative', weight: 10, detail: 'A downsloping ST segment is associated with higher risk.' });
  } else if (slope === 1) {
    score += 4;
    factors.push({ label: 'ST Slope', impact: 'negative', weight: 4, detail: 'A flat ST segment is a mild risk indicator.' });
  } else {
    factors.push({ label: 'ST Slope', impact: 'positive', weight: 6, detail: 'An upsloping ST segment is generally favorable.' });
  }

  const ca = n(data.ca);
  if (ca > 0) {
    const w = ca * 7;
    score += w;
    factors.push({ label: 'Major Vessels', impact: 'negative', weight: w, detail: `${ca} major vessel(s) colored by fluoroscopy.` });
  } else {
    factors.push({ label: 'Major Vessels', impact: 'positive', weight: 6, detail: 'No major vessels colored.' });
  }

  const thal = n(data.thal);
  if (thal === 2) {
    score += 10;
    factors.push({ label: 'Thalassemia', impact: 'negative', weight: 10, detail: 'A reversible defect suggests ischemia.' });
  } else if (thal === 1) {
    score += 5;
    factors.push({ label: 'Thalassemia', impact: 'negative', weight: 5, detail: 'A fixed defect may indicate prior damage.' });
  } else {
    factors.push({ label: 'Thalassemia', impact: 'positive', weight: 6, detail: 'Normal thalassemia result.' });
  }

  const riskScore = Math.max(2, Math.min(98, Math.round(score)));
  const riskCategory: RiskCategory = riskScore < 35 ? 'Low' : riskScore < 65 ? 'Moderate' : 'High';
  const confidence = Math.round(78 + Math.min(15, riskScore * 0.12));

  const summary =
    riskCategory === 'Low'
      ? 'Your inputs suggest a lower relative risk profile. Maintaining healthy habits remains important.'
      : riskCategory === 'Moderate'
      ? 'Your inputs suggest a moderate relative risk profile. Consider discussing these factors with a healthcare professional.'
      : 'Your inputs suggest a higher relative risk profile. A consultation with a qualified healthcare professional is strongly recommended.';

  const sorted = [...factors].sort((a, b) => b.weight - a.weight);

  return { riskScore, riskCategory, confidence, factors: sorted, summary };
}
