import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    type DefaultEdgeOptions,
    type Edge,
    type Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';

const defaultNodes: Node[] = [
    {
        id: 'a',
        type: 'input',
        data: { label: 'Node A' },
        position: { x: 250, y: 25 },
    },

    {
        id: 'b',
        data: { label: 'Node B' },
        position: { x: 100, y: 125 },
    },
    {
        id: 'c',
        type: 'output',
        data: { label: 'Node C' },
        position: { x: 250, y: 250 },
    },
];

const edgeOptions: DefaultEdgeOptions = {
    animated: true,
};

const defaultEdges: Edge[] = [{ id: 'e1-2', source: 'a', target: 'b' }];

let nodeId = 0;

function Flow() {
    const reactFlowInstance = useReactFlow();
    const onClick = useCallback(() => {
        const id = `${++nodeId}`;
        const newNode: Node = {
            id,
            position: {
                x: Math.random() * 100,
                y: Math.random() * 100,
            },
            data: {
                label: `Node ${id}`,
            },
        };

        reactFlowInstance.addNodes(newNode);
    }, []);

    return (
        <>
            <ReactFlow
                defaultNodes={defaultNodes}
                defaultEdges={defaultEdges}
                fitView
                defaultEdgeOptions={edgeOptions}
            />
            <button
                className="border px-1 py-1 absolute top-10 left-10 z-10"
                onClick={onClick}
            >
                Add Node
            </button>
        </>
    );
}

function UncontrolledFlow() {
    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <Flow />
                <Background color="#ccc" />
                <Controls />
                <MiniMap />
            </ReactFlowProvider>
        </div>
    );
}
export default UncontrolledFlow;
