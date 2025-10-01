import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Personagens from './pages/Personagens';
import Rituais from './pages/Rituais';
import Marcas from './pages/Marcas';
import Configuracoes from './pages/Configuracoes';

export default function App(){
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-b from-black via-zinc-900 to-black p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/personagens" element={<Personagens />} />
          <Route path="/rituais" element={<Rituais />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </main>
    </div>
  );
}
