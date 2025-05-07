import {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    Handle,
    MiniMap,
    Position,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useUpdateNodeInternals,
    type Node,
} from '@xyflow/react';
import { useCallback, useState } from 'react';

import '@xyflow/react/dist/style.css';

const randomPositions = [Position.Top, Position.Right, Position.Bottom, Position.Left];

// i don't know where this is useful
function RandomHandle({ id }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [handleCount, setHandleCount] = useState(0);
    const randomizeHandleCount = useCallback(() => {
        setHandleCount(Math.floor(Math.random() * 10));
        updateNodeInternals(id);
    }, [id, updateNodeInternals]);

    return (
        <div className="max-w-[300px] border p-4">
            {Array.from({ length: handleCount }).map((_, index) => (
                <Handle
                    key={index}
                    type="target"
                    position={randomPositions[index % randomPositions.length]}
                    id={`handle-${index}`}
                />
            ))}

            <div className="flex items-center justify-center flex-col">
                <button
                    className="rounded-md border border-indigo-500 px-2 py-1"
                    onClick={randomizeHandleCount}
                >
                    Randomize handle count
                </button>
                <p>There are {handleCount} handles on this node.</p>
            </div>
        </div>
    );
}

const nodeTypes = {
    randomHandle: RandomHandle,
};

const initialNodes: Node[] = [
    { id: '1', type: 'randomHandle', position: { x: 0, y: 0 }, data: { label: 'Random Handle' } },
    { id: '2', type: 'output', position: { x: 0, y: 100 }, data: { label: 'node-2' } },
    { id: '3', type: 'output', position: { x: 100, y: 100 }, data: { label: 'node-3' } },
];
const initialEdges: Edge[] = [
    { id: '1', source: '1', target: '2' },
    { id: '2', source: '1', target: '3' },
];

export default function LearningRandomHandle() {
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
                    nodeTypes={nodeTypes}
                    fitView
                />
                <Background
                    variant={BackgroundVariant.Dots}
                    color="#ccc"
                    size={1}
                    gap={12}
                />
                <Controls />
                <MiniMap />
            </ReactFlowProvider>
        </div>
    );
}
