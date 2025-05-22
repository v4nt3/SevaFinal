import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HistorialDeCompra() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    // Load purchase history from localStorage when the component mounts
    try {
      const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
      setPurchaseHistory(history);
    } catch (error) {
      console.error("Error loading purchase history from localStorage:", error);
      setPurchaseHistory([]); // Initialize as empty in case of error
    }
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="history-container">
      <h1>Historial de Compras</h1>

      {purchaseHistory.length === 0 ? (
        <p className="no-history">Aún no tienes compras en tu historial.</p>
      ) : (
        <div className="history-list">
          {purchaseHistory.map((purchase) => (
            <div key={purchase.id} className="purchase-card">
              <h3>Compra #{purchase.id}</h3>
              <p><strong>Fecha:</strong> {purchase.fecha} {purchase.hora}</p>
              
              <div className="buyer-info">
                <h4>Datos del Comprador:</h4>
                <p>Nombre: {purchase.buyerInfo.nombreCompleto}</p>
                <p>Dirección: {purchase.buyerInfo.direccion}</p>
                <p>Ciudad: {purchase.buyerInfo.ciudad}</p>
                <p>Teléfono: {purchase.buyerInfo.telefono}</p>
              </div>

              <div className="items-bought">
                <h4>Artículos Comprados:</h4>
                <ul className="history-items-list">
                  {purchase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="history-item">
                      <span>{item.nombre}</span>
                      <span>x{item.cantidad}</span>
                      <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="purchase-totals">
                <p>Subtotal: ${purchase.subtotal}</p>
                <p>IVA: ${purchase.ivaAmount}</p>
                <p><strong>Total General: ${purchase.totalConIVA}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/elementStore">
        <button className="back-to-store-btn">Volver a la tienda</button>
      </Link>
    </div>
  );
}

export default HistorialDeCompra;
