import PlaceholderNodeDemo from "@/components/editor/nodes/PlaceHolderNode";
import { InputNode } from "@/components/editor/nodes/Input.node";
import { HttpRequestNode } from "@/components/editor/nodes/HttpRequest.node";

export const nodeTypes = {
    placeholder: PlaceholderNodeDemo,
    'Input.node': InputNode,
    'HttpRequest.node': HttpRequestNode,
};
