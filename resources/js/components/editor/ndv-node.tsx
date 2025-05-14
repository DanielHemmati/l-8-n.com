import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/lib/editor-store';
import { useShallow } from 'zustand/react/shallow';

const selector = (state) => ({
    isDialogOpen: state.isDialogOpen,
    closeDialog: state.closeDialog,
});

export function NodeConfigModal() {
    const { isDialogOpen, closeDialog } = useStore(useShallow(selector));
    return (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="name"
                            className="text-right"
                        >
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="username"
                            className="text-right"
                        >
                            Username
                        </Label>
                        <Input
                            id="username"
                            className="col-span-3"
                            placeholder="Enter your username"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
