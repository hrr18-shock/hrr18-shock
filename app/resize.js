$(window).resize(function() {
  var width = $(window).width();
  if(width < 780){
    $('#leftContainer').attr('id','topContainer');
    $('#rightContainer').attr('id','bottomContainer');
  }
  if(width > 780){
    $('#topContainer').attr('id','leftContainer');
    $('#bottomContainer').attr('id','rightContainer');
  }
});

