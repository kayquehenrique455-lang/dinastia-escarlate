            import React, { useState, useEffect } from "react";

function App() {
  const [page, setPage] = useState("inicio");
  const [characters, setCharacters] = useState([]);

  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("characters");
    if (saved) setCharacters(JSON.parse(saved));
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  function addCharacter() {
    const name = prompt("Nome do personagem:");
    if (name) {
      setCharacters([...characters, { name, life: 10, marks: 0 }]);
    }
  }

  function updateLife(index, delta) {
    const newChars = [...characters];
    newChars[index].life = Math.max(0, newChars[index].life + delta);
    setCharacters(newChars);
  }

  function updateMarks(index, delta) {
    const newChars = [...characters];
    newChars[index].marks = Math.max(0, newChars[index].marks + delta);
    setCharacters(newChars);
  }

  // Barra de vida visual
  function renderLifeBar(life) {
    const width = Math.min(100, (life / 10) * 100);
    const color = width > 60 ? "#4caf50" : width > 30 ? "#ff9800" : "#f44336";
    return (
      <div style={{ background: "#444", width: "100%", borderRadius: "4px" }}>
        <div
          style={{
            width: `${width}%`,
            background: color,
            height: "12px",
            borderRadius: "4px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    );
  }

  // Marcas visuais
  function renderMarks(marks) {
    const circles = [];
    for (let i = 0; i < 5; i++) {
      circles.push(
        <span
          key={i}
          style={{
            display: "inline-block",
            width: "12px",
            height: "12px",
            marginRight: "4px",
            borderRadius: "50%",
            background: i < marks ? "#a00" : "#555",
            transition: "background 0.3s ease",
          }}
        />
      );
    }
    return <div>{circles}</div>;
  }

  // Card do personagem
  function renderCharacterCard(c, i, isMestre = false) {
    return (
      <div
        key={i}
        style={{
          border: "1px solid #660000",
          margin: "8px 0",
          padding: "12px",
          borderRadius: "12px",
          background: "#1a0000",
          boxShadow: "0 0 10px rgba(170,0,0,0.5)",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0" }}>{c.name}</h3>
        <p>Vida:</p>
        {renderLifeBar(c.life)}
        <p>Marcas:</p>
        {renderMarks(c.marks)}
        {isMestre && (
          <div style={{ marginTop: "8px" }}>
            <button onClick={() => updateLife(i, 1)}>+ Vida</button>
            <button onClick={() => updateLife(i, -1)}>- Vida</button>
            <button onClick={() => updateMarks(i, 1)}>+ Marca</button>
            <button onClick={() => updateMarks(i, -1)}>- Marca</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui, sans-serif", background: "#111", color: "#eee", minHeight: "100vh" }}>
      {page === "inicio" && (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#f33" }}>🏰 Dinastia Escarlate</h1>
          <button onClick={() => setPage("mestre")}>Entrar como Mestre</button>
          <button onClick={() => setPage("jogador")}>Entrar como Jogador</button>
        </div>
      )}

      {page === "mestre" && (
        <div>
          <h2 style={{ color: "#f33" }}>Painel do Mestre</h2>
          <button onClick={() => setPage("inicio")}>Voltar</button>
          <button onClick={addCharacter}>+ Criar Novo Personagem</button>
          {characters.map((c, i) => renderCharacterCard(c, i, true))}
        </div>
      )}

      {page === "jogador" && (
        <div>
          <h2 style={{ color: "#f33" }}>Ficha do Jogador</h2>
          <button onClick={() => setPage("inicio")}>Voltar</button>
          {characters.length === 0 && <p>Nenhum personagem criado ainda.</p>}
          {characters.map((c, i) => renderCharacterCard(c, i))}
        </div>
      )}
    </div>
  );
}

export default App;
