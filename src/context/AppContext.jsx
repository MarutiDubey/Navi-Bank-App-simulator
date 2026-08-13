import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#1F287F');
  const [currency, setCurrency] = useState('₹');
  const [language, setLanguage] = useState('English');
  const [biometrics, setBiometrics] = useState(false);
  const [scenario, setScenario] = useState('Demo Banking');

  const themes = {
    Navy: { primary: '#1F287F', light: '#202A87' },
    Green: { primary: '#1A6B3C', light: '#1E7A45' },
    Purple: { primary: '#5B2D8E', light: '#6A3497' },
    Orange: { primary: '#C45E00', light: '#D46800' },
  };

  const currencies = {
    'INR ₹': '₹',
    'USD $': '$',
    'EUR €': '€',
    'GBP £': '£',
  };

  const scenarios = {
    'Demo Banking': { checking: 100.00, savings: 1000.00 },
    'Student': { checking: 250.50, savings: 500.00 },
    'Salary Account': { checking: 12450.00, savings: 45000.00 },
    'High Balance': { checking: 150000.00, savings: 500000.00 },
    'Empty Account': { checking: 0.00, savings: 0.00 },
    'Busy Transaction History': { checking: 5600.00, savings: 22000.00 },
  };

  const [accountBalances, setAccountBalances] = useState({
    checking: 100.00,
    savings: 1000.00,
  });

  const applyScenario = (name) => {
    setScenario(name);
    if (scenarios[name]) {
      setAccountBalances(scenarios[name]);
    }
  };

  const applyTheme = (themeName) => {
    if (themes[themeName]) {
      setPrimaryColor(themes[themeName].primary);
      document.documentElement.style.setProperty('--color-primary', themes[themeName].primary);
      document.documentElement.style.setProperty('--color-primary-light', themes[themeName].light);
    }
  };

  const applyCurrency = (currencyLabel) => {
    setCurrency(currencies[currencyLabel] || '₹');
  };

  return (
    <AppContext.Provider value={{
      primaryColor, currency, language, biometrics, setBiometrics,
      setLanguage, applyTheme, applyCurrency, scenario, applyScenario,
      accountBalances, setAccountBalances, themes, currencies, scenarios,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
