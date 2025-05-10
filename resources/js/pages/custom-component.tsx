import MainCustomComponent from "@/components/playground/custom-component/main";
import { ReactFlowProvider } from "@xyflow/react";

function CustomComponent() {
    return (
        <div className="h-screen w-screen">
            <ReactFlowProvider>
                <MainCustomComponent />
            </ReactFlowProvider>
        </div>
    );
}
export default CustomComponent;
