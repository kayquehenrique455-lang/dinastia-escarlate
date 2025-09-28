import React, { useState, useEffect } from "react";

function App() {
  const [page, setPage] = useState("inicio");
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("characters");
    if (saved) setCharacters(JSON.parse(saved));
  }, []);

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
    newChars[index].life += delta;
    setCharacters(newChars);
  }

  function updateMarks(index, delta) {
    const newChars = [...characters];
    newChars[index].marks = Math.max(0, newChars[index].marks + delta);
    setCharacters(newChars);
  }

  return (
    <div style={{ padding: "1rem" }}>
      {page === "inicio" && (
        <div>
          <h1>🏰 Dinastia Escarlate</h1>
          <button onClick={() => setPage("mestre")}>Entrar como Mestre</button>
          <button onClick={() => setPage("jogador")}>Entrar como Jogador</button>
        </div>
      )}

      {page === "mestre" && (
        <div>
          <h2>Painel do Mestre</h2>
          <button onClick={() => setPage("inicio")}>Voltar</button>
          <button onClick={addCharacter}>+ Criar Novo Personagem</button>
          {characters.map((c, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #444",
                margin: "8px 0",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <h3>{c.name}</h3>
              <p>Vida: {c.life}</p>
              <button onClick={() => updateLife(i, 1)}>+ Vida</button>
              <button onClick={() => updateLife(i, -1)}>- Vida</button>
              <p>Marcas: {c.marks}</p>
              <button onClick={() => updateMarks(i, 1)}>+ Marca</button>
              <button onClick={() => updateMarks(i, -1)}>- Marca</button>
            </div>
          ))}
        </div>
      )}

      {page === "jogador" && (
        <div>
          <h2>Ficha do Jogador</h2>
          <button onClick={() => setPage("inicio")}>Voltar</button>
          {characters.length === 0 && <p>Nenhum personagem criado ainda.</p>}
          {characters.map((c, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #444",
                margin: "8px 0",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <h3>{c.name}</h3>
              <p>Vida: {c.life}</p>
              <p>Marcas: {c.marks}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;