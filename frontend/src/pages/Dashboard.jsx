import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [showPunishment, setShowPunishment] = useState(false);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wasPunished = localStorage.getItem('justPunished');
    if (wasPunished === 'true') {
      setShowPunishment(true);
      localStorage.removeItem('justPunished');
    }
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/complaints/trending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Trending API response:", res.data); // ✅ Debug log
        setTrending(res.data.complaints || []);
      } catch (err) {
        console.error('Failed to fetch trending complaint', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, [token]);

  return (
    <div className="container py-4">
      <div className="row g-4">

        {/* Welcome Card */}
        <div className="col-12">
          <div className="card shadow p-4 text-center">
            <h2 className="mb-2">Welcome, {user.name} 👋</h2>
            <p className="mb-1">You're part of flat <strong>{user.flatCode}</strong></p>
            <p>Your current karma: <span className="badge bg-success">{user.karma || 0}</span></p>

            {showPunishment && (
              <div className="alert alert-danger mt-3">
                ⚠️ You have been punished due to a highly upvoted complaint. <strong>-10 karma</strong> has been applied.
              </div>
            )}
          </div>
        </div>

        {/* 🔥 Trending Complaints */}
        <div className="col-12">
          {loading ? (
            <p className="text-center">Loading trending complaints...</p>
          ) : trending.length > 0 ? (
            trending.map((c, i) => (
              <div key={i} className="card bg-warning-subtle shadow mb-3 p-3">
                <h4 className="text-danger">🔥 Flatmate Problem of the Week</h4>
                <p className="mb-1"><strong>{c.title}</strong></p>
                <p className="mb-1">{c.description}</p>
                <small className="text-muted">Severity: {c.severity}</small>
              </div>
            ))
          ) : (
            <div className="card shadow-sm p-3 bg-light text-center">
              <p className="text-muted mb-0">No trending complaint this week yet 😇</p>
            </div>
          )}
        </div>

        {/* Quick Navigation Cards */}
        <div className="col-md-6">
          <div className="card shadow text-center p-4">
            <h4>📝 File/View Complaints</h4>
            <p>Log daily issues or see what your flatmates have reported.</p>
            <a href="/complaints" className="btn btn-outline-primary mt-2">Go to Complaints</a>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow text-center p-4">
            <h4>🏅 View Leaderboard</h4>
            <p>Check your karma ranking and flat stats.</p>
            <a href="/leaderboard" className="btn btn-outline-warning mt-2">See Leaderboard</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
