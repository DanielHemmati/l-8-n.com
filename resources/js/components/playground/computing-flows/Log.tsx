import { Handle, Position, useNodeConnections, useNodesData } from '@xyflow/react';

interface RGBColor {
    r: number;
    g: number;
    b: number;
}
function Log({ data }) {
    const conections = useNodeConnections({
        handleType: 'target',
    });
    const nodesData = useNodesData(conections?.[0].source);
    // const color = nodesData?.data ? nodesData.data[conections?.[0].sourceHandle] : null;
    const color = nodesData?.data && conections?.[0].sourceHandle !== null ? (nodesData.data[conections[0].sourceHandle] as RGBColor) : null;
    return (
        <div
            className="log-node"
            style={{
                background: color ? `rgb(${color.r}, ${color.g}, ${color.b})` : 'white',
                color: color ? data.fontColor : 'black',
            }}
        >
            {color ? data.label : 'Do nothing'}
            <Handle
                type="target"
                position={Position.Left}
            />
        </div>
    );
}
export default Log;
