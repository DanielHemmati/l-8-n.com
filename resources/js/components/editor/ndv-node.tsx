import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore } from '@/lib/editor-store';
import { NodeConfig } from '@/types/editor-types';
import { type Node } from '@xyflow/react';
import { useShallow } from 'zustand/react/shallow';

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
                <div className="">
                    <div className="space-y-4">
                        {/* TODO: test this */}
                        {node.inputs?.map((input) => {
                            switch (input.type) {
                                case 'text':
                                    return (
                                        <div key={input.id}>
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
                                                <SelectContent className='w-full'>
                                                    <SelectGroup>
                                                        {/* <SelectLabel>{input.label}</SelectLabel> */}
                                                        {input.options?.map((option) => {
                                                            return <SelectItem key={option} value={option}>{option}</SelectItem>;
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
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
