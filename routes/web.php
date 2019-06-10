<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes(['verify' => true]);

Route::get('login', 'ReactController@index')->name('login');
Route::get('register', 'ReactController@index')->name('register');
Route::get('password/reset', 'ReactController@index')->name('password.request');
Route::get('password/reset/{token}', 'ReactController@index')->name('password.reset');

Route::get('email/verify', 'ReactController@index')->name('verification.notice');

Route::get('success', 'ReactController@success')->name('success');
Route::post('session', 'ReactController@session')->name('session');
Route::post('lang/{lang}', 'ReactController@language')->name('language');

// axios用api
Route::post('/pre_payment', 'TradeController@pre_payment');
Route::post('/payment', 'TradeController@payment');
Route::get('/get_history', 'TradeController@get_history')->name('history');
Route::post('/stop_log', 'TradeController@stop_log');

Route::get('/{router}', 'ReactController@index')->name('home');
Route::get('/', 'ReactController@index')->name('home');
