// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function AdminDashboard() {
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
//       console.error('Error fetching users:', err.message);
//     }
//   };

//   const promoteUser = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/users/${id}/promote`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage('User promoted to admin');
//       fetchUsers();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage('User deleted');
//       fetchUsers();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-3 text-center">Admin Dashboard</h3>
//       {message && <div className="alert alert-success">{message}</div>}

//       <table className="table table-bordered table-striped table-sm">
//         <thead className="table-dark">
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th className="text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td className="text-center">
//                 {user.role !== 'admin' && (
//                   <button
//                     className="btn btn-sm btn-success me-2"
//                     onClick={() => promoteUser(user._id)}
//                   >
//                     Promote
//                   </button>
//                 )}
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => deleteUser(user._id)}
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

// export default AdminDashboard;














import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
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
      console.error('Error fetching users:', err.message);
    }
  };

  const promoteUser = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}/promote`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('User promoted to admin');
      fetchUsers();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('User deleted');
      fetchUsers();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Admin Dashboard</h3>

      {message && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')} />
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="text-center">
                  <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                    {user.role !== 'admin' && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => promoteUser(user._id)}
                      >
                        Promote
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
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

export default AdminDashboard;
