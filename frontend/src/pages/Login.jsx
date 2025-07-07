import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="mb-3 text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="email" placeholder="Email" required onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="form-control mb-3" type="password" placeholder="Password" required onChange={e => setForm({ ...form, password: e.target.value })} />
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
