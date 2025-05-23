"use client"

import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./footer"
import Carrito from "../carrito/Carrito"
import "./Layout.css"
import { useState } from "react"

function Layout({ username, onLogout, carrito, setCarrito }) {
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  return (
    <div className="layout">
      <Navbar username={username} onLogout={onLogout} setMostrarCarrito={setMostrarCarrito} carrito={carrito} />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />

      {mostrarCarrito && <Carrito carrito={carrito} setCarrito={setCarrito} onClose={() => setMostrarCarrito(false)} />}
    </div>
  )
}

export default Layout
