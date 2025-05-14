import { type Edge, type Node, type OnConnect, type OnEdgesChange, type OnNodesChange } from '@xyflow/react';

export type AppNode = Node;

export type AppState = {
    nodes: AppNode[];
    edges: Edge[];
    isDialogOpen: boolean;
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;

    openDialog: () => void;
    closeDialog: () => void;
    toggleDialog: () => void;
};
