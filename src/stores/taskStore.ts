import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'done';
  date: string;
  category?: string;
}

interface TaskStore {
  tasks: Task[];
  focusMinutes: number;
  addTask: (title: string, category?: string) => void;
  toggleTask: (id: string) => void;
  addFocusMinutes: (mins: number) => void;
}

const today = new Date().toISOString().split('T')[0];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: '1', title: 'Design system review', status: 'done', date: today, category: 'Work' },
    { id: '2', title: 'Clean room', status: 'done', date: today, category: 'Personal' },
    { id: '3', title: 'Rewrite priorities', status: 'done', date: today, category: 'Personal' },
    { id: '4', title: 'Prepare presentation', status: 'pending', date: today, category: 'Work' },
    { id: '5', title: 'Grocery shopping', status: 'pending', date: today, category: 'Personal' },
    { id: '6', title: 'Read chapter 5', status: 'done', date: today, category: 'Personal' },
    { id: '7', title: 'Update portfolio', status: 'done', date: today, category: 'Work' },
    { id: '8', title: 'Call dentist', status: 'done', date: today, category: 'Personal' },
  ],
  focusMinutes: 45,
  addTask: (title, category) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now().toString(), title, status: 'pending', date: today, category }],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t)),
    })),
  addFocusMinutes: (mins) => set((state) => ({ focusMinutes: state.focusMinutes + mins })),
}));
