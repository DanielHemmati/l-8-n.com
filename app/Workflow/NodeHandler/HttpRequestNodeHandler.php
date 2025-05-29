<?php

namespace App\Workflow\NodeHandler;

use App\Workflow\Contracts\NodeHandlerInterface;
use Illuminate\Support\Facades\Http;

class HttpRequestNodeHandler implements NodeHandlerInterface
{
    public function handle(array $nodeData): mixed
    {
        $testResponse = Http::get('https://jsonplaceholder.typicode.com/todos/1');
        $testResult = $testResponse->json();

        return $testResult;
    }
}
