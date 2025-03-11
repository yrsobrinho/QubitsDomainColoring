import React from "react";

const Header = () => (
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
      <img
        src="/image.png"
        alt="Logo"
        style={{ height: "50px", marginRight: "20px", marginLeft: "20px" }}
      />
      <div
        style={{
          width: "2px",
          height: "50px",
          backgroundColor: "#00844A",
          marginRight: "20px",
        }}
      ></div>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#00844A" }}>
        F(C): Visualização de Qubits
      </h1>
    </div>

    <nav style={{ display: "flex", gap: "15px", marginRight: "40px" }}>
  <a href="#sobre" style={{ color: "#00844A", textDecoration: "none" }}>
    Sobre
  </a>
  <a href="#equipe" style={{ color: "#00844A", textDecoration: "none" }}>
    Equipe
  </a>
  <a href="#contato" style={{ color: "#00844A", textDecoration: "none" }}>
    Contato
  </a>
  <a href="#como-funciona" style={{ color: "#00844A", textDecoration: "none" }}>
    Como Funciona
  </a>
</nav>
  </header>
);

const GraphCard = () => (
  <main
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "stretch",
      padding: "20px",
      width: "100%",
      background: "linear-gradient(90deg, #00844A 0%, #00E480 100%)",
      overflow: "hidden",
      minHeight: "500px",
    }}
  >
    <div
      style={{
        width: "30%",
        maxWidth: "350px",
        background: "white",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        color: "#00844A",
        fontSize: "1rem",
        fontWeight: "600",
        marginRight: "20px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        flexGrow: 1,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "1.2rem",
          marginBottom: "20px",
          color: "#00844A",
        }}
      >
        Insira os ângulos da equação:
      </h3>
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
        <label
          style={{
            fontSize: "1rem",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#00844A",
            marginRight: "10px", // espaço entre o label e o input
          }}
        >
          θ:
        </label>
        <input
          type="number"
          style={{
            width: "80%",
            padding: "12px",
            border: "1px solid #00844A",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
            transition: "all 0.3s ease",
          }}
          placeholder="Digite o valor de θ"
        />
      </div>

      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
        <label
          style={{
            fontSize: "1rem",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#00844A",
            marginRight: "10px", 
          }}
        >
          ϕ:
        </label>
        <input
          type="number"
          style={{
            width: "80%",
            padding: "12px",
            border: "1px solid #00844A",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
            transition: "all 0.3s ease",
          }}
          placeholder="Digite o valor de ϕ"
        />
      </div>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          backgroundColor: "#00844A",
          color: "white",
          fontWeight: "700",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          justifyContent: "space-between"
        }}
        onClick={() => {
          // Função para processar os ângulos inseridos
        }}
      >
        Gerar Gráfico
      </button>
    </div>

    <div
      style={{
        width: "50%",
        maxWidth: "900px",
        background: "white",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#00844A",
        fontSize: "1.2rem",
        fontWeight: "700",
        overflow: "hidden",
        flexGrow: 2,
      }}
    >
      Gráfico será mostrado aqui
    </div>
  </main>
);

const Footer = () => (
  <footer
    style={{
      width: "100%",
      padding: "20px 10px",
      backgroundColor: "white",
      color: "#00844A",
      textAlign: "center",
      fontSize: "0.9rem",
      overflow: "hidden",
    }}
  >
    Esta visualização ajuda a ilustrar o mapeamento dos estados quânticos de qubit na computação quântica, fornecendo insights sobre seu comportamento e representação.
  </footer>
);

const App = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      width: "100%",
      overflow: "hidden",
    }}
  >
    <Header />
    <GraphCard />
    <Footer />
  </div>
);

export default App;
