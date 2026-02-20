import { useMoodStore, moodEmojis } from '@/stores/moodStore';
import { useHabitStore } from '@/stores/habitStore';
import { useTaskStore } from '@/stores/taskStore';
import { useFinanceStore } from '@/stores/financeStore';

const InsightsPage = () => {
  const { entries: moods } = useMoodStore();
  const { habits } = useHabitStore();
  const { tasks } = useTaskStore();
  const { records } = useFinanceStore();

  const avgMood = (moods.reduce((a, m) => a + m.mood, 0) / moods.length).toFixed(1);
  const bestHabit = habits.reduce((a, b) => (b.streak > a.streak ? b : a), habits[0]);
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const taskPct = Math.round((doneTasks / tasks.length) * 100);

  const expenses = records.filter((r) => r.type === 'expense');
  const byCategory = expenses.reduce((acc, r) => { acc[r.category] = (acc[r.category] || 0) + r.amount; return acc; }, {} as Record<string, number>);
  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  const totalExpense = expenses.reduce((a, r) => a + r.amount, 0);

  const insights = [
    { emoji: '🔥', title: 'Best Habit', value: bestHabit?.title || '—', detail: `${bestHabit?.streak || 0}-day streak. Keep it going!`, color: 'bg-primary/10' },
    { emoji: moodEmojis[Math.round(Number(avgMood)) - 1] || '😐', title: 'Average Mood', value: `${avgMood} / 5`, detail: Number(avgMood) >= 3.5 ? 'You had a positive week overall!' : 'Might be worth reflecting on what brought you down.', color: 'bg-accent' },
    { emoji: '✅', title: 'Tasks Completed', value: `${taskPct}%`, detail: `You completed ${doneTasks} out of ${tasks.length} tasks this week.`, color: 'bg-primary/10' },
    { emoji: '💰', title: 'Top Spending', value: topCategory ? topCategory[0] : '—', detail: topCategory ? `You spent ₹${topCategory[1]} on ${topCategory[0]}. Total: ₹${totalExpense}` : 'No expenses recorded.', color: 'bg-accent' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-lg mb-2">Weekly Insights</h2>
        <p className="text-sm text-muted-foreground">A summary of your week across all modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((ins) => (
          <div key={ins.title} className="glass-card-hover p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-2xl ${ins.color} flex items-center justify-center text-2xl`}>
                {ins.emoji}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{ins.title}</p>
                <p className="font-display font-bold text-xl">{ins.value}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{ins.detail}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-3">💡 Recommendation</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {Number(avgMood) < 3
            ? "Your mood was lower this week. Try journaling more or adjusting your routine."
            : taskPct < 50
            ? "You completed fewer tasks. Consider breaking tasks into smaller pieces."
            : "Great week! You're maintaining good habits and getting things done. Keep the momentum!"}
        </p>
      </div>
    </div>
  );
};

export default InsightsPage;
