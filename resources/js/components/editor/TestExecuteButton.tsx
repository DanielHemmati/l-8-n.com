import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { FlaskIconHandle, LabIcon } from '../icons/LabIcon';

function TestExecuteButton() {
    const labIconRef = useRef<FlaskIconHandle>(null);

    const handleMouseEnter = () => {
        labIconRef.current?.startAnimation();
    };

    const handleMouseLeave = () => {
        labIconRef.current?.stopAnimation();
    };

    return (
        <Button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group cursor-pointer"
        >
            <LabIcon
                ref={labIconRef}
                className=""
            />
            Test Execute
        </Button>
    );
}

export default TestExecuteButton;
