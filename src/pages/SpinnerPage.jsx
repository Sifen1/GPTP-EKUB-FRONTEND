// // import React, { useEffect, useState } from 'react';
// // import socket from '../socket'; // make sure this file exists

// // function SpinnerPage() {
// //   const [members, setMembers] = useState([]);
// //   const [winner, setWinner] = useState(null);
// //   const [spinning, setSpinning] = useState(false);

// //   useEffect(() => {
// //     console.log("📡 SpinnerPage loaded");

// //     socket.on('spinner:start', (data) => {
// //       console.log("🎡 spinner:start", data);
// //       setMembers(data.members);
// //       setSpinning(true);
// //       setWinner(null);

// //       // Stop spinning after 4 seconds
// //       setTimeout(() => {
// //         setSpinning(false);
// //       }, 4000);
// //     });

// //     socket.on('spinner:result', (data) => {
// //       console.log("🏆 spinner:result", data);
// //       setWinner(data.winner);
// //     });

// //     return () => {
// //       socket.off('spinner:start');
// //       socket.off('spinner:result');
// //     };
// //   }, []);

// //   return (
// //     <div className="container mt-5 text-center">
// //       <h2>EKUB Spinner</h2>

// //       {spinning && <p className="text-primary fw-bold">Spinning...</p>}

// //       <div className="mt-4 mb-4">
// //         {spinning ? (
// //           <div className="spinner-border text-success" style={{ width: '5rem', height: '5rem' }}></div>
// //         ) : winner ? (
// //           <h4 className="text-success">🎉 Winner: {winner.name}</h4>
// //         ) : (
// //           <p>Waiting for spinner...</p>
// //         )}
// //       </div>

// //       <h5>Participants:</h5>
// //       <ul className="list-group">
// //         {members.map((m, i) => (
// //           <li key={i} className="list-group-item">{m.name}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default SpinnerPage;


