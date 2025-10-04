import React, { useRef, useEffect } from "react"
import "./Camera.css"

const Camera = ({ onClose }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera: ", err)
        alert("Não foi possível acessar a câmera. Verifique as permissões.")
        onClose()
      }
    }

    startCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [onClose])

  return (
    <div className="camera-view">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-video"
      ></video>
      <button onClick={onClose} className="camera-close-button">
        Fechar Câmera
      </button>
    </div>
  )
}

export default Camera
