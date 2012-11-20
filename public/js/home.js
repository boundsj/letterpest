



var setNumber = function(div, num){

  var numdivs = $(div+" .number").toArray();

  num = num.toString().split("");
  
  num.reverse();
//  numdivs.reverse();

  for(n in num){
    console.log(num[n]);
    $(numdivs[n]).css({"top":"-"+(62*num[n])});
  }

};
$(function(){

  var numbers = [0,1,2,3,4,5,6,7,8,9];

  $(".number").html("");
  for(n in numbers){
    $(".number").append("<div>"+n+"</div>");
  }

  setNumber(".boardcount", boardcount);
  setNumber(".wordcount", wordcount);


  $(".nav li").on("click", function(e){
    var tab = $(e.currentTarget).attr("data-tab");
    $(".nav li").removeClass("active");
    $(e.currentTarget).addClass("active");
    $(".content").not("."+tab).fadeOut('normal', function(){
      $(".content").not("."+tab).hide();
      $(".content."+tab).fadeIn('normal');
    });
    

  });

});


