import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// substitua pelos seus dados do Supabase
const supabase = createClient(
  "https://qexxecypucuwcgfvkffv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFleHhlY3lwdWN1d2NnZnZrZmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMTgzMjIsImV4cCI6MjA3NDY5NDMyMn0.Lj5eYztxY2ymRMH9GWM8Ny5_HIHhdhjtlGKOkUm-dlA"
);

export default function App() {
  const [aba, setAba] = useState("mestre");
  const [personagens, setPersonagens] = useState([]);
  const [meuPersonagemId, setMeuPersonagemId] = useState(null);

  // Carregar personagens do Supabase
  const carregarPersonagens = async () => {
    const { data, error } = await supabase.from("personagens").select("*");
    if (error) console.error(error);
    else setPersonagens(data);
  };

  useEffect(() => {
    carregarPersonagens();
  }, []);

  // Adicionar personagem
  const adicionarPersonagem = async (nome, criador = false) => {
    const { data, error } = await supabase
      .from("personagens")
      .insert([{ nome, criador }])
      .select();
    if (error) console.error(error);
    else {
      setPersonagens([...personagens, data[0]]);
      if (criador) setMeuPersonagemId(data[0].id);
    }
  };

  // Editar personagem
  const editarPersonagem = async (id, campo, valor) => {
    const { data, error } = await supabase
      .from("personagens")
      .update({ [campo]: valor })
      .eq("id", id)
      .select();
    if (error) console.error(error);
    else {
      setPersonagens(personagens.map((p) => (p.id === id ? data[0] : p)));
    }
  };

  // Remover personagem
  const removerPersonagem = async (id) => {
    const { error } = await supabase.from("personagens").delete().eq("id", id);
    if (error) console.error(error);
    else setPersonagens(personagens.filter((p) => p.id !== id));
  };

  // Card animado do personagem
  const CardPersonagem = ({ p }) => {
    const souMeu = meuPersonagemId === p.id;
    const podeEditar = aba === "mestre" || souMeu;

    const barraAnimada = (valor, cor) => (
      <div style={{ background: "#333", borderRadius: "8px", width: "150px", height: "15px", overflow: "hidden", marginBottom: "5px" }}>
        <div style={{
          width: `${valor}%`,
          height: "100%",
          background: cor,
          transition: "width 0.5s ease-in-out"
        }} />
      </div>
    );

    return (
      <div style={{
        background: "#1a1a1a",
        border: "2px solid #b22222",
        borderRadius: "12px",
        padding: "10px",
        margin: "10px",
        color: "white"
      }}>
        <h3>{p.nome}</h3>
        <p>Vida:</p> {barraAnimada(p.vida, p.vida > 50 ? "green" : p.vida > 20 ? "yellow" : "red")}
        <p>Marcas:</p> {barraAnimada(p.marcas * 10, "purple")}
        <p>Corrupção:</p> {barraAnimada(p.corrupcao, "darkred")}

        {podeEditar && (
          <div>
            <button onClick={() => editarPersonagem(p.id, "vida", p.vida + 10)}>+ Vida</button>
            <button onClick={() => editarPersonagem(p.id, "vida", p.vida - 10)}>- Vida</button>
            <button onClick={() => editarPersonagem(p.id, "marcas", p.marcas + 1)}>+ Marca</button>
            <button onClick={() => editarPersonagem(p.id, "marcas", Math.max(0, p.marcas - 1))}>- Marca</button>
            <button onClick={() => editarPersonagem(p.id, "corrupcao", p.corrupcao + 5)}>+ Corrupção</button>
            <button onClick={() => editarPersonagem(p.id, "corrupcao", Math.max(0, p.corrupcao - 5))}>- Corrupção</button>
          </div>
        )}

        {aba === "mestre" && <button onClick={() => removerPersonagem(p.id)}>Remover</button>}
      </div>
    );
  };

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "white" }}>
      <header style={{ padding: "10px", background: "#b22222", display: "flex", justifyContent: "space-around" }}>
        <button onClick={() => setAba("mestre")}>Mestre</button>
        <button onClick={() => setAba("jogador")}>Jogador</button>
      </header>

      {aba === "mestre" && (
        <div style={{ padding: "20px" }}>
          <h2>Painel do Mestre</h2>
          <button onClick={() => adicionarPersonagem("Novo Personagem")}>Adicionar Personagem</button>
          <div>{personagens.map((p) => <CardPersonagem key={p.id} p={p} />)}</div>
        </div>
      )}

      {aba === "jogador" && (
        <div style={{ padding: "20px" }}>
          <h2>Painel do Jogador</h2>
          {!meuPersonagemId ? (
            <button onClick={() => adicionarPersonagem("Meu Personagem", true)}>Criar meu Personagem</button>
          ) : (
            <CardPersonagem p={personagens.find((p) => p.id === meuPersonagemId)} />
          )}
          <h3>Outros Personagens</h3>
          <div>{personagens.filter((p) => p.id !== meuPersonagemId).map((p) => <CardPersonagem key={p.id} p={p} />)}</div>
        </div>
      )}
    </div>
  );
                                  }
