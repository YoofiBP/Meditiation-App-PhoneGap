var storage = firebase.storage();
var storageRef = storage.ref();
var db = firebase.firestore();
//$('#topicButton').click(listVideos($('#anotherSelect :selected').val()));
$('#anotherSelect').change(function(){
  $('.videos').empty();
  var topic  = $('#anotherSelect :selected').text();
  db.collection("videos").where("title", "==", topic).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          $(".videos").append(doc.data().link);
          $(".videos").append(doc.data().title);
      });
  })
})

function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1);
   return base;
 }

$('#add_entry').click(function(){
  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth();
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var mins = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var dateString = date + "/" +(month + 1) + "/" + year + " @ " + hours + ":" + mins + ":" + seconds;
  var title = $('#journal_title').val();
  var content = $('#journal_post').val()
  if(title == "" || content == ""){
    navigator.notification.alert(
      "You need a title and content",
      function(){},
      "Invalid Post");
  }else{
  var user = firebase.auth().currentUser;
  var imageData = $('#imageAttachments').attr('src');
  //imageData = "file:///storage/emulated/0/Android/data/com.adobe.phonegap.app/cache/1556381509565.jpg";
  if(imageData!=undefined){
  var imagebaseName = baseName(imageData);
  console.log(imagebaseName);
  var getFileBlob = function(url, cb) {
         var xhr = new XMLHttpRequest();
         xhr.open("GET", url);
         xhr.responseType = "blob";
         xhr.addEventListener('load', function() {
             cb(xhr.response);
         });
         xhr.send();
     };

     var blobToFile = function(blob, name) {
         blob.lastModifiedDate = new Date();
         blob.name = name;
         return blob;
     };

     var getFileObject = function(filePathOrUrl, cb) {
          getFileBlob(filePathOrUrl, function(blob) {
              cb(blobToFile(blob, 'test.jpg'));
          });
      };

      getFileObject(imageData, function(fileObject) {
        console.log(fileObject);
          var uploadTask = storageRef.child('images/'+imagebaseName).put(fileObject);

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
              console.log(snapshot);
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   console.log('Upload is ' + progress + '% done');
          }, function(error) {
              console.log(error.code);
          }, function() {
              var downloadURL = uploadTask.snapshot.downloadURL;
              console.log("downloadURL" + downloadURL);
              // handle image here
          });
      });
    }
  db.collection('entries').add({
    title: $('#journal_title').val(),
    content: $('#journal_post').val(),
    userid: user.uid,
    date: dateString,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(function(docRef){
    window.location.hash = '#journal';
    window.location.reload(true);
  }).catch(function(error){
    console.log(error);
  });
}})
