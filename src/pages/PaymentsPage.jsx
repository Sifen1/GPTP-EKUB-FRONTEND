// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // function PaymentsPage() {
// //   const [users, setUsers] = useState([]);
// //   const [statusMap, setStatusMap] = useState({});
// //   const [message, setMessage] = useState('');
// //   const token = localStorage.getItem('token');
// //   const [payments, setPayments] = useState([]);

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:5000/api/users', {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setUsers(res.data);
// //       } catch (err) {
// //         console.error("Error fetching users", err.message);
// //       }
// //     };
  
// //     const fetchPayments = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:5000/api/payments/latest', {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setPayments(res.data);
// //       } catch (err) {
// //         console.error("Failed to fetch payment status", err);
// //       }
// //     };
  
// //     fetchUsers();       // ✅ Now it exists
// //     fetchPayments();    // ✅ Also exists
// //   }, []);
  

// //   const handlePayment = async (userId, status, notes = '') => {
// //     try {
// //       await axios.post('http://localhost:5000/api/payments', {
// //         userId,
// //         status,
// //         notes
// //       }, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
  
// //       setMessage(`✅ ${status} marked for user.`);
// //       fetchPayments(); // ✅ Re-fetch after update
// //     } catch (err) {
// //       console.error(err.message);
// //       setMessage('❌ Failed to update payment.');
// //     }
// //   };
  
// //   return (
// //     <div className="container mt-4">
// //       <h3>Manage Payments</h3>
// //       {message && <div className="alert alert-info">{message}</div>}
// //       <table className="table table-bordered">
// //         <thead className="table-dark">
// //           <tr>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Mark Paid</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map(u => (
// //             <tr key={u._id}>
// //               <td>{u.name}</td>
// //               <td>{u.email}</td>
// //               <td>
// //                 <button
// //                   className="btn btn-success btn-sm me-2"
// //                   onClick={() => handlePayment(u._id, 'Paid')}
// //                 >
// //                   Paid
// //                 </button>
                
// //                 <button
// //                   className="btn btn-warning btn-sm"
// //                   onClick={() => handlePayment(u._id, 'Not Paid')}
// //                 >
// //                   Not Paid
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default PaymentsPage;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function PaymentsPage() {
//   const [users, setUsers] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [message, setMessage] = useState('');
//   const token = localStorage.getItem('token');

//   // ✅ Fetch users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/users', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error('Error fetching users', err.message);
//     }
//   };

//   // ✅ Fetch latest payments
//   const fetchPayments = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/payments/latest', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPayments(res.data);
//     } catch (err) {
//       console.error('Failed to fetch payment status', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchPayments();
//   }, []);

//   // ✅ Mark payment
//   const handlePayment = async (userId, status, notes = '') => {
//     try {
//       await axios.post(
//         'http://localhost:5000/api/payments',
//         { userId, status, notes },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage(`✅ ${status} marked for user.`);
//       fetchPayments(); // update status after action
//     } catch (err) {
//       console.error(err.message);
//       setMessage('❌ Failed to update payment.');
//     }
//   };

//   // ✅ Get status for a specific user
//   const getStatus = (userId) => {
//     const p = payments.find((p) => p.userId === userId);
//     return p?.status || 'Not Recorded';
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Manage Payments</h3>
//       {message && <div className="alert alert-info">{message}</div>}
//       <table className="table table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Mark Paid</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id}>
//               <td>{u.name}</td>
//               <td>{u.email}</td>
//               <td>
//                 <div className="mb-2">
//                   <button
//                     className="btn btn-success btn-sm me-2"
//                     onClick={() => handlePayment(u._id, 'Paid')}
//                   >
//                     Paid
//                   </button>
//                   <button
//                     className="btn btn-warning btn-sm"
//                     onClick={() => handlePayment(u._id, 'Not Paid')}
//                   >
//                     Not Paid
//                   </button>
//                 </div>
//                 <div className="fw-bold mt-1">
//                   📌 {getStatus(u._id)}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PaymentsPage;







import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentsPage() {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users', err.message);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/payments/latest', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error('Failed to fetch payment status', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPayments();
  }, []);

  const handlePayment = async (userId, status, notes = '') => {
    try {
      await axios.post(
        'http://localhost:5000/api/payments',
        { userId, status, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`✅ ${status} marked for user.`);
      fetchPayments();
    } catch (err) {
      console.error(err.message);
      setMessage('❌ Failed to update payment.');
    }
  };

  const getStatus = (userId) => {
    const p = payments.find((p) => p.userId === userId);
    return p?.status || 'Not Recorded';
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">💰 Manage Payments</h3>
      {message && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')} />
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="fw-bold">{getStatus(u._id)}</td>
                <td className="text-center">
                  <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handlePayment(u._id, 'Paid')}
                    >
                      Mark Paid
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handlePayment(u._id, 'Not Paid')}
                    >
                      Not Paid
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentsPage;
