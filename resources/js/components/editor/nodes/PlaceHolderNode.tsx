import { PlaceholderNode } from '@/components/placeholder-node';
import { NodeProps } from '@xyflow/react';
import { memo } from 'react';

const PlaceholderNodeDemo = memo(({ selected }: NodeProps) => {
    return (
        <PlaceholderNode selected={selected}>
            <div>+</div>
        </PlaceholderNode>
    );
});

export default PlaceholderNodeDemo;
