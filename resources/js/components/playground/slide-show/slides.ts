import { Edge, type Node } from '@xyflow/react';
import { SLIDE_HEIGHT, SLIDE_PADDING, SLIDE_WIDTH, SlideData } from './Slide';

export const slidesToElement = (initial: string, slides: Record<string, SlideData>) => {
    const stack = [{ id: initial, position: { x: 0, y: 0 } }];
    const visited = new Set();
    const nodes: Node<SlideData>[] = [];
    const edges: Edge[] = [];

    while (stack.length) {
        const { id, position } = stack.pop()!;
        const data = slides[id];
        const node = { id, type: 'slide', position, data };

        if (data.left && !visited.has(data.left)) {
            const nextPosition = {
                x: position.x - SLIDE_WIDTH,
                y: position.y,
            };
            stack.push({ id: data.left, position: nextPosition });
            edges.push({ id: `${id}->${data.left}`, source: id, target: data.left });
        }

        if (data.up && !visited.has(data.up)) {
            const nextPosition = {
                x: position.x,
                y: position.y - (SLIDE_HEIGHT + SLIDE_PADDING),
            };
            stack.push({ id: data.up, position: nextPosition });
            edges.push({
                id: `${id}->${data.up}`,
                source: id,
                target: data.up,
            });
        }

        if (data.down && !visited.has(data.down)) {
            const nextPosition = {
                x: position.x,
                y: position.y + (SLIDE_HEIGHT + SLIDE_PADDING),
            };
            stack.push({ id: data.down, position: nextPosition });
            edges.push({
                id: `${id}->${data.down}`,
                source: id,
                target: data.down,
            });
        }

        if (data.right && !visited.has(data.right)) {
            const nextPosition = {
                x: position.x + (SLIDE_WIDTH + SLIDE_PADDING),
                y: position.y,
            };
            stack.push({ id: data.right, position: nextPosition });
            edges.push({
                id: `${id}->${data.right}`,
                source: id,
                target: data.right,
            });
        }

        nodes.push(node);
        visited.add(id);
    }

    return { nodes, edges };
};
