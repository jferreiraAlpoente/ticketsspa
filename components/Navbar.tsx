// NavBar.tsx
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { logout } from '../lib/api';

const NavBar = () => {
  const router = useRouter();
  const { username } = useContext(AuthContext);


  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid d-flex justify-content-between">
        <a className="navbar-brand" href="/"><img src="/Logo.png" alt="Logo" style={{width:'60px'}} /></a>
        <div className="d-flex align-items-center">
          <span className="navbar-text mx-3">{username}</span>
          <button className="btn btn-light" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

