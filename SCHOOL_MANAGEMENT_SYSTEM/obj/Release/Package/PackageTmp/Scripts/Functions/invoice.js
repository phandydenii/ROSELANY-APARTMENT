$(document).ready(function () {

    $(document).ajaxStart(function () {
        $('#loadingGif').addClass('show');
    }).ajaxStop(function () {
        $('#loadingGif').removeClass('show');
    });
    GetInvoice();
})

var tableInvoice = [];
var products = [];
var cart = [];
var items = [];

toastr.optionsOverride = 'positionclass = "toast-bottom-right"';
toastr.options.positionClass = 'toast-bottom-right';
var chkFood = 0;
var maxid = 0;


$('input[name=fromdate]').change(function () {
    var selectedDate = $('#fromdate').val();
    GetInvoice(selectedDate);
});

function GetInvoice(selectedDate) {
    //alert(selectedDate);
    tableInvoice = $('#tableInvoice').DataTable({
        ajax: {
            url: "/api/Invoice?selectedDate=" + selectedDate,
            dataSrc: ""
        },
        columns: [
            //{
            //    data: "id"
            //},
            {
                data: "invoiceno", render: function (data) {

                    return "DX" + ("000000" + data).slice(-6);
                }
            },
            {
                data: "date",
                render: function (data) {
                    return moment(new Date(data)).format('DD-MMM-YYYY');
                }
            },
            //{
            //    data: "customerid"
            //},
            {
                data: "customername",
            },
            //{
            //    data: "showroomid",
            //},
            {
                data: "showroomname",
            },
            {
                data: "totalamount",
            },
            {
                data: "totalcarprice"
            },
            {
                data: "totalshipprice"
            },
            {
                data: "alreadypaid"
            },
            //{
            //    data: "status"
            //},S
            //{
            //    data: "createby"
            //},
            //{
            //    data: "createdate"
            //},
            {
                data: "id",
                render: function (data) {
                    return "<button onclick='PrintInvoice(" + data + ")'  class='btn btn-success btn-xs pull-center' style='margin-right: 5px;'> Print</button>" + "<button onclick='GetInvoiceDetail(" + data + ")'  class='btn btn-info btn-xs pull-center' style='margin-right: 5px;'> Detail</button>" + "<button onclick='InvoiceEdit(" + data + ")' class='btn btn-warning btn-xs' style='margin-right:5px;'>Edit</button>" + "<button onclick='InvoiceDelete(" + data + ")' class='btn btn-danger btn-xs' style='margin-right: 5px;'>Delete</button>" + "<button onclick='PrintReturn(" + data + ")' class='btn btn-success btn-xs' >Return</button>";
                }
            }
        ],
        destroy: true,
        "order": [0, "desc"],
        "info": false
    });


}

function InvoiceAction() {
    var chkPaid = 0;
    var action = '';
    action = document.getElementById('btnInvoice').innerText;
    if (action == "Add New") {
        document.getElementById('btnInvoice').innerText = "Save";
        document.getElementById('date').disabled = false;
        document.getElementById('customerid').disabled = false;
        document.getElementById('totalamount').disabled = true;
        document.getElementById('totalcarprice').disabled = true;
        document.getElementById('totalshipprice').disabled = true;
        document.getElementById('alreadypaid').disabled = true;
        $('#totalamount').val('0.00');
        $('#totalcarprice').val('0.00');
        $('#totalshipprice').val('0.00');
        $('#alreadypaid').val('0.00');
        
        $('#date').val(moment().format('YYYY-MM-DD'))
        getMaxInvNo();



    } else if (action == "Save") {
        if ($("#paid").is(':checked')) {
            chkPaid = 1;
        } else {
            chkPaid = 0;
        }
        var dataOrder = {
                invoiceno: $('#idnoformat').val(),
                date: $('#date').val(),
                customerid: $('#customerid').val(),
                showroomid: $('#showroomid').val(),
                totalamount: $('#totalamount').val(),
                totalcarprice: $('#totalcarprice').val(),
                totalshipprice: $('#totalshipprice').val(),
                alreadypaid: $('#alreadypaid').val(),
                exchangeid: $('#exid').val(),
                paid: chkPaid,
            }

            //console.log(dataOrder);
            $.ajax({
                url: "/api/Invoice",
                type: "POST",
                data: JSON.stringify(dataOrder),
                contentType: "application/json",
                success: function (data) {
                    toastr.success("Invoice has been created successfully.", "Server Response");
                    $('#invoiceModel').modal('hide');
                    var table = $('#tableInvoice').DataTable();
                    table.ajax.reload();

                },
                error: function (err) {
                    //console.log("False")
                    toastr.error("Customer already add invoice!");
                }
            });
    } else if (action == "Update") {
        if ($("#paid").is(':checked')) {
            chkPaid = 1;
        } else {
            chkPaid = 0;
        }
            var dataOrder = {
                id: $('#id').val(),
                invoiceno: $('#idnoformat').val(),
                date: $('#date').val(),
                customerid: $('#customerid').val(),
                showroomid: $('#showroomid').val(),
                totalamount: $('#totalamount').val(),
                totalcarprice: $('#totalcarprice').val(),
                totalshipprice: $('#totalshipprice').val(),
                alreadypaid: $('#alreadypaid').val(),
                exchangeid: $('#exid').val(),
                paid: chkPaid,
            }

            console.log(dataOrder);
            $.ajax({
                url: "/api/Invoice/" + dataOrder.id,
                type: "PUT",
                data: JSON.stringify(dataOrder),
                contentType: "application/json",
                success: function (data) {
                    toastr.success("Invoice has been updated successfully.", "Server Response");
                    
                    $('#invoiceModel').modal('hide');
                    var table = $('#tableInvoice').DataTable();
                    table.ajax.reload();

                },
                error: function (err) {
                    //console.log("False")
                    toastr.warning("You don't have permission to update Record!");
                }
            });
    }

}

