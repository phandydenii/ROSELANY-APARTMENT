$(document).ready(function () {
    //$('#GuestModal').on('show.bs.modal', function () {
    //});
    GetGuest();

});

var tableGuest = [];
function GetGuest() {
    tableGuest = $('#tableGuest').DataTable({
        ajax: {
            url: "/api/Guests",
            dataSrc: ""
        },
        columns: [
            {
                data: "id",
            },
            {
                data: "name"
            },
            {
                data: "namekh"
            },
            {
                data: "sex"
            },
            {
                data: "dob",
                render: function (data) {
                    return moment(new Date(data)).format('DD-MMM-YYYY');
                }
            },
            {
                data: "address"
            },
            {
                data: "phone"
            },
            {
                data: "email"
            },
            {
                data: "status"
            },
            {
                data: "id",
                render: function (data) {
                    return "<div class='btn-group'><a href='#' class='btn btn-primary btn-xs'><span class='glyphicon glyphicon-cog'></span> Action</a><a href='#' class='btn btn-primary btn-xs dropdown-toggle' data-toggle='dropdown' aria-expanded='false'><span class='caret'></span></a>"
                                   + "<ul class='dropdown-menu'>"
                                     + "<li>"
                                        + "<button onclick='GuestEdit(" + data + ")' class='btn btn-warning btn-xs' style='border-width: 0px; width: 65px; margin-right: 5px;margin-top:5px'><span class='glyphicon glyphicon-edit'></span> Edit</button>"
                                        + "<button onclick='GuestHistory(" + data + ")' class='btn btn-success btn-xs' style='border-width: 0px;margin-top:5px'><span class='glyphicon glyphicon-list-alt'></span> History</button>"
                                        
                                     + "</li>"
                                   + "</ul>"
                              + "</div>"
                    ;
                },
                "width": "130px"
            }
        ],
        destroy: true,
        "info": false
    });
}

var tableHistory = [];
function GuestHistory(id) {
    $('#HistoryModal').modal('show');
    tableHistory = $('#tableHistory').dataTable({
        ajax: {
            url: "/api/invoice_v_by_guestid/"+id,
            dataSrc: ""
        },
        columns:
            [
                {
                    data: "startdate",
                    render: function (data) {
                    return moment(new Date(data)).format('DD-MMM-YYYY');
                }
                },
                {
                    data: "enddate",
                    render: function (data) {
                    return moment(new Date(data)).format('DD-MMM-YYYY');
                    }
                },
                {
                    data: "waterusage",
                    render: function (data) {
                        return data.toFixed(2);
                    }
                },
                {
                    data: "electricusage",
                    render: function (data) {
                        return data.toFixed(2);
                    }
                },
                {
                    data: "wtotal",
                    render: function (data) {
                        return data.toFixed(2);
                    }
                },
                {
                    data: "etotal",
                    render: function (data) {
                        return data.toFixed(2);
                    }
                },
                {
                    data: "grandtotal",
                    render: function (data) {
                        return data.toFixed(2);
                    }
                },
                {
                    data: "id",
                    
                    render: function (data) {
                        
                            return "<button OnClick='OnEditRoom (" + data + ")' class='btn btn-warning btn-xs' style='margin-right:5px'><span class='glyphicon glyphicon-edit'></span></button>"
                            + "<button OnClick='OnDeleteRoom (" + data + ")' class='btn btn-danger btn-xs' style='margin-right:5px'><span class='glyphicon glyphicon-trash'></span></button>"
                        ;
                        
                    }
                }
            ],
        destroy: true,
        "order": [[0, "asc"]],

    });
}


