import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

const ResultDialog = ({ result, error, onClose }) => {
  const isError = Boolean(error);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.18s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
          padding: '28px 32px',
          minWidth: '340px',
          maxWidth: '420px',
          width: '90vw',
          animation: 'slideUp 0.2s ease',
          fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: isError
                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                : 'linear-gradient(135deg, #3b82f6, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px',
              boxShadow: isError
                ? '0 4px 12px rgba(239,68,68,0.35)'
                : '0 4px 12px rgba(99,102,241,0.35)',
            }}>
              {isError ? '⚠️' : '📊'}
            </div>
            <span style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: '700', letterSpacing: '-0.2px' }}>
              {isError ? 'Connection Error' : 'Pipeline Analysis'}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '16px',
              lineHeight: 1,
              padding: '4px 8px',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#e2e8f0'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#64748b'; }}
          >
            ✕
          </button>
        </div>

        {isError && (
          <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', margin: '0 0 20px' }}>
            {error}
          </p>
        )}

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <StatRow label="Nodes" value={result.num_nodes} icon="⬡" color="#60a5fa" />
            <StatRow label="Edges" value={result.num_edges} icon="→" color="#a78bfa" />
            <DagRow is_dag={result.is_dag} />
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            background: isError
              ? 'rgba(255,255,255,0.06)'
              : 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            color: isError ? '#94a3b8' : '#fff',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'inherit',
            letterSpacing: '0.3px',
            boxShadow: isError ? 'none' : '0 4px 14px rgba(99,102,241,0.3)',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, icon, color }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '10px',
    padding: '11px 14px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ color, fontSize: '14px' }}>{icon}</span>
      <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>{label}</span>
    </div>
    <span style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>
      {value}
    </span>
  </div>
);

const DagRow = ({ is_dag }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: is_dag ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.07)',
    border: `1px solid ${is_dag ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
    borderRadius: '10px',
    padding: '11px 14px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '14px' }}>{is_dag ? '✅' : '❌'}</span>
      <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Is DAG</span>
    </div>
    <div style={{ textAlign: 'right' }}>
      <span style={{ color: is_dag ? '#34d399' : '#f87171', fontSize: '13px', fontWeight: '700' }}>
        {is_dag ? 'Yes' : 'No'}
      </span>
      <span style={{ color: '#475569', fontSize: '11px', display: 'block', marginTop: '1px' }}>
        {is_dag ? 'No cycles detected' : 'Cycles detected'}
      </span>
    </div>
  </div>
);

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server returned ${response.status}`);

      const data = await response.json();
      setDialog({ result: data });
    } catch (err) {
      setDialog({ error: `${err.message}\n\nMake sure the backend is running on http://localhost:8000` });
    } finally {
      setLoading(false);
    }
  };

  const n = nodes.length;
  const e = edges.length;

  return (
    <>
      {dialog && (
        <ResultDialog
          result={dialog.result}
          error={dialog.error}
          onClose={() => setDialog(null)}
        />
      )}

      <div className="submit-bar">
        <span className="submit-bar__stats">
          {n} node{n !== 1 ? 's' : ''} · {e} edge{e !== 1 ? 's' : ''}
        </span>
        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          <span>{loading ? '⏳' : '⚡'}</span>
          <span>{loading ? 'Analyzing…' : 'Submit Pipeline'}</span>
        </button>
      </div>
    </>
  );
};
