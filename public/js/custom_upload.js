$(document).ready(function() {
  $('#upload').bind("click" , function (){
    $('#upload-real').click();
  });
  $('#upload-real').bind("change", function(){
    console.log("file picked :/");
    $('#submit-file').click();
  });
});

