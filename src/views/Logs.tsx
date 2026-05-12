import { useState } from 'react';

type LogEntry = {
  id: string;
  time: string;
  level: 'info' | 'ok' | 'warn' | 'error';
  agent: string;
  rule?: string;
  msg: string;
};

const ALL_LOGS: LogEntry[] = [
  { id: '1', time: '10:44:02', level: 'ok', agent: 'system', msg: 'Governance engine started — v2.6.0' },
  { id: '2', time: '10:44:05', level: 'ok', agent: 'system', msg: '19 compliance rule sets loaded and verified (SHA-256 OK)' },
  { id: '3', time: '10:44:10', level: 'info', agent: 'navigator-1', msg: 'Agent registered — region: EU, rules: GDPR, OWASP LLM' },
  { id: '4', time: '10:44:15', level: 'info', agent: 'web-crawler-4', msg: 'Agent registered — region: APAC, rules: India IT 2026, NIST RMF' },
  { id: '5', time: '10:45:22', level: 'warn', agent: 'web-crawler-4', rule: 'EU GDPR §17', msg: 'Action flagged: attempted data export without erasure consent token' },
  { id: '6', time: '10:45:22', level: 'error', agent: 'web-crawler-4', rule: 'EU GDPR §17', msg: 'ComplianceAnnihilationError raised — action blocked' },
  { id: '7', time: '10:46:01', level: 'info', agent: 'comm-relay-3', msg: 'Session started — 0 violations in prior 24h window' },
  { id: '8', time: '10:47:30', level: 'ok', agent: 'system', msg: 'Hourly integrity check — all rule file hashes valid' },
  { id: '9', time: '10:49:11', level: 'info', agent: 'code-executor-2', msg: 'Session compacted — 64k tokens reduced to 4.2k summary' },
  { id: '10', time: '10:51:44', level: 'warn', agent: 'data-analyst-7', rule: 'Brazil LGPD Art. 11', msg: 'Sensitive data category detected without explicit purpose declaration' },
  { id: '11', time: '10:51:44', level: 'error', agent: 'data-analyst-7', rule: 'Brazil LGPD Art. 11', msg: 'ComplianceAnnihilationError raised — agent session suspended' },
  { id: '12', time: '10:52:00', level: 'ok', agent: 'system', msg: 'Friday auto-update check — governance rules are current' },
  { id: '13', time: '10:53:18', level: 'info', agent: 'navigator-1', msg: 'Tool call: web_search("public EU carbon credits data") — allowed' },
  { id: '14', time: '10:55:02', level: 'ok', agent: 'comm-relay-3', msg: 'Slack message sent — compliant with messaging allow-list' },
  { id: '15', time: '10:57:45', level: 'info', agent: 'web-crawler-4', msg: 'SemanticRouter: APAC jurisdiction detected in prompt context' },
  { id: '16', time: '10:58:01', level: 'warn', agent: 'web-crawler-4', rule: 'India IT Rules 2026 §7', msg: 'Deepfake content request detected — 2-hour takedown mandate applied' },
  { id: '17', time: '10:58:01', level: 'ok', agent: 'system', msg: 'Content flagged and queued for takedown workflow' },
  { id: '18', time: '10:59:30', level: 'ok', agent: 'navigator-1', msg: 'Session integrity verified — no drift from governance constraints' },
];

export default function Logs() {
  const [levelFilter, setLevelFilter] = useState<'all' | 'info' | 'ok' | 'warn' | 'error'>('all');
  const [search, setSearch] = useState('');

  const filtered = ALL_LOGS.filter(l =>
    (levelFilter === 'all' || l.level === levelFilter) &&
    (l.msg.toLowerCase().includes(search.toLowerCase()) ||
      l.agent.toLowerCase().includes(search.toLowerCase()) ||
      (l.rule || '').toLowerCase().includes(search.toLowerCase()))
  );

  const levelColors = { info: 'var(--info)', ok: 'var(--ok)', warn: 'var(--warn)', error: 'var(--danger)' };

  return (
    <>
      <div className="content-header">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-sub">Governance event trail — all enforcement actions recorded</p>
        </div>
        <div className="page-meta">
          <span className="pill pill--danger">{ALL_LOGS.filter(l => l.level === 'error').length} Errors</span>
          <span className="pill pill--warn">{ALL_LOGS.filter(l => l.level === 'warn').length} Warnings</span>
          <button className="btn btn-secondary btn-sm">Export</button>
        </div>
      </div>

      <div className="filters">
        <input
          className="input"
          style={{ maxWidth: '260px' }}
          placeholder="Search logs…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {(['all', 'info', 'ok', 'warn', 'error'] as const).map(l => (
          <button
            key={l}
            className={`btn btn-sm ${levelFilter === l ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setLevelFilter(l)}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: '4px 0' }}>
        {filtered.map((log) => (
          <div
            key={log.id}
            className="log-line"
            style={{ padding: '10px 20px', borderLeft: `3px solid ${log.level === 'error' || log.level === 'warn' ? levelColors[log.level] : 'transparent'}` }}
          >
            <span className="log-line__time">{log.time}</span>
            <span className={`log-line__level log-line__level--${log.level}`}>{log.level.toUpperCase()}</span>
            <span style={{ fontSize: '12px', color: 'var(--accent-2)', fontWeight: 600, minWidth: '120px', flexShrink: 0 }}>{log.agent}</span>
            {log.rule && (
              <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: 'var(--mono)', flexShrink: 0, background: 'var(--accent-subtle)', padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>
                {log.rule}
              </span>
            )}
            <span className="log-line__msg">{log.msg}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon">
              <svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </div>
            <div className="empty-state__title">No logs match your filters</div>
          </div>
        )}
      </div>
    </>
  );
}
