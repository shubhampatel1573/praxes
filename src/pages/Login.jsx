import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/authManager';
import { Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '500px', minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="card" style={{ padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Lock size={48} className="glow-text-emerald" style={{ margin: '0 auto 1rem' }} />
          <h2 className="glow-text-gold">Admin Login</h2>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>Authorized PRAXES Committee Only</p>
        </div>

        {error && <div style={{ background: 'rgba(255, 77, 79, 0.15)', color: 'var(--error)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" style={{ marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-emerald" style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}>
            Login Securely
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
