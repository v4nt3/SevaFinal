"use client"

import { useState, useEffect } from "react"
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
import HistorialDeCompra from "./components/HistorialCompra/HistorialCompra"
import DatosEnvioForm from "./components/FomularioUsuario/Formulario"
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [carrito, setCarrito] = useState([])
  const [favoritos, setFavoritos] = useState([])

  // Función para validar y limpiar datos del localStorage
  const validarYLimpiarDatos = (key, validatorFn) => {
    try {
      const data = localStorage.getItem(key)
      if (data) {
        const parsed = JSON.parse(data)
        if (Array.isArray(parsed)) {
          const datosValidos = parsed.filter(validatorFn)
          return datosValidos
        }
      }
      return []
    } catch (error) {
      console.error(`Error al leer ${key} desde localStorage:`, error)
      localStorage.removeItem(key)
      return []
    }
  }

  // Validador para items del carrito
  const validarItemCarrito = (item) => {
    return (
      item &&
      typeof item === "object" &&
      item.id !== undefined &&
      item.nombre &&
      typeof item.precio === "number" &&
      typeof item.cantidad === "number" &&
      item.cantidad > 0
    )
  }

  // Validador para items de favoritos
  const validarItemFavorito = (item) => {
    return item && typeof item === "object" && item.id !== undefined && item.nombre && typeof item.precio === "number"
  }

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        setUser(savedUser)
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error("Error al cargar usuario desde localStorage:", error)
    }
  }, [])

  // Cargar carrito y favoritos desde localStorage al iniciar (solo si está logueado)
  useEffect(() => {
    if (isLoggedIn) {
      // Cargar carrito
      const carritoValido = validarYLimpiarDatos("carritoCompras", validarItemCarrito)
      setCarrito(carritoValido)

      // Cargar favoritos
      const favoritosValidos = validarYLimpiarDatos("favoritos", validarItemFavorito)
      setFavoritos(favoritosValidos)
    }
  }, [isLoggedIn])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isLoggedIn && Array.isArray(carrito)) {
      try {
        localStorage.setItem("carritoCompras", JSON.stringify(carrito))
      } catch (error) {
        console.error("Error al guardar carrito en localStorage:", error)
      }
    }
  }, [carrito, isLoggedIn])

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (isLoggedIn && Array.isArray(favoritos)) {
      try {
        localStorage.setItem("favoritos", JSON.stringify(favoritos))
      } catch (error) {
        console.error("Error al guardar favoritos en localStorage:", error)
      }
    }
  }, [favoritos, isLoggedIn])

  const handleLogin = (username) => {
    try {
      localStorage.setItem("user", username)
      setUser(username)
      setIsLoggedIn(true)
    } catch (error) {
      console.error("Error al guardar usuario:", error)
    }
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem("user")
      localStorage.removeItem("carritoCompras")
      localStorage.removeItem("favoritos")
      setUser(null)
      setIsLoggedIn(false)
      setCarrito([])
      setFavoritos([])
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route
            path="/"
            element={<Layout username={user} onLogout={handleLogout} carrito={carrito} setCarrito={setCarrito} />}
          >
            <Route index element={<Navigate to="/elementStore" replace />} />

            <Route
              path="elementStore"
              element={
                <ElementStore
                  carrito={carrito}
                  setCarrito={setCarrito}
                  favoritos={favoritos}
                  setFavoritos={setFavoritos}
                  setSelectedProducto={DetalleProducto}
                />
              }
            />
            <Route path="carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
            <Route
              path="detalle/:id"
              element={<DetalleProducto setCarrito={setCarrito} favoritos={favoritos} setFavoritos={setFavoritos} />}
            />
            <Route path="datos-envio" element={<DatosEnvioForm />} />
            <Route path="resumen" element={<ResumenCompra setCarrito={setCarrito} />} />
            <Route
              path="PgFavoritos"
              element={<Favorito favoritos={favoritos} setFavoritos={setFavoritos} setCarrito={setCarrito} />}
            />
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
