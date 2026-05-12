import { useState } from 'react';
import './index.css';
import Overview from './views/Overview';
import Chat from './views/Chat';
import Agents from './views/Agents';
import Rules from './views/Rules';
import Sessions from './views/Sessions';
import Logs from './views/Logs';
import Config from './views/Config';

type Tab = 'overview' | 'chat' | 'agents' | 'rules' | 'sessions' | 'logs' | 'config';

const NAV_MAIN = [
  { id: 'overview' as Tab, label: 'Overview', icon: <IconOverview /> },
  { id: 'chat' as Tab, label: 'Chat', icon: <IconChat />, badge: '3' },
  { id: 'agents' as Tab, label: 'Agents', icon: <IconAgents /> },
  { id: 'rules' as Tab, label: 'Rules', icon: <IconRules /> },
  { id: 'sessions' as Tab, label: 'Sessions', icon: <IconSessions /> },
  { id: 'logs' as Tab, label: 'Logs', icon: <IconLogs /> },
];

const NAV_SYSTEM = [
  { id: 'config' as Tab, label: 'Config', icon: <IconConfig /> },
];

const TAB_LABELS: Record<Tab, string> = {
  overview: 'Overview',
  chat: 'Chat',
  agents: 'Agents',
  rules: 'Rules',
  sessions: 'Sessions',
  logs: 'Logs',
  config: 'Config',
};

function App() {
  const [tab, setTab] = useState<Tab>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [connected] = useState(true);

  const renderContent = () => {
    switch (tab) {
      case 'overview': return <Overview />;
      case 'chat': return <Chat />;
      case 'agents': return <Agents />;
      case 'rules': return <Rules />;
      case 'sessions': return <Sessions />;
      case 'logs': return <Logs />;
      case 'config': return <Config />;
    }
  };

  return (
    <div className={`shell${collapsed ? ' shell--nav-collapsed' : ''}`}>
      {/* Sidebar */}
      <nav className="shell-nav">
        <div className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
          <div className="sidebar-shell">
            <div className="sidebar-shell__header">
              <div className="sidebar-brand">
                <div className="sidebar-brand__logo">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"/>
                  </svg>
                </div>
                <div className="sidebar-brand__copy">
                  <span className="sidebar-brand__eyebrow">2026</span>
                  <span className="sidebar-brand__title">AgentGovernance</span>
                </div>
              </div>
              <button
                className="nav-collapse-toggle"
                onClick={() => setCollapsed(c => !c)}
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
            </div>

            <div className="sidebar-shell__body">
              <nav className="sidebar-nav">
                <div className="nav-section">
                  <div className="nav-section__label">
                    <span className="nav-section__label-text">Core</span>
                  </div>
                  {NAV_MAIN.map(item => (
                    <button
                      key={item.id}
                      className={`nav-item${tab === item.id ? ' nav-item--active' : ''}`}
                      onClick={() => setTab(item.id)}
                    >
                      <span className="nav-item__icon">{item.icon}</span>
                      <span className="nav-item__text">{item.label}</span>
                      {item.badge && <span className="nav-item__badge">{item.badge}</span>}
                    </button>
                  ))}
                </div>

                <div className="nav-section">
                  <div className="nav-section__label">
                    <span className="nav-section__label-text">System</span>
                  </div>
                  {NAV_SYSTEM.map(item => (
                    <button
                      key={item.id}
                      className={`nav-item${tab === item.id ? ' nav-item--active' : ''}`}
                      onClick={() => setTab(item.id)}
                    >
                      <span className="nav-item__icon">{item.icon}</span>
                      <span className="nav-item__text">{item.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            <div className="sidebar-shell__footer">
              <div className="sidebar-version">
                <span className="sidebar-version__label">v2.6.0</span>
                <span className="sidebar-version__text">Stable</span>
                <span
                  className={`status-dot ${connected ? 'status-dot--online' : 'status-dot--offline'}`}
                  style={{ marginLeft: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Topbar */}
      <header className="topbar">
        <div className="topbar__breadcrumb">
          <span className="topbar__breadcrumb-link">AgentGovernance</span>
          <span className="topbar__breadcrumb-sep">›</span>
          <span className="topbar__breadcrumb-current">{TAB_LABELS[tab]}</span>
        </div>
        <div className="topbar__actions">
          <div className="topbar__pill">
            <span className={`status-dot ${connected ? 'status-dot--online' : 'status-dot--offline'}`} />
            <span>{connected ? 'Engine Active' : 'Offline'}</span>
          </div>
          <button className="topbar-btn" title="Search">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button className="topbar-btn" title="Notifications">
            <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <a
            href="https://github.com/aiwithenoch/agentgovernance"
            target="_blank"
            rel="noreferrer"
            className="topbar-btn"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="content animate-in" key={tab}>
        {renderContent()}
      </main>
    </div>
  );
}

/* ---- SVG Icon Components ---- */

function IconOverview() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function IconAgents() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function IconRules() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"/>
    </svg>
  );
}

function IconSessions() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function IconLogs() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}

function IconConfig() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  );
}

export default App;
