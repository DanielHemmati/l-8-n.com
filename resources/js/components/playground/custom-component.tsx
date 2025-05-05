import {
    addEdge,
    Background,
    BackgroundVariant,
    type Connection,
    Controls,
    Edge,
    MiniMap,
    type Node,
    Panel,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import { useCallback, useState } from 'react';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Custom Node' },
        position: { x: 250, y: 25 },
        style: { backgroundColor: '#6ede87', color: 'white' },
    },
    {
        id: '2',
        data: { label: <div>custom node</div> },
        position: { x: 100, y: 125 },
        style: { backgroundColor: '#ff0072', color: 'white' },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
        style: { backgroundColor: '#6865A5', color: 'white' },
    },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', label: 'to the', type: 'smoothstep'},
    { id: 'e2-3', source: '2', target: '3', label: 'to the end' },
];

function CustomComponent() {
    const [variant, setVariant] = useState(BackgroundVariant.Dots);
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
                    defaultEdgeOptions={{ animated: true }}
                    fitView
                >
                    <Background
                        variant={variant}
                        // gap={12}
                        // size={1}
                        color="#ccc"
                    />
                    <Controls />
                    <MiniMap />
                    <Panel>
                        <h1>variatns: {variant} </h1>
                        <div className="flex gap-2">
                            <button
                                className="rounded-md border px-2 py-1"
                                onClick={() => setVariant(BackgroundVariant.Dots)}
                            >
                                Dots
                            </button>
                            <button
                                className="rounded-md border px-2 py-1"
                                onClick={() => setVariant(BackgroundVariant.Lines)}
                            >
                                Lines
                            </button>
                            <button
                                className="rounded-md border px-2 py-1"
                                onClick={() => setVariant(BackgroundVariant.Cross)}
                            >
                                Cross
                            </button>
                        </div>
                    </Panel>
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}
export default CustomComponent;
