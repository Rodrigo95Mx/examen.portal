<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class EcommerceController extends Controller
{
    public function index(Request $request)
    {
        $url = env('API_URL_BASE') . 'ecommerce/products/list';
        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post($url);
        $json_custom = json_decode($response->body(), true);

        $data = [
            'products' => isset($json_custom['data']) ? $json_custom['data']['product_list'] : [],
            'session' => 0
        ];

        if ($this->checkSession()) {
            $data['session'] = 1;
        }

        return view('index', $data);
    }

    public function checkout(Request $request)
    {
        if ($this->checkSession()) {
            $url = env('API_URL_BASE') . 'ecommerce/products/list';
            $response = Http::withHeaders([
                'Content-Type' => 'application/json'
            ])->post($url);
            $json_custom = json_decode($response->body(), true);

            $data = [
                'products' => isset($json_custom['data']) ? $json_custom['data']['product_list'] : [],
                'session' => 0
            ];

            $data['session'] = 1;
            return view('checkout', $data);
        }
        return redirect('/');
    }

    public function register(Request $request)
    {
        $input = $request->all();
        try { //VALIDAR DATOS COMPLETOS
            $url = env('API_URL_BASE') . 'register';
            $response = Http::withHeaders([
                'Content-Type' => 'application/json'
            ])->post($url, $input);

            $json_custom = json_decode($response->body(), true);

            return response()->json($json_custom, $response->status());
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' =>  'Internal Server Error'], 500);
        }
    }

    public function checkSession()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (isset($_SESSION['token']) && isset($_SESSION['session_id']) && isset($_SESSION['expired_at'])) {
            if ($_SESSION['token'] != '' && $_SESSION['session_id'] != '' && $_SESSION['expired_at'] != '') {
                $now = Carbon::now();
                $expired_at = Carbon::parse($_SESSION['expired_at']);
                if ($now->isBefore($expired_at)) {
                    return true;
                }
            }
        }
        return false;
    }

    public function login(Request $request)
    {
        $input = $request->all();
        try {
            $url = env('API_URL_BASE') . 'login';
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($url, $input);
            $json_custom = json_decode($response->body(), true);
            if ($json_custom['status'] == 'success') {
                if (session_status() === PHP_SESSION_NONE)
                    session_start();

                $_SESSION['token'] = $json_custom['data']['data_session']['token'];
                $_SESSION['session_id'] = $json_custom['data']['data_session']['session_id'];
                $_SESSION['expired_at'] = $json_custom['data']['data_session']['expired_at'];
            }
            return response()->json(['status' => $json_custom['status'], 'msg' => $json_custom['msg']], $response->status());
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' =>  'Internal Server Error'], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            if ($this->checkSession()) {
                //SOLICITAR LA API PARA CERRAR SESSION
                $url = env('API_URL_BASE') . 'logout';
                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $_SESSION['token'],
                    'session-id' => $_SESSION['session_id']
                ])->post($url, []);
                $json_custom = json_decode($response->body(), true);
            }
            //MATAR SESION
            session_destroy();
            return response()->json(['status' => 'success', 'msg' =>  'Session cerrada'], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' =>  'Internal Server Error'], 500);
        }
    }

    public function updateShoppingCartDataBase(Request $request)
    {
        try {
            $input = $request->all();
            if ($this->checkSession()) {

                //ACTUALIZAR EL CARRITO
                $url = env('API_URL_BASE') . 'shoppingcart/update';
                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $_SESSION['token'],
                    'session-id' => $_SESSION['session_id']
                ])->post($url, $input);
                $json_custom = json_decode($response->body(), true);
                if ($json_custom['status'] == 'success') {
                    return response()->json(['status' => 'success', 'msg' =>  'Carrito actualizado'], 200);
                } else {
                    return response()->json($json_custom, $response->status());
                }
            }
            return response()->json(['status' => 'error', 'msg' =>  'Expired token'], 401);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' =>  'Internal Server Error'], 500);
        }
    }
}
