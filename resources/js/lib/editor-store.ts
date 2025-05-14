import { initialEdges } from '@/components/editor/edges/initialEdge';
import { initialNodes } from '@/components/editor/node-config/initialNodes';
import { type AppState } from '@/types/editor-types';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { create } from 'zustand';

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useStore = create<AppState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    isDialogOpen: false,
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    setNodes: (nodes) => {
        set({ nodes });
    },
    setEdges: (edges) => {
        set({ edges });
    },

    openDialog: () => {
        set({ isDialogOpen: true });
    },
    closeDialog: () => {
        set({ isDialogOpen: false });
    },
    toggleDialog: () => {
        set({ isDialogOpen: !get().isDialogOpen });
    },
}));
