import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { JsonEditorPanel } from './JsonEditorPanel';

function App() {
  const [jsonOpen, setJsonOpen] = useState(false);

  return (
    <div className="app">
      <PipelineToolbar
        jsonOpen={jsonOpen}
        onJsonToggle={() => setJsonOpen((o) => !o)}
      />
      <div className="app__canvas">
        <PipelineUI />
        <JsonEditorPanel open={jsonOpen} onClose={() => setJsonOpen(false)} />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
