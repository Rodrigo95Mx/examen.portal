$(document).ready(function () {
    $("#btnMyAccount").hide();
    $("#btnHome").show();
})

function purchaseDetails() {
    $("#modal-purchase-detail").modal({ backdrop: 'static', keyboard: false });
}