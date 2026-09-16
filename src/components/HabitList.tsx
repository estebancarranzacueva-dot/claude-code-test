import type { Habit } from '../types';
import { HabitCard } from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export function HabitList({ habits, onToggle, onDelete }: HabitListProps) {
  if (habits.length === 0) {
    return <p className="empty-state">No habits yet — add one above to get started.</p>;
  }

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
