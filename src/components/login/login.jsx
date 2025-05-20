import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import './Login.css';

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (isRegistering) {
      // Registro
      const { data, error } = await supabase
        .from('users') // tabla de usuarios en supabase
        .insert([{ username, password }]);

      if (error) {
        setError('Error al registrar: ' + error.message);
      } else {
        setError('');
        setIsRegistering(false);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
      }
    } else {
      // Login
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        setError('Usuario o contraseña incorrectos');
      } else {
        setError('');
        onLogin(username);
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
