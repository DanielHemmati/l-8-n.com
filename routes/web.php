<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/test', function () {
    $start = Carbon\CarbonImmutable::now();
    $end = $start->addDays();

    $res = $end->diffForHumans($start);
    printf($res);


})->name('test');

Route::get('/flow', function () {
    return Inertia::render('flow');
})->name('flow');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
