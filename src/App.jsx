import React, { useEffect, useState } from "react";

/**
 * Dinastia Escarlate — App.jsx (Funcionalidade: Mestre/Jogador, editar/remover, jogador cria 1 personagem)
 * Salva em localStorage:
 *  - KEY_CHARS: array de personagens
 *  - KEY_RITUAIS: array de rituais
 *  - KEY_ITENS: array de itens
 *  - KEY_PLAYER_ID: id do jogador neste navegador
 */

const KEY_CHARS = "dinastia_chars_v3";
const KEY_RITUAIS = "dinastia_rituais_v1";
const KEY_ITENS = "dinastia_itens_v1";
const KEY_PLAYER_ID = "dinastia_player_id_v1";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function defaultChar(overrides = {}) {
  return {
    id: uid(),
    nome: overrides.nome ?? "Novo Herói",
    dinastia: overrides.dinastia ?? "Dinastia Desconhecida",
    vidaMax: overrides.vidaMax ?? 10,
    vida: overrides.vida ?? overrides.vidaMax ?? 10,
    marcas: overrides.marcas ?? 0,
    corrupcao: overrides.corrupcao ?? 0, // 0-100
    ownerId: overrides.ownerId ?? null, // player owner (browser)
    notas: overrides.notas ?? "",
  };
}

function defaultRitual(overrides = {}) {
  return {
    id: uid(),
    nome: overrides.nome ?? "Ritual Ancestral",
    risco: overrides.risco ?? "Médio",
    efeito: overrides.efeito ?? "Efeito misterioso",
  };
}

function defaultItem(overrides = {}) {
  return {
    id: uid(),
    nome: overrides.nome ?? "Item Raro",
    efeito: overrides.efeito ?? "Efeito útil",
  };
}

