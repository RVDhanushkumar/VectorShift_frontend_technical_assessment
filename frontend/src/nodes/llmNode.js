import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      accentColor="#8b5cf6"
      inputs={[
        { id: 'system', label: 'System Prompt', color: '#a78bfa' },
        { id: 'prompt', label: 'User Prompt',   color: '#c4b5fd' },
      ]}
      outputs={[{ id: 'response', label: 'Response', color: '#ddd6fe' }]}
    >
      <div className="node-field">
        <span className="node-field__label">Model</span>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-opus-4-8">Claude Opus 4</option>
          <option value="claude-sonnet-4-6">Claude Sonnet 4</option>
        </select>
      </div>
    </BaseNode>
  );
};
