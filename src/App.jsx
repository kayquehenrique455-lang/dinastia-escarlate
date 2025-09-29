import { useState } from "react";

function App() {
  const [players, setPlayers] = useState([
    { id: 1, nome: "Kael", vida: 100, marcas: 2 },
    { id: 2, nome: "Seraphine", vida: 85, marcas: 1 },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-yellow-400 p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold tracking-wide">Dinastia Escarlate</h1>
        <p className="text-lg text-gray-300 mt-2">Painel do Mestre & Jogadores</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {players.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transform transition-all"
          >
            <h2 className="text-2xl font-bold mb-3">{p.nome}</h2>

            {/* Barra de Vida */}
            <div className="mb-4">
              <p className="text-sm text-gray-300">Vida: {p.vida}</p>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-1">
                <div
                  className="bg-red-600 h-3 rounded-full transition-all"
                  style={{ width: `${p.vida}%` }}
                ></div>
              </div>
            </div>

            {/* Marcas */}
            <div>
              <p className="text-sm text-gray-300 mb-1">Marcas:</p>
              <div className="flex gap-2">
                {[...Array(p.marcas)].map((_, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-full bg-purple-700 animate-pulse"
                  ></span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
