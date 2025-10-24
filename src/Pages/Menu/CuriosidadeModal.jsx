import React from 'react'
import './CuriosidadeModal.css'

function CuriosidadeModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modalGrande"
        style={{
          backgroundImage: "url('/BackgroundSpace.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modalTitleOne">EXOPLANET</h2>
        <p className="modalTexto">Exoplanet detection has gained prominence in astronomy, primarily through the transit method, which identifies dips in brightness when a planet passes in front of its star. Missions such as Kepler, K2, and TESS have collected valuable, publicly available data containing information on confirmed exoplanets, candidates, and false positives. Although much data is still analyzed manually, recent research shows that machine learning can automate exoplanet identification with high accuracy, especially with proper preprocessing. Using these open datasets increases the chance of discovering new exoplanets.</p>
        <button className="fechaModal" onClick={onClose}>Return to mission</button>
        <img src="/satelite.png" className="satelite"/>
      </div>
    </div>
  )
}

export default CuriosidadeModal
