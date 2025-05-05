import {
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useEdgesState,
    useNodesState,
    SelectionMode,
    type Edge,
    type Node,
} from '@xyflow/react';
import { useCallback } from 'react';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
    {
        id: '1',
        data: { label: 'Node 1' },
        position: { x: 150, y: 0 },
    },
    {
        id: '2',
        data: { label: 'Node 2' },
        position: { x: 0, y: 150 },
    },
    {
        id: '3',
        data: { label: 'Node 3' },
        position: { x: 300, y: 150 },
    },
];

const initialEdges: Edge[] = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
    },
    {
        id: 'e1-3',
        source: '1',
        target: '3',
    },
];

const panOnDrag = [1, 2];

function ViewPort() {
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
                    // these three make it like figma
                    panOnDrag={panOnDrag}
                    selectionOnDrag
                    selectionMode={SelectionMode.Partial}
                />
                <Background variant={BackgroundVariant.Dots} color="#ccc" size={1} />
                <Controls />
                <MiniMap />
            </ReactFlowProvider>
        </div>
    );
}
export default ViewPort;
