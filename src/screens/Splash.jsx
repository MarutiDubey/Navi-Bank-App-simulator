import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NaviLogo } from '../components/UI';

const Splash = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isAuthenticated ? '/home' : '/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100dvh', backgroundColor: '#FFFFFF',
      flexDirection: 'column', gap: '16px'
    }}>
      <NaviLogo size="lg" />
    </div>
  );
};

export default Splash;
