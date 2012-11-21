$(document).ready(function(){
  var mobileWidth = 480;
  var width = $(window).width();
  var showInstructions = $.cookie('showInstructions') || true;

  /*
   * Redirect to instructions page if required.
   */
  (function routeToInstructions(){
    if (width <= mobileWidth && showInstructions === true) {
      window.location.replace('/instructions');
    }
  })();

  if (width <= mobileWidth) {
    $(document).scroll(60);
  } 
});

