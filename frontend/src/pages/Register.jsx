import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', flatCode: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      alert('Registration failed. Please check your inputs or try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="mb-3 text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Your Name"
              required
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Email Address"
              required
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              required
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Flat Code</label>
            <input
              className="form-control"
              type="text"
              placeholder="e.g. FLAT123"
              required
              onChange={e => setForm({ ...form, flatCode: e.target.value })}
            />
          </div>
          <button className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
