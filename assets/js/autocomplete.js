google.maps.event.addDomListener(window, 'load', function () {
    var places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'));
    google.maps.event.addListener(places, 'place_changed', function () {
        var place = places.getPlace();
        var address = place.formatted_address;
        var location = place.geometry.location;
        var lat = location.lat();
        var lon = location.lng();

        var locationName = document.getElementById('location_name');
        var locationText = document.getElementById('location');
        var latText = document.getElementById('lat');
        var lonText = document.getElementById('lon');

        locationName.textContent = address;
        locationText.textContent = location;
        latText.textContent = lat;
        lonText.textContent = lon;

        getTides(lat, lon);
    });
});
