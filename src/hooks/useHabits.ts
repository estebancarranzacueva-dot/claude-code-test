import { useEffect, useState } from 'react';
import type { Habit } from '../types';
import { loadHabits, saveHabits } from '../utils/storage';
import { getTodayString } from '../utils/dateUtils';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits());

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  function addHabit(name: string, description?: string, color?: string, icon?: string) {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      description: description || undefined,
      color: color || undefined,
      icon: icon || undefined,
      createdAt: getTodayString(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  }

  function toggleToday(habitId: string) {
    const today = getTodayString();
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;
        const isDone = habit.completedDates.includes(today);
        const completedDates = isDone
          ? habit.completedDates.filter((d) => d !== today)
          : [...habit.completedDates, today].sort();
        return { ...habit, completedDates };
      }),
    );
  }

  function deleteHabit(habitId: string) {
    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  }

  return { habits, addHabit, toggleToday, deleteHabit };
}
