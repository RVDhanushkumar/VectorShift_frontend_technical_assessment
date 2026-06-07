import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      accentColor="#10b981"
      inputs={[{ id: 'value', label: 'Value', color: '#34d399' }]}
    >
      <div className="node-field">
        <span className="node-field__label">Name</span>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </div>
      <div className="node-field">
        <span className="node-field__label">Type</span>
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
          <option value="File">File</option>
          <option value="JSON">JSON</option>
        </select>
      </div>
    </BaseNode>
  );
};
