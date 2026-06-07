import { useState, useEffect, useRef } from 'react';
import { MarkerType } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes:    state.nodes,
  edges:    state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const prettify = (nodes, edges) =>
  JSON.stringify({ nodes, edges }, null, 2);

const normalizeEdges = (edges) =>
  edges.map((e) => ({
    type:      'smoothstep',
    animated:  true,
    markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
    ...e,
  }));

export const JsonEditorPanel = ({ open, onClose }) => {
  const { nodes, edges, setNodes, setEdges } = useStore(selector, shallow);
  const [localJson, setLocalJson]  = useState('');
  const [error, setError]          = useState('');
  const [copied, setCopied]        = useState(false);
  const textareaRef                = useRef(null);

  useEffect(() => {
    if (open) {
      setLocalJson(prettify(nodes, edges));
      setError('');
    }
  }, [open]);

  const isDirty = localJson !== prettify(nodes, edges);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(localJson);

      if (!Array.isArray(parsed.nodes))
        throw new Error('"nodes" must be an array');
      if (!Array.isArray(parsed.edges))
        throw new Error('"edges" must be an array');

      parsed.nodes.forEach((n, i) => {
        if (!n.id)       throw new Error(`nodes[${i}] is missing "id"`);
        if (!n.position) throw new Error(`nodes[${i}] is missing "position"`);
      });

      setNodes(parsed.nodes);
      setEdges(normalizeEdges(parsed.edges));
      setError('');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setLocalJson(prettify(nodes, edges));
    setError('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const lineCount = localJson.split('\n').length;
  const byteSize  = new Blob([localJson]).size;
  const sizeLabel = byteSize < 1024
    ? `${byteSize} B`
    : `${(byteSize / 1024).toFixed(1)} KB`;

  if (!open) return null;

  return (
    <>
      <div className="json-panel-overlay" onClick={onClose} />

      <div className="json-panel">
        <div className="json-panel__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="json-panel__badge">{ }</div>
            <span className="json-panel__title">Flow JSON</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button className="json-panel__icon-btn" onClick={handleCopy} title="Copy JSON">
              {copied ? '✓' : '⧉'}
            </button>
            <button className="json-panel__icon-btn" onClick={onClose} title="Close">✕</button>
          </div>
        </div>

        <div className="json-panel__hint">
          Edit the JSON below or paste a new pipeline and click <strong>Apply</strong>.<br />
          Nodes need at least <code>id</code>, <code>type</code>, and <code>position</code>.
        </div>

        <div className="json-panel__editor-wrap">
          <textarea
            ref={textareaRef}
            className="json-panel__textarea"
            value={localJson}
            onChange={(e) => { setLocalJson(e.target.value); setError(''); }}
            spellCheck={false}
          />
        </div>

        {error && (
          <div className="json-panel__error">
            <span>⚠</span> {error}
          </div>
        )}

        <div className="json-panel__footer">
          <span className="json-panel__meta">
            {lineCount} lines · {sizeLabel}
            {isDirty && <span className="json-panel__dirty"> · unsaved</span>}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="json-panel__btn json-panel__btn--ghost"
              onClick={handleReset}
              disabled={!isDirty}
            >
              Reset
            </button>
            <button
              className="json-panel__btn json-panel__btn--primary"
              onClick={handleApply}
            >
              Apply to Flow
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
