"use client"

import "./Carrito.css"
import { useNavigate } from "react-router-dom"

function Carrito({ carrito, setCarrito, onClose }) {
  const navigate = useNavigate()
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const comprar = () => {
    navigate("/resumen", { state: { items: carrito } })
    setCarrito([])
    onClose()
  }

  return (
    <div className="overlay">
      <div className="carrito-contenedor">
        <button className="cerrar" onClick={onClose}>
          ✖
        </button>

        <h2>Tu carrito</h2>
        {carrito.length === 0 ? (
          <p>Carrito vacío</p>
        ) : (
          <>
            <ul>
              {carrito.map((item) => (
                <li key={item.id}>
                  {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                </li>
              ))}
            </ul>
            <h3>Total: ${total}</h3>
            <button className="comprar" onClick={comprar}>
              Comprar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Carrito
