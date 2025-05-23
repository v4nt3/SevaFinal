import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import './login.css';

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();

  if (!username.trim() || !password.trim()) {
    setError('Por favor, completa todos los campos');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (isRegistering) {
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      setError('El usuario ya existe');
      return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    setError('');
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    setIsRegistering(false);
  } else {
    const match = users.find((u) => u.username === username && u.password === password);
    if (match) {
      setError('');
      onLogin(username);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  }
};
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>{isRegistering ? 'Crear Cuenta' : 'Bienvenido'}</h1>
        <p className="login-subtitle">
          {isRegistering ? 'Registra tus datos para continuar' : 'Ingresa tus credenciales'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button type="submit" className="login-button">
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="toggle-auth" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿No tienes cuenta? Regístrate aquí'}
        </p>
      </div>
    </div>
  );
}

export default Login;
