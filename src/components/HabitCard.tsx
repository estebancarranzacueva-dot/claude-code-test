import type { Habit } from '../types';
import { calculateStreak } from '../utils/streak';
import { getLastNDateStrings, getTodayString } from '../utils/dateUtils';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  const today = getTodayString();
  const doneToday = habit.completedDates.includes(today);
  const streak = calculateStreak(habit.completedDates, today);
  const last7Days = getLastNDateStrings(7, today);
  const completedSet = new Set(habit.completedDates);

  return (
    <div className="habit-card" style={{ borderLeftColor: habit.color || '#ccc' }}>
      <div className="habit-card-header">
        <div className="habit-card-title">
          {habit.icon && <span className="habit-icon">{habit.icon}</span>}
          <span className="habit-name">{habit.name}</span>
        </div>
        <button
          type="button"
          className="habit-delete"
          onClick={() => onDelete(habit.id)}
          aria-label={`Delete ${habit.name}`}
        >
          &times;
        </button>
      </div>

      {habit.description && <p className="habit-description">{habit.description}</p>}

      <div className="habit-card-body">
        <button
          type="button"
          className={`habit-toggle${doneToday ? ' done' : ''}`}
          onClick={() => onToggle(habit.id)}
        >
          {doneToday ? '✓ Done today' : 'Mark as done'}
        </button>

        <div className="habit-streak">
          <span className="streak-count">{streak}</span>
          <span className="streak-label">{streak === 1 ? 'day streak' : 'day streak'}</span>
        </div>
      </div>

      <div className="habit-history">
        {last7Days.map((dateStr) => (
          <span
            key={dateStr}
            className={`history-dot${completedSet.has(dateStr) ? ' filled' : ''}`}
            title={dateStr}
          />
        ))}
      </div>
    </div>
  );
}
