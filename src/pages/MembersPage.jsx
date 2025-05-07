// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // function MembersPage() {
// //   const [users, setUsers] = useState([]);
// //   const [selected, setSelected] = useState([]);
// //   const [message, setMessage] = useState('');

// //   const token = localStorage.getItem('token'); // assuming JWT stored

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:5000/api/users', {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         });
// //         setUsers(res.data);
// //       } catch (err) {
// //         console.error('Error fetching users:', err.message);
// //       }
// //     };

// //     fetchUsers();
// //   }, []);

// //   const toggleUser = (id) => {
// //     setSelected(prev =>
// //       prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
// //     );
// //   };

// //   const startSpinner = async () => {
// //     if (selected.length === 0) {
// //       alert("Please select at least one member.");
// //       return;
// //     }

// //     try {
// //       await axios.post('http://localhost:5000/api/spinner/start', {
// //         members: selected
// //       }, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });

// //       setMessage("🎡 Spinner started!");
// //     } catch (err) {
// //       console.error(err);
// //       setMessage("❌ Spinner failed.");
// //     }
// //   };
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this member?")) return;
// //     try {
// //       await axios.delete(`http://localhost:5000/api/users/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       fetchUsers(); // re-fetch the list
// //     } catch (err) {
// //       console.error('Delete failed', err.message);
// //     }
// //   };
  

// //   return (
// //     <div className="container mt-4">
// //       <h3>Select Members for Spinner</h3>
// //       {message && <div className="alert alert-info">{message}</div>}
// //       <table className="table table-bordered mt-3">
// //         <thead>
// //           <tr>
// //             <th>Select</th>
// //             <th>Name</th>
// //             <th>Email</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map(u => (
// //             <tr key={u._id}>
// //               <td>
// //                 <input
// //                   type="checkbox"
// //                   checked={selected.includes(u._id)}
// //                   onChange={() => toggleUser(u._id)}
// //                 />
// //               </td>
              
// //               <td>{u.name}</td>
// //               <td>{u.email}</td>
// //               <button
// //   className="btn btn-danger btn-sm"
// //   onClick={() => handleDelete(u._id)}
// // >
// //   Delete
// // </button>

// //             </tr>
// //           ))}
          
// //         </tbody>
// //       </table>

// //       <button className="btn btn-primary w-100 mt-3" onClick={startSpinner}>
// //         🎡 Start Spinner
// //       </button>
// //     </div>
// //   );
// // }

// // export default MembersPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function MembersPage() {
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState('');
//   const token = localStorage.getItem('token');

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/users', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error('Failed to fetch users', err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this member?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage('User deleted successfully.');
//       fetchUsers(); // ✅ reload list
//     } catch (err) {
//       console.error('Delete failed', err.message);
//       setMessage('Failed to delete user.');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>👥 Manage Members</h3>
//       {message && <div className="alert alert-info">{message}</div>}

//       <table className="table table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id}>
//               <td>{u.name}</td>
//               <td>{u.email}</td>
//               <td>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(u._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default MembersPage;














import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MembersPage() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('User deleted successfully.');
      fetchUsers();
    } catch (err) {
      console.error('Delete failed', err.message);
      setMessage('Failed to delete user.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">👥 Manage Members</h3>
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
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembersPage;
