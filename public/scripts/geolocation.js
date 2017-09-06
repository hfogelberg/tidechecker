
function getLocation() {
  if (navigator.geolocation) {
    var ic = document.getElementById('index-content');
    var ie = document.getElementById('index-title');
    ic.style.display = 'none';
    ie.style.display = 'none';
    var spinner = document.getElementById('spinner-container');
    spinner.style.display = 'inline-block';

      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        handleGeoData(lat, lon);
      });
    } else { 
      handleNoGeolocation(true)
  }
}

function handleGeoData(lat, lon) {
  var url = "/tides/"+lat+"/"+lon;
  window.location.replace(url);
}

function handleNoGeolocation(errFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
  alert(content);
}