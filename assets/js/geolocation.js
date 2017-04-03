if (navigator.geolocation) {
    window.onload = function() {
      var tidesNode = document.getElementById("tides");
      while (tidesNode.firstChild) {
          tidesNode.removeChild(tidesNode.firstChild);
      };

      var spinner = document.getElementById('spinner');
      spinner.style.display = 'inline-block';

      id = navigator.geolocation.watchPosition(function (position) {
        var coords = position.coords;
        var geocoder = new google.maps.Geocoder();
        var pos = new google.maps.LatLng(coords.latitude, coords.longitude);
        var station = ''

        getTides(coords.latitude, coords.longitude);

        geocoder.geocode({'latLng': pos}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            navigator.geolocation.clearWatch(id);
            let addressComponents = results[0].address_components
            if (addressComponents) {
              addressComponents.forEach((component)=>{
                let componentType = component.types[0].trim()
                if (componentType === 'postal_town') {
                  station = component.long_name;
                }
                if ((componentType === 'locality') && (station==='')) {
                  station = component.long_name;
                }
                if((componentType === 'administrative_area_level_1') && (station==='')) {
                  station = component.long_name
                }
                if((componentType ===  'administrative_area_level_2') && (station==='')) {
                  station = component.long_name
                }
              })
            }
            document.getElementById('txtPlaces').value = station
          } else {
            geocode.textContent = 'unavailable (' + status + ')';
          }
      });
    }, function (error) {
    }, {
            enableHighAccuracy: true,
            timeout: 30 * 1000,        // 30 secs
            maximumAge: 5 * 60 * 1000, // 5 mins
        });
    };
} else {
    alert('Sorry! Your browser does not support geolocation. Please use the search box.');
}
