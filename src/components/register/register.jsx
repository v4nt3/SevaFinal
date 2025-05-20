import { useState } from 'react';
import { supabase } from './supabaseClient'; // cliente en supabase
import './Register.css';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos');
      return;
    }

    // Insertar nuevo usuario en la tabla "users" que se creo ya en supabase (base de datos)
    const { data, error: supabaseError } = await supabase
      .from('users')
      .insert([
        { username, password }
      ]);

    if (supabaseError) {
      if (supabaseError.code === '23505') { // código de error para "duplicado" en Postgres
        setError('El usuario ya existe');
      } else {
        setError('Error al registrar usuario');
      }
      return;
    }

    setSuccess('¡Usuario registrado exitosamente!');
    setError('');
    onRegister(); 
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Crear cuenta</h1>
        <p className="register-subtitle">Regístrate para comenzar</p>
        
        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Crea un usuario"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crea una contraseña"
            />
          </div>
          
          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
