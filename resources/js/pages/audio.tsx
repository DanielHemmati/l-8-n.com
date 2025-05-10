import { ReactFlowProvider } from '@xyflow/react';
import AudioApp from '../components/playground/web-audio/App';

function Audio() {
    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <AudioApp />
            </ReactFlowProvider>
        </div>
    );
}
export default Audio;
