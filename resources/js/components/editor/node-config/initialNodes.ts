import { type Node } from '@xyflow/react';

export const initialNodes: Node[] = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 0, y: -100 },
    },
    {
        id: '2',
        type: 'Input.node',
        data: { label: 'Input Node', displayName: 'Input Node' },
        position: { x: 0, y: 100 },
    },
    {
        id: '3',
        type: 'placeholder',
        data: { label: 'Placeholder node' },
        position: { x: 0, y: 0 },
    },
];
