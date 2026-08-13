import React, { useState } from 'react';
import { InfoBox } from '../components/UI';
import { useApp } from '../context/AppContext';
import { Zap, ChevronRight } from 'lucide-react';

const TABS = ['Receipts', 'Documents', 'My Files'];

const CATEGORIES = [
  { icon: '🏦', title: 'Bank Statement', desc: 'Banking documents' },
  { icon: '💸', title: 'Wire Transfer', desc: 'Bank transfers' },
  { icon: '🏧', title: 'ATM Receipt', desc: 'ATM transactions' },
  { icon: '⛽', title: 'Thermal Receipt', desc: 'Gas & convenience' },
  { icon: '🛒', title: 'Grocery Receipt', desc: 'Supermarket receipts' },
  { icon: '✈️', title: 'Travel Receipt', desc: 'Hotels, flights & more' },
  { icon: '🍽️', title: 'Restaurant Receipt', desc: 'Dining & takeout' },
  { icon: '💊', title: 'Medical Receipt', desc: 'Pharmacy & clinics' },
];

const QuickReceipt = ({ currency }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (amount && merchant) {
      setGenerated(true);
      setTimeout(() => { setOpen(false); setGenerated(false); setAmount(''); setMerchant(''); }, 2000);
    }
  };

  if (open) {
    return (
      <div style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'flex-end', zIndex: 100
      }}>
        <div style={{
          backgroundColor: 'white', borderRadius: '24px 24px 0 0',
          padding: '24px', width: '100%', animation: 'fadeIn 0.2s ease'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '20px' }}>
            Quick Receipt
          </h2>
          {generated ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
              <p style={{ color: '#2E8B3C', fontWeight: '600' }}>Receipt Generated!</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', color: 'var(--color-text-gray)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>AMOUNT</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border)', borderRadius: '12px', padding: '12px 14px', gap: '8px' }}>
                  <span style={{ color: 'var(--color-text-gray)', fontWeight: '600' }}>{currency}</span>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
                    style={{ border: 'none', outline: 'none', fontSize: '18px', fontWeight: '600', flex: 1, color: 'var(--color-text-dark)' }} />
                </div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '12px', color: 'var(--color-text-gray)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>MERCHANT</label>
                <input type="text" value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="e.g. Starbucks"
                  style={{ width: '100%', border: '1.5px solid var(--color-border)', borderRadius: '12px', padding: '12px 14px', fontSize: '15px', outline: 'none', color: 'var(--color-text-dark)' }} />
              </div>
              <button onClick={handleGenerate} style={{
                width: '100%', backgroundColor: 'var(--color-primary)', color: 'white',
                border: 'none', borderRadius: '24px', padding: '15px',
                fontSize: '16px', fontWeight: '700', marginBottom: '10px'
              }}>Generate Receipt</button>
              <button onClick={() => setOpen(false)} style={{
                width: '100%', backgroundColor: 'transparent', color: 'var(--color-text-gray)',
                border: 'none', fontSize: '15px', fontWeight: '600', padding: '10px'
              }}>Cancel</button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => setOpen(true)} style={{
      background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
      borderRadius: '20px', padding: '20px', color: 'white', marginBottom: '20px',
      display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer',
      boxShadow: '0 6px 20px rgba(31, 40, 127, 0.2)'
    }}>
      <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '10px' }}>
        <Zap size={24} color="white" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: '700', fontSize: '17px', marginBottom: '4px' }}>Quick Receipt</p>
        <p style={{ fontSize: '13px', opacity: 0.85 }}>Enter an amount, get a receipt instantly</p>
      </div>
      <ChevronRight size={20} color="white" />
    </div>
  );
};

const Statements = () => {
  const [tab, setTab] = useState('Receipts');
  const { currency } = useApp();

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="screen-header">
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--color-text-dark)' }}>Statements</h1>
      </div>

      {/* Segment Tabs */}
      <div style={{ display: 'flex', gap: '6px', padding: '12px 16px', backgroundColor: 'var(--color-card-light)', borderBottom: '1px solid var(--color-border)' }}>
        {TABS.map(t => (
          <button key={t} className={`segment-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }} className="hide-scrollbar">
        {/* Info Box */}
        <InfoBox type="info">
          ✓ Free users can generate 1 receipt or document every 6 hours
        </InfoBox>

        <div style={{ height: '16px' }} />

        {tab === 'Receipts' && (
          <>
            <QuickReceipt currency={currency} />
            <p className="section-title">Document Categories</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {CATEGORIES.map(cat => (
                <div key={cat.title} className="card" style={{ cursor: 'pointer', padding: '16px', borderRadius: '16px' }}
                  onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                  onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  onPointerLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{cat.icon}</div>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '4px' }}>{cat.title}</p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-gray)' }}>{cat.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'Documents' && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-gray)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
            <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>No Documents Yet</p>
            <p style={{ fontSize: '13px' }}>Generated documents will appear here</p>
          </div>
        )}

        {tab === 'My Files' && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-gray)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📁</div>
            <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>No Files Saved</p>
            <p style={{ fontSize: '13px' }}>Your saved files will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statements;
