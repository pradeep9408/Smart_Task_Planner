import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './TopNav.module.css';
import { useAuth } from '../../../context/AuthContext';

const TopNav = ({ productivityScore }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      alert('Failed to log out.');
      console.error(err);
    }
  };

  const userName = currentUser ? currentUser.email.split('@')[0] : 'Guest';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <h1 className={styles.appName}>Smart Task Planner</h1>
        <p className={styles.appTagline}>AI-Powered Productivity</p>
      </div>

      <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      <nav className={`${styles.navigation} ${isMenuOpen ? styles.mobileOpen : ''}`}>
        <ul>
          <li><NavLink to="/" className={({ isActive }) => (isActive ? styles.activeLink : undefined)}>Dashboard</NavLink></li>
          <li><NavLink to="/tasks" className={({ isActive }) => (isActive ? styles.activeLink : undefined)}>Task Manager</NavLink></li>
          <li><NavLink to="/analytics" className={({ isActive }) => (isActive ? styles.activeLink : undefined)}>Analytics</NavLink></li>
          <li><NavLink to="/reports" className={({ isActive }) => (isActive ? styles.activeLink : undefined)}>Reports</NavLink></li>
          <li><NavLink to="/settings" className={({ isActive }) => (isActive ? styles.activeLink : undefined)}>Settings</NavLink></li>
        </ul>
      </nav>

      <div className={styles.userSection}>
        <div className={styles.productivityScore}>
          <p>Productivity Score</p>
          <p className={styles.score}>{productivityScore}%</p>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileSummary} onClick={toggleProfileDropdown}>
            <div className={styles.userAvatar}>
              <i className="fas fa-user-circle"></i>
            </div>
            <div className={styles.userName}>{userName}</div>
            <i className={`fas fa-caret-down ${isProfileDropdownOpen ? styles.rotated : ''}`}></i>
          </div>
          {isProfileDropdownOpen && (
            <div className={styles.profileDropdown}>
              <NavLink to="/profile" className={styles.dropdownItem} onClick={() => setIsProfileDropdownOpen(false)}>
                <i className="fas fa-user-cog"></i> Profile Settings
              </NavLink>
              <div className={styles.dropdownDivider}></div>
              <button className={styles.dropdownItem} onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;