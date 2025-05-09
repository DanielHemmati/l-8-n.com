import { ReactFlow, ReactFlowProvider } from '@xyflow/react';
import { Slide, SLIDE_WIDTH } from './Slide';

import '@xyflow/react/dist/style.css';
import './index.css';

const nodeTypes = {
    slide: Slide,
};

function MainSlideShow() {
    const nodes = [
        {
            id: '0',
            type: 'slide',
            position: { x: 0, y: 0 },
            data: { source: '# Hello, React Flow!' },
        },
        {
            id: '1',
            type: 'slide',
            position: { x: SLIDE_WIDTH, y: 0 },
            data: {
                source: `
                - item 1
                - item 2
                - item 3
                `,
            },
        },
        {
            id: '2',
            type: 'slide',
            position: { x: SLIDE_WIDTH * 2, y: 0 },
            data: {
                source: `
                 some random text in here
                `,
            },
        },
    ];
    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    fitView
                    minZoom={0.1}
                />
                {/* <Background />
                <Controls />
                <MiniMap /> */}
            </ReactFlowProvider>
        </div>
    );
}
export default MainSlideShow;
