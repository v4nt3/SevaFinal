"use client"
import { productos } from "../../data"
import "@google/model-viewer"
import "./element.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"

function ElementStore({ setCarrito, favoritos, setFavoritos, setSelectedProducto }) {
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id)
      if (existe) {
        return prev.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item))
      } else {
        return [...prev, { ...producto, cantidad: 1 }]
      }
    })
  }

  const agregarAFavoritos = (producto) => {
    const existe = favoritos.find((item) => item.id === producto.id)
    if (existe) {
      toast.info("El producto ya está en favoritos")
    } else {
      toast.info("Producto agregado a favoritos")
      setFavoritos((prev) => [...prev, { ...producto, cantidad: 1 }])
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
              <p>{item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
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
