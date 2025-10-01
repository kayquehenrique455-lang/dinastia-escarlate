
import { useState, useEffect } from "react";

export default function Personagens() {
  const [personagens, setPersonagens] = useState([]);
  const [nome, setNome] = useState("");
  const [vida, setVida] = useState(100);
  const [marcas, setMarcas] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("personagens");
    if (saved) setPersonagens(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("personagens", JSON.stringify(personagens));
  }, [personagens]);

  function adicionarPersonagem(e) {
    e.preventDefault();
    const novo = { id: Date.now(), nome, vida, marcas };
    setPersonagens([...personagens, novo]);
    setNome("");
    setVida(100);
    setMarcas(0);
  }

  function editarPersonagem(id, campo, valor) {
    setPersonagens(personagens.map(p => p.id === id ? { ...p, [campo]: valor } : p));
  }

  function removerPersonagem(id) {
    setPersonagens(personagens.filter(p => p.id !== id));
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-red-600 mb-4">Personagens</h2>
      
      <form onSubmit={adicionarPersonagem} className="mb-6 space-x-2">
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" className="p-2 text-black" required />
        <input type="number" value={vida} onChange={e => setVida(Number(e.target.value))} placeholder="Vida" className="p-2 text-black w-20" />
        <input type="number" value={marcas} onChange={e => setMarcas(Number(e.target.value))} placeholder="Marcas" className="p-2 text-black w-20" />
        <button type="submit" className="bg-red-600 px-4 py-2 rounded">Adicionar</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personagens.map(p => (
          <div key={p.id} className="bg-zinc-900 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">{p.nome}</h3>
            <div className="my-2">
              <label>Vida:</label>
              <input type="number" value={p.vida} onChange={e => editarPersonagem(p.id, "vida", Number(e.target.value))} className="p-1 text-black w-20 ml-2" />
              <div className="w-full bg-zinc-800 h-2 mt-1 rounded">
                <div className="bg-red-600 h-2 rounded" style={{ width: p.vida + "%" }}></div>
              </div>
            </div>
            <div className="my-2">
              <label>Marcas:</label>
              <input type="number" value={p.marcas} onChange={e => editarPersonagem(p.id, "marcas", Number(e.target.value))} className="p-1 text-black w-20 ml-2" />
              <div className="flex space-x-1 mt-1">
                {Array.from({ length: p.marcas }).map((_, i) => (
                  <span key={i} className="w-4 h-4 bg-red-500 animate-pulse rounded-full"></span>
                ))}
              </div>
            </div>
            <button onClick={() => removerPersonagem(p.id)} className="bg-gray-700 hover:bg-red-700 px-3 py-1 mt-2 rounded">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}
