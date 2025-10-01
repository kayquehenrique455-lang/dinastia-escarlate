import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Book, Skull, Settings } from 'lucide-react';

const icons = {
  home: Home,
  user: User,
  book: Book,
  skull: Skull,
  settings: Settings
}

export function Sidebar() {
  const loc = useLocation();
  const items = [
    { to: '/', icon: icons.home, label: 'Início' },
    { to: '/personagens', icon: icons.user, label: 'Personagens' },
    { to: '/rituais', icon: icons.book, label: 'Rituais' },
    { to: '/marcas', icon: icons.skull, label: 'Marcas' },
    { to: '/configuracoes', icon: icons.settings, label: 'Config' },
  ];
  return (
    <aside className="w-20 bg-gradient-to-b from-red-950 via-black to-red-950 flex flex-col items-center py-6 shadow-xl border-r border-red-900">
      {items.map((it) => {
        const Icon = it.icon;
        const active = loc.pathname === it.to;
        return (
          <Link key={it.to} to={it.to} className={`group relative flex items-center justify-center h-14 w-14 my-2 rounded-xl shadow-lg transition-all ${active ? 'bg-red-700 text-white' : 'bg-zinc-800 text-red-400 hover:bg-red-700'}`}>
            <Icon size={24} />
            <span className="absolute left-16 scale-0 rounded-md bg-zinc-900 p-2 text-xs text-white group-hover:scale-100 transition-all">
              {it.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
