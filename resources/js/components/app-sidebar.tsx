import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useDnD } from '@/context/DnDContext';
import { type NavItem } from '@/types';
import { type NodesByCategoryType } from '@/types/editor-types';
import { Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { BookOpen, ChevronDown, Folder } from 'lucide-react';
import AppLogo from './app-logo';

// const mainNavItems: NavItem[] = [
//     {
//         title: 'workflow 1',
//         href: '/editor/<name of the workflow>', //WIP
//         icon: LayoutGrid,
//     },
// ];

// TODO: add your own
const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/DanielHemmati/l-8-n.com',
        icon: Folder,
    },
    {
        title: 'Documentation (WIP)',
        href: 'https://l-8-n.com',
        icon: BookOpen,
    },
];

export function AppSidebar({ nodesByCategory }: { nodesByCategory: NodesByCategoryType }) {
    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
        setType?.(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Sidebar
            collapsible="icon"
            variant="sidebar"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                        >
                            <Link
                                href="/dashboard"
                                prefetch
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {Object.entries(nodesByCategory).map(([category, nodes]) => (
                    <Collapsible
                        key={category}
                        defaultOpen
                        className="group/collapsible"
                    >
                        <SidebarGroup>
                            <SidebarGroupLabel
                                asChild
                                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm font-medium"
                            >
                                <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2">
                                    {category}
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {nodes.map((node, index) => (
                                            <SidebarMenuItem key={`${category}-${index}`}>
                                                <SidebarMenuButton
                                                    asChild
                                                    onDragStart={(event) => onDragStart(event, node.type)}
                                                    draggable
                                                    asChild
                                                >
                                                    <div className="flex">
                                                        <span className="text-sm">{node.icon}</span>
                                                        <span className="font-medium">{node.displayName}</span>
                                                        {/* TODO: show description somehow */}
                                                        {/* <p className="text-sm text-muted-foreground">{node.description}</p> */}
                                                    </div>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter
                    items={footerNavItems}
                    className="mt-auto"
                />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
