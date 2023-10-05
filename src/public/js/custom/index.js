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
        showAlertGeneric(_data.msg, 'success');
    }
}

/*function addToCart(_productId){

}*/

function addToCart(_productId, _quantity = 1) {
    let product = product_list.find((object) => object.id == _productId);

    let div1 = document.createElement('div');
    div1.className = 'product-widget';

    let div2 = document.createElement('div');
    div2.className = 'product-img';
    let img = document.createElement('img');
    img.src = product.image_url;
    div2.appendChild(img)

    let div3 = document.createElement('div');
    div3.className = 'product-body';
    let h3 = document.createElement('h3');
    h3.className = 'product-name';
    let a = document.createElement('a');
    a.innerText = product.name;
    h3.appendChild(a);
    let h4 = document.createElement('h4');
    h4.className = 'product-price';
    let span = document.createElement('span');
    span.className = 'qty';
    span.innerText = `${_quantity}x`;
    h4.appendChild(span);
    h4.innerText = parseFloat(product.price).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    div3.appendChild(h3);
    div3.appendChild(h4);

    let button = document.createElement('button');
    button.className = 'delete';
    let i = document.createElement('i');
    i.className = 'fa fa-close';
    button.appendChild(i);

    div1.appendChild(div2);
    div1.appendChild(div3)
}

/*
<div class="product-widget">
                                            <div class="product-img">
                                                <img src="./img/product01.png" alt="">
                                            </div>
                                            <div class="product-body">
                                                <h3 class="product-name"><a href="#">product name goes here</a>
                                                </h3>
                                                <h4 class="product-price"><span class="qty">1x</span>$980.00</h4>
                                            </div>
                                            <button class="delete"><i class="fa fa-close"></i></button>
                                        </div>
*/