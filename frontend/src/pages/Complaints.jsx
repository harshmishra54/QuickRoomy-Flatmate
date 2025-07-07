import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Complaints = () => {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', type: '', severity: '' });

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/complaints`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);
    } catch (err) {
      console.error('Failed to fetch complaints', err);
    }
  };

  // Submit new complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/complaints`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', description: '', type: '', severity: '' });
      const modal = bootstrap.Modal.getInstance(document.getElementById('complaintModal'));
      modal.hide();
      fetchComplaints();
    } catch (err) {
      alert('Error submitting complaint');
    }
  };

  // Resolve complaint
  const handleResolve = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/complaints/${id}/resolve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchComplaints();
    } catch (err) {
      alert('Failed to resolve complaint');
    }
  };

  // Vote (upvote or downvote)
  const handleVote = async (complaintId, voteType) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/votes/${complaintId}`, {
        voteType
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.punishment) {
        alert(`Punishment: ${res.data.punishment}`);
      }

      fetchComplaints();
    } catch (err) {
      alert('Error voting');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Complaints</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#complaintModal">
          + File Complaint
        </button>
      </div>

      <div className="row">
        {complaints.map(c => (
          <div className="col-md-6 mb-4" key={c._id}>
            <div className={`card shadow-sm ${c.resolved ? 'border-success' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{c.title}</h5>
                <p className="card-text">{c.description}</p>

                <div className="mb-2">
                  <span className="badge bg-secondary me-2">{c.type}</span>
                  <span className="badge bg-warning text-dark">{c.severity}</span>
                </div>

                <p className="mb-1">
                  <strong>Votes:</strong> 👍 {c.votes?.upvotes?.length || 0} / 👎 {c.votes?.downvotes?.length || 0}
                </p>

                <div className="d-flex gap-2 mb-2">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleVote(c._id, 'upvote')}>
                    👍 Upvote
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleVote(c._id, 'downvote')}>
                    👎 Downvote
                  </button>
                </div>

                <p className="text-muted"><small>By {c.createdBy?.name || 'Anonymous'}</small></p>

                <button className="btn btn-sm btn-outline-success" onClick={() => handleResolve(c._id)} disabled={c.resolved}>
                  {c.resolved ? '✅ Resolved' : 'Mark as Resolved'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for filing complaint */}
      <div className="modal fade" id="complaintModal" tabIndex="-1" aria-labelledby="complaintModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content shadow">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="complaintModalLabel">File a Complaint</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-3"
                  placeholder="Title"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Description"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
                <input
                  className="form-control mb-3"
                  placeholder="Type (e.g. Noise)"
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                />
                <input
                  className="form-control mb-3"
                  placeholder="Severity (e.g. Major)"
                  value={form.severity}
                  onChange={e => setForm({ ...form, severity: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
