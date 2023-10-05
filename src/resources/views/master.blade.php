<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Electro - HTML Ecommerce</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}" />
    <link type="text/css" rel="stylesheet" href="{{ asset('css/slick.css') }}" />
    <link type="text/css" rel="stylesheet" href="{{ asset('css/slick-theme.css') }}" />
    <link type="text/css" rel="stylesheet" href="{{ asset('css/nouislider.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/font-awesome.min.css') }}">
    <link type="text/css" rel="stylesheet" href="{{ asset('css/style.css') }}" />

</head>

<body>
    <header>
        <div id="top-header">
            <div class="container">
                <ul class="header-links pull-left">
                    <li><a href="#"><i class="fa fa-phone"></i> +021-95-51-84</a></li>
                    <li><a href="#"><i class="fa fa-envelope-o"></i> email@email.com</a></li>
                    <li><a href="#"><i class="fa fa-map-marker"></i> 1734 Stonecoal Road</a></li>
                </ul>
                <ul class="header-links pull-right">
                    <li id="link_register" style="display:none;">
                        <a onclick="showUserRegistration()" style="cursor:pointer;"><i class="fa fa-user"></i>
                            Registro</a>
                    </li>
                    <li id="link_login" style="display:none;">
                        <a onclick="showLogin()" style="cursor:pointer;"><i class="fa fa-sign-in"></i> Iniciar
                            sesion</a>
                    </li>
                    <li id="link_logout" style="display:none;">
                        <a onclick="logout()" style="cursor:pointer;"><i class="fa fa-sign-out"></i> Cerrar sesion</a>
                    </li>
                </ul>
            </div>
        </div>
        <div id="header">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="header-logo">
                            <a onclick="openNewView('{{route('index')}}')" class="logo">
                                <img src="{{asset('img/logo.png')}}" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="col-md-6">
                    </div>
                    <div class="col-md-3 clearfix">
                        <div class="header-ctn">
                            <div id="btnMyAccount" style="display:none;">
                                <a href="#">
                                    <i class="fa fa-user-circle"></i>
                                    <span>Mi cuenta</span>
                                </a>
                            </div>
                            <div class="dropdown" id="btnCart">
                                <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span>Mi carrito</span>
                                    <div class="qty" id="countItemsCart">0</div>
                                </a>
                                <div class="cart-dropdown">
                                    <div class="cart-list" id="cartList">
                                    </div>
                                    <div class="cart-summary">
                                        <small id="countItemsCartText">0 Articulo(s) Seleccionados</small>
                                        <h5 id="totalAmountCart">SUBTOTAL: $0.00</h5>
                                    </div>
                                    <div class="cart-btns">
                                        <a style="cursor: default">&nbsp;&nbsp;</a>
                                        <a onclick="buyCart('{{route('checkout')}}')">Comprar <i class="fa fa-arrow-circle-right"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="menu-toggle">
                                <a href="#">
                                    <i class="fa fa-bars"></i>
                                    <span>Menu</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="section">
        @yield('content')
    </div>
    <!--MODALES-->
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
                        <input type="text" name="register_name" class="form-control input-required"
                            id="register_name">
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
                        <input type="text" name="register_email" class="form-control input-required"
                            id="register_email">
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
                        <input type="password" name="register_password_confirmation"
                            class="form-control input-required" id="register_password_confirmation">
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
    <footer id="footer">
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-xs-6">
                        <div class="footer">
                            <h3 class="footer-title">About Us</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut.</p>
                            <ul class="footer-links">
                                <li><a href="#"><i class="fa fa-map-marker"></i>1734 Stonecoal Road</a></li>
                                <li><a href="#"><i class="fa fa-phone"></i>+021-95-51-84</a></li>
                                <li><a href="#"><i class="fa fa-envelope-o"></i>email@email.com</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-6">
                        <div class="footer">
                            <h3 class="footer-title">Categories</h3>
                            <ul class="footer-links">
                                <li><a href="#">Hot deals</a></li>
                                <li><a href="#">Laptops</a></li>
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Cameras</a></li>
                                <li><a href="#">Accessories</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="clearfix visible-xs"></div>
                    <div class="col-md-3 col-xs-6">
                        <div class="footer">
                            <h3 class="footer-title">Information</h3>
                            <ul class="footer-links">
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Orders and Returns</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-6">
                        <div class="footer">
                            <h3 class="footer-title">Service</h3>
                            <ul class="footer-links">
                                <li><a href="#">My Account</a></li>
                                <li><a href="#">View Cart</a></li>
                                <li><a href="#">Wishlist</a></li>
                                <li><a href="#">Track My Order</a></li>
                                <li><a href="#">Help</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="bottom-footer" class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <ul class="footer-payments">
                            <li><a href="#"><i class="fa fa-cc-visa"></i></a></li>
                            <li><a href="#"><i class="fa fa-credit-card"></i></a></li>
                            <li><a href="#"><i class="fa fa-cc-paypal"></i></a></li>
                            <li><a href="#"><i class="fa fa-cc-mastercard"></i></a></li>
                            <li><a href="#"><i class="fa fa-cc-discover"></i></a></li>
                            <li><a href="#"><i class="fa fa-cc-amex"></i></a></li>
                        </ul>
                        <span class="copyright">
                            <a target="_blank" href="https://www.templateshub.net">Templates Hub</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div class="loader" id="mod-loader"
        style="background-color:rgba(255,255,255,0.8)!important; backdrop-filter: blur(2px); ">
        <div class="loaderCenter">
            <div align="center">
                <div id="loaderAnim"></div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/slick.min.js') }}"></script>
    <script src="{{ asset('js/nouislider.min.js') }}"></script>
    <script src="{{ asset('js/jquery.zoom.min.js') }}"></script>
    <script src="{{ asset('js/main.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="{{ asset('/plugins/player/lottie.min.js') }}"></script>
    <script>
        var X_CSRF_TOKEN = @js(csrf_token());
        var LOADER = @js(asset('img/loader_ami.json'));
        var API_REGISTER = @js(route('register'));
        var API_LOGIN = @js(route('login'));
        var API_LOGOUT = @js(route('logout'));
        var API_UPDATESHOPPINGCART = @js(route('updateShoppingCartDataBase'));
        var session = @js($session);
    </script>
    <script src="{{ asset('js/custom/generic.js') }}"></script>
    @yield('customjs')
</body>

</html>
