import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronRight } from 'lucide-react';

const Field = ({ label, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  const handleSave = () => { onSave(val); setEditing(false); };

  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid var(--color-border)' }}>
      <p style={{ fontSize: '12px', color: 'var(--color-text-gray)', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </p>
      {editing ? (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
          <input
            autoFocus type="text" value={val} onChange={e => setVal(e.target.value)}
            style={{ flex: 1, border: '1.5px solid var(--color-primary)', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', outline: 'none', color: 'var(--color-text-dark)' }}
          />
          <button onClick={handleSave} style={{ backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 16px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Save</button>
          <button onClick={() => { setEditing(false); setVal(value); }} style={{ backgroundColor: 'var(--color-card-light)', color: 'var(--color-text-gray)', border: 'none', borderRadius: '10px', padding: '8px 12px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>✕</button>
        </div>
      ) : (
        <div onClick={() => setEditing(true)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', cursor: 'pointer' }}>
          <span style={{ fontSize: '15px', color: val ? 'var(--color-text-dark)' : 'var(--color-label-gray)', fontWeight: val ? '500' : '400' }}>
            {val || `Add ${label.toLowerCase()}`}
          </span>
          <ChevronRight size={16} color="var(--color-label-gray)" />
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [fields, setFields] = useState({
    name: '',
    displayName: 'Manthan',
    email: '',
    phone: '',
    address: '',
  });

  const update = (key, val) => setFields(f => ({ ...f, [key]: val }));

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="screen-header">
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--color-text-dark)' }}>Profile</h1>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px' }} className="hide-scrollbar">

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            backgroundColor: '#E0E4FF', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '36px', fontWeight: '700',
            color: 'var(--color-primary)', marginBottom: '12px',
            boxShadow: '0 4px 16px rgba(31,40,127,0.15)'
          }}>
            {(fields.displayName || 'U')[0].toUpperCase()}
          </div>
          <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '4px' }}>
            {fields.displayName || 'User'}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-gray)' }}>Member Since 2024</p>
        </div>

        {/* Personal Info */}
        <div className="card" style={{ padding: '4px 16px', marginBottom: '16px' }}>
          <p style={{
            fontSize: '12px', fontWeight: '700', color: 'var(--color-label-gray)',
            letterSpacing: '1px', padding: '14px 0 6px', textTransform: 'uppercase'
          }}>
            PERSONAL INFORMATION
          </p>
          <Field label="Name" value={fields.name} onSave={v => update('name', v)} />
          <Field label="Display Name" value={fields.displayName} onSave={v => update('displayName', v)} />
        </div>

        {/* Contact Info */}
        <div className="card" style={{ padding: '4px 16px', marginBottom: '24px' }}>
          <p style={{
            fontSize: '12px', fontWeight: '700', color: 'var(--color-label-gray)',
            letterSpacing: '1px', padding: '14px 0 6px', textTransform: 'uppercase'
          }}>
            CONTACT INFORMATION
          </p>
          <Field label="Email" value={fields.email} onSave={v => update('email', v)} />
          <Field label="Phone" value={fields.phone} onSave={v => update('phone', v)} />
          <Field label="Address" value={fields.address} onSave={v => update('address', v)} />
        </div>

        {/* Logout */}
        <button onClick={handleLogout} style={{
          width: '100%', padding: '15px', borderRadius: '24px',
          border: '2px solid var(--color-red)', backgroundColor: 'white',
          color: 'var(--color-red)', fontSize: '16px', fontWeight: '700',
          cursor: 'pointer'
        }}>
          Log Out
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-label-gray)', marginTop: '20px' }}>
          This is an educational banking simulator.<br />Not affiliated with Navi.
        </p>
      </div>
    </div>
  );
};

export default Profile;
