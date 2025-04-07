import React, { useState } from "react";

function App() {
  const [shirt, setShirt] = useState("");
  const [shirts, setShirts] = useState<string[]>([]);

  const voegToe = () => {
    if (shirt.trim() !== "") {
      setShirts([...shirts, shirt]);
      setShirt("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "2rem", color: "orange" }}>Voetbalshirtjes Tracker</h1>
      
      <input
        type="text"
        value={shirt}
        onChange={(e) => setShirt(e.target.value)}
        placeholder="Voer shirt in..."
        style={{ padding: "8px", width: "200px", marginRight: "10px" }}
      />
      <button
        onClick={voegToe}
        style={{ padding: "8px 16px", background: "green", color: "white", border: "none", cursor: "pointer" }}
      >
        Toevoegen
      </button>

      <ul style={{ marginTop: "30px", listStyle: "none", padding: 0 }}>
        {shirts.map((item, index) => (
          <li key={index} style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
            👕 {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
