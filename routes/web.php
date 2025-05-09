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

Route::get('/slide-show', function () {
    return Inertia::render('slide-show');
})->name('slide-show');

Route::get('/tic', function () {
    return Inertia::render('tic');
})->name('tic');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
