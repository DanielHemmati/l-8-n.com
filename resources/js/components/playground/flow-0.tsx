import {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import { useCallback } from 'react';

import '@xyflow/react/dist/style.css';

// const initialNodes = [
//     { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
//     { id: '2', data: { label: 'Node 2' }, position: { x: 0, y: 100 } },
// ];

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },
    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
];

function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                />
                <MiniMap />
                <Controls />
                <Background
                    variant={BackgroundVariant.Dots}
                    color="#ccc"
                    gap={20}
                    size={1}
                />
            </ReactFlowProvider>
        </div>
    );
}

export default Flow;
