import React, { useState, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "./App.css"
import Map from "./components/Map"
import Camera from "./components/Camera"
import Legend from "./components/Legend"

// Ícone para a localização do usuário
const userLocationIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
})

function App() {
  const [isCameraOpen, setCameraOpen] = useState(false)
  const mapInstance = useRef(null)
  const userMarker = useRef(null)

  const findMyLocation = () => {
    if (mapInstance.current) {
      mapInstance.current
        .locate({ setView: true, maxZoom: 16, watch: false })
        .on("locationfound", (e) => {
          const latlng = e.latlng

          if (!userMarker.current) {
            userMarker.current = L.marker(latlng, {
              icon: userLocationIcon,
            }).addTo(mapInstance.current)
          }
          userMarker.current
            .setLatLng(latlng)
            .bindPopup("Você está aqui!")
            .openPopup()

          mapInstance.current.flyTo(latlng, 16)
        })
        .on("locationerror", (err) => {
          alert(err.message)
        })
    }
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Pedala Recife</h1>
      </header>
      <main>
        <Map
          onMapReady={(map) => {
            mapInstance.current = map
          }}
        />
        <Legend />

        <div className="controls">
          <button onClick={findMyLocation} className="control-button">
            Onde estou?
          </button>
          <button
            onClick={() => setCameraOpen(true)}
            className="control-button"
          >
            Abrir Câmera
          </button>
        </div>

        {isCameraOpen && <Camera onClose={() => setCameraOpen(false)} />}
      </main>
    </div>
  )
}

export default App
