export const DraggableNode = ({ type, label, color = '#60a5fa', icon = '○' }) => {
  const onDragStart = (event, nodeType) => {
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (
    <div
      className={`draggable-chip ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      style={{
        '--chip-accent':       color,
        '--chip-bg':           `rgba(${r},${g},${b},0.1)`,
        '--chip-border':       `rgba(${r},${g},${b},0.22)`,
        '--chip-hover-bg':     `rgba(${r},${g},${b},0.18)`,
        '--chip-hover-border': `rgba(${r},${g},${b},0.4)`,
      }}
    >
      <span className="draggable-chip__icon">{icon}</span>
      <span>{label}</span>
      <span className="draggable-chip__dot" />
    </div>
  );
};
