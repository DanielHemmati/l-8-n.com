<?php

namespace App\Http\Controllers;

use App\Models\Workflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Workflow\NodeHandlerFactory;
use Illuminate\Support\Facades\Log;

class WorkflowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $nodes = config('nodes');
        $nodesByCategory = collect($nodes)->groupBy('category');
        $latestWorkflow = Workflow::latest('created_at')
            ->select('workflow_name', 'data', 'id')
            ->first();

        // TODO: return only what u need
        return Inertia::render('workflow', [
            'workflows' => $nodes,
            'nodesByCategory' => $nodesByCategory, // this would be useful
            'latestWorkflow' => $latestWorkflow,
        ]);
    }

    // testing how workflow would run
    function testExecute(Request $request)
    {
        $validated = $request->validate([
            'workflow_name' => 'required|string|max:255',
            'data' => 'required|array',
        ]);

        $validated['user_id'] = Auth::id(); // making it one line?

        // this worked way better than first or create
        $workflow = Workflow::updateOrCreate(
            ['user_id' => Auth::id(), 'workflow_name' => $validated['workflow_name']],
            ['data' => $validated['data']]
        );

        // dd($workflow);
        // start with topological sort
        $sortedNodes = $this->topologicalSort($workflow->data);
        // loop through the nodes -> we also need all of the extra information from the nodes
        $results = [];
        foreach ($sortedNodes as $node) {
            $nodeType = explode('.', $node['id'])[0];
            $nodeFactory = NodeHandlerFactory::make($nodeType);
            $results[] = $nodeFactory->handle($node);
        }
        return redirect()
            ->route('workflow.index')
            ->with('execution_results', $results);
    }

    public function topologicalSort(array $data): array
    {
        $nodes = $data['nodes'] ?? [];
        $edges = $data['edges'] ?? [];

        $inDegree = [];
        $adjList = [];
        $nodeMap = [];

        // Step 1: build the adjacency list and in-degree map
        foreach ($nodes as $node) {
            $nodeId = $node['id'];
            $inDegree[$nodeId] = 0;
            $adjList[$nodeId] = [];

            $nodeMap[$nodeId] = $node;
        }

        foreach ($edges as $edge) {
            $source = $edge['source'];
            $target = $edge['target'];

            $adjList[$source][] = $target;
            $inDegree[$target]++;
        }

        // Step 3: add nodes with in-degree 0 to the queue
        $queue = [];
        foreach ($inDegree as $nodeId => $degree) {
            if ($degree === 0) {
                $queue[] = $nodeId;
            }
        }

        // Step 4: process queue and buid sorted list
        $sorted = [];
        while (!empty($queue)) {
            $current = array_shift($queue);
            $sorted[] = $current;

            foreach ($adjList[$current] as $neighbor) {
                $inDegree[$neighbor]--;
                if ($inDegree[$neighbor] === 0) {
                    $queue[] = $neighbor;
                }
            }
        }

        // Step 5: check for cycles
        if (count($sorted) !== count($nodes)) {
            throw new \Exception('Cycle detected in the workflow');
        }

        // return $sorted;
        return array_map(fn($nodeId) => $nodeMap[$nodeId], $sorted);
    }

    /**
     * save button on workflow page
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'workflow_name' => 'required|string|max:255',
            'data' => 'required|array',
        ]);

        $validated['user_id'] = Auth::id();

        // in this workspace we will only have one workflow.
        // so either update or create.
        Workflow::updateOrCreate(
            ['user_id' => Auth::id(), 'workflow_name' => $request->workflow_name],
            ['data' => $request->data]
        );

        return redirect()->route('workflow.index');
    }
}
