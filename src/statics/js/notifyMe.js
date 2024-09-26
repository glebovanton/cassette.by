(function ($) {
  $.fn.notifyMe = function (options) {
    // Default options.
    const settings = $.extend({
        	// Error and success message strings
      msgError404: 'Service is not available at the moment. Please check your internet connection or try again later.',
      msgError503: 'Oops.,Something went wrong.',
      msgErrorValidation: 'This email address looks fake or invalid. Please enter a real email address.',
      msgErrorFormat: 'Your e-mail address is incorrect.',
      msgSuccess: 'Congrats! You are in list.',
    }, options);

    	const $this = $(this);
    const input = $(this).find('input[name=email]');

    const action = $(this).attr('action');
    const note = $(this).find('.note');
    const message = $("<div class='col-lg-12 align-center' id='message'></div>").appendTo($(this));
    const icon = $('<i></i>');
    const iconProcess = 'fa fa-spinner fa-spin';
    const iconSuccess = 'fa fa-check-circle';
    const iconError = 'fa fa-exclamation-circle';

    input.after(icon);

    $(this).on('submit', function (e) {
      e.preventDefault();
      // Get value of input
      const email = input.val();

      // Test if the value of input is actually an email
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(email)) {
        icon.removeClass();
        icon.addClass(iconProcess);
        $(this).removeClass('error success');
        message.text('');
        note.show();

        $.ajax({
          type: 'POST',
          url: action,
          data: { email },
          dataType: 'json',
          error(data) {
            // Add error class to form
            $this.addClass('error');

            note.hide();
            // Change the icon to error
            icon.removeClass();
            icon.addClass(iconError);

            // Determine the status of response and display the message
            if (data.status == 404) {
              message.text(settings.msgError404);
            } else {
              message.text(settings.msgError503);
            }
          },

        }).done((data) => {
          // Hide note
          note.hide();

          if (data.status == 'success') {
            // Add success class to form
            $this.addClass('success');
            // Change the icon to success
            icon.removeClass();
            icon.addClass(iconSuccess);
            $('input').val('');
            input.trigger('input');
            message.text(settings.msgSuccess);
          } else {
            // Add error class to form
            $this.addClass('error');
            // Change the icon to error
            icon.removeClass();
            icon.addClass(iconError);

            if (data.type == 'ValidationError') {
              message.text(settings.msgErrorValidation); $('input').val('');
            } else {
              message.text(settings.msgError503);
            }
          }
        });
      } else {
        $('input').val('');
        // Add error class to form
        $(this).addClass('error');
        // Hide note
        note.hide();
        // Change the icon to error
        icon.removeClass();
        icon.addClass(iconError);
        // Display the message
        message.text(settings.msgErrorFormat);
      }
    });
  };
}(jQuery));
