import { useState } from 'react';
import { useMoodStore, moodEmojis, moodLabels, moodColors } from '@/stores/moodStore';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const MoodPage = () => {
  const { entries, addEntry } = useMoodStore();
  const [selectedMood, setSelectedMood] = useState(0);
  const [note, setNote] = useState('');

  const handleAdd = () => {
    if (selectedMood > 0) {
      addEntry(selectedMood, note);
      setSelectedMood(0);
      setNote('');
    }
  };

  const chartData = entries.map((m) => ({
    day: new Date(m.date).toLocaleDateString('en', { weekday: 'short' }),
    mood: m.mood,
  }));

  const avg = (entries.reduce((a, m) => a + m.mood, 0) / entries.length).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-lg mb-4">How are you feeling?</h2>
        <div className="flex gap-3 mb-4">
          {moodEmojis.map((emoji, i) => (
            <button
              key={i}
              onClick={() => setSelectedMood(i + 1)}
              className={`w-14 h-14 rounded-2xl text-2xl flex items-center justify-center transition-all ${
                selectedMood === i + 1 ? 'bg-primary/20 ring-2 ring-primary scale-110' : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        {selectedMood > 0 && <p className="text-sm text-primary font-medium mb-3">{moodLabels[selectedMood - 1]}</p>}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)..."
          className="w-full p-3 rounded-xl bg-muted/50 border border-border text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button onClick={handleAdd} disabled={!selectedMood} className="mt-3 px-6 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 transition-opacity">
          Save Mood
        </button>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-4">Mood Timeline</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(260,10%,50%)' }} />
            <YAxis domain={[1, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(260,10%,50%)' }} />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="hsl(270,60%,65%)" strokeWidth={2.5} dot={{ r: 5, fill: 'hsl(270,60%,65%)' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-4">This Week</h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold font-display">{avg}</p>
            <p className="text-sm text-muted-foreground">Average</p>
          </div>
          <div className="flex-1 grid grid-cols-7 gap-2">
            {entries.slice(-7).map((m) => (
              <div key={m.id} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: moodColors[m.mood - 1] + '33' }}>
                  {moodEmojis[m.mood - 1]}
                </div>
                <span className="text-xs text-muted-foreground">{new Date(m.date).toLocaleDateString('en', { weekday: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-4">Recent Entries</h3>
        <div className="space-y-3">
          {entries.slice().reverse().map((m) => (
            <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <span className="text-xl">{moodEmojis[m.mood - 1]}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{moodLabels[m.mood - 1]}</p>
                {m.note && <p className="text-xs text-muted-foreground">{m.note}</p>}
              </div>
              <span className="text-xs text-muted-foreground">{new Date(m.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodPage;