function InvoicePaid() {
    var totalprice;
    var carprice;
    var shipprice;
    var alreadypaid;
    totalprice = $('#totalamount').val(),
    carprice = $('#totalcarprice').val(),
    shipprice = $('#totalshipprice').val(),
    alreadypaid = totalprice - carprice - shipprice;
    $('#alreadypaid').val(alreadypaid);
}

function InvoiceEdit(id) {
    $('#invoiceModel').modal('show');
    document.getElementById('invoiceno').disabled = false;
    document.getElementById('date').disabled = false;
    document.getElementById('customerid').disabled = false;
    document.getElementById('showroomid').disabled = false;
    document.getElementById('totalamount').disabled = true;
    document.getElementById('totalcarprice').disabled = true;
    document.getElementById('totalshipprice').disabled = true;
    document.getElementById('alreadypaid').disabled = true;
    $.ajax({
        url: "/api/Invoice/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            
            $('#id').val(result.id);
            var pd = moment(result.paymentdate).format("YYYY-MM-DD");
            $('#date').val(pd);
            $('#invoiceno').val("DX" + ("000000" + result.invoiceno).slice(-6));
            $("#idnoformat").val(result.invoiceno);
            $("#customerid").val(result.customerid).change();
            $('#showroomid').val(result.showroomid).change();
            $('#totalamount').val(result.totalamount);
            $('#totalcarprice').val(result.totalcarprice);
            $('#totalshipprice').val(result.totalshipprice);
            $('#alreadypaid').val(result.alreadypaid);
            $('#exid').val(result.exchangeid);
            $("#paid").prop('checked', result.paid > 0),
            MaxExchangebyid(result.exchangeid);
            document.getElementById('btnInvoice').innerText = "Update";
            EnableControl();

            getPaidType(id);
        },
        error: function (errormessage) {
            toastr.error("Load Record Error", "Service Response");
        }
    });

}

function InvoiceDelete(id) {
    bootbox.confirm({
        title: "",
        message: "Are you sure want to delete this?",
        button: {
            cancel: {
                label: "Cancel",
                ClassName: "btn-default",
            },
            confirm: {
                label: "Delete",
                ClassName: "btn-danger"
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/api/InvoiceDelete/" + id,
                    type: "PUT",
                    contentType: "application/json;charset=utf-8",
                    datatype: "json",
                    success: function (result) {
                        tableInvoice.ajax.reload();
                        toastr.success("Invoice has been Deleted successfully!", "Service Response");

                    },
                    error: function (errormessage) {
                        toastr.error("This Invoice Cannot Delete from Database!", "Service Response");

                    }
                });
            }
        }
    });

}

