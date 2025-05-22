import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useStore } from '@/lib/editor-store';
import { NodeConfig } from '@/types/editor-types';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { type Node } from '@xyflow/react';
import { useShallow } from 'zustand/react/shallow';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const selector = (state) => ({
    isDialogOpen: state.isDialogOpen,
    closeDialog: state.closeDialog,
    nodeResult: state.nodeResult,
});

export function NodeDetailViewDialog({ node }: { node: Node & NodeConfig }) {
    const { isDialogOpen, closeDialog } = useStore(useShallow(selector));
    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={closeDialog}
        >
            <DialogContent className="bg-white sm:max-w-[925px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
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
                                    {node.inputs?.map((input) => {
                                        switch (input.type) {
                                            case 'text':
                                                return (
                                                    <div key={input.id} className="">
                                                        <Label key={input.label}>{input.label}</Label>
                                                        <Input
                                                            id={input.label}
                                                            type={input.type}
                                                            placeholder={input.label}
                                                        />
                                                    </div>
                                                );
                                            case 'select':
                                                return (
                                                    <div
                                                        key={input.id}
                                                        className=""
                                                    >
                                                        <Select>
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
                            <ResizablePanel className="flex h-full items-center justify-center text-5xl">Output</ResizablePanel>
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
