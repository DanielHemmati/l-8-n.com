<?php

namespace App\Workflow\NodeHandler;

use App\Workflow\Contracts\NodeHandlerInterface;

class TriggerNodeHandler implements NodeHandlerInterface
{
    // TODO: what should trigger node have?
    public function handle(array|string $nodeData): mixed
    {
        return 'Trigger';
    }
}
