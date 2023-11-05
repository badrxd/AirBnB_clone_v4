$( document ).ready( function () {
    ids = []
    amenities = []
    $('input').on( "change", function() {
        const id = $(this).attr("data-id")
        const amenity = $(this).attr("data-name")
        if (ids.includes(id)) {
            ids = ids.filter(item => item !== id);
            amenities = amenities.filter(item => item !== amenity);
        }else{
            ids.push(id)
            amenities.push(amenity)
        }
        $(".amenities h4").text(amenities.join(', '))
    })
})


$( document ).ready( function () {
    $.get('http://localhost:5001/api/v1/status/', function (data) {
        if (data?.status == "OK") {
            $( "div#api_status" ).addClass( "available" )
        }
        else{
            $("div#api_status").removeClass("available");
        }
    })
})