import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MemberWinners() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/winners');
        setWinners(res.data);
      } catch (err) {
        console.error('Failed to load winners:', err.message);
      }
    };
    fetchWinners();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">🏆 EKUB Winner History</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Date Won</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((w) => (
            <tr key={w._id}>
              <td>{w.name}</td>
              <td>{new Date(w.dateWon).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberWinners;
