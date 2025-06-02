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

        if(app()->isLocal()) {
            // For local development, we can skip SSL verification
            $response = Http::withoutVerifying()->{$method}($url);
        }
        else {
            // In production, we should verify SSL certificates
            $response = Http::{$method}($url);
        }
        $result = $response->json();

        return [
            'nodeId' => $nodeId,
            'result' => $result,
        ];
    }
}
