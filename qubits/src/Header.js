import React, { useState } from "react";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header
      style={{
        width: "100%",
        padding: "20px 10px",
        backgroundColor: "white",
        color: "#00844A",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="/image.png" alt="Logo" style={{ height: "50px", marginRight: "20px", marginLeft: "20px" }} />
        <div style={{ width: "2px", height: "50px", backgroundColor: "#00844A", marginRight: "20px" }}></div>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#00844A" }}>F(C): Visualização de Qubits</h1>
      </div>

      <nav style={{ display: "flex", gap: "15px",  marginRight: "40px" }} className="menu-desktop">
        <a href="#sobre" style={{ color: "#00844A", textDecoration: "none" }}>Sobre</a>
        <a href="#equipe" style={{ color: "#00844A", textDecoration: "none" }}>Equipe</a>
        <a href="#contato" style={{ color: "#00844A", textDecoration: "none" }}>Contato</a>
      </nav>

      <div
        className="menu-hamburguer"
        onClick={() => setMenuAberto(!menuAberto)}
        style={{
          display: "none", 
          cursor: "pointer",
          fontSize: "2rem",
          zIndex: 1000, 
        }}
      >
        &#9776;
      </div>

      {menuAberto && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "10px",
            backgroundColor: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            zIndex: 1000,
          }}
        >
          <a href="#sobre" style={{ padding: "10px", color: "#00844A", textDecoration: "none" }}>Sobre</a>
          <a href="#equipe" style={{ padding: "10px", color: "#00844A", textDecoration: "none" }}>Equipe</a>
          <a href="#contato" style={{ padding: "10px", color: "#00844A", textDecoration: "none" }}>Contato</a>
        </div>
      )}

      <style>
        {`
          @media (max-width: 768px) {
            .menu-desktop {
              display: none;
            }

            .menu-hamburguer {
              display: block; /* Agora o hambúrguer será exibido em telas pequenas */
            }

            /* Alinha o ícone do hambúrguer no canto superior direito */
            .menu-hamburguer {
              position: absolute;
              top: 20px;
              right: 20px;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
