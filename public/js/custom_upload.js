$(document).ready(function() {
  $('#upload').bind("click" , function (){
    $('#upload-real').click();
  });
  $('#upload-real').bind("change", function(){
    console.log("file picked :/");
    $('.title_main').hide();
    $('.mouse_main').hide();
    $('.inst_main').hide();
    $('#upload').replaceWith($('.spinner').show());
    $('#submit-file').click();
  });
});

