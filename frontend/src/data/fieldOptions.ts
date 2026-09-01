// Field option constants shared by the form and result views.
// These mirror the standard UCI heart disease dataset categories.

export const SEX_OPTIONS = [
  { value: '1', label: 'Male' },
  { value: '0', label: 'Female' },
];

export const CHEST_PAIN_OPTIONS = [
  { value: '0', label: 'Typical Angina' },
  { value: '1', label: 'Atypical Angina' },
  { value: '2', label: 'Non-anginal Pain' },
  { value: '3', label: 'Asymptomatic' },
];

export const FASTING_BS_OPTIONS = [
  { value: '0', label: '≤ 120 mg/dL' },
  { value: '1', label: '> 120 mg/dL' },
];

export const RESTING_ECG_OPTIONS = [
  { value: '0', label: 'Normal' },
  { value: '1', label: 'ST-T Wave Abnormality' },
  { value: '2', label: 'Left Ventricular Hypertrophy' },
];

export const ANGINA_OPTIONS = [
  { value: '0', label: 'No' },
  { value: '1', label: 'Yes' },
];

export const SLOPE_OPTIONS = [
  { value: '0', label: 'Upsloping' },
  { value: '1', label: 'Flat' },
  { value: '2', label: 'Downsloping' },
];

export const VESSELS_OPTIONS = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

export const THAL_OPTIONS = [
  { value: '0', label: 'Normal' },
  { value: '1', label: 'Fixed Defect' },
  { value: '2', label: 'Reversible Defect' },
];

export const FIELD_GROUPS = [
  {
    id: 'demographics',
    title: 'Demographics',
    description: 'Basic patient information.',
    fields: ['age', 'sex'],
  },
  {
    id: 'cardiac',
    title: 'Cardiac Symptoms',
    description: 'Chest pain and exercise-related indicators.',
    fields: ['cp', 'exang', 'oldpeak', 'slope'],
  },
  {
    id: 'vitals',
    title: 'Vitals & Lab Results',
    description: 'Blood pressure, cholesterol and blood sugar.',
    fields: ['trestbps', 'chol', 'fbs', 'restecg'],
  },
  {
    id: 'advanced',
    title: 'Advanced Parameters',
    description: 'Heart-rate response and imaging findings.',
    fields: ['thalach', 'ca', 'thal'],
  },
];

export interface FieldMeta {
  label: string;
  unit?: string;
  hint: string;
}

export const FIELD_META: Record<string, FieldMeta> = {
  age: { label: 'Age', unit: 'years', hint: 'Patient age in years.' },
  sex: { label: 'Sex', hint: 'Biological sex assigned at birth.' },
  cp: { label: 'Chest Pain Type', hint: 'Type of chest discomfort experienced.' },
  trestbps: { label: 'Resting Blood Pressure', unit: 'mm Hg', hint: 'Resting systolic blood pressure.' },
  chol: { label: 'Cholesterol', unit: 'mg/dL', hint: 'Serum cholesterol measurement.' },
  fbs: { label: 'Fasting Blood Sugar', hint: 'Fasting blood sugar > 120 mg/dL.' },
  restecg: { label: 'Resting ECG', hint: 'Resting electrocardiographic results.' },
  thalach: { label: 'Max Heart Rate', unit: 'bpm', hint: 'Maximum heart rate achieved during exercise.' },
  exang: { label: 'Exercise-Induced Angina', hint: 'Chest pain triggered by physical exertion.' },
  oldpeak: { label: 'ST Depression', unit: 'mm', hint: 'ST depression induced by exercise relative to rest.' },
  slope: { label: 'ST Slope', hint: 'Slope of the peak exercise ST segment.' },
  ca: { label: 'Major Vessels', hint: 'Number of major vessels colored by fluoroscopy (0–3).' },
  thal: { label: 'Thalassemia', hint: 'Thalassemia-related status from imaging.' },
};
