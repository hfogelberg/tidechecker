var  latText = document.getElementById('lat');
var lonText = document.getElementById('lon');
var locationText = document.getElementById('location_name');

if (navigator.geolocation) {
    window.onload = function() {
      navigator.geolocation.watchPosition(function (position) {

        var coords = position.coords;
        latText.textContent = coords.latitude.toFixed(2);
        lonText.textContent = coords.longitude.toFixed(2);

        getTides(coords.latitude, coords.longitude);

        var geocoder = new google.maps.Geocoder();
        var pos = new google.maps.LatLng(coords.latitude, coords.longitude);

        geocoder.geocode({'latLng': pos}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results.length && results[0].formatted_address) {
              locationText.textContent = results[0].formatted_address;
            }
          } else {
            geocode.textContent = 'unavailable (' + status + ')';
          }
      });
    }, function (error) {
      alert('Error ' + error)
    }, {
            enableHighAccuracy: true,
            timeout: 30 * 1000,        // 30 secs
            maximumAge: 5 * 60 * 1000, // 5 mins
        });
    };
} else {
    alert('Sorry! Your browser does not support geolocation.');
}
