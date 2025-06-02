import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useStore } from '@/lib/editor-store';
import { SharedData } from '@/types';
import { NodeConfig } from '@/types/editor-types';
import { usePage } from '@inertiajs/react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useReactFlow, type Node } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const selector = (state) => ({
    isDialogOpen: state.isDialogOpen,
    closeDialog: state.closeDialog,
});

export function NodeDetailViewDialog({ node }: { node: Node & NodeConfig }) {
    const { updateNodeData } = useReactFlow();
    const { isDialogOpen, closeDialog } = useStore(useShallow(selector));
    const [data, setData] = useState(node.data);
    const executionResults = usePage<SharedData>().props.execution_results;

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, url: e.target.value });
            updateNodeData(node.id, { ...data, url: e.target.value });
        },
        [node.id, updateNodeData, data],
    );

    const handleSelectOnChange = useCallback(
        (value: string) => {
            setData({ ...data, method: value });
            updateNodeData(node.id, { ...data, method: value });
        },
        [node.id, updateNodeData, data],
    );

    const validExecutionResults = executionResults && typeof executionResults === 'object' && executionResults !== null;

    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={closeDialog}
        >
            <DialogContent className="bg-white sm:max-w-[925px]">
                <DialogHeader>
                    <DialogTitle>Edit profile sdf</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <DialogContent className="sm:max-w-8xl flex h-[90vh] w-full flex-col rounded p-0">
                    <div className="h-full w-full">
                        <ResizablePanelGroup
                            direction="horizontal"
                            className="bg-accent h-full w-full"
                        >
                            <ResizablePanel className="flex h-full items-center justify-center text-5xl">Input</ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel className="flex justify-center">
                                <ScrollArea className="w-full p-10">
                                    <div className="flex justify-end">
                                        <Button onClick={() => closeDialog()}>Save</Button>
                                    </div>
                                    {node.inputs?.map((input) => {
                                        switch (input.type) {
                                            case 'text':
                                                return (
                                                    <div
                                                        key={input.id}
                                                        className=""
                                                    >
                                                        <Label key={input.label}>{input.label}</Label>
                                                        <Input
                                                            id={input.label}
                                                            type={input.type}
                                                            name={input.label}
                                                            placeholder={input.label}
                                                            value={(data.url as string) || ''}
                                                            onChange={handleOnChange}
                                                        />
                                                    </div>
                                                );
                                            case 'select':
                                                return (
                                                    <div
                                                        key={input.id}
                                                        className=""
                                                    >
                                                        <Select
                                                            value={data.method as string}
                                                            onValueChange={handleSelectOnChange}
                                                        >
                                                            <Label>{input.label}</Label>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder={input.options?.[0]} />
                                                            </SelectTrigger>
                                                            <SelectContent className="w-full">
                                                                <SelectGroup>
                                                                    {/* <SelectLabel>{input.label}</SelectLabel> */}
                                                                    {input.options?.map((option) => {
                                                                        return (
                                                                            <SelectItem
                                                                                key={option}
                                                                                value={option}
                                                                            >
                                                                                {option}
                                                                            </SelectItem>
                                                                        );
                                                                    })}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                );
                                            // add more cases as needed
                                            default:
                                                return null;
                                        }
                                    })}
                                </ScrollArea>
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel className="flex h-full items-center justify-center">
                                <ScrollArea
                                    className="h-full w-full rounded-md p-5 overflow-auto"
                                >
                                    {validExecutionResults ? (
                                        <pre className="whitespace-pre-wrap">{JSON.stringify(executionResults[node.id], null, 2)}</pre>
                                    ) : (
                                        <p>No execution results</p>
                                    )}
                                </ScrollArea>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                </DialogContent>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
