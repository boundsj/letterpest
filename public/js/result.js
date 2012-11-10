$(document).ready(function() {
  $('#ctrl-letters').bind("click" , function (){
    clearFocus();
    setFocus(this);
    hideElement('board-img');
    showElement('board-letters');
  });
  $('#ctrl-board').bind("click" , function (){
    clearFocus();
    setFocus(this);
    hideElement('board-letters');
    showElement('board-img');
  });

  function clearFocus(){
    $('.results .controller').find('.circle').removeClass('focus');
  }
  function setFocus(elem){
    $('#' + elem.id).addClass('focus');
  }
  function hideElement(elem){
    $('.' + elem).addClass('no-display');
  }
  function showElement(elem){
    $('.' + elem).removeClass('no-display');
  }

});
