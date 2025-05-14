import { memo } from 'react';

import { BaseNode } from '@/components/base-node';
import { useStore } from '@/lib/editor-store';
import { Handle, NodeProps, Position, type Node } from '@xyflow/react';
import { useShallow } from 'zustand/react/shallow';

export type InputNodeProps = Node<
    {
        displayName: string;
    },
    'Input.node'
>;

const selector = (state) => ({
    openDialog: state.openDialog,
});

export const InputNode = memo(({ id, selected, data }: NodeProps<InputNodeProps>) => {
    const { openDialog } = useStore(useShallow(selector));
    return (
        <div
            onDoubleClick={() => {
                console.log(`you clicked on node id ${id} with displayName ${data.displayName}`);
                openDialog();
            }}
        >
            <BaseNode
                selected={selected}
                className="rounded-l-full rounded-r-none border border-gray-400"
            >
                <div>Logo</div>
                <Handle
                    type="source"
                    position={Position.Right}
                />
            </BaseNode>
            <div className="text-center">{data.displayName}</div>
        </div>
    );
});
