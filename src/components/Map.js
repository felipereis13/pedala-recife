import React, { useEffect, useRef } from "react"
import L from "leaflet"
import "./Map.css"

const bikeIcon = L.icon({
  iconUrl: "./bike-icon.png",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

const Map = ({ onMapReady }) => {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) {
      return
    }

    const initialPosition = [-8.05428, -34.8813]
    const map = L.map(mapContainerRef.current).setView(initialPosition, 14)
    mapInstanceRef.current = map

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    onMapReady(map)

    fetch("/malhacicloviariapermanente_jul2025.geojson")
      .then((res) => res.json())
      .then((data) => {
        if (mapInstanceRef.current) {
          const malhaStyle = { color: "#007BFF", weight: 5, opacity: 0.7 }
          L.geoJSON(data, { style: malhaStyle }).addTo(mapInstanceRef.current)
        }
      })
      .catch((err) =>
        console.error("Falha ao carregar malha cicloviária:", err)
      )

    fetch("/rotasoperacionaisrecife-ago2023.geojson")
      .then((res) => res.json())
      .then((data) => {
        if (mapInstanceRef.current) {
          const rotasOpStyle = { color: "#ff7800", weight: 5, opacity: 0.85 }
          L.geoJSON(data, { style: rotasOpStyle }).addTo(mapInstanceRef.current)
        }
      })
      .catch((err) =>
        console.error("Falha ao carregar rotas operacionais:", err)
      )

    fetch("/estacaoBike.geojson")
      .then((res) => res.json())
      .then((data) => {
        const stations = data.registros
        if (mapInstanceRef.current && Array.isArray(stations)) {
          stations.forEach((station) => {
            const marker = L.marker([station.latitude, station.longitude], {
              icon: bikeIcon,
            })
            marker.bindPopup(
              `<b>Estação:</b> ${station.nome}<br><b>Bairro:</b> ${station.bairro}`
            )
            marker.addTo(mapInstanceRef.current)
          })
        } else {
          console.error("Formato de dados das estações de bike inesperado.")
        }
      })
      .catch((err) => console.error("Falha ao carregar estações:", err))

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [onMapReady])

  return <div ref={mapContainerRef} id="map" className="map-container"></div>
}

export default Map
