import React, { useState } from 'react';
import './index.css';
import Overview from './views/Overview';
import Chat from './views/Chat';
import Agents from './views/Agents';
import Rules from './views/Rules';
import Sessions from './views/Sessions';
import Logs from './views/Logs';
import Config from './views/Config';

type Tab = 'overview' | 'chat' | 'agents' | 'rules' | 'sessions' | 'logs' | 'config';

const NAV_ITEMS: { id: Tab; label: string; icon: () => React.ReactElement; badge?: string }[] = [
  { id: 'overview', label: 'Overview', icon: IcoOverview },
  { id: 'chat',     label: 'Chat',     icon: IcoChat, badge: '3' },
  { id: 'agents',   label: 'Agents',   icon: IcoAgents },
  { id: 'rules',    label: 'Rules',    icon: IcoRules },
  { id: 'sessions', label: 'Sessions', icon: IcoSessions },
  { id: 'logs',     label: 'Logs',     icon: IcoLogs },
];

const NAV_SYSTEM: { id: Tab; label: string; icon: () => React.ReactElement }[] = [
  { id: 'config', label: 'Config', icon: IcoConfig },
];

function App() {
  const [tab, setTab] = useState<Tab>('overview');
  const [collapsed, setCollapsed] = useState(false);

  const views: Record<Tab, React.ReactElement> = {
    overview: <Overview />,
    chat:     <Chat />,
    agents:   <Agents />,
    rules:    <Rules />,
    sessions: <Sessions />,
    logs:     <Logs />,
    config:   <Config />,
  };

  return (
    <div className={`shell${collapsed ? ' shell--nav-collapsed' : ''}`}>

      {/* ── Sidebar ── */}
      <nav className="shell-nav">
        <div className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
          <div className="sidebar-shell">

            {/* Brand + collapse */}
            <div className="sidebar-shell__header">
              <div className="sidebar-brand">
                <div className="sidebar-brand__logo">
                  <svg viewBox="0 0 24 24"><path fill="white" d="M12 2 3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"/></svg>
                </div>
                <div className="sidebar-brand__copy">
                  <span className="sidebar-brand__eyebrow">2026</span>
                  <span className="sidebar-brand__title">AgentGovernance</span>
                </div>
              </div>
              <button className="nav-collapse-toggle" onClick={() => setCollapsed(c => !c)} title="Toggle sidebar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d={collapsed ? 'M13 5l7 7-7 7' : 'M11 5l-7 7 7 7'}/><path d="M2 12h20" opacity={collapsed ? 0 : 1}/>
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <div className="sidebar-shell__body">
              <nav className="sidebar-nav">
                <div className="nav-section">
                  <div className="nav-section__label"><span className="nav-section__label-text">Core</span></div>
                  {NAV_ITEMS.map(item => (
                    <button key={item.id} className={`nav-item${tab === item.id ? ' nav-item--active' : ''}`} onClick={() => setTab(item.id)}>
                      <span className="nav-item__icon"><item.icon /></span>
                      <span className="nav-item__text">{item.label}</span>
                      {item.badge && <span className="nav-item__badge">{item.badge}</span>}
                    </button>
                  ))}
                </div>
                <div className="nav-section">
                  <div className="nav-section__label"><span className="nav-section__label-text">System</span></div>
                  {NAV_SYSTEM.map(item => (
                    <button key={item.id} className={`nav-item${tab === item.id ? ' nav-item--active' : ''}`} onClick={() => setTab(item.id)}>
                      <span className="nav-item__icon"><item.icon /></span>
                      <span className="nav-item__text">{item.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            {/* Footer */}
            <div className="sidebar-shell__footer">
              <div className="sidebar-utility-group">
                <div className="sidebar-version">
                  <span className="sidebar-version__label">v2.6.0</span>
                  <span className="sidebar-version__text">stable</span>
                  <span className="sidebar-version__status sidebar-connection-status--online" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* ── Topbar ── */}
      <header className="topbar">
        <div className="topnav-shell">
          <div className="topnav-shell__content">
            <div className="dashboard-header">
              <div className="dashboard-header__breadcrumb">
                <span className="dashboard-header__breadcrumb-segment">
                  <span className="dashboard-header__breadcrumb-link">AgentGovernance</span>
                </span>
                <span className="dashboard-header__breadcrumb-sep">›</span>
                <span className="dashboard-header__breadcrumb-segment">
                  <span className="dashboard-header__breadcrumb-current" style={{ textTransform: 'capitalize' }}>{tab}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="topnav-shell__actions">
            <div className="topbar-status">
              <div className="pill pill--ok" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', fontSize: 12, fontWeight: 500 }}>
                <span className="statusDot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)', boxShadow: '0 0 0 3px rgba(34,197,94,.18)', flexShrink: 0 }} />
                <span className="mono" style={{ fontSize: 11 }}>Engine Active</span>
              </div>
            </div>
            <button className="sidebar-menu-trigger" title="Search (⌘K)">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <a href="https://github.com/aiwithenoch/agentgovernance" target="_blank" rel="noreferrer" className="sidebar-menu-trigger" title="GitHub">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="content animate-in" key={tab}>
        {views[tab]}
      </main>

    </div>
  );
}

/* ── Icons ── */
function IcoOverview() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function IcoChat()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; }
function IcoAgents()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function IcoRules()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"/></svg>; }
function IcoSessions() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function IcoLogs()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>; }
function IcoConfig()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>; }

export default App;
