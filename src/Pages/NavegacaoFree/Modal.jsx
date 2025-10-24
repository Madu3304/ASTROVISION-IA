import React from "react"
import "./Modal.css"

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modalGrande"
        style={{
          backgroundImage: "url('/Kepler-1649c.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modalTitleOne">EXOPLANET</h2>
        <h3 className="modalTitle">Planeta Kepler-1649c</h3>
        <p className="modalTexto">A small, rocky world that might be the closest twin to Earth we’ve ever found.</p>
        <p className="modalTexto">Hidden in the constellation Cygnus, about 300 light-years away, this planet orbits a tiny red star and receives almost the same warmth and light that Earth does from our Sun.</p>
        <button className="fechaModal" onClick={onClose}>Return to mission</button>
        <img src="/ASTRONAUTA.png" className="astronauta"/>
      </div>
    </div>
  )
}

export default Modal
