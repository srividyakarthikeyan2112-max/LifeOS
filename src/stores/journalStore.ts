import { create } from 'zustand';

export interface JournalEntry {
  id: string;
  text: string;
  tags: string[];
  date: string;
}

interface JournalStore {
  entries: JournalEntry[];
  addEntry: (text: string, tags: string[]) => void;
}

function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export const useJournalStore = create<JournalStore>((set) => ({
  entries: [
    { id: '1', text: 'Today was a productivity win. Completed all major tasks and felt great about the progress on the project. Need to keep this momentum going.', tags: ['productivity', 'work'], date: getDateOffset(0) },
    { id: '2', text: 'Spent quality time reading and reflecting. The morning meditation really set the tone for a calm day. Grateful for small moments.', tags: ['mindfulness', 'gratitude'], date: getDateOffset(-1) },
    { id: '3', text: 'Challenging day but learned a lot. Had a difficult conversation but handled it well. Growth comes from discomfort.', tags: ['growth', 'reflection'], date: getDateOffset(-3) },
  ],
  addEntry: (text, tags) =>
    set((state) => ({
      entries: [{ id: Date.now().toString(), text, tags, date: new Date().toISOString().split('T')[0] }, ...state.entries],
    })),
}));
