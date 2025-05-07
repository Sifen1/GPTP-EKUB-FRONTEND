import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MembersPage from './pages/MembersPage';
import SpinnerPage from './pages/SpinnerPage';
import WinnersPage from './pages/WinnersPage';
import PaymentsPage from './pages/PaymentsPage';
import MemberHome from './pages/MemberHome';
import MemberWinners from './pages/MemberWinners';
import MemberSpinner from './pages/MemberSpinner';
import MemberPayments from './pages/MemberPayments';
import PublicHome from './pages/PublicHome';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  const isMember = user?.role === 'member';

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={!user ? <Navigate to="/login" /> : isAdmin ? <Navigate to="/dashboard" /> : <Navigate to="/member" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

        {/* Admin routes */}
        <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/dashboard/members" element={isAdmin ? <MembersPage /> : <Navigate to="/" />} />
        <Route path="/dashboard/spinner" element={isAdmin ? <SpinnerPage /> : <Navigate to="/" />} />
        <Route path="/dashboard/payments" element={isAdmin ? <PaymentsPage /> : <Navigate to="/" />} />
        <Route path="/dashboard/winners" element={isAdmin ? <WinnersPage /> : <Navigate to="/" />} />

        {/* Member-only routes */}
        <Route path="/member" element={isMember ? <MemberHome /> : <Navigate to="/" />} />
        <Route path="/member/spinner" element={isMember ? <MemberSpinner /> : <Navigate to="/" />} />
        <Route path="/member/winners" element={isMember ? <MemberWinners /> : <Navigate to="/" />} />
        <Route path="/member/payments" element={isMember ? <MemberPayments /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
