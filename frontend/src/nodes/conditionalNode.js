import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'value > 0');

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon="🔀"
      accentColor="#f97316"
      inputs={[{ id: 'input', label: 'Input Value', color: '#fb923c' }]}
      outputs={[
        { id: 'true',  label: 'True Branch',  color: '#4ade80' },
        { id: 'false', label: 'False Branch', color: '#f87171' },
      ]}
    >
      <div className="node-field">
        <span className="node-field__label">Condition</span>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="value > 0"
          style={{ fontFamily: 'monospace', fontSize: '12px' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', paddingTop: '2px' }}>
        <span style={{ color: '#4ade80', fontWeight: 600 }}>● True</span>
        <span style={{ color: '#f87171', fontWeight: 600 }}>False ●</span>
      </div>
    </BaseNode>
  );
};
