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

@section('modals')
    <!--MODAL LOGIN-->
    <div class="modal fade" id="modal-login">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Iniciar sesion</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="login_email">Correo<span class="text-danger">*</span></label>
                        <input type="text" name="login_email" class="form-control" id="login_email"
                            placeholder="Ingrese su correo">
                    </div>
                    <div class="mb-3">
                        <label for="login_password">Contraseña<span class="text-danger">*</span></label>
                        <input type="password" name="login_password" class="form-control" id="login_password"
                            placeholder="Ingrese su Contraseña">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-wAuto" onclick="login()">
                        Iniciar session
                    </button>
                </div>
            </div>

        </div>

    </div>
    <!-- MODAL REGISTRO -->
    <div class="modal fade" id="modal-registration">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Registro</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="register_name">Nombre</label>
                        <input type="text" name="register_name" class="form-control input-required" id="register_name">
                    </div>
                    <div class="mb-3">
                        <label for="register_lastname">Apellido Paterno</label>
                        <input type="text" name="register_lastname" class="form-control input-required"
                            id="register_lastname">
                    </div>
                    <div class="mb-3">
                        <label for="register_lastname2">Apellido Materno</label>
                        <input type="text" name="register_lastname2" class="form-control input-required"
                            id="register_lastname2">
                    </div>
                    <div class="mb-3">
                        <label for="register_email">Correo</label>
                        <input type="text" name="register_email" class="form-control input-required" id="register_email">
                    </div>
                    <div class="mb-3">
                        <label for="register_phone">Telefono</label>
                        <input type="text" name="register_phone" class="form-control input-required numberForm"
                            id="register_phone">
                    </div>
                    <div class="mb-3">
                        <label for="register_password">Contraseña</label>
                        <input type="password" name="register_password" class="form-control input-required"
                            id="register_password">
                    </div>
                    <div class="mb-3">
                        <label for="register_password_confirmation">Confirmar contraseña</label>
                        <input type="password" name="register_password_confirmation" class="form-control input-required"
                            id="register_password_confirmation">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-wAuto" onclick="createRegister()">
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    </div>
@stop

@section('customjs')
    <script src="{{ asset('js/custom/index.js') }}"></script>
@stop
