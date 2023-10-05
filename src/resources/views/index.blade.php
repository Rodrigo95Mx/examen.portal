@extends('master')

@section('content')
    <div class="container">
        <div class="row">
            <div id="aside" class="col-md-3">
                <div class="aside">
                    <h3 class="aside-title">Categorias</h3>
                    <div class="checkbox-filter">

                        <div class="input-checkbox">
                            <input type="checkbox" id="category-2">
                            <label for="category-2">
                                <span></span>
                                Tecnologia
                                <small>(9)</small>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div id="store" class="col-md-9">
                <div class="row">
                    @foreach ($products as $item)
                        <div class="col-md-4 col-xs-6">
                            <div class="product">
                                <div class="product-img">
                                    <img src="{{ asset($item['image_url']) }}" alt="">
                                </div>
                                <div class="product-body">
                                    <h3 class="product-name"><a href="#">{{ $item['name'] }}</a></h3>
                                    <h4 class="product-price">${{ number_format($item['price'], 2, '.', ',') }}</h4>
                                </div>
                                <div class="add-to-cart">
                                    <button class="add-to-cart-btn" onclick="addToCart({{ $item['id'] }})"><i
                                            class="fa fa-shopping-cart"></i> Agregar al
                                        carrito</button>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@stop

@section('customjs')
    <script>
        var product_list = @js($products);
        var session = @js($session);
    </script>
    <script src="{{ asset('js/custom/index.js') }}"></script>
@stop