function ClickAddnewInvoice() {
    $('#invoiceModel').modal('show');
    document.getElementById('invoiceno').disabled = true;
    document.getElementById('date').disabled = true;
    document.getElementById('customerid').disabled = true;
    document.getElementById('showroomid').disabled = true;

    document.getElementById('totalamount').disabled = false;
    document.getElementById('totalcarprice').disabled = false;
    document.getElementById('totalshipprice').disabled = false;
    document.getElementById('alreadypaid').disabled = false;
    document.getElementById('btnInvoice').innerText = "Add New";
    DisableControl();
    //ClearData();
    $('#invoiceno').val('0');
    $('#totalamount').val('0.00');
    $('#totalcarprice').val('0.00');
    $('#totalshipprice').val('0.00');
    $('#alreadypaid').val('0.00');
    $('#date').val('');
    $('#paid').val('');
    
    MaxExchange();


    products = [];
    cart = [];
    items = [];

}

function MaxExchange() {
    //Get Last Exchange
    $.ajax({
        url: "/api/ExchangeRates/?a=1&b=2",
        method: "GET",
        success: function (data) {
            //For Invoice Detail
            $("#exchangeid").val(data.rateid);
            $("#exchangeamount").text(data.rate);
            $("#rateforcal").val(data.rate);
            //alert(data.rate);
            //For Invoice
            $("#exid").val(data.rateid);
            $("#examount").text(data.rate);
            //console.log(data);
        },
        error: function (err) {
            toastr.error("no data record");
        }
    });

}

function MaxExchangebyid(id) {
    //Get Last Exchange
    $.ajax({
        url: "/api/ExchangeRates/"+ id,
        method: "GET",
        success: function (data) {
            $("#examount").text(data.rate);
            //alert(data.rate);
        },
        error: function (err) {
            toastr.error("no data record");
        }
    });

}

function PrintInvoice(id) {
    window.open("/customer-invoice/" + id, "_self")
}

function PrintReturn(id) {
    window.open("/customer-invoice-return/" + id, "_self")
}



function getMaxInvNo() {
    $.get("/api/Invoice/?a=1&b=2", function (data, status) {
        // alert("Data: " + data + "\nStatus: " + status);
        var arrayData = data.split(',');
        //alert(arrayData[0]);
        //alert(arrayData[1]);
        $('#invoiceno').val(arrayData[1]);
        $('#idnoformat').val(arrayData[0]);

    });
}

// For InvoiceDetail
function GetInvoiceDetail(id) {
    $('#invoicedetailModel').modal('show');
    document.getElementById('locationid').disabled = true;
    document.getElementById('productid').disabled = true;
    document.getElementById('employeeid').disabled = true;
    document.getElementById('deliverytype').disabled = true;
    document.getElementById('receiverphone').disabled = true;
    document.getElementById('paidtype').disabled = true;
    document.getElementById('price').disabled = true;
    document.getElementById('carprice').disabled = true;
    document.getElementById('shipprice').disabled = true;
    document.getElementById('status').disabled = true;
    document.getElementById('pricekh').disabled = true;
    document.getElementById('btnInvoiceDetail').innerText = "Add New";
    $('#invoiceid').val(id);
    MaxExchange();
    
    tableInvoice = $('#invoicedetailTable').DataTable({
        ajax: {
            url: "/api/InvoiceDetail/" + id,
            dataSrc: ""
        },
        columns: [
            //{
            //    data: "id"
            //},
            //{
            //    data: "invoiceid"
            //},
            {
                data: "location",
            },
            {
                data: "productname",
            },
            {
                data: "employeename",
            },
            {
                data: "receiverphone"
            },
            {
                data: "price"
            },
             {
                 data: "pricekh"
             },
            {
                data: "carprice"
            },
            {
                data: "shipprice"
            },
            {
                data: "status"
            },
             {
                 data: "deliverytype",
             },
            //{
            //    data: "createdate"
            //},
            {
                data: "id",
                render: function (data) {
                    return "<button onclick='GetComment(" + data + ")' class='btn btn-warning btn-xs' style='margin-right:5px;'>Comment</button>" + "<button onclick='InvoicedetailEdit(" + data + ")' class='btn btn-warning btn-xs' style='margin-right:5px;'>Edit</button>" + "<button onclick='InvoicedetailDelete(" + data + ")' class='btn btn-danger btn-xs'>Delete</button>";
                }
            }
        ],
        destroy: true,
        "order": [9, "asc"],
        "info": false
    });
}

