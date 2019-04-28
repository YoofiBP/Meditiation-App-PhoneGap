document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  alert('Working');
  $('#username').hide();
$('#usernameButton').hide();
$('#profileComplete').hide();
$('#share_with_contact').click(pickContact);
$("#cameraButton").click(takePicture);
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
