import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const DEFAULT_ACCOUNTS = [
  { id: 1, bankName: 'SBI Bank', name: 'Savings Account', accountNumber: '4354', balance: 85000.00, type: 'Savings' },
  { id: 2, bankName: 'SBI Bank', name: 'Basic Checking', accountNumber: '1234', balance: 23500.00, type: 'Checking' },
];

const loadFromStorage = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch { return fallback; }
};

export const AppProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState(() => loadFromStorage('navi_primaryColor', '#1F287F'));
  const [currency, setCurrency] = useState(() => loadFromStorage('navi_currency', '₹'));
  const [language, setLanguage] = useState(() => loadFromStorage('navi_language', 'English'));
  const [biometrics, setBiometrics] = useState(() => loadFromStorage('navi_biometrics', false));
  const [scenario, setScenario] = useState(() => loadFromStorage('navi_scenario', 'Demo Banking'));

  // Balance visibility — false = hidden (****)
  const [balanceVisible, setBalanceVisible] = useState(false);

  // Editable accounts — only changeable from Settings > Manage Accounts
  const [accounts, setAccounts] = useState(() => loadFromStorage('navi_accounts', DEFAULT_ACCOUNTS));

  // Persist accounts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('navi_accounts', JSON.stringify(accounts));
  }, [accounts]);

  // Persist other settings
  useEffect(() => { localStorage.setItem('navi_currency', JSON.stringify(currency)); }, [currency]);
  useEffect(() => { localStorage.setItem('navi_language', JSON.stringify(language)); }, [language]);
  useEffect(() => { localStorage.setItem('navi_biometrics', JSON.stringify(biometrics)); }, [biometrics]);
  useEffect(() => { localStorage.setItem('navi_scenario', JSON.stringify(scenario)); }, [scenario]);
  useEffect(() => { localStorage.setItem('navi_primaryColor', JSON.stringify(primaryColor)); }, [primaryColor]);

  // Re-apply CSS variables on mount (restores theme after page refresh)
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    // Find and apply the light variant
    const found = Object.values(themes).find(t => t.primary === primaryColor);
    if (found) document.documentElement.style.setProperty('--color-primary-light', found.light);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAccountBalance = (id, newBalance) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, balance: newBalance } : a));
  };

  const themes = {
    Navy:   { primary: '#1F287F', light: '#202A87' },
    Green:  { primary: '#1A6B3C', light: '#1E7A45' },
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
    'Demo Banking':          { checking: 23500.00,  savings: 85000.00  },
    'Student':               { checking: 250.50,    savings: 500.00    },
    'Salary Account':        { checking: 12450.00,  savings: 45000.00  },
    'High Balance':          { checking: 150000.00, savings: 500000.00 },
    'Empty Account':         { checking: 0.00,      savings: 0.00      },
    'Busy Transaction History': { checking: 5600.00, savings: 22000.00 },
  };

  // Keep old accountBalances for backward compat
  const accountBalances = {
    checking: accounts[0]?.balance ?? 0,
    savings:  accounts[1]?.balance ?? 0,
  };

  const setAccountBalances = ({ checking, savings }) => {
    setAccounts(prev => prev.map(a => {
      if (a.id === 1) return { ...a, balance: checking };
      if (a.id === 2) return { ...a, balance: savings };
      return a;
    }));
  };

  const applyScenario = (name) => {
    setScenario(name);
    if (scenarios[name]) {
      setAccountBalances({ checking: scenarios[name].checking, savings: scenarios[name].savings });
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
      // New
      accounts, updateAccountBalance,
      balanceVisible, setBalanceVisible,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
