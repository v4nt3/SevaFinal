"use client"

import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import "./Navbar.css"

function Navbar({ username, onLogout, carrito, setMostrarCarrito }) {
  const location = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
  }

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  const handleCarritoClick = () => {
    setMostrarCarrito(true)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/elementStore" onClick={cerrarMenu}>
            <span className="logo-text">TIENDA</span>
          </Link>
        </div>

        {/* Carrito e icono hamburguesa para móvil */}
        <div className="mobile-controls">
          <button
            className={`carrito-button-mobile ${location.pathname === "/carrito" ? "active" : ""}`}
            onClick={handleCarritoClick}
          >
            <img src="/carrito.png" alt="Carrito" className="icono-carrito" />
            {carrito && carrito.length > 0 && <span className="carrito-contador">{carrito.length}</span>}
          </button>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        <div className={`navbar-links ${menuAbierto ? "active" : ""}`}>
          <Link
            to="/elementStore"
            className={location.pathname === "/elementStore" ? "active" : ""}
            onClick={cerrarMenu}
          >
            Tienda
          </Link>

          <Link to="/PgFavoritos" className={location.pathname === "/PgFavoritos" ? "active" : ""} onClick={cerrarMenu}>
            Favoritos
          </Link>

          <Link
            to="/historial-de-compra"
            className={location.pathname === "/historial-de-compra" ? "active" : ""}
            onClick={cerrarMenu}
          >
            Historial
          </Link>

          {/* Este botón muestra el carrito como modal - Solo en desktop */}
          <button
            className={`carrito-button-desktop ${location.pathname === "/carrito" ? "active" : ""}`}
            onClick={handleCarritoClick}
          >
            <img src="/carrito.png" alt="Carrito" className="icono-carrito" />
            {carrito && carrito.length > 0 && <span className="carrito-contador">{carrito.length}</span>}
          </button>
        </div>

        {username && (
          <div className={`navbar-user ${menuAbierto ? "active" : ""}`}>
            <span className="welcome-text">Bienvenid@, {username}</span>
            <button onClick={onLogout} className="logout-button">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {menuAbierto && <div className="menu-overlay" onClick={cerrarMenu}></div>}
    </nav>
  )
}

export default Navbar
