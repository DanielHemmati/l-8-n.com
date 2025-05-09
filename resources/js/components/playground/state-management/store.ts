import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { create } from 'zustand';

import { initialEdges } from './edges';
import { initialNodes } from './nodes';
import { AppNode, type AppState, ColorNode } from './types';

function isColorChooserNode(node: AppNode): node is ColorNode {
    return node.type === 'colorChooser';
}

const useStore = create<AppState>((set, get) => ({
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
    updateNodeColor: (nodeId, color) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId && isColorChooserNode(node)) {
                    return { ...node, data: { ...node.data, color } };
                }
                return node;
            }),
        });
    },
}));

export default useStore;
