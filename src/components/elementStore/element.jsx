import { useState } from 'react';
import { productos } from '../../data'; 
import '@google/model-viewer';
import './element.css'; 


function ElementStore({ carrito, setCarrito }) {
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
    <div className="App">
      <h1>Tienda 3D</h1>
      <div className="galeria">
        {productos.map((item) => (
          <div key={item.id} className="producto">
            <model-viewer
              src={item.modelo}
              alt={item.nombre}
              auto-rotate
              camera-controls
              ar
              style={{ width: '250px', height: '250px' }}
            />
            <h2>{item.nombre}</h2>
            <p>${item.precio}</p>
            <button onClick={() => agregarAlCarrito(item)}>Agregar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementStore;