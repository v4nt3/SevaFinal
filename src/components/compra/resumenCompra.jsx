import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./resumenCompra.css";

// IMPORTANT: Receive setCarrito as a prop here
function ResumenCompra({ setCarrito }) {
  const location = useLocation();
  const items = location.state?.items || [];
  const buyerInfo = location.state?.buyerInfo || {};

  const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const ivaRate = 0.20; // 20% IVA
  const ivaAmount = subtotal * ivaRate;
  const totalConIVA = subtotal + ivaAmount;

  const now = new Date();
  const fecha = now.toLocaleDateString('es-CO'); // Format date for Colombia
  const hora = now.toLocaleTimeString('es-CO'); // Format time for Colombia

  // Use useEffect to save the purchase to localStorage and clear the cart
  useEffect(() => {
    if (items.length > 0) { // Only save if there are actual items in the purchase
      const purchaseRecord = {
        id: Date.now(), // Unique ID for this purchase
        buyerInfo,
        fecha,
        hora,
        items,
        subtotal: subtotal.toFixed(2),
        ivaAmount: ivaAmount.toFixed(2),
        totalConIVA: totalConIVA.toFixed(2),
      };

      try {
        // Get existing history or initialize an empty array
        const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        // Add the new purchase record
        history.push(purchaseRecord);
        // Save the updated history back to localStorage
        localStorage.setItem('purchaseHistory', JSON.stringify(history));
        console.log("Purchase saved to history:", purchaseRecord);

        // Clear the current shopping cart from localStorage
        localStorage.removeItem('carritoCompras');
        console.log("Current cart cleared from localStorage.");

        // IMPORTANT: Clear the React cart state using the setCarrito prop
        if (setCarrito) { // Check if setCarrito prop is provided
          setCarrito([]);
          console.log("React cart state cleared.");
        }

      } catch (error) {
        console.error("Error saving purchase to history or clearing cart:", error);
      }
    }
  }, [items, buyerInfo, fecha, hora, subtotal, ivaAmount, totalConIVA, setCarrito]); // Add setCarrito to dependencies

  return (
    <div className="resumen-container">
      <h1>¡Gracias por tu compra!</h1>
      <p>Tu pedido ha sido procesado con éxito.</p>

      {items.length > 0 ? (
        <div className="invoice-container">
          <h2>Factura de Compra</h2>
          <div className="invoice-details">
            <p><strong>Datos del Comprador:</strong></p>
            <p>Nombre: {buyerInfo.nombreCompleto}</p>
            <p>Dirección: {buyerInfo.direccion}</p>
            <p>Ciudad: {buyerInfo.ciudad}</p>
            <p>Teléfono: {buyerInfo.telefono}</p>
            <p><strong>Fecha:</strong> {fecha}</p>
            <p><strong>Hora:</strong> {hora}</p>
          </div>

          <div className="resumen-items">
            <h3>Artículos comprados:</h3>
            <ul className="items-list">
              {items.map((item, index) => (
                <li key={index} className="item-comprado">
                  <span className="item-nombre">{item.nombre}</span>
                  <div className="item-detalles">
                    <span className="item-cantidad">x{item.cantidad}</span>
                    <span className="item-precio">${item.precio * item.cantidad}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="totals-section">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>IVA ({ivaRate * 100}%):</span>
                <span>${ivaAmount.toFixed(2)}</span>
              </div>
              <div className="total-compra">
                <span>Total General:</span>
                <span className="precio-total">${totalConIVA.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-items">No hay detalles de la compra disponibles.</p>
      )}

      <Link to="/elementStore">
        <button className="volver-btn">Volver a la tienda</button>
      </Link>
    </div>
  );
}

export default ResumenCompra;
