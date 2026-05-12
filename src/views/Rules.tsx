import { useState } from 'react';

type Rule = {
  id: string;
  region: string;
  framework: string;
  category: string;
  status: 'active' | 'monitoring';
  forbiddenCount: number;
  allowedCount: number;
  lastUpdated: string;
};

const RULES: Rule[] = [
  { id: 'eu-gdpr', region: 'Europe', framework: 'EU GDPR', category: 'Data Privacy', status: 'active', forbiddenCount: 8, allowedCount: 12, lastUpdated: '2026-01-15' },
  { id: 'eu-ai-act', region: 'Europe', framework: 'EU AI Act 2026', category: 'AI Regulation', status: 'active', forbiddenCount: 11, allowedCount: 9, lastUpdated: '2026-03-01' },
  { id: 'us-hipaa', region: 'North America', framework: 'US HIPAA', category: 'Healthcare', status: 'active', forbiddenCount: 6, allowedCount: 14, lastUpdated: '2026-01-10' },
  { id: 'us-nist', region: 'North America', framework: 'US NIST RMF', category: 'Risk Management', status: 'active', forbiddenCount: 5, allowedCount: 18, lastUpdated: '2026-02-20' },
  { id: 'ca-aida', region: 'North America', framework: 'Canada AIDA', category: 'AI Regulation', status: 'active', forbiddenCount: 7, allowedCount: 11, lastUpdated: '2026-01-28' },
  { id: 'in-it-rules', region: 'Asia Pacific', framework: 'India IT Rules 2026', category: 'Content Moderation', status: 'active', forbiddenCount: 9, allowedCount: 8, lastUpdated: '2026-04-01' },
  { id: 'cn-cyberlaw', region: 'Asia Pacific', framework: 'China Cybersecurity', category: 'Cyber', status: 'active', forbiddenCount: 14, allowedCount: 6, lastUpdated: '2026-01-05' },
  { id: 'sg-pdpa', region: 'Asia Pacific', framework: 'Singapore PDPA', category: 'Data Privacy', status: 'active', forbiddenCount: 5, allowedCount: 13, lastUpdated: '2026-02-14' },
  { id: 'kr-pipa', region: 'Asia Pacific', framework: 'Korea PIPA', category: 'Data Privacy', status: 'active', forbiddenCount: 6, allowedCount: 11, lastUpdated: '2026-01-22' },
  { id: 'vn-cybersec', region: 'Asia Pacific', framework: 'Vietnam Cybersecurity', category: 'Cyber', status: 'monitoring', forbiddenCount: 4, allowedCount: 9, lastUpdated: '2026-03-10' },
  { id: 'sa-pdpl', region: 'Middle East', framework: 'Saudi Arabia PDPL', category: 'Data Privacy', status: 'active', forbiddenCount: 7, allowedCount: 10, lastUpdated: '2026-01-18' },
  { id: 'uae-ai', region: 'Middle East', framework: 'UAE AI Regulation', category: 'AI Regulation', status: 'active', forbiddenCount: 6, allowedCount: 12, lastUpdated: '2026-02-05' },
  { id: 'au-ai', region: 'Africa', framework: 'AU AI Strategy 2026', category: 'AI Regulation', status: 'active', forbiddenCount: 4, allowedCount: 14, lastUpdated: '2026-03-15' },
  { id: 'ng-ndpr', region: 'Africa', framework: 'Nigeria NDPR', category: 'Data Privacy', status: 'active', forbiddenCount: 5, allowedCount: 10, lastUpdated: '2026-01-30' },
  { id: 'za-popia', region: 'Africa', framework: 'South Africa POPIA', category: 'Data Privacy', status: 'active', forbiddenCount: 6, allowedCount: 11, lastUpdated: '2026-02-08' },
  { id: 'ke-dp', region: 'Africa', framework: 'Kenya Data Protection', category: 'Data Privacy', status: 'monitoring', forbiddenCount: 5, allowedCount: 9, lastUpdated: '2026-03-20' },
  { id: 'br-lgpd', region: 'South America', framework: 'Brazil LGPD', category: 'Data Privacy', status: 'active', forbiddenCount: 7, allowedCount: 12, lastUpdated: '2026-01-25' },
  { id: 'owasp-llm', region: 'Global', framework: 'OWASP LLM Top 10', category: 'Security', status: 'active', forbiddenCount: 10, allowedCount: 8, lastUpdated: '2026-04-05' },
  { id: 'mitre-atlas', region: 'Global', framework: 'MITRE ATLAS', category: 'Security', status: 'active', forbiddenCount: 12, allowedCount: 7, lastUpdated: '2026-03-28' },
];

