import '@google/model-viewer';
import { useParams, useNavigate } from "react-router-dom";
import { productos } from '../../data'; 
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './DtProducto.css';

function DetaProducto({ setFavoritos,setCarrito,favoritos }) {

    const { id } = useParams();
    const navigate = useNavigate();
    const producto = productos.find((item) => item.id === parseInt(id));
    if (!producto) {
        return (
            <div className="detalle-producto-pagina loading-state">
                <p>Cargando producto o no encontrado...</p>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        );
    }

    const agregarAFavoritos = (producto) => {
        const existe = favoritos.find((item) => item.id === producto.id);
        if (existe) {
          toast.info('El producto ya está en favoritos');
        } else {
          toast.info('Producto agregado a favoritos');
          setFavoritos((prev) => [...prev, { ...producto, cantidad: 1 }]);
        }
    };
    
    const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };
  return (
        <div className="detalle-producto-pagina">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="detail-header">
                <button className="back-button" onClick={() => navigate(-1)}>← Volver</button>
                <h1>{producto.nombre}</h1>
            </div>

            <div className="product-detail-content">
                <div className="model-viewer-container">
                    <model-viewer
                        src={producto.modelo}
                        alt={producto.nombre}
                        auto-rotate
                        camera-controls
                        ar
                        shadow-intensity="1"
                        exposure="1.2"
                        disable-zoom
                    ></model-viewer>
                </div>

                <div className="product-info-panel">
                    <p className="product-price">$ {producto.precio.toLocaleString('es-CO')}</p> {/* Formato de moneda COP */}
                    
                    <p className="product-description">{producto.descripcion}</p>

                    <div className="detail-buttons">
                        <button className="add-to-cart-button" onClick={() => agregarAlCarrito(producto)}>
                            Agregar al Carrito
                        </button>
                        <button className="add-to-favorites-button" onClick={() => agregarAFavoritos(producto)}>
                            Añadir a Favoritos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetaProducto;