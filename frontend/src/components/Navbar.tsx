import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/prediction', label: 'Prediction' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/history', label: 'History' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
            <Activity className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900">
            HeartCare<span className="text-brand-600"> AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `nav-link rounded-lg ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/prediction" className="btn-primary ml-2 px-4 py-2">
            Check Risk
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden animate-fade-in">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/prediction"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Check Your Heart Risk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
