import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function MemberSpinner() {
  const [names, setNames] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.on('spinnerStarted', (members) => {
        console.log('📡 Spinner started event received:', members);
      setNames(members);
      setWinner(null); // reset winner on new spin
    });

    socket.on('winnerSelected', (data) => {
      setWinner(data.name);
    });

    return () => {
      socket.off('spinnerStarted');
      socket.off('winnerSelected');
    };
  }, []);

  return (
    <div className="container mt-4 text-center">
      <h3>🎡 Live Spinner (Read-Only)</h3>

      {names.length > 0 ? (
        <div>
          <h5 className="mb-3">Spinning...</h5>
          <ul className="list-group mb-3">
            {names.map((name, i) => (
              <li key={i} className={`list-group-item ${winner === name ? 'bg-success text-white fw-bold' : ''}`}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-muted">No active spin happening right now.</p>
      )}

      {winner && (
        <div className="alert alert-success">
          🎉 Winner: <strong>{winner}</strong>
        </div>
      )}
    </div>
  );
}

export default MemberSpinner;
