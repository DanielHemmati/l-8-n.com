import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

// Menu items.
const items = [
    {
        title: 'Home',
        url: '#',
        icon: Home,
    },
    {
        title: 'Inbox',
        url: '#',
        icon: Inbox,
    },
    {
        title: 'Calendar',
        url: '#',
        icon: Calendar,
    },
    {
        title: 'Search',
        url: '#',
        icon: Search,
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
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
                    <h1 className="text-lg font-bold">N8N</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Applications</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            {item.title}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
