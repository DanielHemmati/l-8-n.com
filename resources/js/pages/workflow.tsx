import { AppSidebar } from '@/components/app-sidebar';
import { NodeConfigModal } from '@/components/editor/ndv-node';
import { nodeTypes } from '@/components/editor/node-config/node-types';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useStore } from '@/lib/editor-store';
import { Background, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider, SelectionMode } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
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
function Workflow() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, isDialogOpen } = useStore(useShallow(selector));
    console.log('isDialogOpen', isDialogOpen);
    return (
        <SidebarProvider>
            <AppSidebar />
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
                            fitView
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
                        {isDialogOpen && <NodeConfigModal />}
                    </ReactFlowProvider>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default Workflow;
