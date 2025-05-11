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
        id: '1',
        type: 'NumberInput',
        data: { label: 'Red', value: 255 },
        position: { x: 0, y: 0 },
    },
    {
        id: '2',
        type: 'NumberInput',
        data: { label: 'Green', value: 0 },
        position: { x: 0, y: 100 },
    },
    {
        id: '3',
        type: 'NumberInput',
        data: { label: 'Blue', value: 0 },
        position: { x: 0, y: 200 },
    },
    {
        id: '4',
        type: 'NumberInput',
        data: { label: 'Blue', value: 200 },
        position: { x: 0, y: 300 },
    },
    {
        id: 'color',
        type: 'ColorPreview',
        position: { x: 150, y: 50 },
        data: { label: 'Color', value: { r: undefined, g: undefined, b: undefined } },
    },
    {
        id: 'lightness',
        type: 'LightnessNode',
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
        source: '1', // source is equal to the id of red number input node
        target: 'color', // target is the id of the colorPreview node
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
