import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DataTransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation  || 'map');
  const [expression, setExpr]     = useState(data?.expression || 'x => x');

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚙️"
      accentColor="#ec4899"
      inputs={[{ id: 'data', label: 'Input Data', color: '#f472b6' }]}
      outputs={[{ id: 'result', label: 'Result', color: '#f9a8d4' }]}
    >
      <div className="node-field">
        <span className="node-field__label">Operation</span>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="map">Map</option>
          <option value="filter">Filter</option>
          <option value="reduce">Reduce</option>
          <option value="sort">Sort</option>
          <option value="flatten">Flatten</option>
          <option value="group">Group By</option>
        </select>
      </div>
      <div className="node-field">
        <span className="node-field__label">Expression</span>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="x => x"
          style={{ fontFamily: 'monospace', fontSize: '12px' }}
        />
      </div>
    </BaseNode>
  );
};
