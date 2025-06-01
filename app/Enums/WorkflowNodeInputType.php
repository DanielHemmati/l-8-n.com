<?php

namespace App\Enums;

enum WorkflowNodeInputType: string
{
    case TEXT = 'text';
    case NUMBER = 'number';
    case BOOLEAN = 'boolean';
    case SELECT = 'select';
    case MULTISELECT = 'multiselect';
    case DATE = 'date';
    case TIME = 'time';
    case DATETIME = 'datetime';
    case FILE = 'file';

    public function getLabel(): string
    {
        return match ($this) {
            self::TEXT => 'Text',
            self::NUMBER => 'Number',
            self::BOOLEAN => 'Boolean',
            self::SELECT => 'Select',
            self::MULTISELECT => 'Multiselect',
            self::DATE => 'Date',
            self::TIME => 'Time',
            self::DATETIME => 'DateTime',
            self::FILE => 'File',
        };
    }
}
