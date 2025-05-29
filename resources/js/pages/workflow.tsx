import { AppSidebar } from '@/components/app-sidebar';
import { DevTools } from '@/components/devtools';
import { NodeDetailViewDialog } from '@/components/editor/ndv-node';
import { nodeTypes } from '@/components/editor/node-config/node-types';
import TestExecuteButton from '@/components/editor/TestExecuteButton';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DnDProvider, useDnD } from '@/context/DnDContext';
import { useStore } from '@/lib/editor-store';
import { NodeConfig, NodeInput, NodesByCategoryType, WorkflowDefinition } from '@/types/editor-types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Background, MiniMap, Panel, ReactFlow, ReactFlowProvider, SelectionMode, useReactFlow, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    // <dialog>
    isDialogOpen: state.isDialogOpen,
    // toggleDialog: state.toggleDialog,
    // openDialog: state.openDialog,
    // closeDialog: state.closeDialog,
    // </dialog>
});

function getDisplayNameByType(type: string, nodesConfig: NodesByCategoryType): string | undefined {
    for (const nodes of Object.values(nodesConfig)) {
        const found = nodes.find((node) => node.type === type);
        if (found) return found.displayName;
    }
    return undefined;
}

function getNodeInputsByType(type: string, nodesConfig: NodesByCategoryType): NodeInput[] | undefined {
    for (const nodes of Object.values(nodesConfig)) {
        const found = nodes.find((node) => node.type === type);
        if (found && found.inputs) return Object.values(found.inputs);
    }
    return undefined;
}

function WorkFlowReactFlow({ nodesConfig, latestWorkflow }: { nodesConfig: NodesByCategoryType; latestWorkflow: WorkflowDefinition }) {
    const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, isDialogOpen } = useStore(useShallow(selector));
    const [selectedNode, setSelectedNode] = useState<Node | NodeConfig | null>(null);
    const { screenToFlowPosition, toObject, setViewport } = useReactFlow();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [type] = useDnD();

    const { errors, processing } = useForm({
        workflow_name: 'Untitled Workflow',
        data: {},
    });

    // show latest workflow on first render
    useEffect(() => {
        if (latestWorkflow) {
            const { nodes, edges, viewport } = latestWorkflow.data;
            setNodes(nodes);
            setEdges(edges);
            setViewport(viewport);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // i want this only on first render

    // TODO: add keyboard shortcut
    const clearCanvas = useCallback(() => {
        setNodes([]);
        setEdges([]);
        setViewport({ x: 0, y: 0, zoom: 1 });
    }, [setNodes, setEdges, setViewport]);

    const handleNodeClick = useCallback((_, node: Node) => {
        setSelectedNode(node);
    }, []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
        event.preventDefault();
        return (event.returnValue = '');
    }, []);

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            const displayName = getDisplayNameByType(type, nodesConfig);
            const inputs = getNodeInputsByType(type, nodesConfig);

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            // node.php and here should be almost the same
            const newNode = {
                id: `${type}.${nanoid()}`,
                type,
                position,
                inputs, // for dynamnic inputs, important for ndv-node.tsx
                // ? is there any way to put displayName not into data?
                data: { label: `${type}`, displayName },
            };

            // setNodes([...nodes, newNode]);
            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );

    const handleSave = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const flow = toObject();
            // for unkonwn reason, post from useFrom doens't work (speically when i work with setData)
            router.post(route('workflow.store'), {
                workflow_name: 'Untitled Workflow', // TODO: ability to change workflow name
                // @ts-expect-error - i just want to send it back to the server
                data: flow,
            });
        },
        [toObject],
    );

    const handleExecute = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            router.post(route('workflow.test-execute'), {
                workflow_name: 'Untitled Workflow', // TODO: ability to change workflow name
                // @ts-expect-error - i just want to send it back to the server
                data: toObject(),
            });
        },
        [toObject],
    );

    // console.log(data);
    return (
        <div
            className="h-full w-full"
            ref={reactFlowWrapper}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                snapToGrid
                snapGrid={[20, 20]}
                minZoom={0}
                fitView
                // for showing the node data on ndv
                onNodeClick={handleNodeClick} // i think this is faster than onNodeDoubleClick
                // <figma like canvas>
                panOnDrag={[1]} // only middle mouse button
                panOnScroll
                selectionOnDrag
                selectionMode={SelectionMode.Partial}
                // </figma like canvas>
                onDrop={onDrop}
                onDragOver={onDragOver}
            />
            <Background color="#888" />
            <MiniMap />
            <Panel position="top-right">
                <div className="flex gap-4">
                    <form onSubmit={handleSave}>
                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? 'saving...' : 'save'}
                        </Button>
                    </form>
                    <Button
                        type="button"
                        onClick={clearCanvas}
                    >
                        clear
                    </Button>
                </div>
                {errors.workflow_name && <p className="text-red-500">{errors.workflow_name}</p>}
            </Panel>
            <DevTools position="top-center" />
            <Panel position="top-left">
                <SidebarTrigger />
            </Panel>
            <Panel position="bottom-center">
                <TestExecuteButton onClick={handleExecute} />
            </Panel>

            {/* send the detailf of a node to the dialog */}
            {isDialogOpen && <NodeDetailViewDialog node={selectedNode as Node & NodeConfig} />}
        </div>
    );
}

// workflow page
function Workflow({ nodesByCategory, latestWorkflow }: { nodesByCategory: NodesByCategoryType; latestWorkflow: WorkflowDefinition }) {
    return (
        //? still i don't konw why DnDProvider should be at top. maybe i can still use zustand for this
        <DnDProvider>
            <SidebarProvider>
                <AppSidebar nodesByCategory={nodesByCategory} />
                <SidebarInset>
                    <ReactFlowProvider>
                        <WorkFlowReactFlow
                            nodesConfig={nodesByCategory}
                            latestWorkflow={latestWorkflow}
                        />
                    </ReactFlowProvider>
                </SidebarInset>
            </SidebarProvider>
        </DnDProvider>
    );
}

export default Workflow;
