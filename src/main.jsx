
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Personagens from "./pages/Personagens";
import Rituais from "./pages/Rituais";
import Marcas from "./pages/Marcas";
import Config from "./pages/Config";
import "./index.css";

function App() {
  return (
    <div className="flex h-screen bg-black text-white">
      <aside className="w-64 bg-zinc-950 p-4 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-red-600">Dinastia Escarlate</h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="hover:text-red-500">🏠 Dashboard</Link>
          <Link to="/personagens" className="hover:text-red-500">👤 Personagens</Link>
          <Link to="/rituais" className="hover:text-red-500">✨ Rituais</Link>
          <Link to="/marcas" className="hover:text-red-500">🕯️ Marcas</Link>
          <Link to="/config" className="hover:text-red-500">⚙️ Config</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/personagens" element={<Personagens />} />
          <Route path="/rituais" element={<Rituais />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
