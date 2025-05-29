<?php

namespace App\Workflow\Contracts;

interface NodeHandlerInterface
{
    public function handle(array $nodeData): mixed;
}
