import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import "./TelaNavegacao.css"
import Modal from "./Modal"
import ModalDois from "./ModalDois"
// 🛑 CORREÇÃO PRINCIPAL: REMOVIDA A LINHA ABAIXO QUE CAUSAVA O ERRO "Module not found"
// import Card from './components/Card' 

const PLANETS = [
  { id: 1, name: "Nebula Prime", src: "/planetavermelho.png", relativeX: 100, relativeY: 150 }, 
  { id: 2, name: "Aetheria", src: "/planetaclaro.png", relativeX: 850, relativeY: 800 },
]

const PROXIMITY_RADIUS = 120
const ROCKET_SIZE = 100

const ReturnButton = () => {
  const navigate = useNavigate()
  return (
    <button className="returnButton" onClick={() => navigate("/MenuPrincipal")}>
      Return to mission
    </button>
  )
}

function TelaNavegacao() {
  const navigate = useNavigate();

  const [rocketPos, setRocketPos] = useState({
    x: window.innerWidth / 2 - ROCKET_SIZE / 2,
    y: window.innerHeight / 2 - ROCKET_SIZE / 2,
  })

  // 🟢 Adicionei o estado necessário para o card (assumindo que estava faltando)
  const [selectedCard, setSelectedCard] = useState("Free Explorer"); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [isModalDoisOpen, setIsModalDoisOpen] = useState(false);
  const [planetPositions, setPlanetPositions] = useState([]);

  const calculatePlanetPositions = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newPositions = PLANETS.map(planet => ({
      ...planet,
      x: (planet.relativeX / 1000) * width - ROCKET_SIZE / 2,
      y: (planet.relativeY / 1000) * height - ROCKET_SIZE / 2
    }))
    setPlanetPositions(newPositions);
  }, [])

  const handleMouseMove = useCallback((event) => {
    setRocketPos({
      x: event.clientX - ROCKET_SIZE / 2,
      y: event.clientY - ROCKET_SIZE / 2,
    })
  }, [])

  const checkProximity = useCallback(() => {
    const rocketCenterX = rocketPos.x + ROCKET_SIZE / 2;
    const rocketCenterY = rocketPos.y + ROCKET_SIZE / 2

    return planetPositions.find(planet => {
      const planetCenterX = planet.x + ROCKET_SIZE / 2
      const planetCenterY = planet.y + ROCKET_SIZE / 2
      const distance = Math.hypot(planetCenterX - rocketCenterX, planetCenterY - rocketCenterY)
      return distance < PROXIMITY_RADIUS
    }) || null
  }, [rocketPos, planetPositions])

  const handleSpaceClick = useCallback((event) => {

    const closePlanet = checkProximity();
    if (closePlanet) {
      if (closePlanet.name === "Aetheria") {
        setIsModalDoisOpen(true);
      } else {
        setModalContent({
          title: `Navegando para ${closePlanet.name}`,
          body: `Você chegou ao planeta ${closePlanet.name}! Pronto para a aventura?`,
        })
        setIsModalOpen(true);
      }
    }
  }, [checkProximity]);

  const handleStartExploring = useCallback((cardName, route) => {
    setSelectedCard(cardName); 
    navigate(route); 
  }, [navigate]);

  useEffect(() => {
    calculatePlanetPositions();
    window.addEventListener("resize", calculatePlanetPositions);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("resize", calculatePlanetPositions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [calculatePlanetPositions, handleMouseMove])

  const closeModal = () => setIsModalOpen(false)
  const closeModalDois = () => setIsModalDoisOpen(false)

  const isCardSelected = selectedCard === "Free Explorer";

  return (
    <div className="space-container" onClick={handleSpaceClick}>
      <div className="top-ui">
        <img src="/logo2 (1).svg" alt="Logo" className="logo" />
        <ReturnButton />
      </div>

      {planetPositions.map((planet) => (
        <Planet key={planet.id} src={planet.src} alt={`Planeta ${planet.name}`} x={planet.x} y={planet.y} />
      ))}

      <Rocket x={rocketPos.x} y={rocketPos.y} size={ROCKET_SIZE} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent.title}>
        <p>{modalContent.body}</p>
      </Modal>

      <ModalDois isOpen={isModalDoisOpen} onClose={closeModalDois} />

      {/* 🟢 CORRIGIDO: Removida a div aninhada e simplificado para um card simples */}
      <div 
        className={`cardPergunta ${isCardSelected ? 'card-selected' : ''}`}
        onClick={() => handleStartExploring("Free Explorer", "/rota-free")}
      >
      </div>
    </div>
  )
}

const Planet = ({ src, alt, x, y }) => (
  <img src={src} className="planet" style={{ left: `${x}px`, top: `${y}px` }} alt={alt} />
)

const Rocket = ({ x, y, size }) => (
  <img src="/Nave_basica.png" className="rocket" style={{ left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px` }} alt="Foguete" />
)

export default TelaNavegacao