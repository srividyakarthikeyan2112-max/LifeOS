import { useState } from 'react';
import { useHabitStore } from '@/stores/habitStore';
import { Plus, Check, Flame } from 'lucide-react';

const HabitsPage = () => {
  const { habits, addHabit, toggleHabit } = useHabitStore();
  const [newTitle, setNewTitle] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleAdd = () => {
    if (newTitle.trim()) {
      addHabit(newTitle.trim());
      setNewTitle('');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-lg mb-4">Add New Habit</h2>
        <div className="flex gap-3">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="e.g. Morning Run, Read 30 min..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button onClick={handleAdd} className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((h) => {
          const completedToday = h.history.includes(today);
          return (
            <div key={h.id} className="glass-card-hover p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold">{h.title}</h3>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Flame className="w-4 h-4" />
                  <span className="font-bold">{h.streak}</span>
                </div>
              </div>
              <button
                onClick={() => toggleHabit(h.id, today)}
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                  completedToday
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground hover:bg-primary/5'
                }`}
              >
                {completedToday ? (
                  <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Completed Today</span>
                ) : (
                  'Mark Complete'
                )}
              </button>
              {/* Mini calendar — last 7 days */}
              <div className="flex gap-1.5 mt-3 justify-center">
                {Array.from({ length: 7 }, (_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (6 - i));
                  const dateStr = d.toISOString().split('T')[0];
                  const done = h.history.includes(dateStr);
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-6 h-6 rounded-md ${done ? 'bg-primary/40' : 'bg-muted'}`} />
                      <span className="text-[10px] text-muted-foreground">{d.toLocaleDateString('en', { weekday: 'narrow' })}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitsPage;
