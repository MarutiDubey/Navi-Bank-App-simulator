import React from 'react';

// Navi Logo Wordmark Component
export const NaviLogo = ({ size = 'md' }) => {
  const heights = { sm: 22, md: 30, lg: 40 };
  return (
    <img
      src="/navi-logo.png"
      alt="Navi"
      style={{ height: heights[size], width: 'auto', display: 'block' }}
    />
  );
};

// Settings Tile Component
export const SettingsTile = ({ icon, title, subtitle, value, type = 'arrow', onClick, danger = false }) => {
  return (
    <div className="settings-row" onClick={onClick}>
      {icon && (
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          backgroundColor: danger ? '#FEE2E2' : 'var(--color-card-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', flexShrink: 0
        }}>
          {icon}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '15px', fontWeight: '600',
          color: danger ? 'var(--color-red)' : 'var(--color-text-dark)',
          marginBottom: subtitle ? '2px' : 0
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: '13px', color: 'var(--color-text-gray)', lineHeight: '1.3' }}>
            {subtitle}
          </div>
        )}
      </div>
      {type === 'arrow' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {value && <span style={{ fontSize: '13px', color: 'var(--color-text-gray)' }}>{value}</span>}
          <span style={{ color: 'var(--color-label-gray)', fontSize: '18px', lineHeight: 1 }}>›</span>
        </div>
      )}
    </div>
  );
};

// Transaction Category Icon
export const TxIcon = ({ type }) => {
  const icons = {
    payment: { bg: '#FEF3C7', icon: '💳' },
    deposit: { bg: '#D1FAE5', icon: '📥' },
    withdrawal: { bg: '#FEE2E2', icon: '💸' },
    transfer: { bg: '#E0E7FF', icon: '↔️' },
  };
  const config = icons[type] || icons.payment;
  return (
    <div style={{
      width: '44px', height: '44px', borderRadius: '12px',
      backgroundColor: config.bg, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontSize: '20px', flexShrink: 0
    }}>
      {config.icon}
    </div>
  );
};

// Section Label
export const SectionLabel = ({ text }) => (
  <div style={{
    fontSize: '12px', fontWeight: '700', color: 'var(--color-label-gray)',
    letterSpacing: '1px', paddingTop: '20px', paddingBottom: '6px', textTransform: 'uppercase'
  }}>
    {text}
  </div>
);

// Info Box
export const InfoBox = ({ children, type = 'info' }) => {
  const colors = {
    info: { bg: '#E8F5E9', border: '#2E8B3C', text: '#1A6B3C' },
    warning: { bg: '#FFF8E1', border: '#F28705', text: '#B35900' },
  };
  const c = colors[type];
  return (
    <div style={{
      backgroundColor: c.bg, border: `1px solid ${c.border}`,
      borderRadius: '12px', padding: '12px 14px',
      color: c.text, fontSize: '13px', fontWeight: '500', lineHeight: '1.4'
    }}>
      {children}
    </div>
  );
};
