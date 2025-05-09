import { Handle, Position, useNodeConnections, useNodesData, useReactFlow } from '@xyflow/react';
import { useEffect } from 'react';

interface RGBColor {
    r: number;
    g: number;
    b: number;
}

function CustomHandle({ id, label, onChange }) {
    const connections = useNodeConnections({
        handleType: 'target',
        handleId: id,
    });

    const nodeData = useNodesData(connections?.[0].source);

    useEffect(() => {
        onChange(nodeData?.data ? nodeData.data.value : 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodeData]);

    return (
        <div>
            <Handle
                type="target"
                position={Position.Left}
                id={id}
                className="handle"
            />
            <label
                htmlFor={id}
                className="label"
            >
                {label}
            </label>
        </div>
    );
}

// id, data comes from react flow itself, but u can also be explicit about it
// which is way better
function ColorPreview({ id, data }) {
    const { updateNodeData } = useReactFlow();

    return (
        <div
            className="node"
            style={{
                background: data.value ? `rgb(${data.value.r}, ${data.value.g}, ${data.value.b})` : 'rgb(0, 0, 0)',
            }}
        >
            {/* <div>
                <CustomHandle
                    id="red"
                    label="R"
                    onChange={(value) => setColor((prev) => ({ ...prev, r: value }))}
                />
            </div>
            <div>
                <CustomHandle
                    id="green"
                    label="G"
                    onChange={(value) => setColor((prev) => ({ ...prev, g: value }))}
                />
            </div>
            <div>
                <CustomHandle
                    id="blue"
                    label="B"
                    onChange={(value) => setColor((prev) => ({ ...prev, b: value }))}
                />
            </div> */}
            <CustomHandle
                id="red"
                label="R"
                onChange={(value) => {
                    updateNodeData(id, (node) => {
                        const color = node.data.value as RGBColor;
                        return { value: { ...color, r: value } };
                    });
                }}
            />
            <CustomHandle
                id="green"
                label="G"
                onChange={(value) => {
                    updateNodeData(id, (node) => {
                        const color = node.data.value as RGBColor;
                        return { value: { ...color, g: value } };
                    });
                }}
            />
            <CustomHandle
                id="blue"
                label="B"
                onChange={(value) => {
                    updateNodeData(id, (node) => {
                        const color = node.data.value as RGBColor;
                        return { value: { ...color, b: value } };
                    });
                }}
            />
            <Handle
                type="source"
                position={Position.Right}
            />
        </div>
    );
}

export default ColorPreview;
