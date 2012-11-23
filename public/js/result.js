/*
 * Logic for results page.
 */

$(document).ready(function() {
  /*
   * Handle click on letters naviation dot.
   */
  $('#ctrl-letters').bind("click" , function (){
    clearFocus();
    setFocus(this);
    hideElement('board-img');
    showElement('board-letters');
  });

  /*
   * Handle click on board navigation dot.
   */
  $('#ctrl-board').bind("click" , function (){
    clearFocus();
    setFocus(this);
    hideElement('board-letters');
    showElement('board-img');
  });

  /*
   * Handle click on all letters tab.
   */
  $('#btn-entire-set').bind("click" , function (){
    highlightLetterFilterButton(this);
    $('#filter').val('');
    populateResultList();
    $('.filter').addClass('no-display');
    $('.word-count').addClass('bump-down');
  });

  /*
   * Handle click on "specific letters" tab.
   */
  $('#btn-specific-letters').bind("click" , function (){
    highlightLetterFilterButton(this);
    $('.filter').removeClass('no-display');
    $('.word-count').removeClass('bump-down');
  });

  /*
   * Update the list of words when a user enters letters.
   */
  $('#filter').bind("change" , function (){
    populateResultList();
  });

  var mobileWidth = 480;
  var width = $(window).width();

  if (width <= mobileWidth) {
    $(window).scrollTop(1);
  }

  /*
   * Highlight the selected word and all letters that could be
   * used in board to spell the word in the game.
   * NOTE: Currently highlighting a letter more than once
   * even if it is not used more than once in the spelling of the
   * word - THIS IS DONE ON PURPOSE since we don't have an opinion
   * (currently) about which letter is "best" in the context of
   * #winning!
   */
  function bindWordListClicks() {
    $('.result-list ul li span').bind('click', function(){
      unhighlight();
      var word = $(this).text();
      for (i in word){
        var letter = word[i];
        $('.board-letters tr td').each(function(i){
          var cell = $($('.board-letters tr td')[i]);
          if (!cell.hasClass('highlighted')) {
            var cellLetter = $.trim(cell.text().toLowerCase());
            if (letter === cellLetter) {
              cell.addClass('highlighted');
            }
          }
        });
      }
      $(this).addClass('highlighted');
    });
  }
  bindWordListClicks();

  function unhighlight(){
    $('.result-list ul li span').removeClass('highlighted');
    $('.board-letters tr td').each(function(i){
      var cell = $($('.board-letters tr td')[i]);
      cell.removeClass('highlighted');
    });
  }

  function populateResultList(){
    var searchTerm = $('#filter').val().toLowerCase();
    var filtered = _.filter(words, function(word){
      return word.toLowerCase().indexOf(searchTerm) !== -1;
    });
    $('.result-list').html('<ul>' + createListItems(filtered) + '</ul>');
    bindWordListClicks();
    $('#word-count').text(filtered.length);
  }

  function createListItems(list){
    var ret = '';
    for (var i = 0; i < list.length; i++){
      var elem = list[i];
      ret += '<li><span>' + elem + '</span></li>';
    }
    return ret;
  }

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

  function highlightLetterFilterButton(elem){
    $('.results .letter-filter').find('.btn-filter').removeClass('focus');
    $('#' + elem.id).addClass('focus');
  }
});
