<?php

namespace App;

use App\Notifications\ResetPasswordMultiLang;
use App\Notifications\VerifyEmailMultiLang;
use Illuminate\Notifications\Notifiable;
//use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

//class User extends Authenticatable
class User extends Authenticatable implements MustVerifyEmailContract
{
    //use Notifiable;
    use MustVerifyEmail, Notifiable;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailMultiLang);
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordMultiLang($token));
    }
}
