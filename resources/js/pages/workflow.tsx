import { AppSidebar } from '@/components/app-sidebar';
import { NodeDetailViewDialog } from '@/components/editor/ndv-node';
import { nodeTypes } from '@/components/editor/node-config/node-types';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useStore } from '@/lib/editor-store';
import { NodesByCategoryType } from '@/types/editor-types';
import { Background, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider, SelectionMode, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
// import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
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

// workflow page
function Workflow({ nodesByCategory }: { nodesByCategory: NodesByCategoryType }) {
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, isDialogOpen } = useStore(useShallow(selector));

    const handleNodeClick = useCallback((_, node: Node) => {
        setSelectedNode(node);
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar nodesByCategory={nodesByCategory} />
            <SidebarInset className="bg-transparent">
                <div className="h-full w-full">
                    <ReactFlowProvider>
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
                        />
                        <Background color="#888" />
                        <MiniMap />
                        <Controls />
                        <Panel position="top-left">
                            <SidebarTrigger />
                        </Panel>

                        {/* send the detailf of a node to the dialog */}
                        {isDialogOpen && <NodeDetailViewDialog node={selectedNode} />}
                    </ReactFlowProvider>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default Workflow;
