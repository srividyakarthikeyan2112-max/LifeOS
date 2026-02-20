import { create } from 'zustand';

export interface FinanceRecord {
  id: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

interface FinanceStore {
  records: FinanceRecord[];
  addRecord: (amount: number, category: string, type: 'income' | 'expense') => void;
}

function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export const useFinanceStore = create<FinanceStore>((set) => ({
  records: [
    { id: '1', amount: 650, category: 'Food', type: 'expense', date: getDateOffset(-1) },
    { id: '2', amount: 200, category: 'Transport', type: 'expense', date: getDateOffset(-2) },
    { id: '3', amount: 150, category: 'Entertainment', type: 'expense', date: getDateOffset(-3) },
    { id: '4', amount: 330, category: 'Others', type: 'expense', date: getDateOffset(0) },
    { id: '5', amount: 3000, category: 'Salary', type: 'income', date: getDateOffset(-5) },
    { id: '6', amount: 500, category: 'Freelance', type: 'income', date: getDateOffset(-2) },
  ],
  addRecord: (amount, category, type) =>
    set((state) => ({
      records: [...state.records, { id: Date.now().toString(), amount, category, type, date: new Date().toISOString().split('T')[0] }],
    })),
}));

export const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Others'];
export const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Others'];
