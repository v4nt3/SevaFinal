"use client"

import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "@google/model-viewer"
import Layout from "./components/Layout/Layout"
import ElementStore from "./components/elementStore/element"
import Carrito from "./components/carrito/Carrito"
import Login from "./components/login/login"
import ResumenCompra from "./components/compra/resumenCompra"
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [carrito, setCarrito] = useState([])

  const handleLogin = (username) => {
    localStorage.setItem("user", username)
    setUser(username)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsLoggedIn(false)
    setCarrito([])
  }

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route
            path="/"
            element={<Layout username={user} onLogout={handleLogout} carrito={carrito} setCarrito={setCarrito} />}
          >
            <Route index element={<Navigate to="/elementStore" replace />} />

            <Route path="elementStore" element={<ElementStore carrito={carrito} setCarrito={setCarrito} />} />
            <Route path="carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />

            <Route path="resumen" element={<ResumenCompra carrito={carrito} />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
