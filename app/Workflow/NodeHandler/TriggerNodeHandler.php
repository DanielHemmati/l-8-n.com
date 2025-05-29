<?php

namespace App\Workflow\NodeHandler;

use App\Workflow\Contracts\NodeHandlerInterface;

class TriggerNodeHandler implements NodeHandlerInterface
{
    // TODO: what should trigger node have? i think cron would be more fun to add
    public function handle(array|string $nodeData): mixed
    {
        $nodeId = $nodeData['id'];
        return [
            'nodeId' => $nodeId,
            'result' => 'Trigger',
        ];
    }
}
