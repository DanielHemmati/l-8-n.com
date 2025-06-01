<?php

namespace App\Interfaces;

use App\Enums\WorkflowNodeType;

interface WorkflowNode
{
    public function getName(): string;
    public function getDescription(): string;
    public function getType(): WorkflowNodeType;
    public function getInputs(): array;

    /**
     *  This method is responsible for executing the node's logic using the provided data (data can be empty for some).
     * @param array $data
     * @return mixed
     */
    public function execute(array $data = []): mixed;

//    todo later
//    public function getIcon(): string;
//    public function getCategory(): string;
//    public function getTags(): array;
}
