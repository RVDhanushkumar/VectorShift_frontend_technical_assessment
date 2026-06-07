import { DraggableNode } from './draggableNode';

const NODE_DEFS = [
  { type: 'customInput',   label: 'Input',       color: '#3b82f6', icon: '📥' },
  { type: 'customOutput',  label: 'Output',      color: '#10b981', icon: '📤' },
  { type: 'llm',           label: 'LLM',         color: '#8b5cf6', icon: '🤖' },
  { type: 'text',          label: 'Text',        color: '#f59e0b', icon: '📝' },
  { type: 'conditional',   label: 'Conditional', color: '#f97316', icon: '🔀' },
  { type: 'apiCall',       label: 'API Call',    color: '#06b6d4', icon: '🌐' },
  { type: 'dataTransform', label: 'Transform',   color: '#ec4899', icon: '⚙️'  },
  { type: 'comment',       label: 'Note',        color: '#64748b', icon: '💬' },
];

export const PipelineToolbar = ({ onJsonToggle, jsonOpen }) => (
  <div className="toolbar">
    <div className="toolbar__logo">
      <div className="toolbar__logo-badge">⚡</div>
      Pipeline Builder
    </div>
    <div className="toolbar__divider" />
    <div className="toolbar__nodes">
      {NODE_DEFS.map(({ type, label, color, icon }) => (
        <DraggableNode key={type} type={type} label={label} color={color} icon={icon} />
      ))}
    </div>
    <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
      <button
        className={`json-toggle-btn${jsonOpen ? ' json-toggle-btn--active' : ''}`}
        onClick={onJsonToggle}
        title="Open JSON editor"
      >
        <span style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 700 }}>{'{ }'}</span>
        <span>JSON</span>
      </button>
    </div>
  </div>
);
