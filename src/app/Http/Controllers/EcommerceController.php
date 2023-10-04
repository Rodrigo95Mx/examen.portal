<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class EcommerceController extends Controller
{
    function index(Request $request)
    {
        $url = env('API_URL_BASE') . 'ecommerce/products/list';
        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post($url);
        $json_custom = json_decode($response->body(), true);
        $data = [
            'products' => isset($json_custom['data']) ? $json_custom['data']['product_list'] : []
        ];

        return view('index', $data);
    }

    public function register(Request $request)
    {
        $input = $request->all();
        try { //VALIDAR DATOS COMPLETOS
            /*$url = env('API_URL_BASE') . 'ecommerce/products/list';
            $response = Http::withHeaders([
                'Authorization' => "Bearer $token->token",
                'Content-Type' => 'application/json'
            ])->post($url, $send_data);

            $json_custom = json_decode($response->body(), true);*/

            return response()->json(['status' => 'error', 'msg' => 'Unauthorized', 'data' => ['error' => 'access_denied', 'error_description' => 'Invalid credentials.']], 401);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' =>  'Internal Server Error'], 500);
        }
    }

    public function login(Request $request)
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
}
