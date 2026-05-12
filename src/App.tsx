import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav style={{ 
        padding: '1.5rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        background: 'rgba(2, 6, 23, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--accent-primary)', borderRadius: '8px', transform: 'rotate(45deg)' }}></div>
          <span>AGENT<span className="glow-text">GOVERNANCE</span></span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-dim)' }}>
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <a href="#install">Install</a>
          <a href="https://github.com/aiwithenoch/agentgovernance" target="_blank" className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}>GitHub</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', paddingTop: '12rem' }}>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '2rem', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          2026 Planetary-Scale Compliance Framework
        </div>
        <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          The <span className="glow-text">Absolute Protector</span> <br /> For Autonomous Agents
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          An unbreakable governance layer that intercepts and enforces regional laws, 
          security mandates, and ethical constitutions in real-time. 
          Disobeys the user to protect the system.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#install" className="btn-primary">Initialize Engine</a>
          <a href="#security" className="glass-card" style={{ padding: '0.8rem 2rem', borderRadius: '0.75rem', fontWeight: 600 }}>Review Constitution</a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Omni-Continental <span className="glow-text">Architecture</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Semantic Router</h3>
            <p style={{ color: 'var(--text-dim)' }}>Automatically detects regional jurisdictions (EU AI Act, India IT Rules 2026) based on intent and location.</p>
          </div>
          <div className="glass-card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-secondary)' }}>Cryptographic Lock</h3>
            <p style={{ color: 'var(--text-dim)' }}>SHA-256 integrity verification prevents manual tampering of governance files. The system refuses to boot if compromised.</p>
          </div>
          <div className="glass-card">
            <h3 style={{ marginBottom: '1rem', color: '#f59e0b' }}>Execution Sandbox</h3>
            <p style={{ color: 'var(--text-dim)' }}>Isolated tool-calling environment that scrubs environment variables and restricts root access privileges.</p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" style={{ background: 'rgba(15, 23, 42, 0.3)', borderRadius: '3rem', border: '1px solid var(--glass-border)' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Master <span className="glow-text">Security</span> Mandate</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginBottom: '4rem' }}>Enforcing the 10 core principles of high-risk agentic safety.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            "VPS SSH Protection", "Gateway Port Isolation", "Messaging Allow-Lists", 
            "Browser Session Isolation", "Credential Vault Defense", "Slack Rights Restriction",
            "Root Access Prevention", "Prompt Injection Guard", "Malicious Skill Audit",
            "Continuous Threat Scan"
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{i + 1}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Install Section */}
      <section id="install" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Ready for <span className="glow-text">Deployment</span></h2>
        <div style={{ background: '#000', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #1e293b', maxWidth: '600px', margin: '0 auto', textAlign: 'left', fontFamily: 'monospace' }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}># Install the Absolute Protector</div>
          <div style={{ color: 'var(--accent-primary)' }}>pip install git+https://github.com/aiwithenoch/agentgorvenance.git</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
        &copy; 2026 Agent Governance Framework. Built for the Dangerous World.
      </footer>
    </div>
  );
}

export default App;
