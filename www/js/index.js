document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  $('#username').hide();
$('#usernameButton').hide();
$('#profileComplete').hide();
$('#share_with_contact').click(pickContact);
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
        "Error");})
  }, function (err) {
      console.log('Error: ' + err);
  });
}
