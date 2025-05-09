import {
    addEdge,
    Background,
    Controls,
    MiniMap,
    OnConnect,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    type Edge,
    type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './index.css';

import { useCallback } from 'react';
import ColorPreview from './ColorPreview';
import LightnessNode from './LightnessNode';
import Log from './Log';
import NumberInput from './NumberInput';

const initialNodes: Node[] = [
    {
        type: 'NumberInput',
        id: '1',
        data: { label: 'Red', value: 255 },
        position: { x: 0, y: 0 },
    },
    {
        type: 'NumberInput',
        id: '2',
        data: { label: 'Green', value: 0 },
        position: { x: 0, y: 100 },
    },
    {
        type: 'NumberInput',
        id: '3',
        data: { label: 'Blue', value: 0 },
        position: { x: 0, y: 200 },
    },
    {
        type: 'ColorPreview',
        id: 'color',
        position: { x: 150, y: 50 },
        data: { label: 'Color', value: { r: undefined, g: undefined, b: undefined } },
    },
    {
        type: 'LightnessNode',
        id: 'lightness',
        position: { x: 350, y: 75 },
        data: { label: 'Lightness' },
    },
    {
        id: 'log-1',
        type: 'Log',
        position: { x: 500, y: 0 },
        data: { label: 'Use black font', fontColor: 'black' },
    },
    {
        id: 'log-2',
        type: 'Log',
        position: { x: 500, y: 140 },
        data: { label: 'Use white font', fontColor: 'white' },
    },
];

const initialEdges: Edge[] = [
    {
        id: '1-color',
        source: '1',
        target: 'color',
        targetHandle: 'red',
    },
    {
        id: '2-color',
        source: '2',
        target: 'color',
        targetHandle: 'green',
    },
    {
        id: '3-color',
        source: '3',
        target: 'color',
        targetHandle: 'blue',
    },
    {
        id: 'color-lightness',
        source: 'color',
        target: 'lightness',
    },
    {
        id: 'lightness-log-1',
        source: 'lightness',
        sourceHandle: 'light',
        target: 'log-1',
    },
    {
        id: 'lightness-log-2',
        source: 'lightness',
        sourceHandle: 'dark',
        target: 'log-2',
    },
];

const nodeTypes = {
    NumberInput,
    ColorPreview,
    LightnessNode,
    Log,
};

// https://reactflow.dev/learn/advanced-use/computing-flows
function Compute() {
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
                    nodeTypes={nodeTypes}
                    fitView
                />
                <Background color="#ccc" />
                <Controls />
                <MiniMap />
            </ReactFlowProvider>
        </div>
    );
}

export default Compute;
