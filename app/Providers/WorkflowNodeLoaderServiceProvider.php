<?php

namespace App\Providers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;
use phpDocumentor\Reflection\DocBlock\Tags\Implements_;

class WorkflowNodeLoaderServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $nodeDirectory = app_path('Workflow'.DIRECTORY_SEPARATOR.'Nodes');

        if (! File::exists($nodeDirectory)) {
            return;
        }

        //todo in future we need to have a pre-cache command to load nodes faster like laravel does for events, routes and views (e.g. php artisan optimize)
        $files = File::allFiles($nodeDirectory);
        foreach ($files as $file) {
            $className = 'App\\Workflow\\Nodes\\' . $file->getFilenameWithoutExtension();

            if (!class_exists($className)) {
                continue;
            }

            $reflection = new \ReflectionClass($className);
            if ($reflection->implementsInterface()) {
                $this->app->bind($className, function () use ($className) {
                    return new $className();
                });
            }
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
