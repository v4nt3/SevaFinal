"use client"
import { productos } from "../../data"
import "@google/model-viewer"
import "./element.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"

function ElementStore({ setCarrito, favoritos, setFavoritos, setSelectedProducto }) {
  const agregarAlCarrito = (producto) => {
    try {
      // Verificar que el producto sea válido
      if (!producto || !producto.id || !producto.nombre || typeof producto.precio !== "number") {
        console.error("Producto inválido:", producto)
        toast.error("Error al agregar producto al carrito")
        return
      }

      setCarrito((prev) => {
        // Asegurar que prev sea un array válido
        const carritoActual = Array.isArray(prev) ? prev : []

        const existe = carritoActual.find((item) => item && item.id === producto.id)

        if (existe) {
          // Si existe, aumentar cantidad
          const nuevoCarrito = carritoActual.map((item) =>
            item && item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
          )
          toast.success(`${producto.nombre} agregado al carrito`)
          return nuevoCarrito
        } else {
          // Si no existe, agregar nuevo
          const nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }]
          toast.success(`${producto.nombre} agregado al carrito`)
          return nuevoCarrito
        }
      })
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
      toast.error("Error al agregar producto al carrito")
    }
  }

  const agregarAFavoritos = (producto) => {
    try {
      if (!favoritos || !setFavoritos) {
        toast.info("Funcionalidad de favoritos no disponible")
        return
      }

      const favoritosActuales = Array.isArray(favoritos) ? favoritos : []
      const existe = favoritosActuales.find((item) => item && item.id === producto.id)

      if (existe) {
        toast.info("El producto ya está en favoritos")
      } else {
        toast.success("Producto agregado a favoritos")
        setFavoritos((prev) => {
          const prevArray = Array.isArray(prev) ? prev : []
          return [...prevArray, { ...producto, cantidad: 1 }]
        })
      }
    } catch (error) {
      console.error("Error al agregar a favoritos:", error)
      toast.error("Error al agregar a favoritos")
    }
  }

  return (
    <div className="App">
      <h1>Tienda 3D</h1>
      <div className="galeria">
        {productos.map((item) => (
          <div key={item.id} className="producto">
            <Link to={`/detalle/${item.id}`}>
              <model-viewer
                src={item.modelo}
                alt={item.nombre}
                auto-rotate
                camera-controls
                ar
                style={{ width: "250px", height: "250px" }}
              />
              <h2>{item.nombre}</h2>
              <p>${item.precio}</p>
            </Link>
            <div className="producto-buttons">
              <button onClick={() => agregarAlCarrito(item)}>Agregar</button>
              <button onClick={() => agregarAFavoritos(item)}>Agregar a Favoritos</button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default ElementStore
