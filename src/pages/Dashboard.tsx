import { useMoodStore, moodEmojis } from '@/stores/moodStore';
import { useHabitStore } from '@/stores/habitStore';
import { useTaskStore } from '@/stores/taskStore';
import { useFinanceStore } from '@/stores/financeStore';
import { useJournalStore } from '@/stores/journalStore';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, CheckCircle2, Circle, MoreHorizontal, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { entries: moods } = useMoodStore();
  const { habits } = useHabitStore();
  const { tasks, focusMinutes } = useTaskStore();
  const { records } = useFinanceStore();
  const { entries: journals } = useJournalStore();

  const todayMood = moods[moods.length - 1];
  const avgMood = (moods.reduce((a, m) => a + m.mood, 0) / moods.length).toFixed(1);
  const totalStreak = habits.reduce((a, h) => a + h.streak, 0);
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const totalExpense = records.filter((r) => r.type === 'expense').reduce((a, r) => a + r.amount, 0);

  const moodChartData = moods.map((m) => ({
    day: new Date(m.date).toLocaleDateString('en', { weekday: 'short' }),
    mood: m.mood,
  }));

  const expenseByCategory = records
    .filter((r) => r.type === 'expense')
    .reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + r.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));
  const pieColors = ['hsl(270,60%,65%)', 'hsl(300,50%,70%)', 'hsl(330,50%,70%)', 'hsl(200,60%,65%)'];

  const today = new Date().toISOString().split('T')[0];
  const habitsCompletedToday = habits.filter((h) => h.history.includes(today)).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Row — Mood, Streak, Tasks Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm text-muted-foreground">Today's Mood</h3>
            <Link to="/mood" className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full gradient-mood flex items-center justify-center text-3xl">
              {todayMood ? moodEmojis[todayMood.mood - 1] : '😐'}
            </div>
            <div>
              <p className="text-2xl font-bold font-display">{avgMood}<span className="text-base text-muted-foreground font-normal"> / 5</span></p>
              <p className="text-sm text-muted-foreground">{todayMood ? ['Terrible', 'Bad', 'Neutral', 'Good', 'Excellent'][todayMood.mood - 1] : 'No entry'}</p>
            </div>
          </div>
          <Link to="/mood" className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <Plus className="w-3 h-3" /> Add Mood
          </Link>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-sm text-muted-foreground mb-4">Habit Streak</h3>
          <div className="flex items-center gap-3 mb-3">
            {habits.slice(0, 4).map((h) => (
              <div key={h.id} className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {h.title.charAt(0)}
              </div>
            ))}
          </div>
          <p className="text-3xl font-bold font-display">{totalStreak}</p>
          <p className="text-sm text-muted-foreground">{habitsCompletedToday}/{habits.length} today</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-sm text-muted-foreground mb-4">Tasks Progress</h3>
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                strokeDasharray={`${(doneTasks / tasks.length) * 100} 100`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold font-display">{doneTasks}/{tasks.length}</span>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">tasks</p>
        </div>
      </div>

      {/* Mood Trend & Habit Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Mood Trend</h3>
            <div className="flex gap-1 text-xs">
              <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium">Week</span>
              <span className="px-3 py-1 rounded-lg text-muted-foreground">Month</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={moodChartData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(260,10%,50%)' }} />
              <YAxis domain={[1, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(260,10%,50%)' }} />
              <Line type="monotone" dataKey="mood" stroke="hsl(270,60%,65%)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(270,60%,65%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Habit Activity</h3>
            <span className="text-sm text-muted-foreground">{habitsCompletedToday} Today</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (<div key={d}>{d}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => {
              const completed = Math.random() > 0.4;
              return (
                <div key={i} className={`w-full aspect-square rounded-lg ${completed ? 'bg-primary/30' : 'bg-muted'}`} />
              );
            })}
          </div>
        </div>
      </div>

      {/* Tasks & Finance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Tasks</h3>
            <Link to="/tasks" className="text-xs text-primary font-medium">All My Tasks</Link>
          </div>
          <div className="space-y-2">
            {tasks.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center gap-3 py-1.5">
                {t.status === 'done' ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground" />
                )}
                <span className={`text-sm flex-1 ${t.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>{t.title}</span>
                {t.category && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t.category}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Finance Overview</h3>
            <span className="font-display font-bold">₹{totalExpense.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="space-y-2 flex-1">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: pieColors[i % pieColors.length] }} />
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
            <div className="w-28 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value" stroke="none">
                    {pieData.map((_, i) => (<Cell key={i} fill={pieColors[i % pieColors.length]} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-sm text-muted-foreground">
            <span>Today: {focusMinutes} min</span>
            <span>₹{totalExpense.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Journal preview */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold">Journal</h3>
          <Link to="/journal" className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {journals.slice(0, 2).map((j) => (
            <div key={j.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
              <BookOpen className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">{new Date(j.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <p className="text-sm line-clamp-2">{j.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InsightCard icon="🔥" label="Best Habit" value={habits[0]?.title || '—'} sub={`${habits[0]?.streak || 0}-day streak`} />
        <InsightCard icon="😊" label="Average Mood" value={avgMood} sub="This week" />
        <InsightCard icon="✅" label="Tasks Completed" value={`${Math.round((doneTasks / tasks.length) * 100)}%`} sub={`${doneTasks} of ${tasks.length}`} />
        <InsightCard icon="💰" label="Top Spending" value={pieData[0]?.name || '—'} sub={`₹${pieData[0]?.value || 0}`} />
      </div>
    </div>
  );
};

const InsightCard = ({ icon, label, value, sub }: { icon: string; label: string; value: string; sub: string }) => (
  <div className="glass-card p-4 text-center">
    <span className="text-2xl">{icon}</span>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
    <p className="font-display font-bold text-lg mt-1">{value}</p>
    <p className="text-xs text-muted-foreground">{sub}</p>
  </div>
);

export default Dashboard;
