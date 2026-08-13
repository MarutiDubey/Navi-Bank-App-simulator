import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { transactions } from '../data/transactions';
import { NaviLogo, TxIcon } from '../components/UI';
import { Send, Camera, CreditCard, ArrowLeftRight, ChevronRight, Eye, EyeOff } from 'lucide-react';

/* ── Credit Score Gauge ── */
const CreditScoreGauge = () => {
  const score = 850;
  const cx = 110, cy = 110, r = 85;
  const startAngle = 200, endAngle = 340;
  const totalArc = endAngle - startAngle;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const arcPath = (startDeg, endDeg, radius) => {
    const s = toRad(startDeg), e = toRad(endDeg);
    const x1 = cx + radius * Math.cos(s), y1 = cy + radius * Math.sin(s);
    const x2 = cx + radius * Math.cos(e), y2 = cy + radius * Math.sin(e);
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${endDeg - startDeg > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };
  const segments = [
    { color: '#D94343', end: startAngle + totalArc * 0.28 },
    { color: '#F28705', end: startAngle + totalArc * 0.44 },
    { color: '#F5C518', end: startAngle + totalArc * 0.60 },
    { color: '#3B9BF0', end: startAngle + totalArc * 0.76 },
    { color: '#2E8B3C', end: startAngle + totalArc },
  ];
  return (
    <div className="card fade-in" style={{ marginBottom: '20px', textAlign: 'center' }}>
      <p className="section-title" style={{ textAlign: 'left' }}>Your Credit Score</p>
      <svg viewBox="0 0 220 140" width="220" height="140" style={{ overflow: 'visible' }}>
        <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#EEF0FA" strokeWidth="20" strokeLinecap="round" />
        {segments.reduce((acc, seg, i) => {
          const prevEnd = i === 0 ? startAngle : segments[i - 1].end;
          acc.push(<path key={i} d={arcPath(prevEnd, seg.end, r)} fill="none" stroke={seg.color} strokeWidth="20" strokeLinecap={i === segments.length - 1 ? 'round' : 'butt'} />);
          return acc;
        }, [])}
        <text x={cx - r - 10} y={cy + 20} textAnchor="middle" fontSize="11" fill="var(--color-text-gray)">300</text>
        <text x={cx + r + 10} y={cy + 20} textAnchor="middle" fontSize="11" fill="var(--color-text-gray)">850</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="38" fontWeight="700" fill="var(--color-text-dark)">{score}</text>
      </svg>
      <div style={{ display: 'inline-block', backgroundColor: '#E8F5E9', color: '#2E8B3C', padding: '4px 14px', borderRadius: '14px', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>EXCELLENT</div>
    </div>
  );
};

/* ── Quick Action Card ── */
const QuickActionCard = ({ title, icon: Icon }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '96px', justifyContent: 'space-between', cursor: 'pointer', transition: 'transform 0.1s', borderRadius: '16px', padding: '16px' }}
    onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
    onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}
    onPointerLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
    <Icon size={22} color="var(--color-primary)" />
    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-dark)' }}>{title}</span>
  </div>
);

/* ── Account Card — balance hidden by default, tap to reveal ── */
const AccountCard = ({ account, currency, balanceVisible, onToggleBalance }) => (
  <div style={{
    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
    borderRadius: '20px', padding: '22px', color: 'white', marginBottom: '14px',
    boxShadow: '0 6px 20px rgba(31, 40, 127, 0.25)'
  }}>
    {/* Bank name & account number */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
      <span style={{ fontSize: '17px', fontWeight: '700' }}>{account.bankName}</span>
      <span style={{ fontSize: '13px', opacity: 0.7 }}>****{account.accountNumber}</span>
    </div>
    <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '24px' }}>{account.name}</p>

    {/* Balance row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
      {balanceVisible ? (
        <span style={{ fontSize: '30px', fontWeight: '700' }}>
          {currency}{account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      ) : (
        <span style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '4px', opacity: 0.8 }}>
          ••••••
        </span>
      )}
      {/* Eye icon toggle */}
      <div
        onClick={onToggleBalance}
        style={{
          width: '32px', height: '32px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0
        }}
      >
        {balanceVisible
          ? <EyeOff size={15} color="white" />
          : <Eye size={15} color="white" />
        }
      </div>
    </div>

    {/* Hint text */}
    {!balanceVisible && (
      <p style={{ fontSize: '11px', opacity: 0.6, marginBottom: '4px' }}>Tap 👁 to reveal balance</p>
    )}
    <div style={{ fontSize: '13px', opacity: 0.75 }}>Available Balance</div>
  </div>
);

/* ── Home Screen ── */
const Home = () => {
  const navigate = useNavigate();
  const { currency, accounts, balanceVisible, setBalanceVisible } = useApp();

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Morning';
    if (h < 17) return 'Afternoon';
    return 'Evening';
  };

  const recentTxs = transactions.slice(0, 3);

  return (
    <div className="fade-in" style={{ overflowY: 'auto', paddingBottom: '16px' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px 12px', display: 'flex', justifyContent: 'center',
        alignItems: 'center', position: 'sticky', top: 0, background: 'white',
        zIndex: 10, borderBottom: '1px solid var(--color-border)'
      }}>
        <NaviLogo size="md" />
      </div>

      <div style={{ padding: '20px' }}>
        {/* Greeting */}
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '4px' }}>
          Good {getGreeting()}, Manthan
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-gray)', marginBottom: '28px' }}>{currentDate}</p>

        {/* Quick Actions */}
        <p className="section-title">Quick Actions</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
          <QuickActionCard title="Send Money" icon={Send} />
          <QuickActionCard title="Mobile Deposit" icon={Camera} />
          <QuickActionCard title="Pay Bills" icon={CreditCard} />
          <QuickActionCard title="Transfer" icon={ArrowLeftRight} />
        </div>

        {/* Accounts */}
        <p className="section-title">Your Accounts</p>
        {accounts.map(acc => (
          <AccountCard
            key={acc.id}
            account={acc}
            currency={currency}
            balanceVisible={balanceVisible}
            onToggleBalance={() => setBalanceVisible(v => !v)}
          />
        ))}

        {/* Featured Services */}
        <p className="section-title" style={{ marginTop: '10px' }}>Featured Services</p>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }} className="hide-scrollbar">
          {['Personal Banking', 'Trust & Security', 'Premium Rewards', 'Wealth Management'].map(s => (
            <div key={s} style={{ border: '1.5px solid var(--color-primary)', borderRadius: '20px', padding: '8px 14px', color: 'var(--color-primary)', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer' }}>⭐ {s}</div>
          ))}
        </div>

        {/* Credit Score */}
        <CreditScoreGauge />

        {/* Recent Transactions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <p className="section-title" style={{ marginBottom: 0 }}>Recent Transactions</p>
          <span onClick={() => navigate('/history')} style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: '600', cursor: 'pointer' }}>
            See All <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
          </span>
        </div>
        {recentTxs.map(tx => (
          <div key={tx.id} className="card" style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '10px', padding: '14px' }}>
            <TxIcon type={tx.type} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-dark)' }}>{tx.merchant}</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-gray)' }}>{tx.time}</p>
            </div>
            <span style={{ fontSize: '15px', fontWeight: '700', color: tx.amount > 0 ? '#2E8B3C' : 'var(--color-text-dark)' }}>
              {tx.amount > 0 ? '+' : ''}{currency}{Math.abs(tx.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