import React, { useContext, useEffect, useState } from "react";
import socket from "../socket";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function SpinnerPage() {
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("📡 SpinnerPage loaded");

    socket.on("spinner:started", (data) => {
      setParticipants(data.members);
      setSpinning(true);
      setWinner(null);

      setTimeout(() => {
        setSpinning(false);
      }, 4000);
    });

    socket.on("spinner:result", (data) => {
      setWinner(data.winner);
      setSpinning(false); // Stop spinner for admin too

    });

    return () => {
      socket.off("spinner:started");
      socket.off("spinner:result");
    };
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMembers(res.data))
      .catch((err) => console.error("Error fetching members", err));
    }
  }, [user, token]);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((uid) => uid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const startSpinner = async () => {
  setSpinning(true);         // Show spinner loading
  setWinner(null);           // Clear old winner

  setTimeout(async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/spinner/start",
        { members: selectedIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to start spinner", err);
      setSpinning(false); // stop loading on error
    }
  }, 3000); // wait 3 seconds before actual spin
};

  return (
    <div className="container mt-5 text-center">
      <h2>EKUB Spinner</h2>

      {user?.role === "admin" && (
        <>
          <h5>Select Members for Spin</h5>
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Select</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id}>
                  <td><input type="checkbox" checked={selectedIds.includes(m._id)} onChange={() => toggleSelect(m._id)} /></td>
                  <td>{m.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary mt-2" onClick={startSpinner} disabled={selectedIds.length === 0}>
            🎯 Start Spinner
          </button>
        </>
      )}

      <div className="mt-5">
        {spinning && <p className="text-primary fw-bold">Spinning...</p>}
        {spinning ? (
          <div className="spinner-border text-success" style={{ width: '5rem', height: '5rem' }}></div>
        ) : winner ? (
          <h4 className="text-success">🎉 Winner: {winner.name}</h4>
        ) : (
          <p></p>
        )}
      </div>

      {participants.length > 0 && (
        <>
          <h5>Participants:</h5>
          <ul className="list-group">
            {participants.map((m, i) => (
              <li key={i} className="list-group-item">{m.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default SpinnerPage;
















// SpinnerPage.jsx 
// Add the wheel directly in this file instead of importing it

// import React, { useContext, useEffect, useState, useRef } from "react";
// import socket from "../socket";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";

// function SpinnerPage() {
//   const { user } = useContext(AuthContext);
//   const [members, setMembers] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const [winner, setWinner] = useState(null);
//   const [spinning, setSpinning] = useState(false);
//   const token = localStorage.getItem("token");
  
//   // Wheel spinner states and ref
//   const canvasRef = useRef(null);
//   const [rotationAngle, setRotationAngle] = useState(0);
//   const [finalAngle, setFinalAngle] = useState(0);
//   const colors = ["#FF5252", "#2196F3", "#4CAF50", "#FFC107", "#9C27B0", "#FF9800"];

//   useEffect(() => {
//     console.log("📡 SpinnerPage loaded");

//     socket.on("spinner:started", (data) => {
//       setParticipants(data.members);
//       setSpinning(true);
//       setWinner(null);

//       setTimeout(() => {
//         setSpinning(false);
//       }, 4000);
//     });

//     socket.on("spinner:result", (data) => {
//       setWinner(data.winner);
//     });

//     return () => {
//       socket.off("spinner:started");
//       socket.off("spinner:result");
//     };
//   }, []);

//   useEffect(() => {
//     if (user?.role === "admin") {
//       axios.get("http://localhost:5000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setMembers(res.data))
//       .catch((err) => console.error("Error fetching members", err));
//     }
//   }, [user, token]);

//   // Wheel spinner effect for winner calculation
//   useEffect(() => {
//     if (winner && participants.length > 0) {
//       const winnerIndex = participants.findIndex(p => p._id === winner._id);
//       if (winnerIndex >= 0) {
//         const segmentAngle = 360 / participants.length;
//         const winnerAngle = segmentAngle * winnerIndex;
//         const targetAngle = 1440 + (360 - winnerAngle - segmentAngle / 2);
//         setFinalAngle(targetAngle);
//       }
//     }
//   }, [winner, participants]);

//   // Wheel spinner drawing effect
//   useEffect(() => {
//     if (!canvasRef.current || participants.length === 0) return;
    
//     const ctx = canvasRef.current.getContext("2d");
//     const centerX = canvasRef.current.width / 2;
//     const centerY = canvasRef.current.height / 2;
//     const radius = Math.min(centerX, centerY) - 10;
    
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
//     // Draw the wheel with segments
//     const segmentAngle = 2 * Math.PI / participants.length;
    
//     for (let i = 0; i < participants.length; i++) {
//       const startAngle = i * segmentAngle - Math.PI / 2 + rotationAngle * (Math.PI / 180);
//       const endAngle = (i + 1) * segmentAngle - Math.PI / 2 + rotationAngle * (Math.PI / 180);
      
//       // Draw segment
//       ctx.beginPath();
//       ctx.moveTo(centerX, centerY);
//       ctx.arc(centerX, centerY, radius, startAngle, endAngle);
//       ctx.closePath();
//       ctx.fillStyle = colors[i % colors.length];
//       ctx.fill();
//       ctx.stroke();
      
//       // Draw text
//       ctx.save();
//       ctx.translate(centerX, centerY);
//       ctx.rotate(startAngle + segmentAngle / 2);
//       ctx.textAlign = "right";
//       ctx.fillStyle = "#fff";
//       ctx.font = "bold 14px Arial";
//       ctx.fillText(participants[i].name, radius - 20, 5);
//       ctx.restore();
//     }
    
//     // Draw center circle
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
//     ctx.fillStyle = "#333";
//     ctx.fill();
    
//     // Draw pointer
//     ctx.beginPath();
//     ctx.moveTo(centerX + radius + 10, centerY);
//     ctx.lineTo(centerX + radius - 15, centerY - 15);
//     ctx.lineTo(centerX + radius - 15, centerY + 15);
//     ctx.closePath();
//     ctx.fillStyle = "#333";
//     ctx.fill();
//   }, [participants, rotationAngle]);

//   // Wheel spinner animation effect
//   useEffect(() => {
//     let animationId;
//     let startTime;
//     let duration = 4000;
    
//     const animate = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const elapsed = timestamp - startTime;
//       const progress = Math.min(elapsed / duration, 1);
      
//       if (spinning) {
//         setRotationAngle((prevAngle) => (prevAngle + 5) % 360);
//       } else if (winner) {
//         const currentAngle = progress * finalAngle;
//         setRotationAngle(currentAngle % 360);
        
//         if (progress >= 1) return;
//       }
      
//       animationId = requestAnimationFrame(animate);
//     };
    
//     if ((spinning || winner) && participants.length > 0) {
//       animationId = requestAnimationFrame(animate);
//     }
    
//     return () => {
//       if (animationId) {
//         cancelAnimationFrame(animationId);
//       }
//     };
//   }, [spinning, winner, finalAngle, participants]);

//   const toggleSelect = (id) => {
//     if (selectedIds.includes(id)) {
//       setSelectedIds(selectedIds.filter((uid) => uid !== id));
//     } else {
//       setSelectedIds([...selectedIds, id]);
//     }
//   };

//   const startSpinner = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/spinner/start", { members: selectedIds }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     } catch (err) {
//       console.error("Failed to start spinner", err);
//     }
//   };

//   return (
//     <div className="container mt-5 text-center">
//       <h2>EKUB Spinner</h2>

//       {user?.role === "admin" && (
//         <>
//           <h5>Select Members for Spin</h5>
//           <table className="table table-bordered mt-3">
//             <thead className="table-dark">
//               <tr>
//                 <th>Select</th>
//                 <th>Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {members.map((m) => (
//                 <tr key={m._id}>
//                   <td><input type="checkbox" checked={selectedIds.includes(m._id)} onChange={() => toggleSelect(m._id)} /></td>
//                   <td>{m.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="btn btn-primary mt-2" onClick={startSpinner} disabled={selectedIds.length === 0}>
//             🎯 Start Spinner
//           </button>
//         </>
//       )}

//       <div className="mt-5">
//         {spinning && <p className="text-primary fw-bold">Spinning...</p>}
        
//         {/* Wheel spinner canvas */}
//         {participants.length > 0 && (
//           <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto' }}>
//             <canvas 
//               ref={canvasRef} 
//               width={300} 
//               height={300} 
//               style={{ display: 'block', margin: '0 auto' }}
//             />
//           </div>
//         )}
        
//         {!spinning && winner && (
//           <h4 className="text-success mt-3">🎉 Winner: {winner.name}</h4>
//         )}
        
//         {!spinning && !winner && participants.length === 0 && (
//           <p>Waiting for spinner...</p>
//         )}
//       </div>

//       {participants.length > 0 && (
//         <>
//           <h5 className="mt-4">Participants:</h5>
//           <ul className="list-group">
//             {participants.map((m, i) => (
//               <li key={i} className="list-group-item">{m.name}</li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

// export default SpinnerPage;