import { Link, useLocation } from "react-router-dom"
import "./resumenCompra.css"

function ResumenCompra() {
  const location = useLocation()
  const items = location.state?.items || []
  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  return (
    <div className="resumen-container">
      <h1>¡Gracias por tu compra!</h1>
      <p>Tu pedido ha sido procesado con éxito.</p>

      {items.length > 0 ? (
        <div className="resumen-items">
          <h2>Artículos comprados:</h2>
          <ul className="items-list">
            {items.map((item, index) => (
              <li key={index} className="item-comprado">
                <span className="item-nombre">{item.nombre}</span>
                <div className="item-detalles">
                  <span className="item-cantidad">x{item.cantidad}</span>
                  <span className="item-precio">${item.precio * item.cantidad}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-compra">
            <span>Total pagado:</span>
            <span className="precio-total">${total}</span>
          </div>
        </div>
      ) : (
        <p className="no-items">No hay detalles de la compra disponibles.</p>
      )}

      <Link to="/elementStore">
        <button className="volver-btn">Volver a la tienda</button>
      </Link>
    </div>
  )
}

export default ResumenCompra
