import { create } from 'zustand';

export interface Habit {
  id: string;
  title: string;
  streak: number;
  history: string[];
  createdAt: string;
}

interface HabitStore {
  habits: Habit[];
  addHabit: (title: string) => void;
  toggleHabit: (id: string, date: string) => void;
}

const today = new Date().toISOString().split('T')[0];

function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [
    { id: '1', title: 'Morning Run', streak: 3, history: [getDateOffset(-2), getDateOffset(-1), today], createdAt: getDateOffset(-10) },
    { id: '2', title: 'Read 30 min', streak: 5, history: [getDateOffset(-4), getDateOffset(-3), getDateOffset(-2), getDateOffset(-1), today], createdAt: getDateOffset(-14) },
    { id: '3', title: 'Meditate', streak: 2, history: [getDateOffset(-1), today], createdAt: getDateOffset(-7) },
    { id: '4', title: 'Drink 2L Water', streak: 0, history: [getDateOffset(-3), getDateOffset(-1)], createdAt: getDateOffset(-5) },
  ],
  addHabit: (title) =>
    set((state) => ({
      habits: [...state.habits, { id: Date.now().toString(), title, streak: 0, history: [], createdAt: today }],
    })),
  toggleHabit: (id, date) =>
    set((state) => ({
      habits: state.habits.map((h) => {
        if (h.id !== id) return h;
        const has = h.history.includes(date);
        const history = has ? h.history.filter((d) => d !== date) : [...h.history, date];
        return { ...h, history, streak: has ? Math.max(0, h.streak - 1) : h.streak + 1 };
      }),
    })),
}));
