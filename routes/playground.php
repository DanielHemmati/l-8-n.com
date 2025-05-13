<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// for learning purpose
Route::get('/flow', function () {
    return Inertia::render('flow');
})->name('flow');

Route::get('/slide-show', function () {
    return Inertia::render('slide-show');
})->name('slide-show');

Route::get('/side-page', function () {
    return Inertia::render('side-page');
})->name('side-page');

Route::get('/tic', function () {
    return Inertia::render('tic');
})->name('tic');
