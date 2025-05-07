import {
    addEdge,
    Background,
    BackgroundVariant,
    BaseEdge,
    Connection,
    Controls,
    Edge,
    EdgeLabelRenderer,
    EdgeProps,
    getStraightPath,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useReactFlow,
    type Node,
} from '@xyflow/react';
import { useCallback } from 'react';
import { StepEdge } from './custom-edge/step-edge';
import SineEdge from './custom-edge/sine-edge';
import '@xyflow/react/dist/style.css';

function CustomEdge({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                style={{ stroke: 'red', strokeWidth: 2, strokeLinecap: 'round' }}
            />
            <EdgeLabelRenderer>
                <button
                    // this seems to me more like hacky way to do this, but i am fine with it for now
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan rounded-md border border-red-500 bg-red-500 text-sm text-white"
                    onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
                >
                    Delete
                </button>
            </EdgeLabelRenderer>
        </>
    );
}

const initialNodes: Node[] = [
    { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
    { id: 'b', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
    { id: 'c', position: { x: 0, y: 200 }, data: { label: 'Node C' } },
    // step edge example
    { id: 'd', position: { x: 200, y: 100 }, data: { label: 'Node D' } },
    { id: 'e', position: { x: 400, y: 200 }, data: { label: 'Node E' } },
    // sine edge example
    { id: 'f', position: { x: 200, y: 300 }, data: { label: 'Node F' } },
    { id: 'g', position: { x: 400, y: 400 }, data: { label: 'Node G' } },
];

const initialEdges: Edge[] = [
    { id: 'a->b', type: 'customEdge', source: 'a', target: 'b' },
    { id: 'b->c', type: 'customEdge', source: 'b', target: 'c' },
    { id: 'd->e', type: 'stepEdge', source: 'd', target: 'e' },
    { id: 'f->g', type: 'sineEdge', source: 'f', target: 'g' },
];

const edgeTypes = {
    customEdge: CustomEdge,
    stepEdge: StepEdge,
    sineEdge: SineEdge,
};

function CustomEdgeTutorial() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (connection: Connection) => {
            const edge = { ...connection, type: 'customEdge' };
            console.log(edge);
            setEdges((eds) => addEdge(edge, eds));
        },
        [setEdges],
    );

    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    edgeTypes={edgeTypes}
                    fitView
                />
                <Background
                    variant={BackgroundVariant.Dots}
                    color="#ccc"
                    size={1}
                />
                <Controls />
                <MiniMap />
            </ReactFlowProvider>
        </div>
    );
}
export default CustomEdgeTutorial;
