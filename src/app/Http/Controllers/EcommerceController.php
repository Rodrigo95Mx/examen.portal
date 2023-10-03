<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class EcommerceController extends Controller
{
    function index(Request $request)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post(env('API_URL_BASE') . 'ecommerce/products/list');
        $json_custom = json_decode($response->body(), true);

        $data = [
            'products' => isset($json_custom['data']) ? $json_custom['data']['product_list'] : []
        ];

        return view('index', $data);
    }
}
