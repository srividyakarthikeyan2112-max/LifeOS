import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Smile, Target, CheckSquare, BookOpen, Wallet, TrendingUp } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/mood', label: 'Mood', icon: Smile },
  { to: '/habits', label: 'Habits', icon: Target },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/journal', label: 'Journal', icon: BookOpen },
  { to: '/finance', label: 'Finance', icon: Wallet },
  { to: '/insights', label: 'Insights', icon: TrendingUp },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen bg-sidebar border-r border-sidebar-border p-4">
      <div className="flex items-center gap-2 px-3 py-4 mb-6">
        <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-bold">L</span>
        </div>
        <span className="font-display font-bold text-lg text-foreground">LifeOS</span>
      </div>

      <div className="px-3 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">App</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={() => {
              const isActive = location.pathname === to;
              return `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`;
            }}
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
