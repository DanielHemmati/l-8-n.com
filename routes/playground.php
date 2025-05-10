<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/flow', function () {
    return Inertia::render('flow');
})->name('flow');

Route::get('/slide-show', function () {
    return Inertia::render('slide-show');
})->name('slide-show');

Route::get('/custom-component', function () {
    return Inertia::render('custom-component');
})->name('custom-component');

Route::get('/tic', function () {
    return Inertia::render('tic');
})->name('tic');
