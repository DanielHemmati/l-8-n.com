<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WorkflowController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Route::get('workflow', function () {
    //     return Inertia::render('workflow');
    // })->name('workflow');
    Route::get('workflow', [WorkflowController::class, 'index'])->name('workflow.index');
});


require __DIR__ . '/playground.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
