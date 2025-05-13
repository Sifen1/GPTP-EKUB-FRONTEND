// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const [participants, setParticipants] = useState([]);

// const socket = io('http://localhost:5000');

// function MemberSpinner() {
//   const [names, setNames] = useState([]);
//   const [winner, setWinner] = useState(null);
// useEffect(() => {
//   console.log("📡 SpinnerPage loaded");

//   socket.on("spinner:started", (data) => {
//     setParticipants(data.members);     // Make sure to use `data.members`
//     setSpinning(true);
//     setWinner(null);

//     setTimeout(() => {
//       setSpinning(false);
//     }, 4000);
//   });

//   socket.on("spinner:result", (data) => {
//     setWinner(data.winner);
//     setSpinning(false); // stop spinner when result comes
//   });

//   return () => {
//     socket.off("spinner:started");
//     socket.off("spinner:result");
//   };
// }, []);


//   return (
//     <div className="container mt-4 text-center">
//       <h3>🎡 Live Spinner (Read-Only)</h3>

//       {names.length > 0 ? (
//         <div>
//           <h5 className="mb-3">Spinning...</h5>
//           <ul className="list-group mb-3">
//             {names.map((name, i) => (
//               <li key={i} className={`list-group-item ${winner === name ? 'bg-success text-white fw-bold' : ''}`}>
//                 {name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p className="text-muted">No active spin happening right now.</p>
//       )}

//       {winner && (
//         <div className="alert alert-success">
//           🎉 Winner: <strong>{winner}</strong>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MemberSpinner;







import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function MemberSpinner() {
  const [participants, setParticipants] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    console.log("📡 MemberSpinner loaded");

    socket.on("spinner:started", (data) => {
      setParticipants(data.members || []);
      setWinner(null);
      setSpinning(true);

      setTimeout(() => {
        setSpinning(false);
      }, 4000);
    });

    socket.on("spinner:result", (data) => {
      setWinner(data.winner);
      setSpinning(false);
    });

    return () => {
      socket.off("spinner:started");
      socket.off("spinner:result");
    };
  }, []);

  return (
    <div className="container mt-4 text-center">
      <h3>🎡 Live Spinner (Read-Only)</h3>

      {spinning && (
        <>
          <h5 className="mb-3 text-primary">Spinning...</h5>
          <div className="spinner-border text-success mb-3" style={{ width: '4rem', height: '4rem' }}></div>
        </>
      )}

      {participants.length > 0 && (
        <ul className="list-group mb-3">
          {participants.map((p, i) => (
            <li
              key={i}
              className={`list-group-item ${winner?.name === p.name ? 'bg-success text-white fw-bold' : ''}`}
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}

      {!spinning && winner && (
        <div className="alert alert-success">
          🎉 Winner: <strong>{winner.name}</strong>
        </div>
      )}

      {!spinning && !winner && participants.length === 0 && (
        <p className="text-muted">No active spin happening right now.</p>
      )}
    </div>
  );
}

export default MemberSpinner;
