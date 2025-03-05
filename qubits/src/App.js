import React from 'react';
import Header from "./Header";

const GraphCard = () => (
  <main style={{
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
    background: 'linear-gradient(90deg, #00844A 0%, #00E480 100%)',
    overflow: 'hidden'  
  }}>
    <div style={{
      width: '90%',
      maxWidth: '900px',
      height: '500px',
      background: 'white',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#00844A',
      fontSize: '1.2rem',
      fontWeight: '700',
      overflow: 'hidden'  
    }}>
      Gráfico será mostrado aqui
    </div>
  </main>
);

const Footer = () => (
  <footer style={{
    width: '100%',
    padding: '20px 10px',
    backgroundColor: 'white',
    color: '#00844A',
    textAlign: 'center',
    fontSize: '0.9rem',
    overflow: 'hidden'  
  }}>
    Esta visualização ajuda a ilustrar o mapeamento dos estados quânticos de qubit na computação quântica, fornecendo insights sobre seu comportamento e representação.
  </footer>
);

const App = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    overflow: 'hidden', 
  }}>
    <Header />
    <GraphCard />
    <Footer />
  </div>
);

export default App;
