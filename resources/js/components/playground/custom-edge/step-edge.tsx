import { BaseEdge, EdgeProps } from '@xyflow/react';

export const StepEdge = ({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) => {
    const centerY = (targetY - sourceY) / 2 + sourceY;
    const edgePath = `M ${sourceX} ${sourceY} L ${sourceX} ${centerY} L ${targetX} ${centerY} L ${targetX} ${targetY}`;

    return (
        <BaseEdge
            path={edgePath}
        />
    );
};
