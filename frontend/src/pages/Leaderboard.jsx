import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Leaderboard = () => {
  const { token } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await axios.get(`${import.meta.env.VITE_API_URL}/stats/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeaders(res1.data.topFlatmates);

      const res2 = await axios.get(`${import.meta.env.VITE_API_URL}/stats/flat`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res2.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🏅 Leaderboard</h2>

      <div className="mb-5">
        <h4>Top Karma Earners</h4>
        <table className="table table-striped table-bordered shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Flatmate</th>
              <th>Karma</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td><span className="badge bg-success">{u.karma}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h4>🔥 Problem of the Week</h4>
        {stats.problemOfWeek ? (
          <div className="alert alert-danger">
            <strong>{stats.problemOfWeek.title}</strong> – {stats.problemOfWeek.type}
            <br />
            <small>👍 {stats.problemOfWeek.votes.upvotes.length} upvotes</small>
          </div>
        ) : <p>No serious complaints yet!</p>}
      </div>

      <div className="mb-4">
        <h4>📊 Complaint Categories</h4>
        <ul>
          {stats.complaintStats && Object.entries(stats.complaintStats).map(([type, count]) => (
            <li key={type}><span className="badge bg-info text-dark me-2">{type}</span> {count}</li>
          ))}
        </ul>
      </div>

      {stats.topOffender && (
        <div className="alert alert-warning">
          <h5>🚨 Most Complained About</h5>
          {stats.topOffender.name} – {stats.topOffender.complaints} complaints
          <br />
          <small>Email: {stats.topOffender.email}</small>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
