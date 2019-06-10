<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class ReactController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return view('react');
    }

    protected function commonResponse(Request $request)
    {
        $language=$request->session()->get('language');
        if($language===null){
            $request->session()->put('language','ja');
            $language='ja';
        }
        $guest_session=['logined'=>false,'username'=>'','verified'=>false,'language'=>$language];
        $user_session = $request->user();
        $response = ($user_session!==null)
            ?[
                'logined'=>true,
                'username'=>$user_session['name'],
                'verified'=>($user_session['email_verified_at']!==null),
                'language'=>$user_session['language'],
                'primary'=>$user_session['theme_primary'],
                'secondary'=>$user_session['theme_secondary'],
            ]
            :$guest_session;
        return $response;
    }

    public function session(Request $request)
    {
        return $this->commonResponse($request);
    }

    public function success(Request $request)
    {
        $response = $this->commonResponse($request);
        $response['csrf']=$request->session()->get('_token');
        $response['status']=$request->session()->get('status')?:'';
        $response['resent']=$request->session()->get('resent')?:'';
        $user = Auth::user();
        $response['lang']=$user['language'];
        $response['primary']=$user['theme_primary'];
        $response['secondary']=$user['theme_secondary'];
        return $response;
    }

    public function language(Request $request, $language)
    {
        Session::put('language',$language);
        return ['result'=>'OK'];
    }

    public function setProfile(Request $request)
    {
        $valid_target=true;
        $user = Auth::user();
        $target_user = User::find($user['id']);
        
        switch($request['target'])
        {
            case 'language':
                Session::put('language',$request['value']);
                $target_user->language=$request['value'];
                break;
            case 'primary':
                $target_user->theme_primary=$request['value'];
                break;
            case 'secondary':
                $target_user->theme_secondary=$request['value'];
                break;
            default:
                $valid_target=false;
                break;
        }
        if($valid_target)
        {
            $target_user->save();
            return ['result'=>'OK'];
        }
        else
        {
            return ['result'=>'NG'];
        }
    }
}
