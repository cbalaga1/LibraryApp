import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSignout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', margin: '0 1rem' }}>Home</Link>

      <div>
        <Link to="/books" style={{ color: '#fff', margin: '0 1rem' }}>Book List</Link>
        <Link to="/add" style={{ color: '#fff', margin: '0 1rem' }}>Add Book</Link>

        {user ? (
          <>
            <Link to="/users" style={{ color: '#fff', margin: '0 1rem' }}>Users</Link>
            <Link to="/profile" style={{ color: '#fff', margin: '0 1rem' }}>My Profile</Link>
            <button onClick={handleSignout} style={{ color: '#fff', margin: '0 1rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              Signout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" style={{ color: '#fff', margin: '0 1rem' }}>Sign In</Link>
            <Link to="/signup" style={{ color: '#fff', margin: '0 1rem' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
