$(document).ready(function(){
  function screen2(){
    $('#welcome-sequence')
        .animate({opacity: 0, 'background-color': '#fff'}, 'slow', function(){
            $(this)
                .css({'background-image': 'url("/static/img/mobile_welcome_2.png")'})
                .animate({opacity: 1});
        });
    window.setTimeout(screen3, 5000);
  };
  function screen3(){
    $('#welcome-sequence')
        .animate({opacity: 0, 'background-color': '#fff'}, 'fast', function(){
            $(this)
                .css({'background-image': 'url("/static/img/mobile_welcome_3.png")'})
                .animate({opacity: 1});
        });
    window.setTimeout(screen4, 5000);
  };
  function screen4(){
    $('#welcome-sequence')
        .animate({opacity: 0, 'background-color': '#fff'}, 'slow', function(){
            $(this)
                .css({'background-image': 'url("/static/img/mobile_welcome_4.png")'})
                .animate({opacity: 1});
        });
    window.setTimeout(screen5, 5000);
  };
  function screen5(){
    $('#welcome-sequence')
        .animate({opacity: 0, 'background-color': '#fff'}, 'fast', function(){
            $(this)
                .css({'background-image': 'url("/static/img/mobile_welcome_5.png")'})
                .animate({opacity: 1});
        });
    window.setTimeout(screen6, 5000);
  };
  function screen6(){
    $('#welcome-sequence')
        .animate({opacity: 0, 'background-color': '#fff'}, 'slow', function(){
            $(this)
                .css({'background-image': 'url("/static/img/mobile_welcome_6.png")'})
                .animate({opacity: 1});
            redrawSkipButton();
        });
  };
  window.setTimeout(screen2, 5000);

  function redrawSkipButton(){
    $('#skip-sequence')
        .html('Start Pestering')
        .css({'background': '#e60168',
              'color': '#ffffff',
              'line-height': '48px',
              'text-transform': 'uppercase',
              'width': '210px',
              'height': '50px',
              'margin': '0 auto 30px'});
  }

  $('#skip-sequence').click(function(){
    $.cookie('showInstructions', false);
    window.location.replace('/');
  });
});

