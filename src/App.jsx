import React, { useState, useEffect } from "react";

export default function App() {
  const [aba, setAba] = useState("mestre"); // mestre ou jogador
  const [personagens, setPersonagens] = useState([]);
  const [rituais, setRituais] = useState([]);
  const [itens, setItens] = useState([]);
  const [meuPersonagemId, setMeuPersonagemId] = useState(null);

  // carregar dados
  useEffect(() => {
    const dados = localStorage.getItem("dinastiaEscarlate");
    if (dados) {
      const parsed = JSON.parse(dados);
      setPersonagens(parsed.personagens || []);
      setRituais(parsed.rituais || []);
      setItens(parsed.itens || []);
      setMeuPersonagemId(parsed.meuPersonagemId || null);
    }
  }, []);

  // salvar dados
  useEffect(() => {
    localStorage.setItem(
      "dinastiaEscarlate",
      JSON.stringify({ personagens, rituais, itens, meuPersonagemId })
    );
  }, [personagens, rituais, itens, meuPersonagemId]);

  // adicionar personagem
  const adicionarPersonagem = (nome, criador = false) => {
    const novo = {
      id: Date.now(),
      nome,
      vida: 100,
      marcas: 0,
      corrupcao: 0,
      criador: criador ? true : false,
    };
    setPersonagens([...personagens, novo]);
    if (criador) setMeuPersonagemId(novo.id);
  };

  // editar personagem
  const editarPersonagem = (id, campo, valor) => {
    setPersonagens(
      personagens.map((p) =>
        p.id === id ? { ...p, [campo]: valor } : p
      )
    );
  };

  // remover personagem
  const removerPersonagem = (id) => {
    setPersonagens(personagens.filter((p) => p.id !== id));
    if (id === meuPersonagemId) setMeuPersonagemId(null);
  };

  // componente card de personagem
  const CardPersonagem = ({ p }) => {
    const souMeu = meuPersonagemId === p.id;
    const podeEditar = aba === "mestre" || souMeu;

    return (
      <div
        style={{
          background: "#1a1a1a",
          border: "2px solid #b22222",
          borderRadius: "12px",
          padding: "10px",
          margin: "10px",
          color: "white",
        }}
      >
        <h3>{p.nome}</h3>
        <p>Vida: {p.vida}</p>
        <p>Marcas: {p.marcas}</p>
        <p>Corrupção: {p.corrupcao}</p>

        {podeEditar && (
          <div>
            <button onClick={() => editarPersonagem(p.id, "vida", p.vida + 10)}>
              + Vida
            </button>
            <button onClick={() => editarPersonagem(p.id, "vida", p.vida - 10)}>
              - Vida
            </button>
            <button
              onClick={() => editarPersonagem(p.id, "marcas", p.marcas + 1)}
            >
              + Marca
            </button>
            <button
              onClick={() =>
                editarPersonagem(p.id, "marcas", Math.max(0, p.marcas - 1))
              }
            >
              - Marca
            </button>
            <button
              onClick={() =>
                editarPersonagem(p.id, "corrupcao", p.corrupcao + 5)
              }
            >
              + Corrupção
            </button>
            <button
              onClick={() =>
                editarPersonagem(
                  p.id,
                  "corrupcao",
                  Math.max(0, p.corrupcao - 5)
                )
              }
            >
              - Corrupção
            </button>
          </div>
        )}

        {aba === "mestre" && (
          <button onClick={() => removerPersonagem(p.id)}>Remover</button>
        )}
      </div>
    );
  };

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "white" }}>
      <header
        style={{
          padding: "10px",
          background: "#b22222",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button onClick={() => setAba("mestre")}>Mestre</button>
        <button onClick={() => setAba("jogador")}>Jogador</button>
      </header>

      {aba === "mestre" && (
        <div style={{ padding: "20px" }}>
          <h2>Painel do Mestre</h2>
          <button onClick={() => adicionarPersonagem("Novo Personagem")}>
            Adicionar Personagem
          </button>
          <div>
            {personagens.map((p) => (
              <CardPersonagem key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}

      {aba === "jogador" && (
        <div style={{ padding: "20px" }}>
          <h2>Painel do Jogador</h2>
          {!meuPersonagemId ? (
            <button onClick={() => adicionarPersonagem("Meu Personagem", true)}>
              Criar meu Personagem
            </button>
          ) : (
            <CardPersonagem
              p={personagens.find((p) => p.id === meuPersonagemId)}
            />
          )}
          <h3>Outros Personagens</h3>
          <div>
            {personagens
              .filter((p) => p.id !== meuPersonagemId)
              .map((p) => (
                <CardPersonagem key={p.id} p={p} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
    }
