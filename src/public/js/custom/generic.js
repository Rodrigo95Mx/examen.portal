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
    //FORMATO DE NUMERO SIN DECIMAL EN EL INPUT
    $('.numberForm').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    //FORMATO DE NUMERO CON DECIMAL EN EL INPUT
    $('.numberFormDecimal').on('input', function () {
        this.value = this.value.replace(/[^0-9,.{0,1}]/g, '').replace(/,/g, '.');
    });
});

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
            updateTimeSession();
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

            showAlertGeneric(msg, 'error');
        },
    });

    return dataReturn;
}

function showLogin() {
    $("#modal-login").modal({ backdrop: 'static', keyboard: false });
}

function showUserRegistration() {
    $("#modal-registration").modal({ backdrop: 'static', keyboard: false });
}

function logout() {

}

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
             "Ocurrio un error al guardar el formulario",
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
        showAlertGeneric(_data.msg, 'success');
    }
}

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

function showAlertGeneric(_msg, _icon = 'error', _reload = false) {
    Swal.fire({
        icon: _icon,
        title: _msg,
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar',
    }).then(function (result) {
        if (_reload) {
            window.location.reload();
        }
    });
}