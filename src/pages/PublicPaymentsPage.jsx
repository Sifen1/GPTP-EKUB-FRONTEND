// src/pages/PublicPaymentsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PublicPaymentsPage() {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('http://localhost:5000/api/users');
        const paymentsRes = await axios.get('http://localhost:5000/api/payments/latest');
        setUsers(usersRes.data);
        setPayments(paymentsRes.data);
      } catch (err) {
        console.error('Failed to fetch public payments', err.message);
      }
    };

    fetchData();
  }, []);

  const getStatus = (userId) => {
    const payment = payments.find((p) => p.userId === userId);
    return payment?.status || 'Not Recorded';
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">💳 Payment Status (Public)</h3>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                {getStatus(u._id) === 'Paid' ? (
                  <span className="text-success fw-bold">Paid</span>
                ) : getStatus(u._id) === 'Not Paid' ? (
                  <span className="text-warning fw-bold">Not Paid</span>
                ) : (
                  <span className="text-muted">Not Recorded</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublicPaymentsPage;