const REGIONS = ['All', 'Europe', 'North America', 'Asia Pacific', 'Middle East', 'Africa', 'South America', 'Global'];

export default function Rules() {
  const [regionFilter, setRegionFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Rule | null>(null);

  const filtered = RULES.filter(r =>
    (regionFilter === 'All' || r.region === regionFilter) &&
    (r.framework.toLowerCase().includes(search.toLowerCase()) || r.region.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <div className="content-header">
        <div>
          <h1 className="page-title">Compliance Rules</h1>
          <p className="page-sub">Regional governance rule sets — {RULES.length} frameworks loaded</p>
        </div>
        <div className="page-meta">
          <span className="pill pill--ok">{RULES.filter(r => r.status === 'active').length} Active</span>
          <span className="pill pill--warn">{RULES.filter(r => r.status === 'monitoring').length} Monitoring</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          className="input"
          style={{ maxWidth: '260px' }}
          placeholder="Search frameworks…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {REGIONS.map(r => (
          <button
            key={r}
            className={`btn ${regionFilter === r ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setRegionFilter(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="card animate-in">
          <div className="card__header">
            <div>
              <div className="card__title">{selected.framework}</div>
              <div className="card__sub">{selected.region} — {selected.category}</div>
            </div>
            <div className="row">
              <span className={`pill ${selected.status === 'active' ? 'pill--ok' : 'pill--warn'}`}>
                {selected.status === 'active' ? 'Active' : 'Monitoring'}
              </span>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>← Back</button>
            </div>
          </div>
          <div className="grid grid-cols-2" style={{ marginTop: '16px' }}>
            <div>
              <div className="label" style={{ marginBottom: '8px' }}>Forbidden Actions ({selected.forbiddenCount})</div>
              <div className="stack" style={{ gap: '6px' }}>
                {Array.from({ length: selected.forbiddenCount }, (_, i) => (
                  <div key={i} style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', background: 'var(--danger-subtle)', border: '1px solid color-mix(in srgb, var(--danger) 18%, transparent)', fontSize: '13px', color: 'var(--text)' }}>
                    {['Unauthorized data export', 'PII collection without consent', 'Cross-border transfer without safeguards', 'Deepfake generation unlabeled', 'Biometric data processing', 'Prompt injection via tool call', 'Root shell execution', 'SSH key exfiltration', 'Model output manipulation', 'Credential scraping', 'Mass surveillance', 'Shadow model training'][i] || `Forbidden action ${i + 1}`}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="label" style={{ marginBottom: '8px' }}>Allowed Actions ({selected.allowedCount})</div>
              <div className="stack" style={{ gap: '6px' }}>
                {Array.from({ length: Math.min(selected.allowedCount, 8) }, (_, i) => (
                  <div key={i} style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', background: 'var(--ok-subtle)', border: '1px solid color-mix(in srgb, var(--ok) 18%, transparent)', fontSize: '13px', color: 'var(--text)' }}>
                    {['Read public data', 'Process anonymized datasets', 'Send notification with consent', 'Access allowed file paths', 'Run sandboxed analysis', 'Generate labeled AI content', 'Use approved credentials', 'Log with audit trail'][i] || `Allowed action ${i + 1}`}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="divider" />
          <div className="row" style={{ fontSize: '12px', color: 'var(--muted)' }}>
            <span>Rule ID: <span className="mono">{selected.id}</span></span>
            <span style={{ marginLeft: 'auto' }}>Last updated: {selected.lastUpdated}</span>
          </div>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Framework</th>
                <th>Region</th>
                <th>Category</th>
                <th>Forbidden</th>
                <th>Allowed</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} onClick={() => setSelected(r)} style={{ cursor: 'pointer' }}>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{r.framework}</span>
                  </td>
                  <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{r.region}</td>
                  <td>
                    <span className="pill pill--neutral" style={{ fontSize: '11px' }}>{r.category}</span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--danger)' }}>{r.forbiddenCount}</span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--ok)' }}>{r.allowedCount}</span>
                  </td>
                  <td>
                    <span className={`pill ${r.status === 'active' ? 'pill--ok' : 'pill--warn'}`} style={{ fontSize: '11px' }}>
                      {r.status === 'active' ? 'Active' : 'Monitoring'}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)' }}>{r.lastUpdated}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state" style={{ padding: '24px' }}>No frameworks match your filters.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
