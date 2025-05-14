export interface Metric {
  id: string;
  name: string;
  unit: string; // e.g., 'kg', 'minutes', 'rating 1-5'
  targetValue?: number; // Optional target value
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  metrics: Metric[];
  archived: boolean;
}

export interface Run {
  id: string;
  experimentId: string;
  timestamp: Date;
  metricValues: { [metricId: string]: number | string }; // Flexible for different value types
}

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly' | string; // Allow custom frequency strings
  archived: boolean;
}

export interface Log {
  id: string;
  habitId: string;
  timestamp: Date;
  completed: boolean;
  notes?: string;
}
