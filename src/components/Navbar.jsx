// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="navbar navbar-dark bg-dark px-4">
//       <Link to="/" className="navbar-brand">EKUB</Link>

//       <div>
//         {/* Unauthenticated */}
//         {!user && (
//           <>
//             <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
//             <Link to="/register" className="btn btn-outline-light">Register</Link>
//           </>
//         )}

//         {/* Admin Only */}
//         {user?.role === 'admin' && (
//           <>
//             <Link to="/dashboard" className="btn btn-outline-light me-2">Dashboard</Link>
//             <Link to="/dashboard/members" className="btn btn-outline-light me-2">Members</Link>
//             <Link to="/dashboard/spinner" className="btn btn-outline-light me-2">Spinner</Link>
//             <Link to="/dashboard/payments" className="btn btn-outline-light me-2">Payments</Link>
//             <Link to="/dashboard/winners" className="btn btn-outline-light me-2">Winners</Link>
//             <button onClick={logout} className="btn btn-danger">Logout</button>
//           </>
//         )}

//         {/* Member Only */}
//         {user?.role === 'member' && (
//           <>
//             <Link to="/member/spinner" className="btn btn-outline-light me-2">Live Spinner</Link>
//             <Link to="/member/winners" className="btn btn-outline-light me-2">Winners</Link>
//             <Link to="/member/payments" className="btn btn-outline-light me-2">Payments</Link>
//             <button onClick={logout} className="btn btn-danger">Logout</button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">EKUB</Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {!user && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/members" className="nav-link">Members</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/spinner" className="nav-link">Spinner</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/payments" className="nav-link">Payments</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/winners" className="nav-link">Winners</Link>
              </li>
              <li className="nav-item">
                <button onClick={logout} className="btn btn-danger btn-sm ms-lg-3 mt-2 mt-lg-0">Logout</button>
              </li>
            </>
          )}

          {user?.role === 'member' && (
            <>
              <li className="nav-item">
                <Link to="/member/spinner" className="nav-link">Live Spinner</Link>
              </li>
              <li className="nav-item">
                <Link to="/member/winners" className="nav-link">Winners</Link>
              </li>
              <li className="nav-item">
                <Link to="/member/payments" className="nav-link">Payments</Link>
              </li>
              <li className="nav-item">
                <button onClick={logout} className="btn btn-danger btn-sm ms-lg-3 mt-2 mt-lg-0">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
