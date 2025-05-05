import {
    addEdge,
    Background,
    BackgroundVariant,
    Controls,
    Edge,
    Handle,
    MiniMap,
    Position,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    type Connection,
    type Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { ChangeEvent, CSSProperties, useCallback } from 'react';

interface TextUpdaterNodeData {
    data: string;
    isConnectable: boolean;
}
const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }: TextUpdaterNodeData) {
    const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="rounded-md border bg-white p-4">
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
            />
            <div className="flex flex-col">
                <label
                    htmlFor="text"
                    className="text-sm font-bold text-gray-500"
                >
                    Text:
                </label>
                <input
                    id="text"
                    name="text"
                    onChange={onChange}
                    className="nodrag border"
                />
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                isConnectable={isConnectable}
            />
        </div>
    );
}

const nodeTypes = {
    textUpdater: TextUpdaterNode,
};

const initialNodes: Node[] = [
    {
        id: 'node-1',
        type: 'textUpdater',
        position: { x: 0, y: 0 },
        data: { value: 123 },
    },
];

const initialEdges: Edge[] = [];

const rfStyle: CSSProperties = {
    backgroundColor: '#B8CEFF',
};

function CustomNodes() {
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
                    style={rfStyle}
                    fitView
                />
                <Background
                    variant={BackgroundVariant.Dots}
                    color="#ccc"
                />
                <Controls />
                <MiniMap />
            </ReactFlowProvider>
        </div>
    );
}
export default CustomNodes;
