import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [showPunishment, setShowPunishment] = useState(false);

  useEffect(() => {
    const wasPunished = localStorage.getItem('justPunished');
    if (wasPunished === 'true') {
      setShowPunishment(true);
      localStorage.removeItem('justPunished');
    }
  }, []);

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Main Welcome Card */}
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