export default function App() {
  // Navegação
  const [aba, setAba] = useState("mestre"); // mestre | jogador | rituais | itens

  // Dados
  const [chars, setChars] = useState([]);
  const [rituais, setRituais] = useState([]);
  const [itens, setItens] = useState([]);

  // Edits
  const [editingCharId, setEditingCharId] = useState(null);
  const [editingRitualId, setEditingRitualId] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  // Jogador (id vinculado ao navegador)
  const [playerId, setPlayerId] = useState(null);

  // Carregar do localStorage na inicialização
  useEffect(() => {
    const sChars = localStorage.getItem(KEY_CHARS);
    const sRituais = localStorage.getItem(KEY_RITUAIS);
    const sItens = localStorage.getItem(KEY_ITENS);
    const sPlayer = localStorage.getItem(KEY_PLAYER_ID);

    if (sChars) {
      try {
        setChars(JSON.parse(sChars));
      } catch (e) {
        console.warn("Erro parse chars", e);
      }
    } else {
      // seed vazio com um exemplo sutil (opcional)
      setChars([]);
    }

    if (sRituais) {
      try {
        setRituais(JSON.parse(sRituais));
      } catch (e) {
        setRituais([]);
      }
    } else {
      setRituais([]);
    }

    if (sItens) {
      try {
        setItens(JSON.parse(sItens));
      } catch (e) {
        setItens([]);
      }
    } else {
      setItens([]);
    }

    if (sPlayer) {
      setPlayerId(sPlayer);
    } else {
      // ainda n tem id do jogador
      setPlayerId(null);
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(KEY_CHARS, JSON.stringify(chars));
  }, [chars]);

  useEffect(() => {
    localStorage.setItem(KEY_RITUAIS, JSON.stringify(rituais));
  }, [rituais]);

  useEffect(() => {
    localStorage.setItem(KEY_ITENS, JSON.stringify(itens));
  }, [itens]);

  useEffect(() => {
    if (playerId) localStorage.setItem(KEY_PLAYER_ID, playerId);
  }, [playerId]);

  // Helpers CRUD Personagem
  function criarPersonagemMestre() {
    const novo = defaultChar();
    setChars((s) => [...s, novo]);
    setEditingCharId(novo.id);
    setAba("mestre");
  }

  function criarPersonagemJogador() {
    // jogador só pode criar 1 personagem (vinculado ao playerId do navegador)
    const pid = playerId ?? uid();
    setPlayerId(pid);
    // cheque se já tem personagem com ownerId == pid
    const exist = chars.find((c) => c.ownerId === pid);
    if (exist) {
      alert("Você já tem um personagem neste dispositivo. Você pode editá-lo na aba Jogador.");
      return;
    }
    const novo = defaultChar({ nome: "Meu Herói", ownerId: pid });
    setChars((s) => [...s, novo]);
    setEditingCharId(novo.id);
    setAba("jogador");
  }

  function salvarPersonagem(editId, patch) {
    setChars((s) => s.map((c) => (c.id === editId ? { ...c, ...patch } : c)));
    setEditingCharId(null);
  }

  function removerPersonagem(id) {
    if (!confirm("Remover esse personagem? Esta ação é irreversível nesta versão.")) return;
    setChars((s) => s.filter((c) => c.id !== id));
    if (editingCharId === id) setEditingCharId(null);
  }

  // Helpers Rituais
  function criarRitual() {
    const novo = defaultRitual();
    setRituais((s) => [...s, novo]);
    setEditingRitualId(novo.id);
    setAba("rituais");
  }
  function salvarRitual(id, patch) {
    setRituais((s) => s.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setEditingRitualId(null);
  }
  function removerRitual(id) {
    if (!confirm("Remover esse ritual?")) return;
    setRituais((s) => s.filter((r) => r.id !== id));
  }

  // Helpers Itens
  function criarItem() {
    const novo = defaultItem();
    setItens((s) => [...s, novo]);
    setEditingItemId(novo.id);
    setAba("itens");
  }
  function salvarItem(id, patch) {
    setItens((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    setEditingItemId(null);
  }
  function removerItem(id) {
    if (!confirm("Remover esse item?")) return;
    setItens((s) => s.filter((it) => it.id !== id));
  }

  // UI helpers
  function vidaBarStyle(c) {
    const percentual = Math.max(0, Math.min(100, (c.vida / c.vidaMax) * 100));
    const color = percentual > 60 ? "#4caf50" : percentual > 30 ? "#ff9800" : "#f44336";
    return { width: `${percentual}%`, background: color };
  }

  function corrupcaoBarStyle(value) {
    const v = Math.max(0, Math.min(100, value));
    const color = v < 30 ? "#4caf50" : v < 60 ? "#ff9800" : "#f44336";
    return { width: `${v}%`, background: color };
  }

  // Permissões simples
  const isMasterView = aba === "mestre";
  const isPlayerView = aba === "jogador";

  // Qual personagem é do jogador neste navegador (se existir)
  const myCharacter = playerId ? chars.find((c) => c.ownerId === playerId) ?? null : null;

  // Estatísticas rápidas
  const stats = {
    totalPersonagens: chars.length,
    totalMarcas: chars.reduce((acc, c) => acc + (c.marcas || 0), 0),
    mediaCorrupcao: (chars.reduce((acc, c) => acc + (c.corrupcao || 0), 0) / Math.max(1, chars.length)).toFixed(1),
  };

  // Renderers de forms inline
  function CharEditForm({ char }) {
    const [draft, setDraft] = useState({ ...char });

    return (
      <div style={styles.cardEdit}>
        <label style={styles.label}>Nome</label>
        <input style={styles.input} value={draft.nome} onChange={(e) => setDraft({ ...draft, nome: e.target.value })} />

        <label style={styles.label}>Dinastia</label>
        <input style={styles.input} value={draft.dinastia} onChange={(e) => setDraft({ ...draft, dinastia: e.target.value })} />

        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Vida Máx</label>
            <input type="number" style={styles.input} value={draft.vidaMax} onChange={(e) => {
              const vm = Math.max(1, parseInt(e.target.value || 1, 10));
              setDraft({ ...draft, vidaMax: vm, vida: Math.min(draft.vida, vm) });
            }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Vida Atual</label>
            <input type="number" style={styles.input} value={draft.vida} onChange={(e) => setDraft({ ...draft, vida: Math.max(0, Math.min(draft.vidaMax, parseInt(e.target.value || 0, 10))) })} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Marcas</label>
            <input type="number" style={styles.input} value={draft.marcas} onChange={(e) => setDraft({ ...draft, marcas: Math.max(0, parseInt(e.target.value || 0, 10)) })} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Corrupção (%)</label>
            <input type="number" style={styles.input} value={draft.corrupcao} onChange={(e) => setDraft({ ...draft, corrupcao: Math.max(0, Math.min(100, parseInt(e.target.value || 0, 10))) })} />
          </div>
        </div>

        <label style={styles.label}>Notas</label>
        <textarea style={styles.textarea} value={draft.notas} onChange={(e) => setDraft({ ...draft, notas: e.target.value })} />

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button style={styles.btnPrimary} onClick={() => salvarPersonagem(char.id, draft)}>Salvar</button>
          <button style={styles.btnGhost} onClick={() => setEditingCharId(null)}>Cancelar</button>
        </div>
      </div>
    );
  }

  function RitualEditForm({ ritual }) {
    const [draft, setDraft] = useState({ ...ritual });
    return (
      <div style={styles.cardEdit}>
        <label style={styles.label}>Nome</label>
        <input style={styles.input} value={draft.nome} onChange={(e) => setDraft({ ...draft, nome: e.target.value })} />
        <label style={styles.label}>Risco</label>
        <input style={styles.input} value={draft.risco} onChange={(e) => setDraft({ ...draft, risco: e.target.value })} />
        <label style={styles.label}>Efeito</label>
        <textarea style={styles.textarea} value={draft.efeito} onChange={(e) => setDraft({ ...draft, efeito: e.target.value })} />
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button style={styles.btnPrimary} onClick={() => salvarRitual(ritual.id, draft)}>Salvar</button>
          <button style={styles.btnGhost} onClick={() => setEditingRitualId(null)}>Cancelar</button>
        </div>
      </div>
    );
  }

  function ItemEditForm({ item }) {
    const [draft, setDraft] = useState({ ...item });
    return (
      <div style={styles.cardEdit}>
        <label style={styles.label}>Nome</label>
        <input style={styles.input} value={draft.nome} onChange={(e) => setDraft({ ...draft, nome: e.target.value })} />
        <label style={styles.label}>Efeito</label>
        <textarea style={styles.textarea} value={draft.efeito} onChange={(e) => setDraft({ ...draft, efeito: e.target.value })} />
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button style={styles.btnPrimary} onClick={() => salvarItem(item.id, draft)}>Salvar</button>
          <button style={styles.btnGhost} onClick={() => setEditingItemId(null)}>Cancelar</button>
        </div>
      </div>
    );
  }

  // Render Card personagem (exibição)
  function CharCard({ c, index }) {
    const canEdit = isMasterView || (playerId && c.ownerId === playerId);
    const isEditing = editingCharId === c.id;

    return (
      <div style={styles.charCard}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>{c.nome}</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{c.dinastia}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12 }}>HP {c.vida}/{c.vidaMax}</div>
            <div style={{ marginTop: 6, height: 10, background: "#222", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", ...vidaBarStyle(c) }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 12 }}>Marcas: {c.marcas}</div>
            <div style={{ marginTop: 6, fontSize: 12 }}>Corrupção: {c.corrupcao}%</div>
            <div style={{ marginTop: 6, height: 8, background: "#222", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", ...corrupcaoBarStyle(c.corrupcao) }} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          {isEditing ? (
            <CharEditForm char={c} />
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {canEdit && <button style={styles.small} onClick={() => setEditingCharId(c.id)}>Editar</button>}
              {canEdit && <button style={styles.smallDanger} onClick={() => removerPersonagem(c.id)}>Remover</button>}

              {/* Ações rápidas (permitidas para mestre ou dono) */}
              {canEdit && <button style={styles.small} onClick={() => salvarPersonagem(c.id, { vida: Math.max(0, Math.min(c.vidaMax, c.vida - 1)) })}>-1 HP</button>}
              {canEdit && <button style={styles.small} onClick={() => salvarPersonagem(c.id, { vida: Math.max(0, Math.min(c.vidaMax, c.vida + 1)) })}>+1 HP</button>}
              {canEdit && <button style={styles.small} onClick={() => salvarPersonagem(c.id, { marcas: Math.max(0, c.marcas - 1) })}>- Marca</button>}
              {canEdit && <button style={styles.small} onClick={() => salvarPersonagem(c.id, { marcas: c.marcas + 1 })}>+ Marca</button>}
              {isMasterView && <button style={styles.small} onClick={() => salvarPersonagem(c.id, { corrupcao: Math.max(0, Math.min(100, c.corrupcao + 5)) })}>+ Corrupção</button>}
              {isMasterView && <button style={styles.small} onClick={() => salvarPersonagem(c.id, { corrupcao: Math.max(0, Math.min(100, c.corrupcao - 5)) })}>- Corrupção</button>}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render ritual/item card
  function RitualCard({ r }) {
    const isEditing = editingRitualId === r.id;
    return (
      <div style={styles.ritualCard}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 800 }}>{r.nome}</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>Risco: {r.risco}</div>
            <div style={{ marginTop: 6 }}>{r.efeito}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {isEditing ? (
              <button style={styles.small} onClick={() => setEditingRitualId(null)}>Cancelar</button>
            ) : (
              <>
                <button style={styles.small} onClick={() => setEditingRitualId(r.id)}>Editar</button>
                <button style={styles.smallDanger} onClick={() => removerRitual(r.id)}>Remover</button>
              </>
            )}
          </div>
        </div>

        {isEditing && <RitualEditForm ritual={r} />}
      </div>
    );
  }

  function ItemCard({ it }) {
    const isEditing = editingItemId === it.id;
    return (
      <div style={styles.itemCard}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 800 }}>{it.nome}</div>
            <div style={{ marginTop: 6 }}>{it.efeito}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {isEditing ? (
              <button style={styles.small} onClick={() => setEditingItemId(null)}>Cancelar</button>
            ) : (
              <>
                <button style={styles.small} onClick={() => setEditingItemId(it.id)}>Editar</button>
                <button style={styles.smallDanger} onClick={() => removerItem(it.id)}>Remover</button>
              </>
            )}
          </div>
        </div>

        {isEditing && <ItemEditForm item={it} />}
      </div>
    );
  }

  // Layout principal
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={styles.logo}>DE</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Dinastia Escarlate</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>Beta — Mestre & Jogador</div>
          </div>
        </div>

        <nav>
          {["mestre", "jogador", "rituais", "itens"].map((t) => (
            <button key={t} onClick={() => setAba(t)} style={{ ...styles.navBtn, ...(aba === t ? styles.navActive : {}) }}>
              {t.toUpperCase()}
            </button>
          ))}
        </nav>
      </header>

      <main style={styles.container}>
        {aba === "mestre" && (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2>📜 Painel do Mestre</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={styles.btnPrimary} onClick={criarPersonagemMestre}>+ Criar Personagem (Mestre)</button>
                <button style={styles.btnGhost} onClick={criarRitual}>+ Ritual</button>
                <button style={styles.btnGhost} onClick={criarItem}>+ Item</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
              {chars.map((c, i) => <CharCard key={c.id} c={c} index={i} />)}
            </div>

            <div style={{ marginTop: 16, padding: 12, background: "#120000", borderRadius: 10, border: "1px solid rgba(255,200,0,0.06)" }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>📊 Estatísticas</div>
              <div>Personagens: {stats.totalPersonagens}</div>
              <div>Total de Marcas: {stats.totalMarcas}</div>
              <div>Corrupção média: {stats.mediaCorrupcao}%</div>
            </div>
          </section>
        )}

        {aba === "jogador" && (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2>🎭 Área do Jogador</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={styles.btnPrimary} onClick={criarPersonagemJogador}>+ Criar Meu Personagem</button>
                <button style={styles.btnGhost} onClick={() => { localStorage.removeItem(KEY_PLAYER_ID); setPlayerId(null); alert("ID de jogador removido deste navegador. Você pode criar outro personagem."); }}>Desvincular</button>
              </div>
            </div>

            <div style={{ marginBottom: 8 }}>
              {myCharacter ? (
                <>
                  <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 8 }}>Seu personagem (vinculado a este navegador):</div>
                  <CharCard c={myCharacter} />
                </>
              ) : (
                <div>
                  <em>Você ainda não tem um personagem criado neste navegador. Use “+ Criar Meu Personagem”.</em>
                </div>
              )}
            </div>

            <hr style={{ border: "none", height: 1, background: "rgba(255,255,255,0.04)", margin: "12px 0" }} />

            <div>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Outros personagens</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                {chars.filter(c => !myCharacter || c.id !== myCharacter.id).map(c => <CharCard key={c.id} c={c} />)}
              </div>
            </div>
          </section>
        )}

        {aba === "rituais" && (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2>🔮 Rituais</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={styles.btnPrimary} onClick={criarRitual}>+ Novo Ritual</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
              {rituais.length === 0 && <em>Nenhum ritual ainda.</em>}
              {rituais.map(r => <RitualCard key={r.id} r={r} />)}
            </div>
          </section>
        )}

        {aba === "itens" && (
          <section>
            <div style={{ dis
