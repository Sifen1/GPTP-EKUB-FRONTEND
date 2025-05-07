import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container mt-5 text-center">
      <h2>Admin Dashboard</h2>
      <div className="mt-4 d-grid gap-3 col-6 mx-auto">
        <Link to="/dashboard/members" className="btn btn-primary">Manage Members</Link>
        <Link to="/dashboard/spinner" className="btn btn-warning">Start Spinner</Link>
        <Link to="/dashboard/winners" className="btn btn-success">View Winners</Link>
        <Link to="/dashboard/payments" className="btn btn-info">Manage Payments</Link>
      </div>
    </div>
  );
}

export default Dashboard;
