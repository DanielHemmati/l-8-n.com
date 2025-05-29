<?php

namespace App\Workflow\NodeHandler;

use App\Workflow\Contracts\NodeHandlerInterface;
use Illuminate\Support\Facades\Http;

class HttpRequestNodeHandler implements NodeHandlerInterface
{
    public function handle(array $nodeData): mixed
    {
        $url = $nodeData['data']['url'];
        $method = $nodeData['data']['method'];
        $nodeId = $nodeData['id'];

        if (! $url || ! $method) {
            throw new \Exception('Invalid URL or method');
        }

        $response = Http::{$method}($url);
        $result = $response->json();

        return [
            'nodeId' => $nodeId,
            'result' => $result,
        ];
    }
}
