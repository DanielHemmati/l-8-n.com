import type React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { CheckSquare, GitBranch, GitMerge, Play, RotateCw, Settings } from 'lucide-react';

// Node types for the sidebar
const nodeTypes = [
    {
        id: 'initialNode',
        label: 'Initial Node',
        icon: Play,
    },
    {
        id: 'transformNode',
        label: 'Transform Node',
        icon: RotateCw,
    },
    {
        id: 'joinNode',
        label: 'Join Node',
        icon: GitMerge,
    },
    {
        id: 'branchNode',
        label: 'Branch Node',
        icon: GitBranch,
    },
    {
        id: 'outputNode',
        label: 'Output Node',
        icon: CheckSquare,
    },
];

// just as an example for now
export function EditorAppSidebar() {
    // Handle drag start for nodes
    // const onDragStart = (event: React.DragEvent<HTMLAnchorElement>, nodeType: string) => {
    //     event.dataTransfer.setData('application/reactflow', nodeType);
    //     event.dataTransfer.effectAllowed = 'move';
    // };

    return (
        <Sidebar>
            <div className="flex items-center gap-2 p-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-white">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="3"
                            y="3"
                            width="7"
                            height="7"
                            rx="1"
                            fill="currentColor"
                        />
                        <rect
                            x="3"
                            y="14"
                            width="7"
                            height="7"
                            rx="1"
                            fill="currentColor"
                        />
                        <rect
                            x="14"
                            y="3"
                            width="7"
                            height="7"
                            rx="1"
                            fill="currentColor"
                        />
                        <rect
                            x="14"
                            y="14"
                            width="7"
                            height="7"
                            rx="1"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <h1 className="text-lg font-medium">Workflow Editor</h1>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {nodeTypes.map((node) => (
                                <SidebarMenuItem key={node.id}>
                                    <SidebarMenuButton
                                        asChild
                                        draggable
                                        // onDragStart={(e) => onDragStart(e, node.id)}
                                    >
                                        <a
                                            href="#"
                                            className="cursor-grab active:cursor-grabbing"
                                        >
                                            <node.icon className="h-4 w-4" />
                                            <span>{node.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarMenu className="mt-auto">
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <a href="#">
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarRail />
        </Sidebar>
    );
}
