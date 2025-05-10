import { Background, Controls, ReactFlow, useReactFlow, type NodeMouseHandler } from '@xyflow/react';
import { Slide, SlideData } from './Slide';

import './index.css';
import '@xyflow/react/dist/style.css';
import { KeyboardEventHandler, useCallback, useState } from 'react';
import { slides, slidesToElements } from './slides';

// const slides: Record<string, SlideData> = {
//     '0': { source: '# hello react flow', right: '1' },
//     '1': { source: '- something cool in here', right: '2' },
//     '2': { source: '> some qoute in here', left: '1' },
// };

const nodeTypes = {
    slide: Slide,
};

const initialSlide = '01';
const { nodes, edges } = slidesToElements(initialSlide, slides);

function MainSlideShow() {
    const [currentSlide, setCurrentSlide] = useState(initialSlide);
    const { fitView } = useReactFlow();

    const handleKeyPress = useCallback<KeyboardEventHandler>(
        (event) => {
            const slide = slides[currentSlide];

            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowRight': {
                    const direction = event.key.slice(5).toLowerCase() as keyof SlideData;
                    const target = slide[direction];

                    // Prevent the arrow keys from scrolling the page when React Flow is
                    // only part of a larger application.
                    event.preventDefault();

                    if (target) {
                        setCurrentSlide(target);
                        fitView({ nodes: [{ id: target }], duration: 100 });
                    }
                }
            }
        },
        [fitView, currentSlide],
    );

    const handleNodeClick = useCallback<NodeMouseHandler>(
        (_, node) => {
            if (node.id !== currentSlide) {
                setCurrentSlide(node.id);
                fitView({ nodes: [{ id: node.id }], duration: 100 });
            }
        },
        [fitView, currentSlide],
    );

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            edges={edges}
            fitView
            fitViewOptions={{ nodes: [{ id: initialSlide }], duration: 100 }}
            minZoom={0.1}
            onKeyDown={handleKeyPress}
            onNodeClick={handleNodeClick}
        >
            <Background color="#ccc" />
            <Controls />
        </ReactFlow>
    );
}

export default MainSlideShow;
