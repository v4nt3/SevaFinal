import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Carrito from '../carrito/Carrito';
import './Layout.css';
import { useState } from 'react';

function Layout({ username, onLogout, carrito, setCarrito }) {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  return (
    <div className="layout">
    <Navbar 
      username={username} 
      onLogout={onLogout}
      setMostrarCarrito={setMostrarCarrito}
      carrito={carrito} // <- ESTA LÍNEA ES LA QUE FALTABA
    />


      <main className="main-content">
        <Outlet />
      </main>
      {mostrarCarrito && (
        <Carrito 
          carrito={carrito} 
          setCarrito={setCarrito}
          onClose={() => setMostrarCarrito(false)}
        />
      )}
    </div>
  );
}

export default Layout;
