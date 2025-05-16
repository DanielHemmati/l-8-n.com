import { initialEdges } from '@/components/editor/edges/initialEdge';
import { initialNodes } from '@/components/editor/node-config/initialNodes';
import { type AppState } from '@/types/editor-types';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { create } from 'zustand';


export const useStore = create<AppState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
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

    // <dialog state>
    isDialogOpen: false,
    openDialog: () => {
        set({ isDialogOpen: true });
    },
    closeDialog: () => {
        set({ isDialogOpen: false });
    },
    toggleDialog: () => {
        set({ isDialogOpen: !get().isDialogOpen });
    },
    // </dialog state>

    // <node result>
    nodeResult: null,
    setNodeResult: () => {
        set({ nodeResult: get().nodeResult });
    },
    // </node result>
}));
