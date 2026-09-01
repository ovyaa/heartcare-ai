import type { RiskCategory } from '@/data/mockData';

export function riskBadgeClass(category: RiskCategory): string {
  switch (category) {
    case 'Low':
      return 'badge-low';
    case 'Moderate':
      return 'badge-moderate';
    case 'High':
      return 'badge-high';
  }
}

export function riskColor(category: RiskCategory): string {
  switch (category) {
    case 'Low':
      return '#16a34a';
    case 'Moderate':
      return '#f59e0b';
    case 'High':
      return '#dc2626';
  }
}

export function riskBgClass(category: RiskCategory): string {
  switch (category) {
    case 'Low':
      return 'bg-green-50';
    case 'Moderate':
      return 'bg-amber-50';
    case 'High':
      return 'bg-red-50';
  }
}

export function riskRingClass(category: RiskCategory): string {
  switch (category) {
    case 'Low':
      return 'ring-green-200';
    case 'Moderate':
      return 'ring-amber-200';
    case 'High':
      return 'ring-red-200';
  }
}
