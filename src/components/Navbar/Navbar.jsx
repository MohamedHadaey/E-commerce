import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { numOfCartItems } = useContext(CartContext);

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Left side: Logo, Site Name, and Navigation Links */}
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Site Logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links navbar-links-left px-5">
          <Link to="/home" className={`navbar-link${isActive("/home") ? " active" : ""}`}>Home</Link>
          <Link to="/products" className={`navbar-link${isActive("/products") ? " active" : ""}`}>Products</Link>
          <Link to="/categories" className={`navbar-link${isActive("/categories") ? " active" : ""}`}>Categories</Link>
          <Link to="/brands" className={`navbar-link${isActive("/brands") ? " active" : ""}`}>Brands</Link>
        </div>
      </div>
      {/* Right side: Social Icons */}
      <div className="navbar-social flex-row">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="Facebook">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="Twitter">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="Instagram">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://linkedIn.com" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="LinkedIn">
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        {token ? (
          <span className="navbar-link navbar-social-icon hover:cursor-pointer cart-icon  ">
            <Link to="/cart" className={`navbar-link${isActive("/cart") ? " active" : ""}`}>
              <i className="fa-solid fa-cart-shopping"></i>
              {/* <span className='badge bg-main text-white'>{numOfCartItems}</span> */}
              {numOfCartItems > 0 && (<span className="cart-items-number"> {numOfCartItems} </span>)}
            </Link>
          </span>
        ) : (
          ""
        )}
        {token ? (
          <span
            onClick={logOut}
            className="navbar-link navbar-social-icon hover:cursor-pointer"
            aria-label="logout"
          >
            Logout
          </span>
        ) : (
          <Link
            to="/login"
            className={`navbar-link${isActive("/login") ? " active" : ""} navbar-social-icon`}
            aria-label="Login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}