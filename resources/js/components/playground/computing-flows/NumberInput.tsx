import { Handle, Position, useReactFlow } from '@xyflow/react';
import { useCallback, useState } from 'react';

function NumberInput({ id, data }) {
    const [number, setNumber] = useState(data.value);
    const { updateNodeData } = useReactFlow();

    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        const cappedNumber = Math.round(Math.min(255, Math.max(0, +evt.target.value)));
        setNumber(cappedNumber);
        // why id? which node should i update?
        updateNodeData(id, { value: cappedNumber });
    }, []);

    return (
        <div className="number-input">
            <div>{data.label}</div>
            <input
                // b/c we are gonig to have multiple number inputs, we need to give each input a unique id
                id={`number-${id}`}
                name="number"
                type="number"
                min="0"
                max="255"
                onChange={onChange}
                className="nodrag"
                value={number}
            />
            <Handle
                type="source"
                position={Position.Right}
            />
        </div>
    );
}

export default NumberInput;
