$( document ).ready( function () {
    let ids = []
    let amenities = []
    
    const States = {
        states:{
            ids:[],
            names:[]
        },
        ceties:{
            ids:[],
            names:[]
        },
    }
    function get_info(data) {
        data.forEach((e, i) => {
            $("section.places").append(
            $("<article></article>").html(`
            <div class="title_box">
              <h2>${e.name}</h2>
              <div class="price_by_night">${e.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${e.max_guest} Guest${e.max_guest != 1 ? "s": ""}</div>
                  <div class="number_rooms">${e.number_rooms} Bedroom${e.number_rooms != 1 ? "s": "" }</div>
                  <div class="number_bathrooms">${e.number_bathrooms} Bathroom${e.number_bathrooms != 1 ? "s": ""}</div>
            </div>
            <div class="description">
              ${e.description}
            </div>
            `))
        });
    }
    $('.in_amenities').on( "change", function() {
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
    
    $('.in_states').on( "click", function() {
        const id = $(this).attr("data-id")
        const name = $(this).attr("data-name")
        if (States.states.ids.includes(id)) {
            States.states.ids = States.states.ids.filter(item => item !== id);
            States.states.names = States.states.names.filter(item => item !== name);
        }else{
            States.states.ids.push(id)
            States.states.names.push(name)
        }
        const length = {
            state:States.states.names.length,
            city:States.ceties.names.length
        }
        if (length.state == 0 && length.city > 0) {
            $(".locations h4").text(States.ceties.names.join(', '))
        }
        else{
            $(".locations h4").text(States.states.names.join(', '))
        }
    })

    $('.in_cities').on( "click", function() {
        const id = $(this).attr("data-id")
        const name = $(this).attr("data-name")
        if (States.ceties.ids.includes(id)) {
            States.ceties.ids = States.ceties.ids.filter(item => item !== id);
            States.ceties.names = States.ceties.names.filter(item => item !== name);
        }else{
            States.ceties.ids.push(id)
            States.ceties.names.push(name)
        }
        const length = {
            state:States.states.names.length,
            city:States.ceties.names.length
        }
        if (length.city == 0 && length.state > 0) {
            $(".locations h4").text(States.states.names.join(', '))
        }
        else{
            $(".locations h4").text(States.ceties.names.join(', '))
        }
    })

    $.get('http://localhost:5001/api/v1/status/', function (data) {
        if (data?.status == "OK") {
            $( "div#api_status" ).addClass( "available" )
        }
        else{
            $("div#api_status").removeClass("available");
        }
    })

    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'post',
        data: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            get_info(data)
        }
    });

    $('.filters button').on( "click", function() {
        $.ajax({
            type: "post",
            url: "http://localhost:5001/api/v1/places_search/",
            data: JSON.stringify({'states':States.states.ids, 'cities':States.ceties.ids,'amenities':ids}),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data) {
                $("section.places").empty();
                get_info(data)
            }
        });
    })
})