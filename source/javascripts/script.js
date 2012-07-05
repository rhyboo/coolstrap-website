var goToArticle = function(elements, callback, returnValue) {
  if (!returnValue)
      returnValue = false;

  if ('ontouchstart' in document.documentElement) {
    elements.unbind().bind('touchstart', function(event_start) {
      $(this).addClass('active');
      this.moved = false;
      elements.unbind('touchmove').bind('touchmove', function(e) {
        this.moved = true;
      });
      elements.unbind('touchend').bind('touchend', function(e) {
        $(this).removeClass('active');
        if( !this.moved ) {
          if (typeof callback == 'function') {
            $(this).removeClass('active');
            var self = this;
            setTimeout(function(){
              callback.call(self, event_start);
            }, 0);
            return !returnValue;
          }
        }
      });
    });
  } else {
    elements.unbind().bind('click', function(e) {
      if (typeof callback == 'function') {
        var self = this;
        setTimeout(function(){
          callback.call(self, e);
        }, 0);
      }
    })
  }
}

$(document).ready(function(){

  var main = $('#main');

  goToArticle($('a[data-target]'), function(event) {
    var windowHeight = $(window).height();
    var index = $(this).attr('data-target') - 1;
    var height = windowHeight;
    var move = 'translate3d(0px, ' + (-index*height) + 'px, 0px)';
    main.css({
      '-moz-transform': move,
      '-webkit-transform': move,
      'transform': move
    });
  });

  $(window).resize(function(){

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    $('article').each(function(i,e) {
      var target = $(e);
      var inner = target.find('.inner');
      var innerHeight = inner.height();
      var innerMargin = (windowHeight - innerHeight) / 2;
      target.css({
        'width': windowWidth,
        'height': windowHeight
      });
      inner.css({
        'padding-top': innerMargin,
        'padding-bottom': innerMargin
      });
    });

    var articleCount = $('article').length();
    var mainHeight = windowHeight * articleCount;

    main.css({
      'height': mainHeight
    });

    //setBackgroundStretch('section');

  }).resize();

});
