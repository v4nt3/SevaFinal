import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ username, onLogout, carrito, setMostrarCarrito }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/elementStore">
            <span className="logo-text">TIENDA</span>
          </Link>
        </div>
        <div className="navbar-links">
          <Link 
            to="/elementStore" 
            className={location.pathname === '/elementStore' ? 'active' : ''}
          >
            Tienda
          </Link>

          {/* Este botón muestra el carrito como modal */}
          <button 
            className={`carrito-button ${location.pathname === '/carrito' ? 'active' : ''}`}
            onClick={() => setMostrarCarrito(true)}
          >
            <img src="/carrito.png" alt="Carrito" className="icono-carrito" />
            {carrito.length > 0 && (
              <span className="carrito-contador">{carrito.length}</span>
            )}
          </button>

        </div>

        {username && ( 
          <div className="navbar-user">
            Bienvenid@, {username}
            <button onClick={onLogout} className="logout-button">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
