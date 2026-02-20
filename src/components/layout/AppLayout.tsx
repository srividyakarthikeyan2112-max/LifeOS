import { ReactNode, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X, Bell, Moon, LayoutDashboard, Smile, Target, CheckSquare, BookOpen, Wallet, TrendingUp } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/mood': 'Mood Tracker',
  '/habits': 'Habit Tracker',
  '/tasks': 'Tasks & Focus',
  '/journal': 'Journal',
  '/finance': 'Finance',
  '/insights': 'Weekly Insights',
};

const mobileNavItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/mood', label: 'Mood', icon: Smile },
  { to: '/habits', label: 'Habits', icon: Target },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/journal', label: 'Journal', icon: BookOpen },
  { to: '/finance', label: 'Finance', icon: Wallet },
  { to: '/insights', label: 'Insights', icon: TrendingUp },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = pageTitles[location.pathname] || 'LifeOS';

  return (
    <div className="flex min-h-screen gradient-bg">
      <Sidebar />

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-bold">L</span>
                </div>
                <span className="font-display font-bold text-lg">LifeOS</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded-lg hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {mobileNavItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={() => {
                    const isActive = location.pathname === to;
                    return `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`;
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-muted">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-display font-semibold text-xl">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-muted relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <button className="p-2 rounded-xl hover:bg-muted">
              <Moon className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center ml-1">
              <span className="text-primary-foreground text-xs font-semibold">U</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
