import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode }        from './nodes/inputNode';
import { LLMNode }          from './nodes/llmNode';
import { OutputNode }       from './nodes/outputNode';
import { TextNode }         from './nodes/textNode';
import { ConditionalNode }  from './nodes/conditionalNode';
import { APICallNode }      from './nodes/apiCallNode';
import { DataTransformNode} from './nodes/dataTransformNode';
import { CommentNode }      from './nodes/commentNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput:   InputNode,
  llm:           LLMNode,
  customOutput:  OutputNode,
  text:          TextNode,
  conditional:   ConditionalNode,
  apiCall:       APICallNode,
  dataTransform: DataTransformNode,
  comment:       CommentNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;

            if (typeof type === 'undefined' || !type) {
              return;
            }

            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };

            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                style={{ background: 'transparent' }}
            >
                <Background color="#465e96" gap={gridSize} variant="dots" size={1.5} />
                <Controls />
                <MiniMap
                    nodeColor={(node) => {
                        const map = {
                            customInput: '#3b82f6', customOutput: '#10b981',
                            llm: '#8b5cf6', text: '#f59e0b', conditional: '#f97316',
                            apiCall: '#06b6d4', dataTransform: '#ec4899', comment: '#64748b',
                        };
                        return map[node.type] || '#334155';
                    }}
                />
            </ReactFlow>
        </div>
        </>
    )
}
