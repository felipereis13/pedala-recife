import React from "react"
import "./Legend.css"

const Legend = () => {
  return (
    <div className="legend">
      <div className="legend-title">Legenda</div>
      <div className="legend-item">
        <i style={{ background: "#007BFF" }}></i>
        <span>Malha Cicloviária</span>
      </div>
      <div className="legend-item">
        <i style={{ background: "#ff7800" }}></i>
        <span>Rotas Operacionais</span>
      </div>
      <div className="legend-item">
        <img src="/assets/bike-icon.png" alt="ícone de estação" />
        <span>Estações de Bike</span>
      </div>
    </div>
  )
}

export default Legend
