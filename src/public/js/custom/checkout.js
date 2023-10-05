var shopping_carts = [];

$(document).ready(function () {
    $("#btnCart").hide();
    $("#link_logout").hide();
    updateOrder();
})

/**
 * ACTUALIZA LOS PRODUCTOS DEL ORDEN
 */
function updateOrder() {
    let container = document.getElementById("orderProduts");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let orderTotal = 0

    shopping_carts.forEach(item => {
        let product = product_list.find((object) => object.id == item.product_id);
        container.appendChild(addItemOrder(item, product));
        orderTotal = parseFloat(orderTotal + (item.quantity * product.price));
    });

    $('#orderTotal').text(parseFloat(orderTotal).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }));
}

/**
 * AGREGA UN PRODUCTO A LA ORDEN
 * @param {*} _item 
 * @param {*} _product 
 * @returns 
 */
function addItemOrder(_item, _product) {
    let div1 = document.createElement('div');
    div1.className = 'order-col';

    let div2 = document.createElement('div');
    div2.innerText = `${_item.quantity}x ${_product.name}`;

    let div3 = document.createElement('div');
    div3.innerText = parseFloat(_product.price * _item.quantity).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    div1.appendChild(div2);
    div1.appendChild(div3);

    return div1;
}

function buyCartList() {

    if (shopping_carts.length == 0) {
        showAlertGeneric('Debes seleccionar almenos un producto', 'warning');
        return;
    }

    let paymentMethod = $("input[name='paymentMethod']:checked").val();
    if (typeof paymentMethod === "undefined") {
        showAlertGeneric('Debes seleccionar un metodo de pago', 'warning');
        return;
    }

    let terms = $("#terms").is(":checked");
    if (!terms) {
        showAlertGeneric('Debes aceptar los terminos y condiciones', 'warning');
        return;
    }

    let buyForm = validateFormArray(['recipient_name', 'address', 'city', 'state', 'postal_code']);

    if (buyForm != null) {
        /*let ajaxData = new AjaxRequestClass(
            API_LOGIN,
            login,
            "Ocurrio un error al iniciar sesion",
            'POST',
            true,
            true,
            loginRequest
        );

        ajaxRequestGenercic(ajaxData);*/
    }
}