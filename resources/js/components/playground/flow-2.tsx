import { Background, BackgroundVariant, Controls, type Edge, type Node, Position, ReactFlow, ReactFlowProvider } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Node 1' },
        style: { opacity: 0.5 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '2',
        position: { x: 400, y: 100 },
        data: { label: 'Node 2' },
        style: { opacity: 0.5 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
];

const initialEdges: Edge[] = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        label: 'This is an edge',
        labelStyle: { fontSize: 20 },
        labelBgStyle: { fill: 'rgba(255,255,255,0.7)' },
        labelBgPadding: [20, 10],
        style: { stroke: '#222', strokeWidth: 2 },
    },
];

function Flow2() {
    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <ReactFlow
                    nodes={initialNodes}
                    edges={initialEdges}
                    proOptions={{ hideAttribution: true }}
                    fitView
                />
                <Background
                    gap={20}
                    color="#ccc"
                    variant={BackgroundVariant.Dots}
                />
                <Controls />
            </ReactFlowProvider>
        </div>
    );
}
export default Flow2;