function InvoiceDetailAction() {
    var action = '';
    var paidtype=0;
    action = document.getElementById('btnInvoiceDetail').innerText;
    if (action == "Add New") {
        document.getElementById('locationid').disabled = false;
        document.getElementById('productid').disabled = false;
        document.getElementById('employeeid').disabled = false;
        document.getElementById('deliverytype').disabled = false;
        document.getElementById('receiverphone').disabled = false;
        document.getElementById('paidtype').disabled = false;
        document.getElementById('price').disabled = false;
        document.getElementById('pricekh').disabled = true;
        document.getElementById('carprice').disabled = false;
        document.getElementById('shipprice').disabled = false;
        document.getElementById('status').disabled = false;
        document.getElementById('btnInvoiceDetail').innerText = "Save";
        $('#receiverphone').val(''),
        $('#price').val('0.00');
        $('#pricekh').val('0.00');
        $('#carprice').val('0.00');
        $('#shipprice').val('0.00');
        $('#pricekhmer').val('0.00');
        $("#paidtype").prop('checked', 0);
    } else if (action == "Save") {
        if ($("#paidtype").is(':checked')) {
            paidtype = 1;
        } else {
            paidtype = 0;
        }
        var dataOrder = {
            invoiceid: $('#invoiceid').val(),
            locationid: $('#locationid').val(),
            productid: $('#productid').val(),
            employeeid: $('#employeeid').val(),
            deliverytype: $('#deliverytype').val(),
            receiverphone: $('#receiverphone').val(),
            paidtype: paidtype,
            price: $('#price').val(),
            pricekh: $('#pricekh').val(),
            carprice: $('#carprice').val(),
            shipprice: $('#shipprice').val(),
            status: $('#status').val(),
        }

        //console.log(dataOrder);
        $.ajax({
            url: "/api/InvoiceDetail",
            type: "POST",
            data: JSON.stringify(dataOrder),
            contentType: "application/json",
            success: function (data) {
                toastr.success("InvoiceDetail has been created successfully.", "Server Response");
                //$('#invoicedetailModel').modal('hide');
                var table = $('#invoicedetailTable').DataTable();
                table.ajax.reload();
                document.getElementById('btnInvoiceDetail').innerText = "Add New";
            },
            error: function (err) {
                //console.log("False")
                toastr.error("Record Save Error");
            }
        });
    } else if (action == "Update") {
        if ($("#paidtype").is(':checked')) {
            paidtype = 1;
        } else {
            paidtype = 0;
        }
        var dataOrder = {
            id: $('#id').val(),
            invoiceid: $('#invoiceid').val(),
            locationid: $('#locationid').val(),
            productid: $('#productid').val(),
            employeeid: $('#employeeid').val(),
            deliverytype: $('#deliverytype').val(),
            receiverphone: $('#receiverphone').val(),
            paidtype: paidtype,
            price: $('#price').val(),
            pricekh: $('#pricekh').val(),
            carprice: $('#carprice').val(),
            shipprice: $('#shipprice').val(),
            status: $('#status').val(),
        }

        console.log(dataOrder);
        $.ajax({
            url: "/api/InvoiceDetail/" + dataOrder.id,
            type: "PUT",
            data: JSON.stringify(dataOrder),
            contentType: "application/json",
            success: function (data) {
                toastr.success("InvoiceDetail has been updated successfully.", "Server Response");

                //$('#invoiceModel').modal('hide');
                var table = $('#invoicedetailTable').DataTable();
                table.ajax.reload();
                document.getElementById('btnInvoiceDetail').innerText = "Add New";
            },
            error: function (err) {
                //console.log("False")
                toastr.warning("You don't have permission update Record!");
            }
        });
    }

}

function InvoicedetailEdit(id) {
    $('#invoicedetailModel').modal('show');
    document.getElementById('locationid').disabled = false;
    document.getElementById('productid').disabled = false;
    document.getElementById('employeeid').disabled = false;
    document.getElementById('deliverytype').disabled = false;
    document.getElementById('receiverphone').disabled = false;
    document.getElementById('paidtype').disabled = false;
    
    document.getElementById('carprice').disabled = false;
    document.getElementById('shipprice').disabled = false;
    document.getElementById('status').disabled = false;
    $.ajax({
        url: "/api/InvoiceDetail/?id=" + id + "&b=2",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#invoiceid').val(result.invoiceid);
            $("#locationid").val(result.locationid).change();
            $("#productid").val(result.productid).change();
            $('#employeeid').val(result.employeeid).change();
            $('#deliverytype').val(result.deliverytype).change();
            $('#receiverphone').val(result.receiverphone);
            $("#paidtype").prop('checked', result.paidtype > 0);
            if (result.paidtype > 0) {
                document.getElementById('pricekh').disabled = false;
                document.getElementById('price').disabled = true;
            } else {
                document.getElementById('price').disabled = false;
                document.getElementById('pricekh').disabled = true;
            };
            $('#price').val(result.price);
            $('#pricekh').val(result.pricekh);
            $('#carprice').val(result.carprice);
            $('#shipprice').val(result.shipprice);
            $('#status').val(result.status).change();
            //alert(result.id);
            //LoadPaymentDetail(result.id);
            document.getElementById('btnInvoiceDetail').innerText = "Update";
        },
        error: function (errormessage) {
            toastr.error("Load Record Error", "Service Response");
        }
    });

}

