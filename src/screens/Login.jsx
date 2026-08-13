import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
  const [pin, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();
  const { login, resetPin } = useAuth();

  const handleLogin = () => {
    if (login(pin)) {
      navigate('/home');
    } else {
      setError(true);
      setPinInput('');
    }
  };

  const handleResetPin = () => {
    if (newPin.length === 4 && newPin === confirmPin) {
      resetPin(newPin);
      setResetSuccess(true);
      setTimeout(() => {
        setShowReset(false);
        setNewPin('');
        setConfirmPin('');
        setResetSuccess(false);
      }, 1500);
    }
  };

  if (showReset) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', minHeight: '100%',
        padding: '48px 24px', backgroundColor: 'var(--color-background)', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
          <div style={{
            width: '32px', height: '32px', backgroundColor: '#2E8B3C',
            borderRadius: '6px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px', fontFamily: 'serif'
          }}>n</div>
          <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text-dark)' }}>navi</span>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '8px', textAlign: 'center' }}>
          Reset PIN
        </h1>
        <p style={{ color: 'var(--color-text-gray)', fontSize: '14px', textAlign: 'center', marginBottom: '32px' }}>
          Enter a new 4-digit PIN
        </p>

        {resetSuccess ? (
          <div style={{
            backgroundColor: '#E8F5E9', borderRadius: '12px',
            padding: '20px', textAlign: 'center', color: '#2E8B3C', fontWeight: '600'
          }}>
            ✓ PIN Updated Successfully!
          </div>
        ) : (
          <>
            <div style={{ width: '100%', maxWidth: '300px', marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: 'var(--color-text-gray)', marginBottom: '6px', display: 'block' }}>New PIN</label>
              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                style={{
                  width: '100%', border: '1.5px solid var(--color-border)',
                  borderRadius: '12px', padding: '14px 16px',
                  fontSize: '22px', outline: 'none', letterSpacing: '8px',
                  backgroundColor: 'var(--color-card-light)', fontFamily: 'Poppins, sans-serif',
                  color: 'var(--color-text-dark)'
                }}
              />
            </div>
            <div style={{ width: '100%', maxWidth: '300px', marginBottom: '32px' }}>
              <label style={{ fontSize: '13px', color: 'var(--color-text-gray)', marginBottom: '6px', display: 'block' }}>Confirm PIN</label>
              <input
                type="password"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                style={{
                  width: '100%', border: '1.5px solid var(--color-border)',
                  borderRadius: '12px', padding: '14px 16px',
                  fontSize: '22px', outline: 'none', letterSpacing: '8px',
                  backgroundColor: 'var(--color-card-light)', fontFamily: 'Poppins, sans-serif',
                  color: 'var(--color-text-dark)'
                }}
              />
            </div>

            <button
              onClick={handleResetPin}
              disabled={newPin.length < 4 || newPin !== confirmPin}
              style={{
                width: '100%', maxWidth: '300px',
                backgroundColor: (newPin.length === 4 && newPin === confirmPin) ? '#202A87' : '#A0A4C9',
                color: 'white', border: 'none', borderRadius: '28px',
                padding: '16px', fontSize: '17px', fontWeight: '700',
                cursor: (newPin.length === 4 && newPin === confirmPin) ? 'pointer' : 'not-allowed',
                marginBottom: '16px', fontFamily: 'Poppins, sans-serif'
              }}
            >
              Update PIN
            </button>
            <span
              onClick={() => setShowReset(false)}
              style={{ color: 'var(--color-primary)', cursor: 'pointer', fontSize: '15px', fontWeight: '600' }}
            >
              ← Back to Login
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100%',
      padding: '48px 24px', backgroundColor: 'var(--color-background)', alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '56px' }}>
        <div style={{
          width: '36px', height: '36px', backgroundColor: '#2E8B3C',
          borderRadius: '8px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '22px', fontFamily: 'serif'
        }}>n</div>
        <span style={{ fontSize: '26px', fontWeight: '700', color: 'var(--color-text-dark)' }}>navi</span>
      </div>

      <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '32px' }}>
        Enter PIN
      </h1>

      {/* PIN Input */}
      <div style={{ width: '100%', maxWidth: '300px', marginBottom: '6px' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          border: `2px solid ${error ? 'var(--color-red)' : 'var(--color-border)'}`,
          borderRadius: '14px', padding: '14px 16px',
          backgroundColor: 'var(--color-card-light)', gap: '12px',
          transition: 'border-color 0.2s'
        }}>
          <Lock size={20} color={error ? 'var(--color-red)' : 'var(--color-text-gray)'} />
          <input
            type={showPin ? 'text' : 'password'}
            value={pin}
            onChange={(e) => {
              setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4));
              setError(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && pin.length === 4 && handleLogin()}
            placeholder="••••"
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontSize: '28px', outline: 'none',
              letterSpacing: showPin ? '6px' : '10px',
              color: error ? 'var(--color-red)' : 'var(--color-text-dark)',
              fontWeight: '700', fontFamily: 'Poppins, sans-serif'
            }}
          />
          <div onClick={() => setShowPin(!showPin)} style={{ cursor: 'pointer', padding: '4px', lineHeight: 0 }}>
            {showPin ? <Eye size={20} color="var(--color-text-gray)" /> : <EyeOff size={20} color="var(--color-text-gray)" />}
          </div>
        </div>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', width: '100%', maxWidth: '300px' }}>
          <AlertCircle size={14} color="var(--color-red)" />
          <span style={{ color: 'var(--color-red)', fontSize: '13px' }}>Incorrect PIN. Try again.</span>
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '300px', textAlign: 'right', marginBottom: '36px' }}>
        <span style={{ color: 'var(--color-text-gray)', fontSize: '13px' }}>{pin.length}/4</span>
      </div>

      <button
        onClick={handleLogin}
        disabled={pin.length < 4}
        style={{
          width: '100%', maxWidth: '300px',
          backgroundColor: pin.length === 4 ? '#202A87' : '#A0A4C9',
          color: 'white', border: 'none', borderRadius: '28px',
          padding: '17px', fontSize: '18px', fontWeight: '700',
          cursor: pin.length === 4 ? 'pointer' : 'not-allowed',
          marginBottom: '24px', fontFamily: 'Poppins, sans-serif',
          boxShadow: pin.length === 4 ? '0 4px 16px rgba(32,42,135,0.3)' : 'none',
          transition: 'all 0.2s'
        }}
      >
        Login
      </button>

      <span
        onClick={() => setShowReset(true)}
        style={{
          color: 'var(--color-primary)', textDecoration: 'underline',
          fontWeight: '600', cursor: 'pointer', fontSize: '15px'
        }}
      >
        Reset PIN
      </span>

      <p style={{ marginTop: '40px', color: 'var(--color-text-gray)', fontSize: '12px', textAlign: 'center' }}>
        Default PIN: <strong>1234</strong>
      </p>
    </div>
  );
};

export default Login;