function UpdateGuest() {
    var action = '';
    action = document.getElementById('btnSaveGuest').innerText;
    if (action == "Save") {
        var data = {
            firstname: $('#fname').val(),
            lastname: $('#lname').val(),
            fullname: $('#fullname').val(),
            sex: $('#gender').val(),
            dob: $('#dob').val(),
            address: $('#address').val(),
            nationality: $('#nationality').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            note: $('#note').val(),
            status: $('#status').val(),
        };
        $.ajax({
            url: "/api/Guests",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                toastr.success("Save to database successfully.", "Server Response");
                $('#tableGuest').DataTable().ajax.reload();

                $('#GuestModal').modal('hide');
                document.getElementById('btnSaveGuest').innerText = "Add New";
            },
            error: function (errormessage) {
                toastr.error("This Guest is already exists.", "Server Response");
            }
        });
    }
    else if (action == "Update") {
        var data = {
            id: $('#guestid').val(),
            name: $('#name').val(),
            namekh: $('#namekh').val(),
            sex: $('#sex').val(),
            dob: $('#dob').val(),
            address: $('#address').val(),
            nationality: $('#nationality').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            ssn: $('#ssn').val(),
            passport: $('#passport').val(),
            status: $('#status').val(),
        };
        $.ajax({
            url: "/api/Guests/" + data.id,
            data: JSON.stringify(data),
            type: "PUT",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                window.location.reload(true);
                toastr.success("Updated successfully.", "Server Response");
            },
            error: function (errormessage) {
                toastr.error("This Guest can't Update.", "Server Response");

            }
        });
    }
}


function GuestEdit(id) {
    alert(id);
    $("#GuestModal").modal('show');
    $.ajax({
        url: "/api/Guests/" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#guestid').val(result.id);
            $('#name').val(result.name);
            $('#namekh').val(result.namekh);
            $('#sex').val(result.sex);
            var dr = moment(result.dob).format("YYYY-MM-DD");
            $("#dob").val(dr);
            $('#address').val(result.address);
            $('#nationality').val(result.nationality);
            $('#phone').val(result.phone);
            $('#email').val(result.email);
            $('#ssn').val(result.ssn);
            $('#passport').val(result.passport);
            $('#status').val(result.status);  
        },
        error: function (errormessage) {
            toastr.error("Something unexpected happen.", "Server Response");
        }
    });
    return false;
}
function GuestDelete(id) {
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
                    url: "/api/Guests/" + id,
                    type: "DELETE",
                    contentType: "application/json;charset=utf-8",
                    datatype: "json",
                    success: function (result) {
                        $('#tableGuest').DataTable().ajax.reload();

                        toastr.success("Guest Deleted successfully!", "Service Response");
                    },
                    error: function (errormessage) {
                        toastr.error("Guest Can't be Deleted", "Service Response");
                    }
                });
            }
        }
    });
}



function DisableControll() {
    document.getElementById('fname').disabled = true;
    document.getElementById('lname').disabled = true;
    document.getElementById('fullname').disabled = true;
    document.getElementById('gender').disabled = true;
    document.getElementById('dob').disabled = true;
    document.getElementById('address').disabled = true;
    document.getElementById('nationality').disabled = true;
    document.getElementById('phone').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('note').disabled = true;
    document.getElementById('status').disabled = true;


}

function EnableControlGuest() {
    document.getElementById('fname').disabled = false;
    document.getElementById('lname').disabled = false;
    document.getElementById('fullname').disabled = false;
    document.getElementById('gender').disabled = false;
    document.getElementById('dob').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById('nationality').disabled = false;
    document.getElementById('phone').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('note').disabled = false;
    document.getElementById('status').disabled = false;
}

function ClearControlGuest() {
    $('#fname').val('');
    $('#lname').val('');
    $('#fullname').val('');
    $('#gender').val('');
    $('#dob').val('');
    $('#address').val('');
    $('#nationality').val('');
    $('#phone').val('');
    $('#email').val('');
    $('#gender').val('');
    $('#note').val('');
    $('#status').val('');
}

function AddnewGuestAction() {
    document.getElementById('btnSaveGuest').innerText = "Add New";
    ClearControlGuest();
}
function CloseHistory() {
    window.location.reload(true);
}
function CloseGuest() {
    window.location.reload(true);
}
