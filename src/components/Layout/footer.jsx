import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">TIENDA 3D</h3>
          <p className="footer-description">
            Explora nuestra colección de modelos 3D de alta calidad para tus proyectos creativos.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Enlaces</h4>
          <ul className="footer-links">
            <li>
              <Link to="../elementStore/">Tienda</Link>
            </li>
            <li>
              <Link to="../HistorialCompra/HistorialCompra">Historial de Compras</Link>
            </li>
            <li>
              <Link to="/favoritos">Favoritos</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contacto</h4>
          <address className="footer-contact">
            <p>Email: tienda3d@hotmail.com</p>
            <p>Teléfono: +57 300 123 4567</p>
            <p>Dirección: Calle Principal #123, Cali</p>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-separator"></div>
        <p className="copyright">&copy; {currentYear} Tienda 3D. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
