import { type Edge, type Node, type OnConnect, type OnEdgesChange, type OnNodesChange } from '@xyflow/react';

export type AppState = {
    nodes: Node[];
    edges: Edge[];
    isDialogOpen: boolean;
    onNodesChange: OnNodesChange<Node>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    // setNodes: (nodes: Node[]) => void;
    setNodes: (updater: Node[] | ((nodes: Node[]) => Node[])) => void;
    setEdges: (edges: Edge[]) => void;

    openDialog: () => void;
    closeDialog: () => void;
    toggleDialog: () => void;

    nodeResult: JSON | string | null;
    setNodeResult: () => void;

    allNodes: Node[];
    setAllNodes: () => void;

    nodesByCategoryStore: NodesByCategoryType | null;
    setNodesByCategoryStore: () => void;

};

export type NodeInput = {
    // we have to add more in here
    id: string; // for rendering on ui
    type: 'text' | 'checkbox' | 'select' | 'password';
    required: boolean;
    label: string;
    options?: string[];
};

export type NodeConfig = {
    // also this can some known types as well
    category: string;
    displayName: string;
    description: string;
    type: string;
    icon: string;
    tags: string[];
    inputs?: NodeInput[]; // some nodes might not having anything, idk at this point
};

export type NodesByCategoryType = {
    [key: string]: NodeConfig[];
};

/**
 * Root object that you store / load.
 */
export interface WorkflowDefinition {
    data: {
        nodes: NodeDefinition[];
        edges: EdgeDefinition[];
        viewport: Viewport;
    };
}

/**
 * A single node on the canvas.
 */
export interface NodeDefinition {
    id: string;
    type: string; // e.g. "Trigger.node" | "HttpRequest.node"
    position: Position;
    data: NodeMeta; // display information
    measured: Size; // bounding-box size
    inputs?: NodeInput[]; // present only on nodes that accept inputs
}

/**
 * Extra UI metadata shown in the node label.
 */
export interface NodeMeta {
    label: string;
    displayName: string;
}

/**
 * A connection line (not used in your sample yet).
 */
export interface EdgeDefinition {
    id: string;
    source: string; // node.id of the output
    target: string; // node.id of the input
    /** Extra edge props (type, label, etc.) may be added later */
}

/**
 * Canvas viewport when the user saved.
 */
export interface Viewport {
    x: number;
    y: number;
    zoom: number;
}

/** Simple helpers */
export interface Position {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
