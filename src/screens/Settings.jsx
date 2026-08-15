import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { SectionLabel, SettingsTile } from '../components/UI';
import { Share2, Star, MessageSquare, Check, X } from 'lucide-react';

const THEMES = ['Navy', 'Green', 'Purple', 'Orange'];
const CURRENCIES_LIST = ['INR ₹', 'USD $', 'EUR €', 'GBP £'];
const SCENARIOS_LIST = ['Demo Banking', 'Student', 'Salary Account', 'High Balance', 'Empty Account', 'Busy Transaction History'];
const LANGUAGES = ['English', 'Hindi'];

/* ── Generic Select Bottom Sheet ── */
const SelectModal = ({ title, options, selected, onSelect, onClose }) => (
  <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 200 }}>
    <div style={{ backgroundColor: 'white', borderRadius: '24px 24px 0 0', padding: '24px', width: '100%', maxHeight: '70vh', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '20px' }}>{title}</h2>
      {options.map(opt => (
        <div key={opt} onClick={() => { onSelect(opt); onClose(); }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }}>
          <span style={{ fontSize: '15px', fontWeight: selected === opt ? '700' : '500', color: selected === opt ? 'var(--color-primary)' : 'var(--color-text-dark)' }}>{opt}</span>
          {selected === opt && <span style={{ color: 'var(--color-primary)', fontSize: '18px' }}>✓</span>}
        </div>
      ))}
      <button onClick={onClose} style={{ width: '100%', marginTop: '16px', padding: '14px', borderRadius: '20px', border: '1.5px solid var(--color-border)', backgroundColor: 'white', fontSize: '15px', fontWeight: '600', color: 'var(--color-text-gray)' }}>Cancel</button>
    </div>
  </div>
);

/* ── Delete Confirm Modal ── */
const DeleteModal = ({ onConfirm, onCancel }) => (
  <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '24px' }}>
    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '28px', width: '100%', textAlign: 'center' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗑️</div>
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px', color: 'var(--color-text-dark)' }}>Are you sure?</h2>
      <p style={{ fontSize: '14px', color: 'var(--color-text-gray)', marginBottom: '24px', lineHeight: '1.5' }}>This will permanently delete all local simulator data.</p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={onCancel} style={{ flex: 1, padding: '14px', borderRadius: '20px', border: '1.5px solid var(--color-border)', backgroundColor: 'white', fontSize: '15px', fontWeight: '600', color: 'var(--color-text-gray)' }}>Cancel</button>
        <button onClick={onConfirm} style={{ flex: 1, padding: '14px', borderRadius: '20px', border: 'none', backgroundColor: 'var(--color-red)', fontSize: '15px', fontWeight: '700', color: 'white' }}>Delete</button>
      </div>
    </div>
  </div>
);

/* ── Manage Accounts Modal (Settings only) ── */
const ManageAccountsModal = ({ accounts, currency, onSave, onClose }) => {
  const [localAccounts, setLocalAccounts] = useState(accounts.map(a => ({ ...a, inputVal: a.balance.toFixed(2) })));
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localAccounts.forEach(a => {
      const parsed = parseFloat(a.inputVal);
      if (!isNaN(parsed) && parsed >= 0) onSave(a.id, parsed);
    });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1200);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 200 }}>
      <div style={{ backgroundColor: 'white', borderRadius: '24px 24px 0 0', padding: '28px', width: '100%' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '6px' }}>
          💼 Manage Accounts
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-text-gray)', marginBottom: '24px' }}>
          Set balance for each account (simulator only)
        </p>

        {saved ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>✅</div>
            <p style={{ color: '#2E8B3C', fontWeight: '700' }}>Balances Updated!</p>
          </div>
        ) : (
          <>
            {localAccounts.map((acc, i) => (
              <div key={acc.id} style={{ marginBottom: '20px' }}>
                {/* Account header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-dark)' }}>{acc.bankName}</p>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-gray)' }}>{acc.name} · ****{acc.accountNumber}</p>
                  </div>
                </div>
                {/* Balance input */}
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border)', borderRadius: '14px', padding: '12px 16px', gap: '8px', backgroundColor: 'var(--color-card-light)' }}>
                  <span style={{ fontWeight: '700', color: 'var(--color-text-gray)', fontSize: '18px' }}>{currency}</span>
                  <input
                    type="number"
                    value={acc.inputVal}
                    onChange={e => setLocalAccounts(prev => prev.map((a, idx) => idx === i ? { ...a, inputVal: e.target.value } : a))}
                    style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '20px', fontWeight: '700', color: 'var(--color-text-dark)', outline: 'none', fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
              </div>
            ))}

            <button onClick={handleSave} style={{ width: '100%', padding: '15px', borderRadius: '24px', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '10px' }}>
              Save Changes
            </button>
            <button onClick={onClose} style={{ width: '100%', padding: '12px', border: 'none', background: 'none', fontSize: '15px', color: 'var(--color-text-gray)', fontWeight: '600' }}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/* ── Settings Screen ── */
