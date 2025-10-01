
import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-b from-black via-zinc-900 to-black p-6 overflow-y-auto">
        <Dashboard />
      </main>
    </div>
  );
}
