<?php

use Illuminate\Support\Str;

/**
 * This is just the first version
 * What category should i use for the nodes ?
 * Is category the same as the type ?
 *
 * There should be at least some type safety in here. other wise it will be a mess.
 */

return [
    'HttpRequest.node' => [
        'id' => 'httpRequest.node.' . Str::random(10),
        'category' => '🧩 API', // this is the category of the node, still not sure about naming
        'displayName' => 'HTTP Request',
        'type' => 'HttpRequest.node', // this helps for drag and drop
        'description' => 'Make an HTTP request',
        'icon' => '🌐',
        'tags' => ['http', 'request'],
        'data' => [
            'url' => null,
            'method' => null,
        ],
        'inputs' => [
            'url' => [
                'id' => Str::random(10),
                'type' => 'text', // it would be input of type text
                'label' => 'URL',
                'required' => true,
            ],
            'method' => [
                'id' => Str::random(10),
                'type' => 'select',
                'label' => 'Method',
                'required' => true,
                'options' => [
                    'GET',
                    'POST',
                    'DELETE',
                    'PUT',
                    'PATCH',
                    'HEAD',
                    'OPTIONS',
                ],
            ],
        ],
    ],
    'Trigger.node' => [
        'id' => 'trigger.node.' . Str::random(10),
        'category' => '💥 Trigger nodes',
        'displayName' => 'Trigger',
        'type' => 'Trigger.node',
        'description' => 'Trigger a workflow',
        'icon'=> '👆'
    ],
];
