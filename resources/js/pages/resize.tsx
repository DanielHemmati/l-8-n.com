import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

export default function Resize() {
    const [open, setOpen] = useState(false);
    return (
        <div className="h-screen w-screen p-11">
            <Button onClick={() => setOpen(true)}>Open Resizable Dialog</Button>
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent className="sm:max-w-8xl flex h-[90vh] w-full flex-col rounded p-0">
                    <div className="h-full w-full">
                        <ResizablePanelGroup
                            direction="horizontal"
                            className="bg-accent h-full w-full"
                        >
                            <ResizablePanel className="flex h-full items-center justify-center text-5xl">Input</ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel className="flex h-full items-center justify-center text-5xl">
                                <ScrollArea className="">Computation</ScrollArea>
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel className="flex h-full items-center justify-center text-5xl">Output</ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}