import {
    addEdge,
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    type Edge,
    type Node,
    type OnConnect,
} from '@xyflow/react';
import { CSSProperties, useCallback } from 'react';

import '@xyflow/react/dist/style.css';

const rfStyle: CSSProperties = {
    backgroundColor: '#D0C0F7',
};

const initialNodes: Node[] = [
    {
        id: 'A',
        type: 'group',
        data: { label: null },
        position: { x: 0, y: 0 },
        style: {
            width: 170,
            height: 140,
        },
    },
    {
        id: 'A-1',
        type: 'input',
        data: { label: 'child node 1' },
        position: { x: 10, y: 10 },
        parentId: 'A',
        extent: 'parent',
    },
    {
        id: 'A-2',
        data: { label: 'child node 2' },
        position: { x: 10, y: 90 },
        parentId: 'A',
        extent: 'parent',
    },
    {
        id: 'B',
        type: 'output',
        data: { label: 'output 1' },
        position: { x: -100, y: 250 },
    },
    {
        id: 'C',
        type: 'output',
        data: { label: 'output 2' },
        position: { x: 100, y: 250 },
    },
];

const initialEdges: Edge[] = [
    { id: 'A-1->A-2', source: 'A-1', target: 'A-2' },
    { id: 'A-2->B', source: 'A-2', target: 'B' },
    { id: 'A-2->C', source: 'A-2', target: 'C' },
];

function SubFlows() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <ReactFlow
                    style={rfStyle}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    attributionPosition="top-right"
                    fitView
                >
                    <Background />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}
export default SubFlows;
