// Mock prediction history and dashboard data.
// All values are synthetic samples — no real clinical data is represented.

export type RiskCategory = 'Low' | 'Moderate' | 'High';

export interface PredictionRecord {
  id: string;
  date: string; // ISO
  age: number;
  sex: number;
  riskScore: number; // 0-100
  riskCategory: RiskCategory;
  topFactor: string;
}

export const mockHistory: PredictionRecord[] = [
  { id: 'p-1007', date: '2026-08-28T09:15:00Z', age: 54, sex: 1, riskScore: 72, riskCategory: 'High', topFactor: 'Exercise-induced angina' },
  { id: 'p-1006', date: '2026-08-24T14:40:00Z', age: 48, sex: 0, riskScore: 28, riskCategory: 'Low', topFactor: 'Normal resting ECG' },
  { id: 'p-1005', date: '2026-08-20T11:05:00Z', age: 61, sex: 1, riskScore: 65, riskCategory: 'Moderate', topFactor: 'Flat ST slope' },
  { id: 'p-1004', date: '2026-08-15T16:22:00Z', age: 39, sex: 0, riskScore: 15, riskCategory: 'Low', topFactor: 'High max heart rate' },
  { id: 'p-1003', date: '2026-08-10T08:30:00Z', age: 58, sex: 1, riskScore: 81, riskCategory: 'High', topFactor: 'Reversible thalassemia defect' },
  { id: 'p-1002', date: '2026-08-03T13:12:00Z', age: 45, sex: 1, riskScore: 42, riskCategory: 'Moderate', topFactor: 'Elevated cholesterol' },
  { id: 'p-1001', date: '2026-07-27T10:48:00Z', age: 52, sex: 0, riskScore: 34, riskCategory: 'Low', topFactor: 'Normal thalassemia' },
  { id: 'p-1000', date: '2026-07-19T15:33:00Z', age: 67, sex: 1, riskScore: 88, riskCategory: 'High', topFactor: '3 major vessels colored' },
];

// Monthly trend (mock) for dashboard risk-over-time chart.
export const mockTrend = [
  { month: 'Mar', low: 6, moderate: 4, high: 2 },
  { month: 'Apr', low: 8, moderate: 5, high: 3 },
  { month: 'May', low: 5, moderate: 7, high: 4 },
  { month: 'Jun', low: 9, moderate: 6, high: 2 },
  { month: 'Jul', low: 7, moderate: 8, high: 5 },
  { month: 'Aug', low: 10, moderate: 6, high: 4 },
];

export const mockDashboardStats = {
  totalPredictions: 128,
  lowCount: 64,
  moderateCount: 38,
  highCount: 26,
  avgRiskScore: 41,
  avgAge: 53,
};
