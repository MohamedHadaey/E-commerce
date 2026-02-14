import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/freshcart-logo.svg";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { numOfCartItems } = useContext(CartContext);
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language?.startsWith("ar") ? "ar" : "en";

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  function toggleLanguage() {
    const nextLang = currentLang === "en" ? "ar" : "en";
    i18n.changeLanguage(nextLang);
    localStorage.setItem("i18nextLng", nextLang);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt={t("navbar.siteLogo")} className="navbar-logo" />
        </Link>
        <div className="navbar-links navbar-links-left px-5">
          <Link to="/home" className={`navbar-link${isActive("/home") ? " active" : ""}`}>{t("navbar.home")}</Link>
          <Link to="/products" className={`navbar-link${isActive("/products") ? " active" : ""}`}>{t("navbar.products")}</Link>
          <Link to="/categories" className={`navbar-link${isActive("/categories") ? " active" : ""}`}>{t("navbar.categories")}</Link>
          <Link to="/brands" className={`navbar-link${isActive("/brands") ? " active" : ""}`}>{t("navbar.brands")}</Link>
          <Link to="/allorders" className={`navbar-link${isActive("/allorders") ? " active" : ""}`}>{t("navbar.orders")}</Link>
        </div>
      </div>
      <div className="navbar-social flex-row">
        <button
          type="button"
          onClick={toggleLanguage}
          className="lang-toggle"
          aria-label={currentLang === "en" ? "Switch to Arabic" : "Switch to English"}
          title={currentLang === "en" ? "العربية" : "English"}
        >
          {currentLang === "en" ? "EN" : "AR"}
        </button>
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
            {t("navbar.logout")}
          </span>
        ) : (
          <Link
            to="/login"
            className={`navbar-link${isActive("/login") ? " active" : ""} navbar-social-icon`}
            aria-label={t("navbar.login")}
          >
            {t("navbar.login")}
          </Link>
        )}
      </div>
    </nav>
  );
}
