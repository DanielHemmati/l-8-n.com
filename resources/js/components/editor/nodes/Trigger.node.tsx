import { BaseNode } from '@/components/base-node';
import { useStore } from '@/lib/editor-store';
import { Handle, NodeProps, Position, type Node } from '@xyflow/react';
import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';

const selector = (state) => ({
    openDialog: state.openDialog,
});

export type TriggerNodeProps = Node<
    {
        displayName: string;
    },
    'Trigger.node'
>;

export const TriggerNode = memo(({ id, selected, data }: NodeProps<TriggerNodeProps>) => {
    const { openDialog } = useStore(useShallow(selector));
    return (
        <div
            onDoubleClick={() => {
                console.log(`TriggerNode clicked with id ${id} and data ${JSON.stringify(data, null, 2)}`);
                openDialog();
            }}
        >
            <BaseNode
                selected={selected}
                className="rounded-l-full rounded-r-none border border-gray-400"
            >
                <div className="text-2xl text-center">👆</div>
                <Handle
                    type="source"
                    position={Position.Right}
                />
            </BaseNode>
            <div className="text-center">
                <span className="text-muted-foreground text-[15px]">{data?.displayName || ''}</span>
            </div>
        </div>
    );
});

