"use client"

import "./carrito.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react" // Importamos useEffect

function Carrito({ carrito, setCarrito, onClose }) {
  const navigate = useNavigate()
  const IVA_PORCENTAJE = 0.12 // Define tu porcentaje de IVA aquí

  // Cargar el carrito desde localStorage al inicio
  useEffect(() => {
    try {
      const carritoGuardado = localStorage.getItem("carritoCompras")
      if (carritoGuardado) {
        setCarrito(JSON.parse(carritoGuardado))
      }
    } catch (error) {
      console.error("Error al cargar el carrito de localStorage:", error)
      setCarrito([])
    }
  }, [setCarrito]) 

  useEffect(() => {
    try {
      localStorage.setItem("carritoCompras", JSON.stringify(carrito))
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error)
    }
  }, [carrito]) 

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const iva = subtotal * IVA_PORCENTAJE
  const totalConIVA = subtotal + iva

  const comprar = () => {
    navigate("/datos-envio", { state: { items: carrito } })
    onClose() 
  }

  const eliminarItem = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id)
    setCarrito(nuevoCarrito)
  }

  const eliminarTodo = () => {
    setCarrito([])
  }

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad - 1 }
      }
      return item
    })
    setCarrito(nuevoCarrito.filter((item) => item.cantidad > 0))
  }

  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad + 1 }
      }
      return item
    })
    setCarrito(nuevoCarrito)
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
                  <button className="eliminar" onClick={() => eliminarItem(item.id)}>
                    Eliminar
                  </button>
                  <button className="disminuir" onClick={() => disminuirCantidad(item.id)}>
                    -
                  </button>
                  <button className="aumentar" onClick={() => aumentarCantidad(item.id)}>
                    +
                  </button>
                </li>
              ))}
            </ul>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>IVA ({IVA_PORCENTAJE * 100}%): ${iva.toFixed(2)}</p>
            <h3>Total: ${totalConIVA.toFixed(2)}</h3>
            <button className="comprar" onClick={comprar}>
              Comprar
            </button>
            <button className="vaciar" onClick={eliminarTodo}>
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Carrito