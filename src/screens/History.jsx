import React, { useState, useMemo } from 'react';
import { transactions } from '../data/transactions';
import { useApp } from '../context/AppContext';
import { TxIcon } from '../components/UI';
import { Search, X, MoreVertical } from 'lucide-react';

const FILTERS = ['All', 'Deposits', 'Withdrawals', 'Payments'];

const formatDateHeader = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const History = () => {
  const { currency } = useApp();
  const [filter, setFilter] = useState('All');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let data = [...transactions];
    if (filter === 'Deposits') data = data.filter(t => t.amount > 0);
    else if (filter === 'Withdrawals') data = data.filter(t => t.amount < 0 && t.type === 'withdrawal');
    else if (filter === 'Payments') data = data.filter(t => t.type === 'payment');
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(t => t.merchant.toLowerCase().includes(q) || t.reference.toLowerCase().includes(q));
    }
    return data;
  }, [filter, query]);

  // Group by date
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(t => {
      if (!map[t.date]) map[t.date] = [];
      map[t.date].push(t);
    });
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="screen-header">
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--color-text-dark)' }}>
          Transaction History
        </h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Search size={20} color="var(--color-text-gray)" onClick={() => setSearchOpen(v => !v)} style={{ cursor: 'pointer' }} />
          <MoreVertical size={20} color="var(--color-text-gray)" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            backgroundColor: 'var(--color-card-light)', borderRadius: '12px', padding: '10px 14px'
          }}>
            <Search size={16} color="var(--color-text-gray)" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search transactions..."
              style={{
                border: 'none', background: 'transparent', fontSize: '14px',
                color: 'var(--color-text-dark)', outline: 'none', flex: 1
              }}
            />
            {query && <X size={16} color="var(--color-text-gray)" onClick={() => setQuery('')} style={{ cursor: 'pointer' }} />}
          </div>
        </div>
      )}

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '10px', padding: '12px 16px', overflowX: 'auto', borderBottom: '1px solid var(--color-border)' }} className="hide-scrollbar">
        {FILTERS.map(f => (
          <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }} className="hide-scrollbar">
        {grouped.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-gray)' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
            <p style={{ fontSize: '15px', fontWeight: '600' }}>No transactions found</p>
          </div>
        ) : (
          grouped.map(([date, txs]) => (
            <div key={date}>
              <div style={{
                fontSize: '13px', fontWeight: '700', color: 'var(--color-text-gray)',
                padding: '16px 0 8px', display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <span>▾</span> {formatDateHeader(date)}
              </div>
              {txs.map(tx => (
                <div key={tx.id} style={{
                  display: 'flex', gap: '12px', alignItems: 'center',
                  padding: '14px 0', borderBottom: '1px solid var(--color-border)',
                  cursor: 'pointer'
                }}>
                  <TxIcon type={tx.type} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: '2px' }}>
                      {tx.merchant}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-gray)', marginBottom: '1px' }}>
                      {tx.reference}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--color-label-gray)' }}>
                      {tx.time}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      fontSize: '15px', fontWeight: '700',
                      color: tx.amount > 0 ? 'var(--color-green)' : 'var(--color-text-dark)',
                      marginBottom: '4px'
                    }}>
                      {tx.amount > 0 ? '+' : ''}{currency}{Math.abs(tx.amount).toFixed(2)}
                    </p>
                    <span style={{
                      fontSize: '11px', fontWeight: '600', color: '#2E8B3C',
                      backgroundColor: '#E8F5E9', padding: '2px 8px', borderRadius: '6px'
                    }}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
