import { AppSidebar } from '@/components/app-sidebar';
import { NodeDetailViewDialog } from '@/components/editor/ndv-node';
import { nodeTypes } from '@/components/editor/node-config/node-types';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DnDProvider, useDnD } from '@/context/DnDContext';
import { useStore } from '@/lib/editor-store';
import { NodeConfig, NodeInput, NodesByCategoryType } from '@/types/editor-types';
import { Background, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider, SelectionMode, useReactFlow, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import TestExecuteButton from '@/components/editor/TestExecuteButton';

// import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    setNodes: state.setNodes,
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

let id = 0;
const getId = () => `dndnode_${id++}`;

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

function WorkFlowReactFlow({ nodesConfig }: { nodesConfig: NodesByCategoryType }) {
    const [selectedNode, setSelectedNode] = useState<Node | NodeConfig | null>(null);
    const { nodes, edges, setNodes, onNodesChange, onEdgesChange, onConnect, isDialogOpen } = useStore(useShallow(selector));
    const { screenToFlowPosition } = useReactFlow();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [type] = useDnD();

    const handleNodeClick = useCallback((_, node: Node) => {
        setSelectedNode(node);
    }, []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
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
            const newNode = {
                id: getId(),
                type,
                position,
                inputs, // for dynamnic inputs, important for ndv-node.tsx
                data: { label: `${type} node`, displayName },
            };

            // setNodes([...nodes, newNode]);
            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );

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
            <Controls />
            <Panel position="top-left">
                <SidebarTrigger />
            </Panel>
            <Panel position="bottom-center">
                <TestExecuteButton />
            </Panel>

            {/* send the detailf of a node to the dialog */}
            {isDialogOpen && <NodeDetailViewDialog node={selectedNode as Node & NodeConfig} />}
        </div>
    );
}

// workflow page
function Workflow({ nodesByCategory }: { nodesByCategory: NodesByCategoryType }) {
    console.log(nodesByCategory);
    return (
        //? still i don't konw why DnDProvider should be at top. maybe i can still use zustand for this
        <DnDProvider>
            <SidebarProvider>
                <AppSidebar nodesByCategory={nodesByCategory} />
                <SidebarInset>
                    <ReactFlowProvider>
                        <WorkFlowReactFlow nodesConfig={nodesByCategory} />
                    </ReactFlowProvider>
                </SidebarInset>
            </SidebarProvider>
        </DnDProvider>
    );
}

export default Workflow;
