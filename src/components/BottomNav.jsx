import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, History, FileText, Settings, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/history', label: 'History', icon: History },
    { path: '/statements', label: 'Statements', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      height: '85px',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      paddingBottom: '10px' // For safe area
    }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname.startsWith(tab.path);
        const color = isActive ? 'var(--color-primary)' : 'var(--color-text-gray)';
        
        return (
          <div 
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '60px'
            }}
          >
            <Icon size={24} color={color} style={{ marginBottom: '4px' }} />
            <span style={{ fontSize: '12px', fontWeight: isActive ? 600 : 400, color }}>
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
