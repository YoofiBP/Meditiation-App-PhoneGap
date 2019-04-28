document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  alert('Working');
  $('#username').hide();
$('#usernameButton').hide();
$('#profileComplete').hide();
$('#share_with_contact').click(pickContact);
$("#cameraButton").click(takePicture);
$('#share_with_media').click(buttonShare);
$('#geolocation').click(getposition);
$('#weather').click(getWeatherLocation);
}

function pickContact(){
  navigator.contacts.pickContact(function (contact) {
      // alert(JSON.stringify(contact.phoneNumbers[0].value));
      var phoneNumber = contact.phoneNumbers[0].value;
      console.log(contact.phoneNumbers[0].value);
      //array = 'Best Coach: ' + data[0]['best_coach'] + '\n' + 'Best Striker: ' + data[0]['best_striker'] + '\n' + 'Best Defender: ' + data[0]['best_defender'] + '\n' + 'Best Midf-ielder: ' + data[0]['best_middle'] + '\n'
      var message = "Checkout Calm Mind on the appStore";
      window.plugins.socialsharing.shareViaSMS(message, phoneNumber, function(msg) {console.log('ok: ' + msg)}, function(msg) {navigator.notification.alert(
        msg,
        function(){},
        alert("Error"));})
  }, function (err) {
      alert('Error: ' + err);
  });
}

function takePicture(){
  navigator.camera.getPicture(onCameraSuccess,onCameraFail,{
  quality: 50,
  destinationType: Camera.DestinationType.FILE_URI,
  sourceType: Camera.PictureSourceType.CAMERA,
  encodingType: Camera.EncodingType.JPEG
});}

function pickPicture(){
  navigator.camera.getPicture(onCameraSuccess,onCameraFail,{
  quality: 50,
  destinationType: Camera.DestinationType.FILE_URI,
  sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
  encodingType: Camera.EncodingType.JPEG
});}

function onCameraSuccess(imageURI){
  $('#imageAttachments').attr('src',imageURI);
  console.log($('#imageAttachments').attr('src'));
}

function onCameraFail(message){
  console.log(message);
}

function buttonShare(){
  var message = "Checkout Calm Mind on the appStore";
  window.plugins.socialsharing.share(message);
}


var onSuccess = function(position) {
  navigator.notification.alert(
    'Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n',
    function(){},
    "Your current location");
};

function onError(error) {
  navigator.notification.alert(
    'code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n',
    function(){},
    "Failed to get weather");
}

function getposition(){
navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


function getWeatherLocation() {
    navigator.geolocation.getCurrentPosition
    (onWeatherSuccess, onWeatherError, { enableHighAccuracy: true });
}

var onWeatherSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    console.log(Latitude);
    console.log(Longitude);
    getWeather(Latitude, Longitude);
}

// Get weather by using coordinates

function getWeather(latitude, longitude) {

    // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
    var OpenWeatherAppKey = "96e7ff24a18c73acb06403e14bc0b88c";

    var queryString =
      'http://api.openweathermap.org/data/2.5/weather?lat='
      + "35" + '&lon=' + "139" + '&appid=' + OpenWeatherAppKey + '&units=imperial';

    $.getJSON(queryString, function (results) {

        if (results.weather.length) {

            $.getJSON(queryString, function (results) {

                if (results.weather.length) {
                    console.log(results.name);
                    console.log(results.main.temp);
                    console.log(results.main.speed);
                    $('#description').text("Location: " + results.name);
                    $('#temp').text("Temperature in Fahrenheit: "+ results.main.temp);
                    $('#wind').text("Wind speed: "+ results.wind.speed);
                    $('#humidity').text("Humidity: " + results.main.humidity);
                    $('#visibility').text("Visibility: " +results.weather[0].main);

                    var sunriseDate = new Date(results.sys.sunrise);
                    $('#sunrise').text(sunriseDate.toLocaleTimeString());

                    var sunsetDate = new Date(results.sys.sunrise);
                    $('#sunset').text(sunsetDate.toLocaleTimeString());
                }

            });
        }
    }).fail(function () {
        alert("error getting location");
    });
    window.location.href = '#weather';
}

// Error callback

function onWeatherError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
