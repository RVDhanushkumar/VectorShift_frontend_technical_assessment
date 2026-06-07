import { useState } from 'react';
import { BaseNode } from './BaseNode';

const METHOD_COLORS = { GET: '#4ade80', POST: '#60a5fa', PUT: '#fbbf24', PATCH: '#c084fc', DELETE: '#f87171' };

export const APICallNode = ({ id, data }) => {
  const [url, setUrl]         = useState(data?.url      || 'https://api.example.com/endpoint');
  const [method, setMethod]   = useState(data?.method   || 'GET');
  const [authType, setAuth]   = useState(data?.authType || 'none');

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      accentColor="#06b6d4"
      inputs={[{ id: 'body', label: 'Request Body', color: '#22d3ee' }]}
      outputs={[{ id: 'response', label: 'Response', color: '#67e8f9' }]}
      minWidth={260}
    >
      <div className="node-field">
        <span className="node-field__label">Method</span>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ color: METHOD_COLORS[method] || '#e2e8f0', fontWeight: 700 }}
        >
          {Object.keys(METHOD_COLORS).map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="node-field">
        <span className="node-field__label">URL</span>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
      </div>
      <div className="node-field">
        <span className="node-field__label">Auth</span>
        <select value={authType} onChange={(e) => setAuth(e.target.value)}>
          <option value="none">None</option>
          <option value="bearer">Bearer Token</option>
          <option value="basic">Basic Auth</option>
          <option value="api_key">API Key</option>
        </select>
      </div>
      {authType === 'bearer' && (
        <div className="node-field">
          <span className="node-field__label">Bearer Token</span>
          <input type="password" placeholder="Enter bearer token..." />
        </div>
      )}
      {authType === 'basic' && (
        <div className="node-field">
          <span className="node-field__label">Username</span>
          <input type="text" placeholder="Enter username..." />
        </div>
      )}
      {authType === 'api_key' && (
        <div className="node-field">
          <span className="node-field__label">API Key</span>
          <input type="password" placeholder="Enter API key..." />
        </div>
      )}
    </BaseNode>
  );
};
