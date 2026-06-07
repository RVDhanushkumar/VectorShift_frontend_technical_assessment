import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const CommentNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');

  return (
    <BaseNode id={id} title="Note" icon="💬" accentColor="#64748b">
      <div className="node-field">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Add your note here…"
          style={{ color: '#94a3b8', background: 'transparent' }}
        />
      </div>
    </BaseNode>
  );
};
