import { create } from 'zustand';

export interface MoodEntry {
  id: string;
  mood: number;
  note: string;
  date: string;
}

interface MoodStore {
  entries: MoodEntry[];
  addEntry: (mood: number, note: string) => void;
}

const today = new Date().toISOString().split('T')[0];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const useMoodStore = create<MoodStore>((set) => ({
  entries: [
    { id: '1', mood: 4, note: 'Great morning workout', date: getDateOffset(-6) },
    { id: '2', mood: 3, note: 'Busy day at work', date: getDateOffset(-5) },
    { id: '3', mood: 2, note: 'Feeling tired', date: getDateOffset(-4) },
    { id: '4', mood: 4, note: 'Good progress on project', date: getDateOffset(-3) },
    { id: '5', mood: 5, note: 'Amazing day!', date: getDateOffset(-2) },
    { id: '6', mood: 3, note: 'Regular day', date: getDateOffset(-1) },
    { id: '7', mood: 4, note: 'Calm and focused', date: today },
  ],
  addEntry: (mood, note) =>
    set((state) => ({
      entries: [...state.entries, { id: Date.now().toString(), mood, note, date: today }],
    })),
}));

function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export const moodEmojis = ['😢', '😔', '😐', '😊', '😄'];
export const moodLabels = ['Terrible', 'Bad', 'Neutral', 'Good', 'Excellent'];
export const moodColors = ['hsl(0,60%,55%)', 'hsl(20,70%,60%)', 'hsl(45,80%,65%)', 'hsl(200,60%,60%)', 'hsl(150,60%,55%)'];
