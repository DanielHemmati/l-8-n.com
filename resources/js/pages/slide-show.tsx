import MainSlideShow from '@/components/playground/slide-show/main';
import { ReactFlowProvider } from '@xyflow/react';

function SlideShow() {
    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <MainSlideShow />
            </ReactFlowProvider>
        </div>
    );
}
export default SlideShow;
