import {
    addEdge,
    Background,
    useNodesState,
    useEdgesState,
    BackgroundVariant,
    Connection,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    type Edge,
    type Node,
} from '@xyflow/react';
import { useCallback, useState } from 'react';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 100, y: 100 },
    },
];
const initialEdges: Edge[] = [];

function Interactivity() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                />
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={12}
                    size={1}
                    color="#ccc"
                />
                <Controls />
                <MiniMap />
            </ReactFlowProvider>
        </div>
    );
}
export default Interactivity;
