"use client"

import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "@google/model-viewer"
import Layout from "./components/Layout/Layout"
import ElementStore from "./components/elementStore/element"
import Carrito from "./components/carrito/Carrito"
import Login from "./components/login/login"
import ResumenCompra from "./components/compra/resumenCompra"
import Favorito from "./components/PgFavoritos/favorito"
import DetalleProducto from "./components/DetalleProducto/DetalleProducto"
import Formulario from "./components/FomularioUsuario/Formulario"
import HistorialDeCompra from "./components/HistorialCompra/HistorialCompra"; // Importado correctamente
import DatosEnvioForm from "./components/FomularioUsuario/Formulario"; // Asegúrate de que esta ruta sea correcta
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [carrito, setCarrito] = useState([])
  const [favoritos, setFavoritos] = useState([])

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
    setFavoritos([])
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

            <Route path="elementStore" element={<ElementStore carrito={carrito} setCarrito={setCarrito} favoritos={favoritos} setFavoritos={setFavoritos} setSelectedProducto={DetalleProducto} />} />
            <Route path="carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
            <Route path="detalle/:id" element={<DetalleProducto setCarrito={setCarrito} favoritos={favoritos} setFavoritos={setFavoritos}/>} />
            <Route path="datos-envio" element={<DatosEnvioForm />} />
            <Route path="resumen" element={<ResumenCompra setCarrito={setCarrito} />} />
            <Route path="PgFavoritos" element={<Favorito favoritos={favoritos} setFavoritos={setFavoritos} setCarrito={setCarrito} />} />
            <Route path="historial-de-compra" element={<HistorialDeCompra />} />
            <Route path="formulario" element={<Formulario />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
