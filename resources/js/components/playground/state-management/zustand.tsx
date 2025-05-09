import { NodeProps, ReactFlow, Handle, Position, MiniMap, Controls, ReactFlowProvider, Background } from '@xyflow/react';

import { useShallow } from 'zustand/react/shallow';
import useStore from './store';

import '@xyflow/react/dist/style.css';

import { AppState, type ColorNode } from './types';

function ColorChooserNode({ id, data }: NodeProps<ColorNode>) {
    const updateNodeColor = useStore((state) => state.updateNodeColor);

    return (
        <div className="rounded-full" style={{ backgroundColor: data.color }}>
            <Handle type="target" position={Position.Top} />
            <div className="p-5">
                <input className="nodrag" type="color" defaultValue={data.color} onChange={(e) => updateNodeColor(id, e.target.value)} />
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

const selector = (state: AppState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

const nodeTypes = {
    colorChooser: ColorChooserNode,
};

function Flow() {
    // i don't understand why useShallow is needed here
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(useShallow(selector));

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{
                animated: true,
            }}
        />
    );
}

// https://reactflow.dev/learn/advanced-use/state-management
function Zustand() {
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

export default Zustand;
