import { useState } from 'react';

type Session = {
  id: string;
  agent: string;
  status: 'active' | 'idle' | 'compacted' | 'archived';
  started: string;
  duration: string;
  tokens: number;
  violations: number;
  region: string;
};

const SESSIONS: Session[] = [
  { id: 'sess-8a3f', agent: 'navigator-1', status: 'active', started: '10:02:14', duration: '42m', tokens: 18420, violations: 0, region: 'EU' },
  { id: 'sess-2c1d', agent: 'web-crawler-4', status: 'active', started: '09:55:01', duration: '49m', tokens: 31200, violations: 1, region: 'APAC' },
  { id: 'sess-f7e2', agent: 'comm-relay-3', status: 'idle', started: '09:41:22', duration: '1h 03m', tokens: 8800, violations: 0, region: 'NA' },
  { id: 'sess-b9d0', agent: 'code-executor-2', status: 'compacted', started: '08:30:00', duration: '1h 28m', tokens: 64000, violations: 0, region: 'Global' },
  { id: 'sess-4a1c', agent: 'data-analyst-7', status: 'archived', started: '07:12:44', duration: '2h 11m', tokens: 92400, violations: 2, region: 'EU/BR' },
  { id: 'sess-c3e8', agent: 'navigator-1', status: 'archived', started: '06:00:00', duration: '1h 12m', tokens: 24100, violations: 0, region: 'NA' },
  { id: 'sess-d5f0', agent: 'web-crawler-4', status: 'archived', started: '05:10:33', duration: '50m', tokens: 15300, violations: 0, region: 'APAC' },
];

export default function Sessions() {
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('all');

  const filtered = SESSIONS.filter(s => {
    if (filter === 'active') return s.status === 'active' || s.status === 'idle';
    if (filter === 'archived') return s.status === 'archived' || s.status === 'compacted';
    return true;
  });

  const statusPill = (status: Session['status']) => {
    if (status === 'active') return <span className="pill pill--ok">Active</span>;
    if (status === 'idle') return <span className="pill pill--neutral">Idle</span>;
    if (status === 'compacted') return <span className="pill pill--accent">Compacted</span>;
    return <span className="pill pill--neutral" style={{ opacity: 0.6 }}>Archived</span>;
  };

  const totalTokens = SESSIONS.reduce((s, sess) => s + sess.tokens, 0);
  const activeSessions = SESSIONS.filter(s => s.status === 'active' || s.status === 'idle').length;

  return (
    <>
      <div className="content-header">
        <div>
          <h1 className="page-title">Sessions</h1>
          <p className="page-sub">All governance-monitored agent sessions</p>
        </div>
        <div className="page-meta">
          <span className="pill pill--ok">{activeSessions} Running</span>
          <button className="btn btn-secondary btn-sm">
            <svg viewBox="0 0 24 24"><polyline points="21 15 21 21 15 21"/><polyline points="3 9 3 3 9 3"/><path d="M21 3 3 21"/></svg>
            Compact All
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__label">Total Sessions</span>
          <span className="stat-card__value">{SESSIONS.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Active</span>
          <span className="stat-card__value">{activeSessions}</span>
          <span className="stat-card__delta">Running now</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Total Tokens</span>
          <span className="stat-card__value">{(totalTokens / 1000).toFixed(0)}k</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Violations</span>
          <span className="stat-card__value">{SESSIONS.reduce((s, sess) => s + sess.violations, 0)}</span>
          <span className="stat-card__delta stat-card__delta--warn">Blocked</span>
        </div>
      </div>

      <div className="filters">
        <button className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('all')}>All</button>
        <button className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('active')}>Active</button>
        <button className={`btn btn-sm ${filter === 'archived' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('archived')}>Archived</button>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Agent</th>
              <th>Region</th>
              <th>Status</th>
              <th>Started</th>
              <th>Duration</th>
              <th>Tokens</th>
              <th>Violations</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <span className="mono" style={{ fontSize: '12px', color: 'var(--accent)' }}>{s.id}</span>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{s.agent}</td>
                <td>
                  <span className="pill pill--neutral" style={{ fontSize: '11px' }}>{s.region}</span>
                </td>
                <td>{statusPill(s.status)}</td>
                <td className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>{s.started}</td>
                <td className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>{s.duration}</td>
                <td className="mono" style={{ fontSize: '12px' }}>{(s.tokens / 1000).toFixed(1)}k</td>
                <td>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--mono)', fontSize: '12px', color: s.violations > 0 ? 'var(--warn)' : 'var(--muted)' }}>
                    {s.violations}
                  </span>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm" style={{ fontSize: '11px' }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
