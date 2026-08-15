import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState(() => {
    try { return localStorage.getItem('navi_pin') || '1234'; } catch { return '1234'; }
  });
  const [lastGeneratedReceipt, setLastGeneratedReceipt] = useState(null);

  const login = (enteredPin) => {
    if (enteredPin === pin) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const resetPin = (newPin) => {
    setPin(newPin);
    try { localStorage.setItem('navi_pin', newPin); } catch {}
  };

  const generateReceipt = () => {
    const now = new Date();
    if (lastGeneratedReceipt) {
      const hoursSince = Math.abs(now - lastGeneratedReceipt) / 36e5;
      if (hoursSince < 6) {
        return { success: false, message: 'Free users can generate 1 receipt every 6 hours' };
      }
    }
    setLastGeneratedReceipt(now);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, resetPin, generateReceipt, lastGeneratedReceipt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
