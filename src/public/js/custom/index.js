var shopping_carts = [];

$(document).ready(function () {
    if (session == 0) {
        //SI NO ESTA INICIADA LA SESION SE TOMA EL CARRITO DE CAMPRA DEL NAVEGADOR
        let dataLocal = localStorage.getItem("shopping_carts");
        if (dataLocal != null) {
            shopping_carts = JSON.parse(dataLocal);
            updateDataCart();
        }
    } else {
        //SI ESTA INICIADA LA SESION SE TOMA EL CARRITO DE COMPRA DE LA BASE DE DATOS
    }

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
        showAlertGeneric(_data.msg, 'success');
        clearForm(['login_email', 'login_password']);
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

/**
 * ACTUALIZA LOS DATOS DEL CARRITO
 */
function updateDataCart() {
    let container = document.getElementById("cartList");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    let countItemsCart = 0;
    let totalAmountCart = 0;
    shopping_carts.forEach(item => {
        let product = product_list.find((object) => object.id == item.product_id);
        container.appendChild(addToCartProduct(item, product));
        countItemsCart = countItemsCart + item.quantity;
        totalAmountCart = parseFloat(totalAmountCart + (item.quantity * product.price));
    });
    $('#countItemsCart').text(countItemsCart);
    $('#countItemsCartText').text(`${countItemsCart} Articulo(s) Seleccionados`);
    $('#totalAmountCart').text(`SUBTOTAL: ${totalAmountCart.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`);
    //GUARDAR CARRITO EN LOCALSTORAGE
    localStorage.setItem("shopping_carts", JSON.stringify(shopping_carts));
    if (session == 1) {
        //SI ESTA INICIADA LA SESION SE ACTUALIZA EL CARRITO EN LA BASE DE DATOS
        updateShoppingCartDataBase();
    }
}

/**
 * AGREGA UN PRODUCTO AL CARRITO DE COMPRA
 * @param {*} _item 
 * @param {*} _product 
 * @returns 
 */
function addToCartProduct(_item, _product) {
    let div1 = document.createElement('div');
    div1.className = 'product-widget';

    let div2 = document.createElement('div');
    div2.className = 'product-img';
    let img = document.createElement('img');
    img.src = _product.image_url;
    div2.appendChild(img)

    let div3 = document.createElement('div');
    div3.className = 'product-body';
    let h3 = document.createElement('h3');
    h3.className = 'product-name';
    let a = document.createElement('a');
    a.innerText = _product.name;
    h3.appendChild(a);
    let h4 = document.createElement('h4');
    h4.className = 'product-price';
    let span1 = document.createElement('span');
    span1.className = 'qty';
    span1.innerText = `${_item.quantity}x`;
    let span2 = document.createElement('span');
    span2.innerText = parseFloat(_product.price).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    h4.appendChild(span1);
    h4.appendChild(span2);
    div3.appendChild(h3);
    div3.appendChild(h4);

    let button = document.createElement('button');
    button.className = 'delete';
    let i = document.createElement('i');
    i.className = 'fa fa-close';
    button.setAttribute('onclick', `deleteToCartProduct(${_item.product_id})`);
    button.appendChild(i);

    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(button);

    return div1;
}

/**
 * ELIMINA UN PRODUCTO DEL CARRITO
 * @param {*} _productId 
 */
function deleteToCartProduct(_productId) {
    let new_shopping_carts = [];
    shopping_carts.forEach(element => {
        if (element.product_id != _productId)
            new_shopping_carts.push(element);
    });
    shopping_carts = new_shopping_carts;
    updateDataCart();
    showAlertGeneric('Producto eliminado del carrito', 'success');
}

/**
 * ACTUALIZA EL CARRITO DE COMPRA EN LA BASE DE DATOS
 * @returns 
 */
function updateShoppingCartDataBase() {
    let ajaxData = new AjaxRequestClass(
        API_UPDATESHOPPINGCART,
        { shopping_carts: shopping_carts },
        "Ocurrio un error al iniciar sesion",
        'POST',
        false,
        true,
        updateShoppingCartDataBaseRequest
    );

    ajaxRequestGenercic(ajaxData);
}

/**
 * RESPUESTA DEL AJAX 
 * @param {*} _data 
 */
function updateShoppingCartDataBaseRequest(_data) {
    if (_data.status == undefined || _data.status.toUpperCase() == 'ERROR') {
        showAlertGeneric(_data.msg, 'error');
    }
}