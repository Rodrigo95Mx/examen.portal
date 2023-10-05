class AjaxRequestClass {
    constructor(_url, _data, _msgError, _type = 'POST', _showLoader = false, _async = false, _function = null, _renewSession = true) {
        this.url = _url;
        this.data = _data;
        this.msgError = _msgError;
        this.type = _type;
        this.showLoader = _showLoader;
        this.async = _async;
        this.function = _function;
        this.renewSession = _renewSession;
    }
}

$(document).ready(function () {
    //MOSTRAR Y OCULTAR BOTONES SEGUN LA SESION
    showButtons();
    //FORMATO DE NUMERO SIN DECIMAL EN EL INPUT
    $('.numberForm').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    //FORMATO DE NUMERO CON DECIMAL EN EL INPUT
    $('.numberFormDecimal').on('input', function () {
        this.value = this.value.replace(/[^0-9,.{0,1}]/g, '').replace(/,/g, '.');
    });

    lottie.loadAnimation({
        container: document.getElementById(
            'loaderAnim'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: LOADER // the path to the animation json
    });
});

/**
 * MUESTRA/OCULTA BOTONES DE ACUERDO A LA SESION
 */
function showButtons() {
    if (session == 1) {
        $("#link_logout").show();
        $("#btnMyAccount").show();
        $("#link_login").hide();
        $("#link_register").hide();
    } else {
        $("#link_login").show();
        $("#link_register").show();
        $("#link_logout").hide();
        $("#btnMyAccount").hide();
    }
}

/**
 * CREA UNA PETICION AJAX GENERICO
 * @param {*} _ajaxData 
 * @returns 
 */
function ajaxRequestGenercic(_ajaxData) {
    let dataReturn = null;
    $.ajax({
        async: _ajaxData.async,
        url: _ajaxData.url,
        type: _ajaxData.type,
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': X_CSRF_TOKEN,
        },
        data: _ajaxData.data,
        beforeSend: function () {
            if (_ajaxData.showLoader)
                modalLoaderOpen();
        },
        success: function (data) {
            //SIEMPRE AL REALIZAR UNA PETICION AJAX SE REINICIA EL CONTADOR
            if (_ajaxData.function != null)
                _ajaxData.function(data);
            else
                dataReturn = data;
        },
        error: function (err) {
            let msg = "";
            if (typeof err.responseJSON === 'undefined') { // devuelve true
                if (_ajaxData.msgError != "")
                    msg = _ajaxData.msgError;
                else
                    msg = "Ocurrio un error, intenta mas tarde"
            } else {
                msg = err.responseJSON.msg;
            }
            debugger
            if (msg == 'Expired token' || msg == 'Invalid token') {
                modalLoaderClose();
                Swal.fire({
                    icon: error,
                    title: msg,
                    allowOutsideClick: false,
                    confirmButtonText: 'Aceptar',
                }).then(function (result) {
                    modalLoaderOpen();
                    logout();
                });
            } else {
                showAlertGeneric(msg, 'error');
            }

        },
    });

    return dataReturn;
}

/**
 * VALIDA SI UN TEXTO ESTA VACIO O NULO
 * @param {*} _string 
 * @returns 
 */
function stringIsNullOrEmpty(_string) {
    try {
        let stringVal = _string.trim();
        if (stringVal == null || stringVal == undefined || stringVal == '')
            return true;
        else
            return false;
    } catch (error) {
        return true;
    }
}

/**
 * VALIDA LOS CAMPOS DE UNA ARREGLO DE IDS SI TIENEN DATOS
 * @param {*} _arrayaTributes ID
 * @param {*} _subId TEXTO ANTES DEL ID
 * @returns 
 */
function validateFormArray(_arrayaTributes, _subId = '') {
    let data = {};
    let countError = 0;

    _arrayaTributes.forEach(element => {
        let valueItem = $(`#${_subId}${element}`).val();
        if (stringIsNullOrEmpty(valueItem)) {
            if ($(`#${_subId}${element}`).hasClass("input-required")) {
                $(`#${_subId}${element}`).addClass('is-invalid');
                countError++;
            }
        } else {
            $(`#${_subId}${element}`).removeClass('is-invalid');
            data[element] = valueItem;
        }
    });

    if (countError > 0) {
        showAlertGeneric('Debes agregar todos los campos obligatorios');
        return null;
    } else {
        return data;
    }
}

/**
 * LIMPIA UN FORMULARIO
 * @param {*} _arrayaTributes 
 * @param {*} _subId 
 * @returns 
 */
function clearForm(_arrayaTributes, _subId = '') {
    _arrayaTributes.forEach(element => {
        $(`#${_subId}${element}`).val('');
    });
}

/**
 * MUESTRA UN MODAL DE MENSAJE GENERICO
 * @param {*} _msg MENSAJE A MOSTRAR
 * @param {*} _icon ICONO DEL MODAL
 * @param {*} _reload INDIDCA SI AL ACEPTAR SE VA RECARGAR 
*/
function showAlertGeneric(_msg, _icon = 'error', _reload = false) {
    modalLoaderClose();
    Swal.fire({
        icon: _icon,
        title: _msg,
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar',
    }).then(function (result) {
        if (_reload) {
            modalLoaderOpen();
            window.location.reload();
        }
    });
}

/**
 * MUESTRA EL MODAL DE CARGA
 */
function modalLoaderOpen() {
    $('#mod-loader').stop();
    $('#mod-loader').show();
    $('#mod-loader').css("opacity", 1);
    $("#mod-loader").animate({
        opacity: 1,
    }, 300, function () {

    });
}

/**
 * CIERRA EL MODAL DE CARGA
 */
function modalLoaderClose() {
    $('#mod-loader').stop();
    $("#mod-loader").animate({
        opacity: 0,
    }, 300, function () {
        $('#mod-loader').hide();
    });
}

/**
 * ABRE EL MODAL PARA EL LOGIN
 */
function showLogin() {
    $("#modal-login").modal({ backdrop: 'static', keyboard: false });
}

/**
 * ABRE EL MODAL PARA EL REGISTRO
 */
function showUserRegistration() {
    $("#modal-registration").modal({ backdrop: 'static', keyboard: false });
}

/**
 * REALIZA EL CIERRE DE SESION
 */
function logout() {
    let ajaxData = new AjaxRequestClass(
        API_LOGOUT,
        login,
        "Ocurrio un error al cerrar la sesion",
        'POST',
        true,
        true,
        logoutRequest
    );

    ajaxRequestGenercic(ajaxData);
}

/**
 * RESPUESTA DEL AJAX 
 * @param {*} _data 
 */
function logoutRequest(_data) {
    if (_data.status == undefined || _data.status.toUpperCase() == 'ERROR') {
        showAlertGeneric(_data.msg, 'error');
    } else {
        session = 0;
        showButtons()
        showAlertGeneric(_data.msg, 'success');
    }
}