import { BaseNode } from '@/components/base-node';
import { useStore } from '@/lib/editor-store';
import { Handle, NodeProps, Position, type Node } from '@xyflow/react';
import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';

const selector = (state) => ({
    openDialog: state.openDialog,
});

export type HttpRequestNodeProps = Node<
    {
        displayName: string;
    },
    'HttpRequest.node'
>;

export const HttpRequestNode = memo(({ id, selected, data }: NodeProps<HttpRequestNodeProps>) => {
    const { openDialog } = useStore(useShallow(selector));
    return (
        <div
            onDoubleClick={() => {
                console.log(`HttpRequestNode clicked with id ${id} and data ${JSON.stringify(data, null, 2)}`);
                openDialog();
            }}
        >
            <BaseNode
                selected={selected}
                className="flex justify-center rounded-md border border-gray-400 p-4"
            >
                <Handle
                    type="target"
                    position={Position.Left}
                    onClick={() => {
                        console.log('target clicked');
                    }}
                />
                <div className="text-2xl">🌐</div>
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
