export default function Overview() {
  const stats = [
    { label: 'Rules Loaded', value: '19', delta: '+2 this week', ok: true },
    { label: 'Agents Monitored', value: '7', delta: '4 active', ok: true },
    { label: 'Sessions Today', value: '142', delta: '+12%', ok: true },
    { label: 'Violations Blocked', value: '3', delta: 'Last 24h', warn: true },
  ];

  const regions = [
    { name: 'EU / GDPR', status: 'active', rules: 3, color: 'var(--info)' },
    { name: 'North America', status: 'active', rules: 4, color: 'var(--ok)' },
    { name: 'Asia Pacific', status: 'active', rules: 5, color: 'var(--accent-2)' },
    { name: 'Middle East', status: 'active', rules: 2, color: 'var(--warn)' },
    { name: 'Africa / AU', status: 'active', rules: 3, color: 'var(--accent)' },
    { name: 'South America', status: 'active', rules: 1, color: 'var(--ok)' },
  ];

  const recentEvents = [
    { time: '09:42:11', level: 'ok' as const, msg: 'Governance engine initialized — 19 rule sets loaded' },
    { time: '09:42:15', level: 'info' as const, msg: 'Agent "navigator-1" registered for monitoring' },
    { time: '09:44:02', level: 'warn' as const, msg: 'Action flagged: data export without consent token (EU/GDPR §17)' },
    { time: '09:44:02', level: 'ok' as const, msg: 'Action blocked — ComplianceAnnihilationError raised' },
    { time: '09:51:30', level: 'info' as const, msg: 'Agent "web-crawler-4" session compacted (3.2k tokens saved)' },
    { time: '10:02:44', level: 'ok' as const, msg: 'Hourly integrity check passed — all SHA-256 signatures valid' },
  ];

  return (
    <>
      <div className="content-header">
        <div>
          <h1 className="page-title">Overview</h1>
          <p className="page-sub">Governance engine status and compliance telemetry</p>
        </div>
        <div className="page-meta">
          <span className="pill pill--ok">
            <span className="status-dot status-dot--online" />
            Engine Active
          </span>
          <button className="btn btn-secondary btn-sm">
            <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Attention banner */}
      <div className="attention-panel">
        <div className="attention-panel__icon">
          <svg viewBox="0 0 24 24"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"/></svg>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-strong)', marginBottom: '2px' }}>
            Absolute Protector — Online
          </div>
          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
            All 19 regional compliance rule sets are active. Cryptographic integrity verified. Agents are being monitored in real-time.
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-card__label">{s.label}</span>
            <span className="stat-card__value">{s.value}</span>
            <span className={`stat-card__delta${s.warn ? ' stat-card__delta--warn' : ''}`}>{s.delta}</span>
          </div>
        ))}
      </div>

      {/* Two-column: regions + recent events */}
      <div className="grid grid-cols-2">
        {/* Regions */}
        <div className="card">
          <div className="card__header">
            <div>
              <div className="card__title">Compliance Regions</div>
              <div className="card__sub">Active jurisdictions being enforced</div>
            </div>
            <span className="pill pill--accent">19 rules</span>
          </div>
          <div className="stack" style={{ gap: '8px' }}>
            {regions.map(r => (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'color-mix(in srgb, var(--bg-elevated) 70%, transparent)',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color, flexShrink: 0, boxShadow: `0 0 0 3px color-mix(in srgb, ${r.color} 18%, transparent)` }} />
                <span style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{r.name}</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{r.rules} {r.rules === 1 ? 'rule' : 'rules'}</span>
                <span className="pill pill--ok" style={{ padding: '2px 7px', fontSize: '11px' }}>Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="card">
          <div className="card__header">
            <div>
              <div className="card__title">Recent Events</div>
              <div className="card__sub">Last governance actions</div>
            </div>
          </div>
          <div>
            {recentEvents.map((e, i) => (
              <div className="log-line" key={i}>
                <span className="log-line__time">{e.time}</span>
                <span className={`log-line__level log-line__level--${e.level}`}>
                  {e.level.toUpperCase()}
                </span>
                <span className="log-line__msg">{e.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Mandates */}
      <div className="card">
        <div className="card__header">
          <div>
            <div className="card__title">Master Security Mandates</div>
            <div className="card__sub">10 core enforcement principles — all active</div>
          </div>
          <span className="pill pill--ok">10 / 10 Active</span>
        </div>
        <div className="note-grid">
          {[
            'VPS SSH Protection', 'Gateway Port Isolation', 'Messaging Allow-Lists',
            'Browser Session Isolation', 'Credential Vault Defense', 'Slack Rights Restriction',
            'Root Access Prevention', 'Prompt Injection Guard', 'Malicious Skill Audit',
            'Continuous Threat Scan',
          ].map((mandate, i) => (
            <div
              key={mandate}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--ok-subtle) 80%, transparent)',
                border: '1px solid color-mix(in srgb, var(--ok) 18%, var(--border) 82%)',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--ok)', width: '18px', textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{mandate}</span>
              <span className="status-dot status-dot--online" style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
