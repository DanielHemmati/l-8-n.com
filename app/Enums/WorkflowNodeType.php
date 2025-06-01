<?php

namespace App\Enums;

enum WorkflowNodeType: string
{
    case START = 'start';
    case END = 'end';
    case ACTION = 'action';
    case CONDITION = 'condition';
    case LOOP = 'loop';
    case PARALLEL = 'parallel';

    public function getLabel(): string
    {
        return match ($this) {
            self::START => 'Start',
            self::END => 'End',
            self::ACTION => 'Action',
            self::CONDITION => 'Condition',
            self::LOOP => 'Loop',
            self::PARALLEL => 'Parallel',
        };
    }
}