function InvoicedetailDelete(id) {
    bootbox.confirm({
        title: "",
        message: "Are you sure want to delete this?",
        button: {
            cancel: {
                label: "Cancel",
                ClassName: "btn-default",
            },
            confirm: {
                label: "Delete",
                ClassName: "btn-danger"
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/api/InvoiceDetail/" + id,
                    type: "DELETE",
                    contentType: "application/json;charset=utf-8",
                    datatype: "json",
                    success: function (result) {
                        tableInvoice.ajax.reload();
                        toastr.success("Invoice has been Deleted successfully!", "Service Response");

                    },
                    error: function (errormessage) {
                        toastr.warning("You don't have permission!", "Service Response");

                    }
                });
            }
        }
    });

}

function CloseForm() {
    var table = $('#tableInvoice').DataTable();
    table.ajax.reload();
}

function PaidKhmer(){
    // num1 = $('#pricekh').val();
    // num2 = $('#rateforcal').val();
    // totalr = num1 / num2;
    ////alert(toastr);
    //$("#price").val(totalr.toFixed(3));
}

function PaidDollar() {
    //num1 = $('#price').val();
    //num2 = $('#rateforcal').val();
    //totalr = num1 * num2;
    ////alert(toastr);
    //$("#pricekh").val(totalr.toFixed(3));
}

function PaidType() {
    if ($("#paidtype").is(':checked')) {
        document.getElementById('pricekh').disabled = false;
        document.getElementById('price').disabled = true;
        $('#price').val("0.00");
    } else {
        document.getElementById('pricekh').disabled = true;
        document.getElementById('price').disabled = false;
        $('#pricekh').val("0.00");
    }
}

$("#price").click(function () {
    $(this).select();
});

$("#pricekh").click(function () {
    $(this).select();
});

$("#carprice").click(function () {
    $(this).select();
});

$("#shipprice").click(function () {
    $(this).select();
});
//For Not yet Paid
function NotyetpaidAction() {

    tableInvoice = $('#tableNotyetpaid').DataTable({
        ajax: {
            url: "/api/Invoice/?a=1",
            dataSrc: ""
        },
        columns: [
            //{
            //    data: "id"
            //},
            {
                data: "invoiceno", render: function (data) {

                    return "DX" + ("000000" + data).slice(-6);
                }
            },
            {
                data: "date",
                render: function (data) {
                    return moment(new Date(data)).format('DD-MMM-YYYY');
                }
            },
            //{
            //    data: "customerid"
            //},
            {
                data: "customername",
            },
            //{
            //    data: "showroomid",
            //},
            //{
            //    data: "showroomname",
            //},
            //{
            //    data: "totalamount",
            //},
            //{
            //    data: "totalcarprice"
            //},
            //{
            //    data: "totalshipprice"
            //},
            //{
            //    data: "alreadypaid"
            //},
            //{
            //    data: "status"
            //},S
            //{
            //    data: "createby"
            //},
            //{
            //    data: "createdate"
            //},
            {
                data: "id",
                render: function (data) {
                    return "<button onclick='InvoiceMoveInsert(" + data + ")'  class='btn btn-success btn-xs pull-center' style='margin-right: 5px;'> Move</button>";
                }
            }
        ],
        destroy: true,
        "order": [0, "desc"],
        "info": false
    });


}

function InvoiceMoveInsert(id) {
    //alert(id);
    var dataOrder = {
        invoiceid: id
    }

    //console.log(dataOrder);
    $.ajax({
        url: "/api/Invoice_Move",
        type: "POST",
        data: JSON.stringify(dataOrder),
        contentType: "application/json",
        success: function (data) {
            toastr.success("Invoice has been move successfully.", "Server Response");
            var table = $('#tableInvoice').DataTable();
            table.ajax.reload();

        },
        error: function (err) {
            //console.log("False")
            toastr.warning("This Invoice Already Move!");
        }
    });
}

