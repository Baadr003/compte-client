// src/App.js
import React, { useState } from "react";
import CompteList from "./components/CompteList";
import CompteForm from "./components/CompteForm";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [activeSection, setActiveSection] = useState("list");

  const handleAdd = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestion des Comptes Bancaires</h1>
        <nav className="app-nav">
          <button
            className={`nav-button ${activeSection === "list" ? "active" : ""}`}
            onClick={() => setActiveSection("list")}
          >
            Liste des Comptes
          </button>
          <button
            className={`nav-button ${activeSection === "create" ? "active" : ""}`}
            onClick={() => setActiveSection("create")}
          >
            Créer un Compte
          </button>
        </nav>
      </header>
      <main className="app-main">
        {activeSection === "list" && (
          <div className="section">
            <CompteList refresh={refresh} />
          </div>
        )}
        {activeSection === "create" && (
          <div className="section">
            <CompteForm onAdd={handleAdd} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;