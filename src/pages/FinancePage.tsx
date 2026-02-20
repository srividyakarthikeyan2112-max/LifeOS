import { useState } from 'react';
import { useFinanceStore, expenseCategories, incomeCategories } from '@/stores/financeStore';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

const FinancePage = () => {
  const { records, addRecord } = useFinanceStore();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');

  const handleAdd = () => {
    if (amount && category) {
      addRecord(Number(amount), category, type);
      setAmount('');
      setCategory('');
    }
  };

  const totalIncome = records.filter((r) => r.type === 'income').reduce((a, r) => a + r.amount, 0);
  const totalExpense = records.filter((r) => r.type === 'expense').reduce((a, r) => a + r.amount, 0);
  const saved = totalIncome - totalExpense;

  const byCategory = records
    .filter((r) => r.type === 'expense')
    .reduce((acc, r) => { acc[r.category] = (acc[r.category] || 0) + r.amount; return acc; }, {} as Record<string, number>);
  const pieData = Object.entries(byCategory).map(([name, value]) => ({ name, value }));
  const colors = ['hsl(270,60%,65%)', 'hsl(300,50%,70%)', 'hsl(330,50%,70%)', 'hsl(200,60%,65%)', 'hsl(150,50%,60%)'];

  const categories = type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5 text-center">
          <TrendingUp className="w-5 h-5 text-mood-excellent mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Income</p>
          <p className="font-display font-bold text-lg">₹{totalIncome.toLocaleString()}</p>
        </div>
        <div className="glass-card p-5 text-center">
          <TrendingDown className="w-5 h-5 text-destructive mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Expenses</p>
          <p className="font-display font-bold text-lg">₹{totalExpense.toLocaleString()}</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-xs text-muted-foreground mb-2">Saved</p>
          <p className="font-display font-bold text-lg">₹{saved.toLocaleString()}</p>
        </div>
      </div>

      {/* Add record */}
      <div className="glass-card p-6">
        <div className="flex gap-2 mb-4">
          {(['expense', 'income'] as const).map((t) => (
            <button key={t} onClick={() => { setType(t); setCategory(''); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${type === t ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap">
          <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount"
            className="w-32 px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">Category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={handleAdd} className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-4">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
                {pieData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: colors[i % colors.length] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-4">Recent Records</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {records.slice().reverse().map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{r.category}</p>
                  <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p>
                </div>
                <span className={`font-display font-bold text-sm ${r.type === 'income' ? 'text-mood-excellent' : 'text-destructive'}`}>
                  {r.type === 'income' ? '+' : '-'}₹{r.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
