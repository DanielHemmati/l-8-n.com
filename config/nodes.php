<?php

/**
 * This is just the first version
 *
 */

return [
    'httpRequest.node' => [
        'category' => 'API', // this is the category of the node
        'displayName' => 'HTTP Request',
        'type' => 'httpRequest',
        'description' => 'Make an HTTP request',
        'icon' => '🌐',
        'tags' => ['http', 'request'],
        'inputs' => [
            'url' => [
                'type' => 'string',
                'required' => true,
            ],
        ],
    ],
];
