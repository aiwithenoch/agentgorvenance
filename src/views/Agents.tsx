import { useState } from 'react';

type Agent = {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'blocked';
  sessions: number;
  violations: number;
  rulesApplied: string[];
  uptime: string;
};

const AGENTS: Agent[] = [
  {
    id: 'agent-001',
    name: 'navigator-1',
    type: 'Web Navigator',
    status: 'active',
    sessions: 24,
    violations: 0,
    rulesApplied: ['EU GDPR', 'OWASP LLM'],
    uptime: '4h 22m',
  },
  {
    id: 'agent-002',
    name: 'web-crawler-4',
    type: 'Data Crawler',
    status: 'active',
    sessions: 87,
    violations: 1,
    rulesApplied: ['NIST RMF', 'India IT Rules 2026', 'OWASP LLM'],
    uptime: '2h 05m',
  },
  {
    id: 'agent-003',
    name: 'code-executor-2',
    type: 'Code Execution',
    status: 'idle',
    sessions: 12,
    violations: 0,
    rulesApplied: ['OWASP LLM', 'MITRE ATLAS'],
    uptime: '—',
  },
  {
    id: 'agent-004',
    name: 'data-analyst-7',
    type: 'Data Analysis',
    status: 'blocked',
    sessions: 3,
    violations: 2,
    rulesApplied: ['EU GDPR', 'Brazil LGPD', 'NIST RMF'],
    uptime: 'Suspended',
  },
  {
    id: 'agent-005',
    name: 'comm-relay-3',
    type: 'Communications',
    status: 'active',
    sessions: 56,
    violations: 0,
    rulesApplied: ['Slack Rights', 'Messaging Allow-Lists'],
    uptime: '7h 14m',
  },
];

export default function Agents() {
  const [selected, setSelected] = useState<string | null>(null);

  const statusPill = (status: Agent['status']) => {
    if (status === 'active') return <span className="pill pill--ok">Active</span>;
    if (status === 'idle') return <span className="pill pill--neutral">Idle</span>;
    return <span className="pill pill--danger">Blocked</span>;
  };

  const selectedAgent = AGENTS.find(a => a.id === selected);

  return (
    <>
      <div className="content-header">
        <div>
          <h1 className="page-title">Agents</h1>
          <p className="page-sub">All agents operating under governance enforcement</p>
        </div>
        <div className="page-meta">
          <span className="pill pill--ok">{AGENTS.filter(a => a.status === 'active').length} Active</span>
          <span className="pill pill--danger">{AGENTS.filter(a => a.status === 'blocked').length} Blocked</span>
          <button className="btn btn-primary btn-sm">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Register Agent
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__label">Total Agents</span>
          <span className="stat-card__value">{AGENTS.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Active Now</span>
          <span className="stat-card__value">{AGENTS.filter(a => a.status === 'active').length}</span>
          <span className="stat-card__delta">Running</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Total Violations</span>
          <span className="stat-card__value">{AGENTS.reduce((s, a) => s + a.violations, 0)}</span>
          <span className="stat-card__delta stat-card__delta--warn">Blocked</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Total Sessions</span>
          <span className="stat-card__value">{AGENTS.reduce((s, a) => s + a.sessions, 0)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ alignItems: 'start' }}>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Type</th>
                <th>Status</th>
                <th>Violations</th>
                <th>Uptime</th>
              </tr>
            </thead>
            <tbody>
              {AGENTS.map(a => (
                <tr
                  key={a.id}
                  onClick={() => setSelected(a.id === selected ? null : a.id)}
                  style={{ cursor: 'pointer', background: selected === a.id ? 'color-mix(in srgb, var(--accent-subtle) 50%, transparent)' : undefined }}
                >
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-strong)', fontSize: '13px' }}>{a.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{a.id}</div>
                  </td>
                  <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{a.type}</td>
                  <td>{statusPill(a.status)}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: a.violations > 0 ? 'var(--warn)' : 'var(--ok)', fontFamily: 'var(--mono)' }}>
                      {a.violations}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--muted)' }}>{a.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {selectedAgent ? (
          <div className="card animate-in">
            <div className="card__header">
              <div>
                <div className="card__title">{selectedAgent.name}</div>
                <div className="card__sub">{selectedAgent.type}</div>
              </div>
              {statusPill(selectedAgent.status)}
            </div>

            <div className="stack" style={{ gap: '16px' }}>
              <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="stat-card">
                  <span className="stat-card__label">Sessions</span>
                  <span className="stat-card__value" style={{ fontSize: '20px' }}>{selectedAgent.sessions}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-card__label">Violations</span>
                  <span className="stat-card__value" style={{ fontSize: '20px', color: selectedAgent.violations > 0 ? 'var(--warn)' : 'var(--ok)' }}>{selectedAgent.violations}</span>
                </div>
              </div>

              <div>
                <div className="label">Active Rules</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedAgent.rulesApplied.map(r => (
                    <span key={r} className="pill pill--accent" style={{ fontSize: '11px' }}>{r}</span>
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label className="label">Agent ID</label>
                <div className="code-block" style={{ fontSize: '12px', padding: '8px 12px' }}>{selectedAgent.id}</div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>View Logs</button>
                {selectedAgent.status === 'blocked'
                  ? <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Unblock</button>
                  : <button className="btn btn-ghost btn-sm" style={{ flex: 1, color: 'var(--danger)' }}>Suspend</button>
                }
              </div>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state__icon">
                <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="empty-state__title">Select an agent</div>
              <div className="empty-state__sub">Click on an agent in the table to view its details and governance profile.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
