<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EcommerceController extends Controller
{
    function index(Request $request) {
        return view('index', []);
    }
}
