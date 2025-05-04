<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Vite;

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
        $this->configureCommands();
        $this->modelConfiguring();
        $this->configureURL();
        $this->configureDate();
        $this->configureVite();
    }

    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands(App::isProduction());
    }

    private function modelConfiguring(): void
    {
        Model::unguard(); // b/c life is too short
        Model::shouldBeStrict();
        Model::automaticallyEagerLoadRelationships();
    }

    /**
     * really good tut why we need this
     *
     * @see https://dyrynda.com.au/blog/laravel-immutable-dates
     */
    private function configureDate(): void
    {
        Date::use(CarbonImmutable::class);
    }

    /**
     * This is optional, but it's good force https in prod
     *
     * @see 
     */
    private function configureURL(): void
    {
        URL::forceHttps(App::isProduction());
    }

    private function configureVite(): void
    {
        Vite::useAggressivePrefetching();
    }
}
