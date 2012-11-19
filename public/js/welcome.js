$(document).ready(function(){
  function screen2(){
    $('#welcome-sequence')
        .animate({opacity: 0}, 'slow', function(){
            $(this)
                .css({'background-image': 'url("/static/img/mobile_welcome_2.png")'})
                .animate({opacity: 1});
        });
    window.setTimeout(screen3, 1000);
  };
  function screen3(){
    $('#welcome-sequence')
        .css({'background-image': 'url("/static/img/mobile_welcome_3.png")'});
    window.setTimeout(screen4, 4000);
  };
  function screen4(){
    $('#welcome-sequence')
        .animate({opacity: 0}, 'slow', function(){
            $(this)
                .css({'background-image': 'url("/static/img/mobile_welcome_4.png")'})
                .animate({opacity: 1});
        });
    window.setTimeout(screen5, 2000);
  };
  function screen5(){
    $('#welcome-sequence')
        .css({'background-image': 'url("/static/img/mobile_welcome_5.png")'});
    window.setTimeout(screen6, 5000);
  };
  function screen6(){
    $('#welcome-sequence')
        .animate({opacity: 0}, 'slow', function(){
            $(this)
                .css({'background-image': 'url("/static/img/mobile_welcome_6.png")'})
                .animate({opacity: 1});
        });
    redrawSkipButton();
  };
  window.setTimeout(screen2, 5000);

  function redrawSkipButton(){
    $('#skip-sequence')
        .html('')
        .css({'background-image': 'url("/static/img/start_pestering.png")',
              'width': '210px',
              'height': '50px',
              'background-size': '220px 50px',
              'margin': 'auto'});
  }

  $('#skip-sequence').click(function(){
    $.cookie('showInstructions', false);
    window.location.replace('/');
  });
});

