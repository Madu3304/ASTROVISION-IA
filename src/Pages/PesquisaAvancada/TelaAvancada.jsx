import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TelaAvancada.css'; // Onde colocaremos o CSS de estilo

// Componente para o Card (mantido simples, ajustado para o layout)
const Card = ({ title, description, isSelected = false, onClick }) => (
  <div 
    className={`card ${isSelected ? 'selected' : ''}`}
    onClick={onClick}
  >
    {/* Conteúdo do Card, como na imagem */}
    <div className="cardzinho">
      <p className="step-title">Step 1 of 2</p>
      <div className="upload-section">
        <span className="uploadzinho">🔍</span>
        <h2 className="cardTitle">{title}</h2>
      </div>
      <p className="Descricaozinha">{description}</p>
    </div>
    
    <div className="upload-area">
      {/* Área do upload (com a borda pontilhada) */}
      <span className="uploadzinhooo">📄</span>
      <p>Upload & analyze</p>
    </div>
  </div>
);

const ReturnButton = () => {
  const navigate = useNavigate()
  return (
    <button className="Buttonzito" onClick={() => navigate("/MenuPrincipal")}>
      Return to mission
    </button>
  )
}

function TelaAvancada() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  // A rota de destino deve ser o próximo passo do seu fluxo
  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
    
    // Supondo que o próximo passo seja a própria TelaAvancada, mas com outra visualização.
    // Se for uma rota diferente, ajuste o caminho:
    // navigate('/proximo-passo'); 
    alert('Upload data clicked! Implementar aqui o próximo passo.');
  };

  return (
    <div className="fundaoSpace">
      <div className="top-ui">
        <img src="/logo2 (1).svg" alt="Logo" className="logo" />
        <ReturnButton />
      </div>
      <img src="../Nave_avançada.png" alt="Rocket" className="navezinho" />
    </div>
  );
}

export default TelaAvancada;