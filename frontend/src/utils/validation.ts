// Validation rules for the heart-risk prediction form.
// Returns an errors object keyed by field name; empty object = valid.

export interface HeartFormData {
  age: string;
  sex: string;
  cp: string;
  trestbps: string;
  chol: string;
  fbs: string;
  restecg: string;
  thalach: string;
  exang: string;
  oldpeak: string;
  slope: string;
  ca: string;
  thal: string;
}

export type ValidationErrors = Partial<Record<keyof HeartFormData, string>>;

const num = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) && !Number.isNaN(n) ? n : NaN;
};

export function validateForm(data: HeartFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  const age = num(data.age);
  if (!data.age) errors.age = 'Age is required.';
  else if (Number.isNaN(age)) errors.age = 'Age must be a number.';
  else if (age < 1 || age > 120) errors.age = 'Age must be between 1 and 120.';

  if (!data.sex) errors.sex = 'Please select an option.';

  if (!data.cp) errors.cp = 'Please select a chest pain type.';

  const trestbps = num(data.trestbps);
  if (!data.trestbps) errors.trestbps = 'Resting blood pressure is required.';
  else if (Number.isNaN(trestbps)) errors.trestbps = 'Must be a number.';
  else if (trestbps < 60 || trestbps > 260) errors.trestbps = 'Must be between 60 and 260 mm Hg.';

  const chol = num(data.chol);
  if (!data.chol) errors.chol = 'Cholesterol is required.';
  else if (Number.isNaN(chol)) errors.chol = 'Must be a number.';
  else if (chol < 80 || chol > 600) errors.chol = 'Must be between 80 and 600 mg/dL.';

  if (!data.fbs) errors.fbs = 'Please select an option.';
  if (!data.restecg) errors.restecg = 'Please select an option.';

  const thalach = num(data.thalach);
  if (!data.thalach) errors.thalach = 'Max heart rate is required.';
  else if (Number.isNaN(thalach)) errors.thalach = 'Must be a number.';
  else if (thalach < 60 || thalach > 250) errors.thalach = 'Must be between 60 and 250 bpm.';

  if (!data.exang) errors.exang = 'Please select an option.';

  const oldpeak = num(data.oldpeak);
  if (data.oldpeak === '') errors.oldpeak = 'ST depression is required.';
  else if (Number.isNaN(oldpeak)) errors.oldpeak = 'Must be a number.';
  else if (oldpeak < 0 || oldpeak > 10) errors.oldpeak = 'Must be between 0 and 10 mm.';

  if (!data.slope) errors.slope = 'Please select an option.';
  if (!data.ca) errors.ca = 'Please select an option.';
  if (!data.thal) errors.thal = 'Please select an option.';

  return errors;
}

export const emptyForm: HeartFormData = {
  age: '',
  sex: '',
  cp: '',
  trestbps: '',
  chol: '',
  fbs: '',
  restecg: '',
  thalach: '',
  exang: '',
  oldpeak: '',
  slope: '',
  ca: '',
  thal: '',
};
