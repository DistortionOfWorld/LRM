<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class VerifyEmailMultiLang extends VerifyEmail
{
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $verificationUrl);
        }
        $mailMessage = new MailMessage;
        $mailMessage->greeting = Lang::getFromJson('mail_verify.greeting');
        return $mailMessage
            ->subject(Lang::getFromJson('mail_verify.subject'))
            ->line(Lang::getFromJson('mail_verify.line1'))
            ->action(Lang::getFromJson('mail_verify.action'), $verificationUrl)
            ->line(Lang::getFromJson('mail_verify.line2'));
    }
}
