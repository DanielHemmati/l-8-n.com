import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { FlaskIconHandle, LabIcon } from '../icons/LabIcon';

interface TestExecuteButtonProps {
    onClick: (e: React.FormEvent) => void;
}

function TestExecuteButton({ onClick }: TestExecuteButtonProps) {
    // <for icon animation>
    const labIconRef = useRef<FlaskIconHandle>(null);
    const handleMouseEnter = () => {
        labIconRef.current?.startAnimation();
    };
    const handleMouseLeave = () => {
        labIconRef.current?.stopAnimation();
    };
    // </for icon animation>

    return (
        <form onSubmit={onClick}>
            <Button
                type="submit"
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
        </form>
    );
}

export default TestExecuteButton;
