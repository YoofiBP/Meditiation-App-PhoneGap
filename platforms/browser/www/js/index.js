document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  alert('Working');
  $('#username').hide();
$('#usernameButton').hide();
$('#profileComplete').hide();
//$('#share_with_contact').click(pickContact);
var options = new ContactFindOptions();
options.filter = "";          // empty search string returns all contacts
options.multiple = true;      // return multiple results
filter = ["displayName", "name"];   // return contact.displayName
$('share_with_contact').click(function(){navigator.contacts.find(filter, onSuccess, onError, options)});
}

// onSuccess: Get a snapshot of the current contacts

function onSuccess(contacts) {
       for (var i = 0; i < contacts.length; i++) {
            console.log("Display Name = " + contacts[i].displayName);
        }
}

// onError: Failed to get the contacts

function onError(contactError) {
     alert('onError!');
}
/*function pickContact(){
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
}*/
