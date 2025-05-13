import { AppSidebar } from '@/components/app-sidebar';
import { initialEdges } from '@/components/editor/edges/initialEdge';
import { initialNodes } from '@/components/editor/node-config/initialNodes';
import { nodeTypes } from '@/components/editor/node-config/node-types';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { addEdge, Background, Controls, MiniMap, OnConnect, Panel, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';

function Editor() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
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
                        />
                        <Background color="#ccc" />
                        <MiniMap />
                        <Controls />
                        <Panel position="top-left">
                            <SidebarTrigger />
                        </Panel>
                    </ReactFlowProvider>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
export default Editor;
