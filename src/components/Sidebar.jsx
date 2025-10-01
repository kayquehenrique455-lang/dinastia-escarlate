
import React from "react";
import { Home, User, Book, Skull, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-20 bg-gradient-to-b from-red-950 via-black to-red-950 flex flex-col items-center py-6 shadow-xl border-r border-red-900">
      <SidebarIcon icon={<Home size={28} />} text="Início" />
      <SidebarIcon icon={<User size={28} />} text="Personagens" />
      <SidebarIcon icon={<Book size={28} />} text="Rituais" />
      <SidebarIcon icon={<Skull size={28} />} text="Marcas" />
      <SidebarIcon icon={<Settings size={28} />} text="Config" />
    </div>
  );
}

function SidebarIcon({ icon, text }) {
  return (
    <div className="group relative flex items-center justify-center h-14 w-14 my-2 bg-zinc-800 hover:bg-red-700 text-red-400 rounded-xl shadow-lg cursor-pointer transition-all">
      {icon}
      <span className="absolute left-16 scale-0 rounded-md bg-zinc-900 p-2 text-xs text-white group-hover:scale-100 transition-all">
        {text}
      </span>
    </div>
  );
}
