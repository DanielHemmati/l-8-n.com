import { AppSidebar } from '@/components/playground/side/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Background, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function MainSide() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex-1">
                    <ReactFlowProvider>
                        <ReactFlow />
                        <Background color="#ccc" />
                        <Controls />
                        <MiniMap />
                        <Panel className="top-left">
                            <SidebarTrigger />
                        </Panel>
                    </ReactFlowProvider>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default MainSide;
