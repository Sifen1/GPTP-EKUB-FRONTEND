import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WinnersPage() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/winners');
        setWinners(res.data);
      } catch (err) {
        console.error("Failed to fetch winners", err);
      }
    };

    fetchWinners();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">EKUB Winner History</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Date Won</th>
          </tr>
        </thead>
        <tbody>
          {winners.map(w => (
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

export default WinnersPage;
