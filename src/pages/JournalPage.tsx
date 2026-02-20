import { useState } from 'react';
import { useJournalStore } from '@/stores/journalStore';
import { Plus, Search, BookOpen } from 'lucide-react';

const JournalPage = () => {
  const { entries, addEntry } = useJournalStore();
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [search, setSearch] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      addEntry(text.trim(), tags.split(',').map((t) => t.trim()).filter(Boolean));
      setText('');
      setTags('');
    }
  };

  const filtered = entries.filter(
    (e) => e.text.toLowerCase().includes(search.toLowerCase()) || e.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-lg mb-4">New Entry</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full p-4 rounded-xl bg-muted/50 border border-border text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="w-full mt-3 px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button onClick={handleAdd} disabled={!text.trim()} className="mt-3 px-6 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Save Entry
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search entries..."
          className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((e) => (
          <div key={e.id} className="glass-card-hover p-5">
            <div className="flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-2">{new Date(e.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <p className="text-sm leading-relaxed">{e.text}</p>
                {e.tags.length > 0 && (
                  <div className="flex gap-1.5 mt-3">
                    {e.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
