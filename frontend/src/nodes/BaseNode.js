import { Handle, Position } from 'reactflow';
import './BaseNode.css';

const getHandleTop = (index, total) => {
  if (total === 1) return '50%';
  return `${(index / (total - 1)) * 80 + 10}%`;
};

export const BaseNode = ({
  id,
  title,
  children,
  inputs = [],
  outputs = [],
  accentColor = '#60a5fa',
  icon = null,
  style = {},
  minWidth = 220,
}) => (
  <div
    className="base-node"
    style={{ '--accent': accentColor, minWidth: `${minWidth}px`, ...style }}
  >
    {inputs.map((input, index) => (
      <Handle
        key={input.id}
        type="target"
        position={Position.Left}
        id={`${id}-${input.id}`}
        style={{
          background: input.color || '#60a5fa',
          top: getHandleTop(index, inputs.length),
          ...input.style,
        }}
        title={input.label}
      />
    ))}

    <div className="base-node__header">
      {icon && <span className="base-node__icon">{icon}</span>}
      <span className="base-node__title">{title}</span>
    </div>

    <div className="base-node__body">{children}</div>

    {outputs.map((output, index) => (
      <Handle
        key={output.id}
        type="source"
        position={Position.Right}
        id={`${id}-${output.id}`}
        style={{
          background: output.color || '#34d399',
          top: getHandleTop(index, outputs.length),
          ...output.style,
        }}
        title={output.label}
      />
    ))}
  </div>
);
