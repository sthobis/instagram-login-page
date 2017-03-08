(function() {
  $(document).ready(function() {

    // setup slider
    initSlider();

    // setup form checker
    initFormChecker();
  });

  var initSlider = function() {

    $('.screens').igSlider({
      autoPlaySpeed: 3000
    });
  }

  var initFormChecker = function() {

    $('form .form-element input').each(function(i) {

      $(this).on('change', function() {
        // check for valid condition
        // probably regex or whatever needed
        // in this example each input has the same valid condition
        // if it's not empty or it's not equal to foo then it's valid
        if ($(this).val() !== '' && $(this).val() !== 'foo') {
          $(this).parent().removeClass('error').addClass('accepted');
        } else {
          $(this).parent().removeClass('accepted').addClass('error');
        }
      });
    });

    $('form').on('submit', function(e) {

      // check if there's an error
      if ($(this).find('.form-element.error').length) {
        e.preventDefault();
        $(this).addClass('error');
        $(this).find('.error-message').html('Please fill fields correctly.');
      }
    });
  }
})();