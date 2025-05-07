import {
    Background,
    Controls,
    MiniMap,
    Position,
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useEdgesState,
    useNodesState,
    type Edge,
    type Node,
    type OnConnect,
} from '@xyflow/react';
import { useCallback } from 'react';

import '@xyflow/react/dist/style.css';

const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
};

const initialNodes: Node[] = [
    {
        id: 'A',
        type: 'input',
        position: { x: 0, y: 150 },
        data: { label: 'A' },
        ...nodeDefaults,
    },
    {
        id: 'B',
        position: { x: 250, y: 0 },
        data: { label: 'B' },
        ...nodeDefaults,
    },
    {
        id: 'C',
        position: { x: 250, y: 150 },
        data: { label: 'C' },
        ...nodeDefaults,
    },
    {
        id: 'D',
        position: { x: 250, y: 300 },
        data: { label: 'D' },
        ...nodeDefaults,
    },
];

const initialEdges: Edge[] = [
    {
        id: 'A-B',
        source: 'A',
        target: 'B',
    },
    {
        id: 'A-C',
        source: 'A',
        target: 'C',
    },
    {
        id: 'A-D',
        source: 'A',
        target: 'D',
    },
];

const ColorModeFlow = () => {
    // const [colorMode, setColorMode] = useState<ColorMode>('dark');
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    // const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    //     setColorMode(evt.target.value as ColorMode);
    // };

    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    colorMode="dark"
                    fitView
                >
                    <MiniMap />
                    <Background />
                    <Controls />

                    {/* <Panel position="top-right">
                    <select
                        className="xy-theme__select"
                        onChange={onChange}
                        data-testid="colormode-select"
                    >
                        <option value="dark">dark</option>
                        <option value="light">light</option>
                        <option value="system">system</option>
                    </select>
                </Panel> */}
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
};

export default ColorModeFlow;
