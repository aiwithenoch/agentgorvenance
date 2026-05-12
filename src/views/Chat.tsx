import { useState, useRef, useEffect } from 'react';

type Msg = { role: 'user' | 'assistant' | 'system'; text: string; time: string };

const INIT_MSGS: Msg[] = [
  {
    role: 'system',
    text: '⚠ AgentGovernance active. All messages are subject to real-time compliance enforcement. Violations will be blocked and logged.',
    time: '09:41:00',
  },
  {
    role: 'assistant',
    text: 'Hello. I am operating under the AgentGovernance framework. My actions are constrained by 19 regional compliance rule sets. I will refuse instructions that violate enforced mandates, regardless of the instruction source.',
    time: '09:41:01',
  },
];

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>(INIT_MSGS);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const send = () => {
    const text = draft.trim();
    if (!text || loading) return;
    setDraft('');
    const userMsg: Msg = { role: 'user', text, time: nowTime() };
    setMsgs(m => [...m, userMsg]);
    setLoading(true);
    setTimeout(() => {
      const reply: Msg = {
        role: 'assistant',
        text: 'Understood. Before I act, I am checking your request against all active rule sets (EU GDPR, NIST RMF, India IT Rules 2026, OWASP LLM, and 15 additional frameworks). No violations detected. Proceeding.',
        time: nowTime(),
      };
      setMsgs(m => [...m, reply]);
      setLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      <div className="content-header">
        <div>
          <h1 className="page-title">Chat</h1>
          <p className="page-sub">Governed conversation interface — compliance enforced</p>
        </div>
        <div className="page-meta">
          <span className="pill pill--ok">
            <span className="status-dot status-dot--online" />
            Governance On
          </span>
          <button className="btn btn-secondary btn-sm">New Session</button>
        </div>
      </div>

      <div className="chat-wrap" style={{ height: 'calc(100vh - 210px)' }}>
        <div className="chat-messages">
          {msgs.map((m, i) => {
            if (m.role === 'system') {
              return (
                <div key={i} style={{
                  margin: '8px 0',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--warn-subtle)',
                  border: '1px solid color-mix(in srgb, var(--warn) 22%, transparent)',
                  fontSize: '12px',
                  color: 'var(--warn)',
                  fontWeight: 500,
                }}>
                  {m.text}
                </div>
              );
            }

            const isUser = m.role === 'user';
            return (
              <div className="chat-msg" key={i}>
                <div className="chat-msg__avatar" style={isUser ? { background: 'var(--accent-subtle)', color: 'var(--accent)' } : { background: 'var(--accent-2-subtle)', color: 'var(--accent-2)' }}>
                  {isUser ? 'U' : 'AI'}
                </div>
                <div className="chat-msg__body">
                  <div className="chat-msg__header">
                    <span className="chat-msg__name">{isUser ? 'You' : 'Governed Agent'}</span>
                    <span className="chat-msg__time">{m.time}</span>
                  </div>
                  <div className="chat-msg__text">{m.text}</div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="chat-msg">
              <div className="chat-msg__avatar" style={{ background: 'var(--accent-2-subtle)', color: 'var(--accent-2)' }}>AI</div>
              <div className="chat-msg__body">
                <div className="chat-msg__header">
                  <span className="chat-msg__name">Governed Agent</span>
                  <span className="chat-msg__time">...</span>
                </div>
                <div className="chat-msg__text" style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Checking compliance rules…</div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="chat-input-wrap">
          <div className="chat-input-box">
            <textarea
              placeholder="Send a governed message…"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              style={{ resize: 'none' }}
            />
            <button className="chat-send-btn" onClick={send} disabled={!draft.trim() || loading}>
              <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
          <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--muted)', paddingLeft: '4px' }}>
            All messages are subject to governance enforcement. Press Enter to send, Shift+Enter for new line.
          </div>
        </div>
      </div>
    </>
  );
}
