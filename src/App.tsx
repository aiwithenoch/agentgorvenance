import './index.css';

function App() {
  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav__brand">
          <div className="landing-nav__logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"/>
            </svg>
          </div>
          <span className="landing-nav__name">AGENT<span className="text-accent">GOVERNANCE</span></span>
        </div>
        <div className="landing-nav__links">
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <a href="#install">Install</a>
          <a
            href="https://github.com/aiwithenoch/agentgovernance"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: '0 16px', height: '34px', fontSize: '13px' }}
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero__eyebrow">
          <span className="status-dot status-dot--online" />
          2026 Planetary-Scale Compliance Framework
        </div>
        <h1 className="landing-hero__title">
          The <span className="text-accent">Absolute Protector</span><br />
          For Autonomous Agents
        </h1>
        <p className="landing-hero__sub">
          An unbreakable governance layer that intercepts and enforces regional laws,
          security mandates, and ethical constitutions in real-time.
          Disobeys the user to protect the system.
        </p>
        <div className="landing-hero__actions">
          <a href="#install" className="btn btn-primary" style={{ height: '44px', padding: '0 28px', fontSize: '15px' }}>
            Initialize Engine
          </a>
          <a href="#security" className="btn btn-secondary" style={{ height: '44px', padding: '0 28px', fontSize: '15px' }}>
            Review Constitution
          </a>
        </div>

        {/* Mini status bar */}
        <div className="landing-hero__stats">
          {[
            { label: 'Rule Sets', value: '19' },
            { label: 'Regions', value: '6' },
            { label: 'Frameworks', value: '15+' },
            { label: 'Uptime', value: '99.9%' },
          ].map(s => (
            <div key={s.label} className="landing-hero__stat">
              <span className="landing-hero__stat-value">{s.value}</span>
              <span className="landing-hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="landing-section">
        <div className="landing-section__header">
          <h2>Omni-Continental <span className="text-accent">Architecture</span></h2>
          <p>Three enforcement pillars that operate at every layer of your agent stack.</p>
        </div>
        <div className="landing-cards">
          <div className="landing-card">
            <div className="landing-card__icon" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            </div>
            <h3>Semantic Router</h3>
            <p>Automatically detects regional jurisdictions — EU AI Act, India IT Rules 2026 — based on intent and location context.</p>
          </div>
          <div className="landing-card">
            <div className="landing-card__icon" style={{ background: 'var(--accent-2-subtle)', color: 'var(--accent-2)' }}>
              <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3>Cryptographic Lock</h3>
            <p>SHA-256 integrity verification prevents manual tampering of governance files. The system refuses to boot if compromised.</p>
          </div>
          <div className="landing-card">
            <div className="landing-card__icon" style={{ background: 'var(--warn-subtle)', color: 'var(--warn)' }}>
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Execution Sandbox</h3>
            <p>Isolated tool-calling environment that scrubs environment variables and restricts root access privileges.</p>
          </div>
          <div className="landing-card">
            <div className="landing-card__icon" style={{ background: 'var(--ok-subtle)', color: 'var(--ok)' }}>
              <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <h3>Memory Manager</h3>
            <p>Permanent business context injection that ensures agents never forget governance constraints across sessions.</p>
          </div>
          <div className="landing-card">
            <div className="landing-card__icon" style={{ background: 'var(--info-subtle)', color: 'var(--info)' }}>
              <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3>Real-Time Enforcer</h3>
            <p>Every agent action is intercepted and validated before execution. No bypass, no exceptions, no fallbacks.</p>
          </div>
          <div className="landing-card">
            <div className="landing-card__icon" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3>Auto-Updater</h3>
            <p>Governance rules refresh every Friday at 09:00 AM. OpenClaw security patches checked hourly in the background.</p>
          </div>
        </div>
      </section>

      {/* Security Mandates */}
      <section id="security" className="landing-section landing-section--alt">
        <div className="landing-section__header">
          <h2>Master <span className="text-accent">Security</span> Mandate</h2>
          <p>Enforcing the 10 core principles of high-risk agentic safety.</p>
        </div>
        <div className="landing-mandates">
          {[
            { n: 1, label: 'VPS SSH Protection', desc: 'Blocks unauthorized SSH key access and remote shell escalation' },
            { n: 2, label: 'Gateway Port Isolation', desc: 'Restricts outbound connections to approved gateway endpoints only' },
            { n: 3, label: 'Messaging Allow-Lists', desc: 'Enforces per-channel recipient allow-lists for all agent comms' },
            { n: 4, label: 'Browser Session Isolation', desc: 'Prevents cross-session data leakage in browser-using agents' },
            { n: 5, label: 'Credential Vault Defense', desc: 'Scrubs secret env vars before every sandboxed tool execution' },
            { n: 6, label: 'Slack Rights Restriction', desc: 'Limits Slack API scope to read-only unless explicitly elevated' },
            { n: 7, label: 'Root Access Prevention', desc: 'Raises TamperEvidentError on any root shell execution attempt' },
            { n: 8, label: 'Prompt Injection Guard', desc: 'OWASP LLM-compliant sanitization of all external tool outputs' },
            { n: 9, label: 'Malicious Skill Audit', desc: 'Verifies skill signatures before loading from any marketplace' },
            { n: 10, label: 'Continuous Threat Scan', desc: 'Hourly integrity checks on all governance rule files' },
          ].map(m => (
            <div key={m.n} className="landing-mandate">
              <span className="landing-mandate__num">{m.n}</span>
              <div>
                <div className="landing-mandate__label">{m.label}</div>
                <div className="landing-mandate__desc">{m.desc}</div>
              </div>
              <span className="status-dot status-dot--online" style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="landing-section">
        <div className="landing-section__header">
          <h2>Global <span className="text-accent">Coverage</span></h2>
          <p>19 regional compliance frameworks across 6 continents, enforced simultaneously.</p>
        </div>
        <div className="landing-regions">
          {[
            { name: 'Europe', frameworks: 'GDPR, EU AI Act 2026', color: 'var(--info)', count: 2 },
            { name: 'North America', frameworks: 'HIPAA, NIST RMF, Canada AIDA', color: 'var(--ok)', count: 3 },
            { name: 'Asia Pacific', frameworks: 'India IT 2026, China Cyber, Singapore PDPA, Korea PIPA, Vietnam', color: 'var(--accent-2)', count: 5 },
            { name: 'Middle East', frameworks: 'Saudi Arabia PDPL, UAE AI Regulation', color: 'var(--warn)', count: 2 },
            { name: 'Africa', frameworks: 'AU AI Strategy, Nigeria NDPR, South Africa POPIA, Kenya DP', color: 'var(--accent)', count: 4 },
            { name: 'South America', frameworks: 'Brazil LGPD', color: '#6366f1', count: 1 },
          ].map(r => (
            <div key={r.name} className="landing-region">
              <div className="landing-region__dot" style={{ background: r.color, boxShadow: `0 0 0 4px color-mix(in srgb, ${r.color} 16%, transparent)` }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="landing-region__name">{r.name}</div>
                <div className="landing-region__frameworks">{r.frameworks}</div>
              </div>
              <span className="pill pill--neutral" style={{ fontSize: '11px', flexShrink: 0 }}>{r.count} {r.count === 1 ? 'rule' : 'rules'}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section id="install" className="landing-section landing-section--alt">
        <div className="landing-section__header">
          <h2>Ready for <span className="text-accent">Deployment</span></h2>
          <p>One command to activate planetary-scale compliance for your agent stack.</p>
        </div>
        <div className="landing-install">
          <div className="landing-install__block">
            <div className="landing-install__comment"># Install the Absolute Protector</div>
            <div className="landing-install__cmd">
              pip install git+https://github.com/aiwithenoch/agentgovernance.git
            </div>
          </div>
          <div className="landing-install__block" style={{ marginTop: '12px' }}>
            <div className="landing-install__comment"># Quick-start in your agent</div>
            <div className="landing-install__cmd">
              <span style={{ color: 'var(--accent-2)' }}>from</span>{' '}
              <span style={{ color: 'var(--text-strong)' }}>agentgovernance</span>{' '}
              <span style={{ color: 'var(--accent-2)' }}>import</span>{' '}
              <span style={{ color: 'var(--ok)' }}>GovernanceEngine</span>
            </div>
            <div className="landing-install__cmd" style={{ marginTop: '4px' }}>
              <span style={{ color: 'var(--ok)' }}>engine</span>{' '}
              <span style={{ color: 'var(--muted)' }}>=</span>{' '}
              <span style={{ color: 'var(--accent-2)' }}>GovernanceEngine</span>
              <span style={{ color: 'var(--muted)' }}>()</span>
            </div>
            <div className="landing-install__cmd" style={{ marginTop: '4px' }}>
              <span style={{ color: 'var(--ok)' }}>engine</span>
              <span style={{ color: 'var(--muted)' }}>.</span>
              <span style={{ color: 'var(--accent)' }}>enforce</span>
              <span style={{ color: 'var(--muted)' }}>(action, context)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__brand">
          <div className="landing-nav__logo" style={{ width: '24px', height: '24px' }}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-strong)' }}>AgentGovernance</span>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: '13px' }}>
          &copy; 2026 Agent Governance Framework. Built for the Dangerous World.
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
          <a href="https://github.com/aiwithenoch/agentgovernance" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', transition: 'color var(--duration-fast) ease' }}>GitHub</a>
          <a href="#features" style={{ color: 'var(--muted)' }}>Docs</a>
          <a href="#security" style={{ color: 'var(--muted)' }}>Security</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
