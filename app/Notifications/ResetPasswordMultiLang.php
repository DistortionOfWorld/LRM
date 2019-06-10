<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class ResetPasswordMultiLang extends ResetPassword
{
    public function toMail($notifiable)
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $this->token);
        }

        $mailMessage = new MailMessage;
        $mailMessage->greeting = Lang::getFromJson('password_reset.greeting');
        return $mailMessage
            ->subject(Lang::getFromJson('password_reset.subject'))
            ->line(Lang::getFromJson('password_reset.line1'))
            ->action(Lang::getFromJson('password_reset.action'), url(config('app.url').route('password.reset', ['token' => $this->token, 'email' => $notifiable->getEmailForPasswordReset()], false)))
            ->line(Lang::getFromJson('password_reset.line2', ['count' => config('auth.passwords.users.expire')]))
            ->line(Lang::getFromJson('password_reset.line3'));
    }
}
