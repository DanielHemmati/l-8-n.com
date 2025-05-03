<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->modelConfiguring();
        $this->configureURL();
    }

    public function modelConfiguring(): void
    {
        Model::unguard();
        Model::shouldBeStrict();
    }

    public function configureURL(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
