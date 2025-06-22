import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { token } = useContext(AuthContext)

  return (
    <nav>
      {/* Left side: Logo, Site Name, and Navigation Links */}
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Site Logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links navbar-links-left px-5">
          <Link to="/home" className={`navbar-link${isActive('/home') ? ' active' : ''}`}>Home</Link>
          <Link to="/products" className={`navbar-link${isActive('/products') ? ' active' : ''}`}>Products</Link>
          <Link to="/categories" className={`navbar-link${isActive('/categories') ? ' active' : ''}`}>Categories</Link>
        </div>
      </div>
      {/* Right side: Social Icons */}
      <div className="navbar-social flex-row ">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="Facebook">
          <i className='fa-brands fa-facebook-f'></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="Twitter">
          <i className='fa-brands fa-twitter'></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="Instagram">
          <i className='fa-brands fa-instagram'></i>
        </a>
        <a href="https://linkedIn.com" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="LinkedIn">
          <i className='fa-brands fa-linkedin-in'></i>
        </a>
        {token ? <Link className={`navbar-link navbar-social-icon`} aria-label="logout">
          Logout
        </Link> : <Link to="/login" className={`navbar-link${isActive('/login') ? ' active' : ''} navbar-social-icon`} aria-label="Login">
          Login
        </Link>}
      </div>
    </nav>
  );
}