function getPaidType(id) {
    $.get("/api/Invoice/?a=" + id + "&b=2&c=3", function (data, status) {
        //alert("Data: " + data + "\nStatus: " + status);
        
        //alert(data[0]);
        //alert(arrayData[1]);
        //$('#invoiceno').val(arrayData[1]);
        //$('#idnoformat').val(arrayData[0]);

    });
}


//For Comment
var tableComment = [];

function GetComment(id) {
    $('#commentModel').modal('show');
    document.getElementById('ccomment').disabled = true;
    document.getElementById('btnComment').innerText = "Add New";
    //alert(id);
    $('#cinvoiceid').val(id);
    tableComment = $('#commentTable').DataTable({
        ajax: {
            url: "/api/comments/" + id,
            dataSrc: ""
        },
        columns: [
            {
                data: "comment",
            },
            {
                data: "createby",
            },
            {
                data: "id",
                render: function (data) {
                    return "<button onclick='CommentEdit(" + data + ")' class='btn btn-warning btn-xs' style='margin-right:5px;'>Edit</button>" + "<button onclick='CommentDelete(" + data + ")' class='btn btn-danger btn-xs'>Delete</button>";
                }
            }
        ],
        destroy: true,
        "order": [0, "asc"],
        "info": false
    });

}

function CommentAction() {
    var action = '';
    action = document.getElementById('btnComment').innerText;
    if (action == "Add New") {
        //check row count
        if (tableComment.data().count() === 0) {
            document.getElementById('ccomment').disabled = false;
            document.getElementById('btnComment').innerText = "Save";
            $('#ccomment').val('');
            $('#ccomment').focus();
        }else{
            toastr.error("Your cannot add more please update!");
        }

    } else if (action == "Save") {
        var dataOrder = {
            invoiceid: $('#cinvoiceid').val(),
            comment: $('#ccomment').val(),
        }

        //console.log(dataOrder);
        $.ajax({
            url: "/api/comments",
            type: "POST",
            data: JSON.stringify(dataOrder),
            contentType: "application/json",
            success: function (data) {
                toastr.success("Comment has been created successfully.", "Server Response");
                tableComment.ajax.reload();
                document.getElementById('btnComment').innerText = "Add New";
            },
            error: function (err) {
                toastr.error("Record Save Error");
            }
        });
    } else if (action == "Update") {
        var dataOrder = {
            id: $('#cid').val(),
            invoiceid: $('#cinvoiceid').val(),
            comment: $('#ccomment').val(),
        }
        //console.log(dataOrder);
        $.ajax({
            url: "/api/comments/" + dataOrder.id,
            type: "PUT",
            data: JSON.stringify(dataOrder),
            contentType: "application/json",
            success: function (data) {
                toastr.success("Comment has been updated successfully.", "Server Response");
                tableComment.ajax.reload();
                document.getElementById('btnComment').innerText = "Add New";
            },
            error: function (err) {
                //console.log("False")
                toastr.warning("You don't have permission update Record!");
            }
        });
    }

}

function CommentEdit(id) {
    $('#commentModel').modal('show');
    document.getElementById('ccomment').disabled = false;
    $.ajax({
        url: "/api/comments/?id=" + id + "&b=2",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            $('#cid').val(result.id);
            $('#cinvoiceid').val(result.invoiceid);
            $('#ccomment').val(result.comment);
            document.getElementById('btnComment').innerText = "Update";
        },
        error: function (errormessage) {
            toastr.error("Load Record Error", "Service Response");
        }
    });

}

function CommentDelete(id) {
    bootbox.confirm({
        title: "",
        message: "Are you sure want to delete this?",
        button: {
            cancel: {
                label: "Cancel",
                ClassName: "btn-default",
            },
            confirm: {
                label: "Delete",
                ClassName: "btn-danger"
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/api/comments/" + id,
                    type: "DELETE",
                    contentType: "application/json;charset=utf-8",
                    datatype: "json",
                    success: function (result) {
                        tableComment.ajax.reload();
                        toastr.success("Comment has been Deleted successfully!", "Service Response");

                    },
                    error: function (errormessage) {
                        toastr.warning("You don't have permission!", "Service Response");

                    }
                });
            }
        }
    });

}