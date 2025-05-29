<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WorkflowController;

Route::get('/', function () {
    return redirect()->route('workflow.index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('workflow.index');
    })->name('dashboard');

    // Route::get('workflow', function () {
    //     return Inertia::render('workflow');
    // })->name('workflow');
    Route::get('workflow', [WorkflowController::class, 'index'])->name('workflow.index');
    Route::post('workflow', [WorkflowController::class, 'store'])->name('workflow.store');

    Route::post('workflow/test-execute', [WorkflowController::class, 'testExecute'])->name('workflow.test-execute');
});


require __DIR__ . '/playground.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
