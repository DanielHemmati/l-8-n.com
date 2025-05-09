import {
    addEdge,
    Background,
    Controls,
    MiniMap,
    OnConnect,
    OnNodeDrag,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    type DefaultEdgeOptions,
    type Edge,
    type FitViewOptions,
    type Node,
    type NodeProps,
} from '@xyflow/react';
import { useCallback } from 'react';

import '@xyflow/react/dist/style.css';

type NumberNodeType = Node<{ number: number }, 'number'>;

function NumberNode({ data }: NodeProps<NumberNodeType>) {
    return <div className="bg-red-500">{data.number}</div>;
}

const initialNodes: Node[] = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 }, type: 'number' },
    { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 }, type: 'number' },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const fitViewOptions: FitViewOptions = {
    padding: 0.2,
    // duration: 1000, // add a fancy animation
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
};

const onNodeDrag: OnNodeDrag = (_, node) => {
    console.log('drag event', node.data);
};

// https://reactflow.dev/learn/advanced-use/typescript
function FitViewOptions() {
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
                    fitView
                    fitViewOptions={fitViewOptions}
                    defaultEdgeOptions={defaultEdgeOptions}
                    onNodeDrag={onNodeDrag}
                />
                <Background
                    color="#ccc"
                    gap={12}
                />
                <Controls />
                <MiniMap />
            </ReactFlowProvider>
        </div>
    );
}

export default FitViewOptions;
