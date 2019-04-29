function signIn(){
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result){
  var token = result.credential.accessToken;
  var user = result.user;
  window.location.href = '#settings';
}).catch(function(error){
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
}

function signOut(){
  firebase.auth().signOut().then(function(){
    console.log("Signed Out First");
  }).catch(function(error){
    console.log("Failed");
  });
}

function isUserSignIn(){
  return !!firebase.auth().currentUser;
}

function validateEmail(email){
//  var email = $("#email").val();
  var emailError = "";
  if(email.length == 0 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    emailError+="Please enter a valid email\n";
  }
    return emailError;
}

var constraints = {
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  }
}

function validateSignUpPassword(){
  var user_password = $("#password").val();
  var result = validate({password: user_password}, constraints)
  console.log(result);
  alert(result.password);
}


function validatePassword(password){
  //var password = $("#password").val();
  var passwordError = "";
  if(password.length == 0){
    passwordError+="Please enter a password\n";
  }
  else if(password.length < 6){
    passwordError+="Password too short\n";
  }
    return passwordError;
}

function validateLogin(){
  var loginError = "";
  var password = $("#password").val();
  var email = $("#email").val();
  loginError += validatePassword(password);
  loginError += validateEmail(email);
  if(loginError != ""){
    console.log(loginError);
    navigator.notification.alert(loginError, function(){}, "Invalid Login Details");
  }else{
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(){window.location.href = '#settings'}).catch(function(error){
      alert("You don't exist");
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
}

function signUp(){
  var signUpError = "";
  var displayname = $('#first_name').val() + " " + $('#last_name').val();
  var email = $('#sign_email').val();
  signUpError+=validateEmail(email);
  var password = $('#sign_password').val();
  signUpError+=validatePassword(password);
  var confirmpassword = $('#confirm_password').val();
  if(password != confirmpassword){
    signUpError += "Passwords dont match";
  }
  if(signUpError != ""){
    navigator.notification.alert(signUpError, function(){}, "Sign Up Error");
  }else{
  firebase.auth().createUserWithEmailAndPassword(email, password).then(pageTwo).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  })
}}

 function setUsername(){
   var user = firebase.auth().currentUser;
   var name = $('#username').val();
   user.updateProfile({
     displayName : name
   }).then(function(){
     window.location.hash = '#settings';
     window.location.reload(true);
   }).catch(function(error){});
 }

 function pageTwo(){
  $('#sign_email').hide();
  $('#sign_password').hide();
  $('#confirm_password').hide();
  $('#signUpButton').hide();
  $('#username').show();
  $('#usernameButton').show();
}

 /*function setProfilePicture(){
   var user = firebase.auth().currentUser;
   var name = $('#imageAttachments').attr('src');
   user.updateProfile({
     photoURL : name
   }).then(pageThree).catch(function(error){});
 }*/
