import { Background, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import { CSSProperties } from 'react';

import '@xyflow/react/dist/base.css';
// import '@xyflow/react/dist/style.css';

const nodeStyle: CSSProperties = {
    background: 'white',
    border: '1px solid #333',
    padding: 10,
    width: 100,
    textAlign: 'left',
    borderRadius: 2,
    boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px',
};

interface XYNodeProps {
    positionAbsoluteX: number;
    positionAbsoluteY: number;
}

function XYNode({ positionAbsoluteX, positionAbsoluteY }: XYNodeProps) {
    return (
        <div style={nodeStyle}>
            <div>x: {positionAbsoluteX.toFixed(2)}</div>
            <div>y: {positionAbsoluteY.toFixed(2)}</div>
        </div>
    );
}

const nodeTypes = {
    xy: XYNode,
};

const nodeDefaults = {
    type: 'xy',
    data: {},
};

const nodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        ...nodeDefaults,
    },
    {
        id: '2',
        position: { x: 250, y: 0 },
        ...nodeDefaults,
    },
    {
        id: '3',
        position: { x: 0, y: 250 },
        ...nodeDefaults,
    },
    {
        id: '4',
        position: { x: 250, y: 250 },
        ...nodeDefaults,
    },
];

function Flow1() {
    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <ReactFlow
                    defaultNodes={nodes}
                    preventScrolling={false}
                    nodeTypes={nodeTypes}
                >
                    <Background gap={25} />
                    <Controls
                        position="top-right"
                        showInteractive={false}
                    />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}

export default Flow1;
