
import React from "react";

export function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="Personagens" value="3 vivos / 1 morto" />
      <Card title="Rituais Ativos" value="2" />
      <Card title="Marcas do Grupo" value="5" />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-zinc-900 border border-red-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
      <h2 className="text-xl font-bold text-red-500 mb-2">{title}</h2>
      <p className="text-2xl text-gray-200">{value}</p>
    </div>
  );
}