const Settings = () => {
  const navigate = useNavigate();
  const { applyTheme, applyCurrency, language, setLanguage, biometrics, setBiometrics, scenario, applyScenario, accounts, updateAccountBalance, currency } = useApp();
  const { resetPin } = useAuth();

  const [modal, setModal] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('Navy');
  const [selectedCurrency, setSelectedCurrency] = useState('INR ₹');
  const [newPinVal, setNewPinVal] = useState('');
  const [pinDone, setPinDone] = useState(false);

  const handleDelete = () => { setModal(null); navigate('/login'); };

  const handleChangePinSubmit = () => {
    if (newPinVal.length === 4) {
      resetPin(newPinVal);
      setPinDone(true);
      setTimeout(() => { setModal(null); setNewPinVal(''); setPinDone(false); }, 1500);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="screen-header">
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--color-text-dark)' }}>Settings</h1>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }} className="hide-scrollbar">

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', justifyContent: 'center' }}>
          {[
            { icon: <Share2 size={20} color="white" />, label: 'Share', bg: '#3B9BF0' },
            { icon: <Star size={20} color="white" />, label: 'Rate App', bg: '#2E8B3C' },
            { icon: <MessageSquare size={20} color="white" />, label: 'Feedback', bg: '#F28705' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${item.bg}44` }}>{item.icon}</div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-gray)', fontWeight: '600' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* ── MANAGE ACCOUNTS ── (balance edit is here only) */}
        <SectionLabel text="MANAGE ACCOUNTS" />
        <div className="card" style={{ padding: '4px 16px', marginBottom: '16px' }}>
          <SettingsTile
            icon="💼"
            title="Edit Account Balances"
            subtitle="Set simulated balance for each account"
            onClick={() => setModal('manageAccounts')}
          />
        </div>

        {/* Appearance */}
        <SectionLabel text="APPEARANCE" />
        <div className="card" style={{ padding: '4px 16px', marginBottom: '16px' }}>
          <SettingsTile icon="🎨" title="Theme" subtitle="Choose from our color families" value={selectedTheme} onClick={() => setModal('theme')} />
          <SettingsTile icon="▦" title="Home Screen Style" subtitle="Classic" value="Classic" />
          <SettingsTile icon="🌐" title="Language" subtitle={language} value={language} onClick={() => setModal('language')} />
          <SettingsTile icon="₹" title="Currency" subtitle={selectedCurrency} value={selectedCurrency} onClick={() => setModal('currency')} />
          <SettingsTile icon="✦" title="Scenario Presets" subtitle="Instantly populate app with a full setup" value={scenario} onClick={() => setModal('scenario')} />
        </div>

        {/* Account & Privacy */}
        <SectionLabel text="ACCOUNT & PRIVACY" />
        <div className="card" style={{ padding: '4px 16px', marginBottom: '16px' }}>
          <div className="settings-row">
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--color-card-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👆</div>
            <div style={{ flex: 1 }}><p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text-dark)' }}>Biometrics</p></div>
            <div className={`toggle ${biometrics ? 'on' : ''}`} onClick={() => setBiometrics(v => !v)} />
          </div>
          <SettingsTile icon="🔒" title="Change PIN" onClick={() => setModal('changePin')} />
          <SettingsTile icon="🗑️" title="Delete Account" subtitle="Permanently delete all data" danger onClick={() => setModal('delete')} />
        </div>

        {/* Legal & Support */}
        <SectionLabel text="LEGAL & SUPPORT" />
        <div className="card" style={{ padding: '4px 16px', marginBottom: '24px' }}>
          <SettingsTile icon="🎧" title="Help & Support" />
          <SettingsTile icon="❓" title="FAQ" />
          <SettingsTile icon="📄" title="Terms of Service" />
          <SettingsTile icon="ℹ️" title="Privacy Policy" />
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-label-gray)', marginBottom: '16px' }}>
          Navi Bank Simulator v1.0 · Educational UI Only
        </p>
      </div>

      {/* ── MODALS ── */}
      {modal === 'manageAccounts' && (
        <ManageAccountsModal
          accounts={accounts}
          currency={currency}
          onSave={updateAccountBalance}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'theme' && (
        <SelectModal title="Choose Theme" options={THEMES} selected={selectedTheme}
          onSelect={v => { setSelectedTheme(v); applyTheme(v); }} onClose={() => setModal(null)} />
      )}
      {modal === 'currency' && (
        <SelectModal title="Select Currency" options={CURRENCIES_LIST} selected={selectedCurrency}
          onSelect={v => { setSelectedCurrency(v); applyCurrency(v); }} onClose={() => setModal(null)} />
      )}
      {modal === 'language' && (
        <SelectModal title="Select Language" options={LANGUAGES} selected={language}
          onSelect={v => setLanguage(v)} onClose={() => setModal(null)} />
      )}
      {modal === 'scenario' && (
        <SelectModal title="Scenario Presets" options={SCENARIOS_LIST} selected={scenario}
          onSelect={v => applyScenario(v)} onClose={() => setModal(null)} />
      )}
      {modal === 'delete' && <DeleteModal onConfirm={handleDelete} onCancel={() => setModal(null)} />}
      {modal === 'changePin' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 200 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '24px 24px 0 0', padding: '28px', width: '100%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '20px' }}>Change PIN</h2>
            {pinDone ? (
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
                <p style={{ color: '#2E8B3C', fontWeight: '600' }}>PIN Changed!</p>
              </div>
            ) : (
              <>
                <input type="password" inputMode="numeric" pattern="[0-9]*" value={newPinVal} onChange={e => setNewPinVal(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="Enter new 4-digit PIN"
                  style={{ width: '100%', border: '1.5px solid var(--color-border)', borderRadius: '12px', padding: '14px', fontSize: '22px', letterSpacing: '10px', textAlign: 'center', outline: 'none', marginBottom: '16px', color: 'var(--color-text-dark)' }} />
                <button onClick={handleChangePinSubmit} disabled={newPinVal.length < 4} style={{ width: '100%', padding: '14px', borderRadius: '20px', border: 'none', backgroundColor: newPinVal.length === 4 ? 'var(--color-primary)' : '#A0A4C9', color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '10px' }}>
                  Update PIN
                </button>
                <button onClick={() => setModal(null)} style={{ width: '100%', padding: '12px', border: 'none', background: 'none', fontSize: '15px', color: 'var(--color-text-gray)', fontWeight: '600' }}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
