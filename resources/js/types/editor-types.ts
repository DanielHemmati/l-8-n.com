import { type Edge, type Node, type OnConnect, type OnEdgesChange, type OnNodesChange } from '@xyflow/react';


export type AppState = {
    nodes: Node[];
    edges: Edge[];
    isDialogOpen: boolean;
    onNodesChange: OnNodesChange<Node>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;

    openDialog: () => void;
    closeDialog: () => void;
    toggleDialog: () => void;

    nodeResult: JSON | string | null;
    setNodeResult: (nodeResult: JSON | string | null) => void;

    allNodes: Node[];
    setAllNodes: () => void;

    nodesByCategoryStore: NodesByCategoryType | null,
    setNodesByCategoryStore: () => void,
};

export type NodeInput = {
    // we have to add more in here
    type: 'input' | 'checkbox' | 'select' | 'password';
    required: boolean;
};

export type NodeConfig = {
    // also this can some known types as well
    category: string;
    displayName: string;
    description: string;
    icon: string;
    tags: string[];
    inputs?: {
        [key: string]: NodeInput;
    }
}

export type NodesByCategoryType = {
    [key: string]: NodeConfig[];
};
