import { useHabits } from '../hooks/useHabits';
import { getTodayString } from '../utils/dateUtils';
import { AddHabitForm } from './AddHabitForm';
import { HabitList } from './HabitList';

export function Dashboard() {
  const { habits, addHabit, toggleToday, deleteHabit } = useHabits();
  const today = getTodayString();
  const completedToday = habits.filter((h) => h.completedDates.includes(today)).length;

  return (
    <div className="dashboard">
      <AddHabitForm onAdd={addHabit} />

      {habits.length > 0 && (
        <p className="dashboard-summary">
          {completedToday}/{habits.length} habits completed today
        </p>
      )}

      <HabitList habits={habits} onToggle={toggleToday} onDelete={deleteHabit} />
    </div>
  );
}
