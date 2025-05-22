import { type Node } from '@xyflow/react';

export const initialNodes: Node[] = [
    {
        id: '1',
        type: 'Trigger.node',
        data: {
            label: 'Trigger Node',
            displayName: 'Trigger Node',
        },
        position: { x: 0, y: 100 },
    },
    {
        id: '2',
        type: 'HttpRequest.node',
        data: { label: 'HTTP Request node', displayName: 'HTTP Request node' },
        position: { x: 0, y: 0 },
    },
];
