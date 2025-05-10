import { BaseNode } from '@/components/base-node';
import { NodeHeader, NodeHeaderActions, NodeHeaderMenuAction, NodeHeaderTitle } from '@/components/node-header';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LabeledHandle } from '@/components/labeled-handle';
import { NodeProps, Position, useReactFlow, type Node } from '@xyflow/react';
import { useCallback } from 'react';

export type NumNode = Node<{ value: number }>;

export function NumNode({ id, data }: NodeProps<NumNode>) {
    const { updateNodeData, setNodes } = useReactFlow();

    const handleReset = useCallback(() => {
        updateNodeData(id, { value: 0 });
    }, [id, updateNodeData]);

    const handleDelete = useCallback(() => {
        setNodes((nds) => nds.filter((n) => n.id !== id));
    }, [id, setNodes]);

    const handleIncr = useCallback(() => {
        updateNodeData(id, { value: data.value + 1 });
    }, [id, data.value, updateNodeData]);

    const handleDecr = useCallback(() => {
        updateNodeData(id, { value: data.value - 1 });
    }, [id, data.value, updateNodeData]);

    return (
        <BaseNode>
            <NodeHeader>
                <NodeHeaderTitle>Num</NodeHeaderTitle>
                <NodeHeaderActions>
                    <NodeHeaderMenuAction label="Open node menu">
                        <DropdownMenuItem onSelect={handleReset}>Reset</DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
                    </NodeHeaderMenuAction>
                </NodeHeaderActions>
            </NodeHeader>

            <div className="mb-10 flex items-center gap-2">
                <Button onClick={handleDecr}>-</Button>
                <pre>{String(data.value).padStart(3, ' ')}</pre>
                <Button onClick={handleIncr}>+</Button>
            </div>

            <footer className="-m-5 bg-gray-100">
                <LabeledHandle
                    title="out"
                    type="source"
                    position={Position.Right}
                />
            </footer>
        </BaseNode>
    );
}
