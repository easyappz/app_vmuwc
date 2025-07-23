import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="layout-logo">
          <h1 onClick={() => navigate('/feed')}>ВКонтакте</h1>
        </div>
        <div className="layout-search">
          <input type="text" placeholder="Поиск" />
        </div>
        <div className="layout-user-menu">
          {user && (
            <div className="layout-user-info">
              <span>{user.firstName} {user.lastName}</span>
              <button onClick={handleLogout} className="layout-logout-button">Выйти</button>
            </div>
          )}
        </div>
      </header>
      <main className="layout-main">
        {children}
      </main>
      <footer className="layout-footer">
        <p>© 2023 ВКонтакте</p>
      </footer>
    </div>
  );
};

export default Layout;
