$(document).on('place_located', function(e, place) {
    var p = {
        name: place.formatted_address,
        latitude: place.geometry.location.A,
        longtitude: place.geometry.location.F,
        address: place.address_components
    };
    sendPlaceToLog(p);
});

$('table.locationCollection').on('click', '.removeRecord', function(e) {
    e.preventDefault();

    var oid = $(this).data('srcid');
    var trElement = $(this).closest('tr');
    $.ajax({
        url: '/removelog',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({id: oid}),
        method: 'POST',
        success: function (resp) {
            console.log(resp);
            trElement.remove();
        }
    });
});

function sendPlaceToLog(place) {
    $.ajax({
        url: '/loggin',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(place),
        method: 'POST',
        success: function (resp) {
            console.log(resp);
            if (resp.status == 'success') {
                addLocationToTable(resp.place);
            }
        }
    });
}

function addLocationToTable(place) {

    var newId = parseInt($('tr.locationRecord:last td:first').text()) + 1;

    var newRow = '<tr><td>' + newId + '</td><td>' + place.name +
        '<table class="table"><tbody><tr><td class="bg-primary">Latitude</td><td>' + place.latitude +
        '</td><td class="bg-primary">Longtitude</td><td>' + place.longtitude +
        '</td></tr></tbody></table></td><td class="btn removeRecord" data-srcid="' + place._id +
        '"><i class="glyphicon glyphicon-remove-circle"></i></td></tr>';
    $(newRow).appendTo($('table.locationCollection >tbody'));
}
