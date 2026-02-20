import { useState, useEffect, useCallback } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { Plus, CheckCircle2, Circle, Play, Pause, RotateCcw } from 'lucide-react';

const TasksPage = () => {
  const { tasks, addTask, toggleTask, focusMinutes, addFocusMinutes } = useTaskStore();
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  // Pomodoro
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      setTimerSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          addFocusMinutes(25);
          return 25 * 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [running, addFocusMinutes]);

  const mm = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const ss = String(timerSeconds % 60).padStart(2, '0');

  const handleAdd = () => {
    if (newTitle.trim()) {
      addTask(newTitle.trim());
      setNewTitle('');
    }
  };

  const filtered = tasks.filter((t) => filter === 'all' || t.status === filter);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Pomodoro */}
      <div className="glass-card p-6 text-center">
        <h2 className="font-display font-semibold text-lg mb-2">Focus Zone</h2>
        <p className="text-5xl font-display font-bold my-4 tracking-wide">{mm}:{ss}</p>
        <div className="flex justify-center gap-3">
          <button onClick={() => setRunning(!running)} className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-2">
            {running ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
          </button>
          <button onClick={() => { setRunning(false); setTimerSeconds(25 * 60); }} className="px-5 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-3">Total focus: {focusMinutes} min today</p>
      </div>

      {/* Add task */}
      <div className="glass-card p-6">
        <div className="flex gap-3">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add New Task..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button onClick={handleAdd} className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'pending', 'done'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="glass-card p-6 space-y-2">
        {filtered.map((t) => (
          <button key={t.id} onClick={() => toggleTask(t.id)} className="w-full flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-muted/50 transition-colors text-left">
            {t.status === 'done' ? <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />}
            <span className={`text-sm flex-1 ${t.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>{t.title}</span>
            {t.category && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t.category}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
