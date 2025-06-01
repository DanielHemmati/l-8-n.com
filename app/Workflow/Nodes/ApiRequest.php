<?php

namespace App\Workflow\Nodes;

use App\Enums\WorkflowNodeInputType;
use App\Enums\WorkflowNodeType;
use App\Interfaces\WorkflowNode;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ApiRequest implements WorkflowNode
{

    public function getName(): string
    {
        return 'API Request';
    }

    public function getDescription(): string
    {
        return 'This node allows you to make an API request to a specified endpoint. You can configure the method, headers, and body of the request.';
    }

    public function getType(): WorkflowNodeType
    {
        return WorkflowNodeType::ACTION;
    }

    public function getInputs(): array
    {
        return [
            // in a perfect world, we would have a separate class for inputs... but KISS
            'url' => [
                'label' => 'API Endpoint URL',
                'description' => 'The URL of the API endpoint to which the request will be sent.',
                'type' => WorkflowNodeInputType::TEXT,
                'validation_rules' => 'required|string|url|max:2048',
                'required' => true,
            ],
            'method' => [
                'label' => 'HTTP Method',
                'description' => 'The HTTP method to use for the request (e.g., GET, POST, PUT, DELETE).',
                'type' => WorkflowNodeInputType::SELECT,
                'options' => [
                    'GET' => 'GET',
                    'POST' => 'POST',
                    'PUT' => 'PUT',
                    'DELETE' => 'DELETE',
                    'PATCH' => 'PATCH',
                ],
                'validation_rules' => 'required|string|in:GET,POST,PUT,DELETE,PATCH',
            ],
            'body' => [
                'label' => 'Request Body',
                'description' => 'The body of the request, if applicable (e.g., for POST or PUT requests).',
                'type' => WorkflowNodeInputType::TEXT,
                'validation_rules' => 'nullable|string|max:65535',
            ],
        ];
    }

    public function execute(array $data = []): mixed
    {
        $validatorData = [];
        foreach ($this->getInputs() as $key => $input) {
            if (empty($input['validation_rules'])) {
                continue;
            }

            $validatorData[$key] = $input['validation_rules'];
        }

        $validatedData = Validator::make($data, $validatorData)->validate();

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->{$validatedData['method']}($validatedData['url'], $validatedData['body'] ?? null);

        //todo it might be good idea to create DTO for the response later on
        return [
            'status' => $response->status(),
            'data' => $response->json(),
        ];
    }
}
