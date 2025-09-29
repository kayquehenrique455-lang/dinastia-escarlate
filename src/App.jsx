import { useState } from "react";

function App() {
  const [tab, setTab] = useState("mestre");

  // Dados de exemplo
  const [personagens, setPersonagens] = useState([
    { id: 1, nome: "Kael", vida: 20, marcas: 1, corrupcao: 10 },
    { id: 2, nome: "Selene", vida: 15, marcas: 3, corrupcao: 30 },
  ]);

  const [rituais, setRituais] = useState([
    { id: 1, nome: "Sangue do Eclipse", risco: "Alto", efeito: "Corrompe a alma" },
  ]);

  const [itens, setItens] = useState([
    { id: 1, nome: "Anel da Escuridão", efeito: "Concede +2 em rituais sombrios" },
  ]);

  // Estatísticas rápidas
  const estatisticas = {
    totalPersonagens: personagens.length,
    totalMarcas: personagens.reduce((acc, p) => acc + p.marcas, 0),
    mediaCorrupcao:
      personagens.reduce((acc, p) => acc + p.corrupcao, 0) /
      (personagens.length || 1),
  };

  // Barra de Corrupção
  const BarraCorrupcao = ({ valor }) => {
    let cor = "bg-green-500";
    if (valor > 25) cor = "bg-yellow-500";
    if (valor > 50) cor = "bg-orange-500";
    if (valor > 75) cor = "bg-red-600";
    return (
      <div className="w-full bg-gray-800 rounded-xl h-3 mt-2">
        <div
          className={`${cor} h-3 rounded-xl transition-all`}
          style={{ width: `${valor}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-red-500 mb-6 drop-shadow-lg">
        ⚔️ Dinastia Escarlate
      </h1>

      {/* Navegação */}
      <div className="flex justify-center gap-4 mb-6">
        {["mestre", "jogador", "rituais", "itens"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              tab === t
                ? "bg-red-600 text-white"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Conteúdo por aba */}
      {tab === "mestre" && (
        <div>
          <h2 className="text-2xl mb-4">📜 Painel do Mestre</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {personagens.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 p-4 rounded-2xl shadow-lg border border-red-800"
              >
                <h3 className="text-xl font-bold">{p.nome}</h3>
                <p>❤️ Vida: {p.vida}</p>
                <p>☠️ Marcas: {p.marcas}</p>
                <p>🩸 Corrupção: {p.corrupcao}%</p>
                <BarraCorrupcao valor={p.corrupcao} />
              </div>
            ))}
          </div>

          {/* Estatísticas rápidas */}
          <div className="mt-6 p-4 bg-gray-900 rounded-xl border border-red-900">
            <h3 className="text-lg font-bold mb-2">📊 Estatísticas Gerais</h3>
            <p>👥 Personagens: {estatisticas.totalPersonagens}</p>
            <p>☠️ Total de Marcas: {estatisticas.totalMarcas}</p>
            <p>
              🩸 Corrupção Média: {estatisticas.mediaCorrupcao.toFixed(1)}%
            </p>
          </div>
        </div>
      )}

      {tab === "jogador" && (
        <div>
          <h2 className="text-2xl mb-4">🎭 Área do Jogador</h2>
          <p>
            Aqui cada jogador pode consultar seus status, inventário e efeitos
            ativos.
          </p>
        </div>
      )}

      {tab === "rituais" && (
        <div>
          <h2 className="text-2xl mb-4">🔮 Rituais Ativos</h2>
          <div className="grid gap-4">
            {rituais.map((r) => (
              <div
                key={r.id}
                className="p-4 bg-gray-800 rounded-xl border border-purple-700 shadow-md"
              >
                <h3 className="text-xl font-bold">{r.nome}</h3>
                <p>⚠️ Risco: {r.risco}</p>
                <p>✨ Efeito: {r.efeito}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "itens" && (
        <div>
          <h2 className="text-2xl mb-4">🗡️ Itens Mágicos</h2>
          <div className="grid gap-4">
            {itens.map((i) => (
              <div
                key={i.id}
                className="p-4 bg-gray-800 rounded-xl border border-yellow-600 shadow-md"
              >
                <h3 className="text-xl font-bold">{i.nome}</h3>
                <p>✨ Efeito: {i.efeito}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
