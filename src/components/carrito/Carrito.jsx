"use client"

import "./Carrito.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Carrito({ carrito, setCarrito, onClose }) {
  const navigate = useNavigate()
  const IVA_PORCENTAJE = 0.12

  // Función para limpiar localStorage si hay datos corruptos
  const limpiarLocalStorageCorrupto = () => {
    try {
      const carritoGuardado = localStorage.getItem("carritoCompras")
      if (carritoGuardado) {
        const parsed = JSON.parse(carritoGuardado)
        // Verificar que sea un array válido
        if (!Array.isArray(parsed)) {
          console.warn("Datos de carrito corruptos en localStorage, limpiando...")
          localStorage.removeItem("carritoCompras")
          return []
        }
        // Verificar que cada item tenga las propiedades necesarias
        const carritoLimpio = parsed.filter(
          (item) =>
            item &&
            typeof item === "object" &&
            item.id !== undefined &&
            item.nombre &&
            typeof item.precio === "number" &&
            typeof item.cantidad === "number" &&
            item.cantidad > 0,
        )
        return carritoLimpio
      }
      return []
    } catch (error) {
      console.error("Error al leer localStorage:", error)
      localStorage.removeItem("carritoCompras")
      return []
    }
  }

  // Cargar el carrito desde localStorage al inicio (solo una vez)
  useEffect(() => {
    const carritoLimpio = limpiarLocalStorageCorrupto()
    if (carritoLimpio.length !== carrito.length || JSON.stringify(carritoLimpio) !== JSON.stringify(carrito)) {
      setCarrito(carritoLimpio)
    }
  }, []) // Solo ejecutar una vez al montar

  // Guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    try {
      if (Array.isArray(carrito)) {
        localStorage.setItem("carritoCompras", JSON.stringify(carrito))
      }
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error)
    }
  }, [carrito])

  const subtotal = carrito.reduce((acc, item) => {
    if (item && typeof item.precio === "number" && typeof item.cantidad === "number") {
      return acc + item.precio * item.cantidad
    }
    return acc
  }, 0)

  const iva = subtotal * IVA_PORCENTAJE
  const totalConIVA = subtotal + iva

  const comprar = () => {
    if (carrito.length > 0) {
      navigate("/datos-envio", { state: { items: carrito } })
      onClose()
    }
  }

  const eliminarItem = (id) => {
    try {
      const nuevoCarrito = carrito.filter((item) => item && item.id !== id)
      setCarrito(nuevoCarrito)
    } catch (error) {
      console.error("Error al eliminar item:", error)
    }
  }

  const eliminarTodo = () => {
    try {
      setCarrito([])
      localStorage.removeItem("carritoCompras")
    } catch (error) {
      console.error("Error al vaciar carrito:", error)
    }
  }

  const disminuirCantidad = (id) => {
    try {
      const nuevoCarrito = carrito
        .map((item) => {
          if (item && item.id === id) {
            const nuevaCantidad = item.cantidad - 1
            return { ...item, cantidad: nuevaCantidad }
          }
          return item
        })
        .filter((item) => item && item.cantidad > 0)

      setCarrito(nuevoCarrito)
    } catch (error) {
      console.error("Error al disminuir cantidad:", error)
    }
  }

  const aumentarCantidad = (id) => {
    try {
      const nuevoCarrito = carrito.map((item) => {
        if (item && item.id === id) {
          return { ...item, cantidad: item.cantidad + 1 }
        }
        return item
      })
      setCarrito(nuevoCarrito)
    } catch (error) {
      console.error("Error al aumentar cantidad:", error)
    }
  }

  // Verificar que carrito sea un array válido
  const carritoValido = Array.isArray(carrito) ? carrito : []

  return (
    <div className="overlay">
      <div className="carrito-contenedor">
        <button className="cerrar" onClick={onClose}>
          ✖
        </button>

        <h2>Tu carrito</h2>
        {carritoValido.length === 0 ? (
          <p>Carrito vacío</p>
        ) : (
          <>
            <ul>
              {carritoValido.map((item) => {
                // Verificar que el item sea válido antes de renderizar
                if (
                  !item ||
                  !item.id ||
                  !item.nombre ||
                  typeof item.precio !== "number" ||
                  typeof item.cantidad !== "number"
                ) {
                  return null
                }

                return (
                  <li key={item.id}>
                    <div className="item-info">
                      <span>
                        {item.nombre} x {item.cantidad}
                      </span>
                      <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                    <div className="item-controls">
                      <button className="eliminar" onClick={() => eliminarItem(item.id)}>
                        Eliminar
                      </button>
                      <div className="quantity-controls">
                        <button className="disminuir" onClick={() => disminuirCantidad(item.id)}>
                          -
                        </button>
                        <button className="aumentar" onClick={() => aumentarCantidad(item.id)}>
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>
              IVA ({(IVA_PORCENTAJE * 100).toFixed(0)}%): ${iva.toFixed(2)}
            </p>
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
