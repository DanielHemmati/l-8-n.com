import { BaseNode } from '@/components/base-node';
import { addEdge, Background, Controls, MiniMap, OnConnect, Position, ReactFlow, useEdgesState, useNodesState, type Node } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { TooltipContent, TooltipNode, TooltipTrigger } from '@/components/tooltip-node';
import { useCallback } from 'react';
import { NumNode } from './nodes/num-node';

function Tooltip() {
    return (
        <TooltipNode>
            <TooltipContent position={Position.Top}>Hidden content</TooltipContent>
            <TooltipTrigger>Hover</TooltipTrigger>
        </TooltipNode>
    );
}

const nodeTypes = {
    tooltip: Tooltip,
    num: NumNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: {},
        type: 'tooltip',
    },
    {
        id: '2',
        position: { x: 90, y: 0 },
        data: { value: 0 },
        type: 'num',
    },
];

function MainCustomComponent() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            fitView
        >
            <Background color="#ccc" />
            <Controls />
            <MiniMap />
        </ReactFlow>
    );
}
export default MainCustomComponent;
