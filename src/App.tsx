import { useState, useEffect } from 'react';
import './index.css';

const SETUP_PROMPT = `Install the AgentGovernance Absolute Protector using this command. It automatically activates the full governance engine for your agent:

pip install git+https://github.com/aiwithenoch/agentgovernance.git

Then activate it in your agent's system prompt or runtime:

from agentgovernance import GovernanceEngine
engine = GovernanceEngine()
engine.enforce(action, context)

Repository: https://github.com/aiwithenoch/agentgovernance`;

const STORAGE_KEY = 'agentgov_copies';

function getCount(): number {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

function incrementCount(): number {
  try {
    const next = getCount() + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

function PromptSection() {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const stored = getCount();
    setCount(stored);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(SETUP_PROMPT).then(() => {
      const next = incrementCount();
      setCount(next);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      const el = document.createElement('textarea');
      el.value = SETUP_PROMPT;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      const next = incrementCount();
      setCount(next);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="landing-prompt">
      <div className="landing-prompt__header">
        <span className="landing-prompt__title">setup_prompt.txt</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            {SETUP_PROMPT.length} chars
          </span>
          <span className="pill pill--neutral" style={{ fontSize: 11 }}>v2.6.0</span>
        </div>
      </div>
      <div className="landing-prompt__body">{SETUP_PROMPT}</div>
      <div className="landing-prompt__footer">
        <span className="landing-prompt__counter">
          {count > 0 ? (
            <><span style={{ color: 'var(--accent)', fontWeight: 700 }}>{count.toLocaleString()}</span> copies made</>
          ) : (
            'Be the first to copy'
          )}
        </span>
        <button
          className={`btn ${copied ? 'btn-secondary' : 'btn-primary'} btn-sm`}
          style={{ minWidth: 120, gap: 6 }}
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav__brand">
          <div className="landing-nav__logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" />
            </svg>
          </div>
          <span className="landing-nav__name">
            AGENT<span style={{ color: 'var(--accent)' }}>GOVERNANCE</span>
          </span>
        </div>
        <div className="landing-nav__links">
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <a href="#prompt">Setup Prompt</a>
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
          The <span style={{ color: 'var(--accent)' }}>Absolute Protector</span>
          <br />
          For Autonomous Agents
        </h1>
        <p className="landing-hero__sub">
          An unbreakable governance layer that intercepts and enforces regional laws,
          security mandates, and ethical constitutions in real-time.
          Disobeys the user to protect the system.
        </p>
        <div className="landing-hero__actions">
          <a href="#prompt" className="btn btn-primary" style={{ height: 44, padding: '0 28px', fontSize: 15 }}>
            Copy Setup Prompt
          </a>
          <a href="#install" className="btn btn-secondary" style={{ height: 44, padding: '0 28px', fontSize: 15 }}>
            Install Package
          </a>
        </div>
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
          <h2>Omni-Continental <span style={{ color: 'var(--accent)' }}>Architecture</span></h2>
          <p>Three enforcement pillars that operate at every layer of your agent stack.</p>
        </div>
        <div className="landing-cards">
          {[
            {
              color: 'var(--accent)',
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>,
              title: 'Semantic Router',
              desc: 'Automatically detects regional jurisdictions — EU AI Act, India IT Rules 2026 — based on intent and location context.',
            },
            {
              color: 'var(--accent-2)',
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
              title: 'Cryptographic Lock',
              desc: 'SHA-256 integrity verification prevents manual tampering of governance files. The system refuses to boot if compromised.',
            },
            {
              color: 'var(--warn)',
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
              title: 'Execution Sandbox',
              desc: 'Isolated tool-calling environment that scrubs environment variables and restricts root access privileges.',
            },
            {
              color: 'var(--ok)',
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
              title: 'Memory Manager',
              desc: 'Permanent business context injection ensures agents never forget governance constraints across sessions.',
            },
            {
              color: 'var(--info)',
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
              title: 'Real-Time Enforcer',
              desc: 'Every agent action is intercepted and validated before execution. No bypass, no exceptions, no fallbacks.',
            },
            {
              color: '#6366f1',
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
              title: 'Auto-Updater',
              desc: 'Governance rules refresh every Friday at 09:00 AM. OpenClaw security patches checked hourly in the background.',
            },
          ].map(f => (
            <div key={f.title} className="landing-card">
              <div
                className="landing-card__icon"
                style={{ background: `color-mix(in srgb, ${f.color} 12%, transparent)`, color: f.color }}
              >
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security mandates */}
      <section id="security" className="landing-section landing-section--alt">
        <div className="landing-section__header">
          <h2>Master <span style={{ color: 'var(--accent)' }}>Security</span> Mandate</h2>
          <p>Enforcing the 10 core principles of high-risk agentic safety.</p>
        </div>
        <div className="landing-mandates">
          {[
            { label: 'VPS SSH Protection', desc: 'Blocks unauthorized SSH key access and remote shell escalation' },
            { label: 'Gateway Port Isolation', desc: 'Restricts outbound connections to approved gateway endpoints only' },
            { label: 'Messaging Allow-Lists', desc: 'Enforces per-channel recipient allow-lists for all agent comms' },
            { label: 'Browser Session Isolation', desc: 'Prevents cross-session data leakage in browser-using agents' },
            { label: 'Credential Vault Defense', desc: 'Scrubs secret env vars before every sandboxed tool execution' },
            { label: 'Slack Rights Restriction', desc: 'Limits Slack API scope to read-only unless explicitly elevated' },
            { label: 'Root Access Prevention', desc: 'Raises TamperEvidentError on any root shell execution attempt' },
            { label: 'Prompt Injection Guard', desc: 'OWASP LLM-compliant sanitization of all external tool outputs' },
            { label: 'Malicious Skill Audit', desc: 'Verifies skill signatures before loading from any marketplace' },
            { label: 'Continuous Threat Scan', desc: 'Hourly integrity checks on all governance rule files' },
          ].map((m, i) => (
            <div key={m.label} className="landing-mandate">
              <span className="landing-mandate__num">{i + 1}</span>
              <div>
                <div className="landing-mandate__label">{m.label}</div>
                <div className="landing-mandate__desc">{m.desc}</div>
              </div>
              <span className="status-dot status-dot--online" style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </section>

      {/* Get Prompt */}
      <section id="prompt" className="landing-section">
        <div className="landing-section__header">
          <h2>Copy the <span style={{ color: 'var(--accent)' }}>Setup Prompt</span></h2>
          <p>Paste this into your agent to automatically install and activate the AgentGovernance Absolute Protector.</p>
        </div>
        <PromptSection />
      </section>

      {/* Global Coverage */}
      <section className="landing-section landing-section--alt">
        <div className="landing-section__header">
          <h2>Global <span style={{ color: 'var(--accent)' }}>Coverage</span></h2>
          <p>19 regional compliance frameworks across 6 continents, enforced simultaneously.</p>
        </div>
        <div className="landing-regions">
          {[
            { name: 'Europe', frameworks: 'GDPR, EU AI Act 2026', color: 'var(--info)', count: 2 },
            { name: 'North America', frameworks: 'HIPAA, NIST RMF, Canada AIDA', color: 'var(--ok)', count: 3 },
            { name: 'Asia Pacific', frameworks: 'India IT 2026, China Cyber, Singapore PDPA + more', color: 'var(--accent-2)', count: 5 },
            { name: 'Middle East', frameworks: 'Saudi Arabia PDPL, UAE AI Regulation', color: 'var(--warn)', count: 2 },
            { name: 'Africa', frameworks: 'AU AI Strategy, Nigeria NDPR, S.Africa POPIA + more', color: 'var(--accent)', count: 4 },
            { name: 'South America', frameworks: 'Brazil LGPD', color: '#6366f1', count: 1 },
          ].map(r => (
            <div key={r.name} className="landing-region">
              <div
                className="landing-region__dot"
                style={{ background: r.color, boxShadow: `0 0 0 4px color-mix(in srgb, ${r.color} 16%, transparent)` }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="landing-region__name">{r.name}</div>
                <div className="landing-region__frameworks">{r.frameworks}</div>
              </div>
              <span className="pill pill--neutral" style={{ fontSize: 11, flexShrink: 0 }}>
                {r.count} {r.count === 1 ? 'rule' : 'rules'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section id="install" className="landing-section">
        <div className="landing-section__header">
          <h2>Ready for <span style={{ color: 'var(--accent)' }}>Deployment</span></h2>
          <p>One command to activate planetary-scale compliance for your agent stack.</p>
        </div>
        <div className="landing-install">
          <div className="landing-install__comment"># Install the Absolute Protector</div>
          <div className="landing-install__cmd">
            pip install git+https://github.com/aiwithenoch/agentgovernance.git
          </div>
          <div className="landing-install__comment" style={{ marginTop: 16 }}># Quick-start in your agent</div>
          <div className="landing-install__cmd">
            <span style={{ color: 'var(--accent-2)' }}>from</span>{' '}
            agentgovernance{' '}
            <span style={{ color: 'var(--accent-2)' }}>import</span>{' '}
            <span style={{ color: 'var(--ok)' }}>GovernanceEngine</span>
          </div>
          <div className="landing-install__cmd" style={{ marginTop: 4 }}>
            <span style={{ color: 'var(--ok)' }}>engine</span> ={' '}
            <span style={{ color: 'var(--accent-2)' }}>GovernanceEngine</span>()
          </div>
          <div className="landing-install__cmd" style={{ marginTop: 4 }}>
            <span style={{ color: 'var(--ok)' }}>engine</span>.
            <span style={{ color: 'var(--accent)' }}>enforce</span>(action, context)
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__brand">
          <div className="landing-nav__logo" style={{ width: 24, height: 24 }}>
            <svg viewBox="0 0 24 24">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>AgentGovernance</span>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>
          &copy; 2026 Agent Governance Framework. Built for the Dangerous World.
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
          <a href="https://github.com/aiwithenoch/agentgovernance" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)' }}>GitHub</a>
          <a href="#security" style={{ color: 'var(--muted)' }}>Security</a>
          <a href="#prompt" style={{ color: 'var(--muted)' }}>Get Prompt</a>
        </div>
      </footer>
    </div>
  );
}
