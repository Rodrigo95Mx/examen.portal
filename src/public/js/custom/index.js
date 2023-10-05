$(document).ready(function () {
    
});

/**
 * ENVIA EL FORMULARIO DE REGISTRO
 * @returns 
 */
function createRegister() {
    let register = validateFormArray(['register_name', 'register_lastname', 'register_lastname2', 'register_email', 'register_phone', 'register_password']);
    if ($('#register_password').val() != $('#register_password_confirmation').val()) {
        showAlertGeneric('Las contraseñas no coinciden');
        return
    }
    let email = $("#register_email").val();
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        showAlertGeneric("Formato de correo electrónico no válido");
        return
    }
    if (register != null) {
        let ajaxData = new AjaxRequestClass(
            API_REGISTER,
            register,
            "Ocurrio un error en el registro",
            'POST',
            true,
            true,
            createRegisterRequest
        );

        ajaxRequestGenercic(ajaxData);
    }
}

/**
 * RESPUESTA DEL AJAX 
 * @param {*} _data 
 */
function createRegisterRequest(_data) {
    if (_data.status == undefined || _data.status.toUpperCase() == 'ERROR') {
        showAlertGeneric(_data.msg, 'error');
    } else {
        $('#modal-registration').modal('hide');
        showAlertGeneric(_data.msg, 'success');
        clearForm(['register_name', 'register_lastname', 'register_lastname2', 'register_email', 'register_phone', 'register_password', 'register_password_confirmation']);
    }
}

/**
 * ENVIA EL FORMULARIO DE LOGIN
 * @returns 
 */
function login() {
    let login = validateFormArray(['login_email', 'login_password']);
    if (login != null) {
        let ajaxData = new AjaxRequestClass(
            API_LOGIN,
            login,
            "Ocurrio un error al iniciar sesion",
            'POST',
            true,
            true,
            loginRequest
        );

        ajaxRequestGenercic(ajaxData);
    }
}

/**
 * RESPUESTA DEL AJAX 
 * @param {*} _data 
 */
function loginRequest(_data) {
    if (_data.status == undefined || _data.status.toUpperCase() == 'ERROR') {
        showAlertGeneric(_data.msg, 'error');
    } else {
        session = 1;
        showButtons();
        $('#modal-login').modal('hide');
        clearForm(['login_email', 'login_password']);

        let dataLocal = localStorage.getItem("shopping_carts");
        if (dataLocal != null) {
            //SI HAY EN EL NAVEGADOR SE ACTUALIZA CON EL QUE ESTA
            shopping_carts = JSON.parse(dataLocal);
            updateDataCart();
        } else {
            //SI NO HAY SE TOMA DE LA BASE DE DATOS
            shopping_carts = _data.data;
            updateDataCart();
        }

        showAlertGeneric(_data.msg, 'success');
    }
}

/**
 * AGREGA O ACTUALIZA PRODUCTOS AL CARRITO DE COMPRA
 * @param {*} _productId 
 */
function addToCart(_productId) {
    let product_cart = shopping_carts.find((object) => object.product_id == _productId);
    if (typeof product_cart === "undefined") {
        //NO EXISTE EL PRODUCTO EN EL CARRITO
        shopping_carts.push({
            id: 0, user_id: 0, product_id: _productId, quantity: 1
        });
    } else {
        let new_shopping_carts = [];
        shopping_carts.forEach(element => {
            if (element.product_id == _productId) {
                product_cart.quantity = product_cart.quantity + 1;
                new_shopping_carts.push(product_cart);
            } else {
                new_shopping_carts.push(element);
            }
        });
        shopping_carts = new_shopping_carts;
    }
    updateDataCart();
    showAlertGeneric('Producto agregado al carrito', 'success');
}