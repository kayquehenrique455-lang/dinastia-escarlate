import React from 'react';

export default function Dashboard(){
  return (
    <div>
      <h1 className="text-3xl font-bold text-gold mb-4" style={{color:'var(--gold)'}}>Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-red-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold text-red-500 mb-2">Personagens</h2>
          <p className="text-2xl">—</p>
        </div>
        <div className="bg-zinc-900 border border-red-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold text-red-500 mb-2">Rituais</h2>
          <p className="text-2xl">—</p>
        </div>
        <div className="bg-zinc-900 border border-red-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold text-red-500 mb-2">Marcas</h2>
          <p className="text-2xl">—</p>
        </div>
      </div>
    </div>
  );
}
