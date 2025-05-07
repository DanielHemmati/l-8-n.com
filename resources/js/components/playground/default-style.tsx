import {
    addEdge,
    Background,
    Controls,
    MiniMap,
    Position,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    type Edge,
    type Node,
    type OnConnect,
} from '@xyflow/react';
import { useCallback } from 'react';

// import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/style.css';

const nodeDefault = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
};

const initialNodes: Node[] = [
    { id: '1', position: { x: 0, y: 150 }, data: { label: 'Node 1' }, ...nodeDefault },
    { id: '2', position: { x: 250, y: 0 }, data: { label: 'Node 2' }, ...nodeDefault },
    { id: '3', position: { x: 250, y: 150 }, data: { label: 'Node 3' }, ...nodeDefault },
    { id: '4', position: { x: 250, y: 300 }, data: { label: 'Node 4' }, ...nodeDefault },
];

const initialEdges: Edge[] = [
    { id: '1->2', source: '1', target: '2', animated: true },
    { id: '1->3', source: '1', target: '3' },
    { id: '1->4', source: '1', target: '4' },
];

function DefaultStyle() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    colorMode="dark"
                    fitView
                >
                    <MiniMap />
                    <Background />
                    <Controls />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}

export default DefaultStyle;
