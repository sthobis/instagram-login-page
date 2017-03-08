/*
 * Simple slideshow
 * sthobis
 */

(function() {

  var IgSlider = (function() {

    IgSlider = function(element, options) {

      var _ = this;

      _.props = {
        activeSlide: 1,
        nextSlide: 2,
        autoPlayTimer: null,
        elem: $(element),
        slideCount: 0
      };

      _.options = $.extend({
        autoPlaySpeed: 5000,
      }, options || {});

      _.start = $.proxy(_.start, _);
      _.nextSlide = $.proxy(_.nextSlide, _);

      _.init();
    }

    return IgSlider;
  }());

  IgSlider.prototype.goToSlide = function(slideNumber) {

    var _ = this;

    // update slide
    _.props.elem.find('.igslide--active').removeClass('igslide--active');
    _.props.elem.find('.igslide--next').addClass('igslide--active').removeClass('igslide--next');
    _.props.elem.find('.igslide:nth-child(' + slideNumber + ')').addClass('igslide--next');
  }

  IgSlider.prototype.init = function() {

    var _ = this;

    _.props.elem.addClass('igslider');
    _.props.activeSlide = 1;
    _.props.elem.children().each(function(i) {
      $(this).addClass('igslide');
      _.props.slideCount = i + 1;
    });

    _.props.elem.find('.igslide:nth-child(' + _.props.activeSlide + ')').addClass('igslide--active');
    _.props.elem.find('.igslide:nth-child(' + _.props.nextSlide + ')').addClass('igslide--next');

    _.start();
  }

  IgSlider.prototype.nextSlide = function() {

    var _ = this;

    _.props.activeSlide = _.props.nextSlide;
    if (_.props.nextSlide == _.props.slideCount) {
      _.props.nextSlide = 1;
    } else {
      _.props.nextSlide++;
    }

    _.goToSlide(_.props.nextSlide);
  }

  IgSlider.prototype.start = function() {

    var _ = this;

    if (_.props.autoPlayTimer) {
      clearInterval(_.props.autoPlayTimer);
    }

    _.props.autoPlayTimer = setInterval(_.nextSlide, _.options.autoPlaySpeed);
  }

  $.fn.igSlider = function (options) {

    var _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      ret;

    if (typeof opt == 'object' || typeof opt == 'undefined') {
      _[0].IgSlider = new IgSlider(_, opt);
    } else {
      ret = _[0].IgSlider[opt].apply(_[0].IgSlider, args);
    }

    if (typeof ret != 'undefined') return ret;

    return _;
  };

})();