import { useCallback, useState } from 'react';
import '@xyflow/react/dist/style.css';

const context = new AudioContext();
const osc = context.createOscillator();

const amp = context.createGain();

osc.connect(amp);
amp.connect(context.destination);
osc.start();

//https://reactflow.dev/learn/tutorials/react-flow-and-the-web-audio-api
function AudioApp() {
    const [running, isRunning] = useState(false);
    const updateAudio = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const freq = (e.clientX / window.innerWidth) * 1000;
        const gain = e.clientY / window.innerHeight;

        osc.frequency.value = freq;
        amp.gain.value = gain;
    }, []);

    const toggleDSP = useCallback(() => {
        if (context.state === 'suspended') {
            context.resume().then(() => isRunning(true));
        } else {
            context.suspend().then(() => isRunning(false));
        }
    }, []);

    return (
        <div
            className=""
            onMouseMove={updateAudio}
        >
            <button
                className="text-4xl"
                onClick={toggleDSP}
            >
                {running ? '🔊' : '🔇'}
            </button>
        </div>
    );
}
export default AudioApp;
