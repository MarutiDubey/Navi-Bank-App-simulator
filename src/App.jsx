import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Home from './screens/Home';
import History from './screens/History';
import Statements from './screens/Statements';
import Settings from './screens/Settings';
import Profile from './screens/Profile';
import BottomNav from './components/BottomNav';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname === '/' || location.pathname === '/login';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      width: '100vw',
      overflow: 'hidden',
      maxWidth: '480px',
      margin: '0 auto',
      position: 'relative',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 0 30px rgba(0,0,0,0.1)'
    }}>
      <div style={{ flex: 1, overflowY: 'auto' }} className="hide-scrollbar">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/statements" element={<Statements />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
