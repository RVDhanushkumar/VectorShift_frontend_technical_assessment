import { useState, useMemo, useRef, useEffect } from 'react';
import { BaseNode } from './BaseNode';

const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const seen = new Set();
  const vars = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
};

const calcWidth = (text) => {
  const maxLen = Math.max(...text.split('\n').map((l) => l.length), 20);
  return Math.max(240, Math.min(560, maxLen * 8.5 + 60));
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [currText]);

  const variables = useMemo(() => extractVariables(currText), [currText]);
  const nodeWidth  = calcWidth(currText);

  const inputs = variables.map((v) => ({
    id:    `var-${v}`,
    label: v,
    color: '#a78bfa',
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      accentColor="#f59e0b"
      inputs={inputs}
      outputs={[{ id: 'output', label: 'Text Output', color: '#fbbf24' }]}
      style={{ width: `${nodeWidth}px` }}
    >
      {variables.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {variables.map((v) => (
            <span
              key={v}
              style={{
                padding: '2px 9px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '0.3px',
                background: 'rgba(167, 139, 250, 0.12)',
                color: '#a78bfa',
                border: '1px solid rgba(167, 139, 250, 0.28)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {v}
            </span>
          ))}
        </div>
      )}

      <div className="node-field">
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Type text… use {{variable}} to add input handles"
          style={{ overflow: 'hidden', minHeight: '56px' }}
        />
      </div>

      {variables.length === 0 && (
        <p style={{ margin: 0, fontSize: '10px', color: '#334155', fontStyle: 'italic' }}>
          Try typing {'{{name}}'} to create an input handle
        </p>
      )}
    </BaseNode>
  );
};
