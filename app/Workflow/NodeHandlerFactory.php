<?php

namespace App\Workflow;

use App\Workflow\Contracts\NodeHandlerInterface;
use App\Workflow\NodeHandler\HttpRequestNodeHandler;
use App\Workflow\NodeHandler\TriggerNodeHandler;

class NodeHandlerFactory
{
    // TODO: add more nodes
    public static function make(string $nodeType): NodeHandlerInterface
    {
        return match ($nodeType) {
            'Trigger' => new TriggerNodeHandler(),
            'HttpRequest' => new HttpRequestNodeHandler(),
            default => throw new \Exception("Invalid node type: {$nodeType}"),
        };
    }
}
