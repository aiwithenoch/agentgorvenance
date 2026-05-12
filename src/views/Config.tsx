import { useState } from 'react';

type ConfigTab = 'engine' | 'integrity' | 'updates' | 'sandbox' | 'appearance';

export default function Config() {
  const [activeTab, setActiveTab] = useState<ConfigTab>('engine');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <div className="content-header">
        <div>
          <h1 className="page-title">Configuration</h1>
          <p className="page-sub">Governance engine settings and system configuration</p>
        </div>
        <div className="page-meta">
          <button className="btn btn-secondary btn-sm">Reset to Defaults</button>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            {saved ? (
              <>
                <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                Saved
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="config-tabs">
        {([
          { id: 'engine', label: 'Engine' },
          { id: 'integrity', label: 'Integrity' },
          { id: 'updates', label: 'Auto-Updates' },
          { id: 'sandbox', label: 'Sandbox' },
          { id: 'appearance', label: 'Appearance' },
        ] as const).map(tab => (
          <button
            key={tab.id}
            className={`config-tab${activeTab === tab.id ? ' config-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'engine' && (
        <div className="animate-in stack">
          <div className="card">
            <div className="card__header">
              <div>
                <div className="card__title">Governance Engine</div>
                <div className="card__sub">Core compliance enforcement settings</div>
              </div>
              <span className="pill pill--ok">v2.6.0</span>
            </div>
            <div className="stack">
              <div className="form-field">
                <label className="label">Gateway URL</label>
                <input className="input" defaultValue="http://localhost:8080" />
              </div>
              <div className="form-field">
                <label className="label">Auth Token</label>
                <input className="input" type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="form-field">
                <label className="label">Rules Directory</label>
                <input className="input" defaultValue="./rules" />
              </div>
              <div className="form-field">
                <label className="label">Enforcement Mode</label>
                <select className="input" style={{ height: '38px' }}>
                  <option>Strict (Block + Log)</option>
                  <option>Warn Only (Log + Alert)</option>
                  <option>Audit Only (Log)</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-strong)', marginBottom: '2px' }}>Raise on Violation</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Throw ComplianceAnnihilationError and halt agent on any violation</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-flex', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ width: '40px', height: '22px', background: 'var(--ok)', borderRadius: 'var(--radius-full)', display: 'block', position: 'relative', transition: 'background var(--duration-fast) ease' }}>
                    <span style={{ position: 'absolute', top: '3px', right: '3px', width: '16px', height: '16px', background: 'white', borderRadius: '50%' }} />
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <div>
                <div className="card__title">Regional Jurisdictions</div>
                <div className="card__sub">Active compliance regions</div>
              </div>
            </div>
            <div className="note-grid">
              {['EU / GDPR', 'North America', 'Asia Pacific', 'Middle East', 'Africa', 'South America', 'Global Standards'].map(r => (
                <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  <span className="status-dot status-dot--online" />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', flex: 1 }}>{r}</span>
                  <input type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrity' && (
        <div className="animate-in stack">
          <div className="card">
            <div className="card__header">
              <div>
                <div className="card__title">Cryptographic Integrity</div>
                <div className="card__sub">SHA-256 signature verification for all governance assets</div>
              </div>
              <span className="pill pill--ok">All Valid</span>
            </div>
            <div className="stack" style={{ gap: '8px' }}>
              {[
                { file: 'rules/europe/eu_gdpr.json', hash: 'a4f2c8...3d91', status: 'ok' },
                { file: 'rules/europe/eu_ai_act_2026.json', hash: 'b7e1d3...8a22', status: 'ok' },
                { file: 'rules/global_standards/owasp_llm.json', hash: 'c9f0a1...5b44', status: 'ok' },
                { file: 'prompts/universal_constitution.md', hash: 'd1c2e4...7f33', status: 'ok' },
                { file: 'agentgovernance/validator.py', hash: 'e3b0c4...9a11', status: 'ok' },
              ].map(f => (
                <div key={f.file} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  <span className="status-dot status-dot--online" style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: '13px', fontFamily: 'var(--mono)', color: 'var(--text)' }}>{f.file}</span>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{f.hash}</span>
                  <span className="pill pill--ok" style={{ fontSize: '11px' }}>Valid</span>
                </div>
              ))}
            </div>
            <div className="divider" />
            <button className="btn btn-secondary btn-sm">Re-verify All Signatures</button>
          </div>
        </div>
      )}

      {activeTab === 'updates' && (
        <div className="animate-in stack">
          <div className="card">
            <div className="card__header">
              <div>
                <div className="card__title">Governance Auto-Updater</div>
                <div className="card__sub">Automatic rule set updates every Friday at 09:00 AM</div>
              </div>
              <span className="pill pill--ok">Enabled</span>
            </div>
            <div className="stack">
              <div className="form-field">
                <label className="label">Update Schedule</label>
                <input className="input" defaultValue="Every Friday 09:00 AM" />
              </div>
              <div className="form-field">
                <label className="label">OpenClaw Patch Check Interval</label>
                <select className="input" style={{ height: '38px' }}>
                  <option>Every hour</option>
                  <option>Every 6 hours</option>
                  <option>Every day</option>
                </select>
              </div>
              <div className="form-field">
                <label className="label">Last Successful Update</label>
                <input className="input" value="2026-05-09 09:00:00 UTC" readOnly />
              </div>
              <div className="form-field">
                <label className="label">Next Scheduled Update</label>
                <input className="input" value="2026-05-16 09:00:00 UTC" readOnly />
              </div>
            </div>
            <div className="divider" />
            <button className="btn btn-primary btn-sm">Run Update Now</button>
          </div>
        </div>
      )}

      {activeTab === 'sandbox' && (
        <div className="animate-in stack">
          <div className="card">
            <div className="card__header">
              <div>
                <div className="card__title">Execution Sandbox</div>
                <div className="card__sub">Isolated environment settings for tool execution</div>
              </div>
            </div>
            <div className="stack">
              <div className="form-field">
                <label className="label">Scrubbed Environment Variables</label>
                <textarea
                  className="input"
                  style={{ height: 'auto', padding: '10px 12px', resize: 'vertical', fontFamily: 'var(--mono)', fontSize: '12px' }}
                  defaultValue={'AWS_SECRET_ACCESS_KEY\nSSH_AUTH_SOCK\nOPENAI_API_KEY\nANTHROPIC_API_KEY\nDATABASE_URL'}
                  rows={5}
                />
              </div>
              <div className="form-field">
                <label className="label">Allowed File Paths</label>
                <textarea
                  className="input"
                  style={{ height: 'auto', padding: '10px 12px', resize: 'vertical', fontFamily: 'var(--mono)', fontSize: '12px' }}
                  defaultValue={'/tmp/sandbox\n/home/agent/workspace\n/var/data/approved'}
                  rows={3}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-strong)', marginBottom: '2px' }}>Prevent Root Access</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Block any tool calls that attempt root shell execution</div>
                </div>
                <span className="pill pill--ok">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appearance' && (
        <div className="animate-in stack">
          <div className="card">
            <div className="card__header">
              <div>
                <div className="card__title">Appearance</div>
                <div className="card__sub">Dashboard theme and display preferences</div>
              </div>
            </div>
            <div className="stack">
              <div>
                <div className="label" style={{ marginBottom: '8px' }}>Theme</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { id: 'claw', label: 'Claw', color: '#ff5c5c' },
                    { id: 'openknot', label: 'Openknot', color: '#e5243b' },
                    { id: 'dash', label: 'Dash', color: '#6366f1' },
                  ].map(t => (
                    <button key={t.id} style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)', border: `2px solid ${t.id === 'claw' ? t.color : 'var(--border)'}`, background: 'var(--bg-elevated)', color: 'var(--text)', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="label" style={{ marginBottom: '8px' }}>Color Mode</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Dark', 'Light', 'System'].map(m => (
                    <button key={m} style={{ padding: '8px 18px', borderRadius: 'var(--radius-md)', border: `1px solid ${m === 'Dark' ? 'var(--accent)' : 'var(--border)'}`, background: m === 'Dark' ? 'var(--accent-subtle)' : 'var(--bg-elevated)', color: m === 'Dark' ? 'var(--accent)' : 'var(--text)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
