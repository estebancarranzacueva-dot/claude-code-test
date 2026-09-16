export interface Habit {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt: string; // "YYYY-MM-DD"
  completedDates: string[]; // unique "YYYY-MM-DD" local date strings
}
