(function ($) {
  $.fn.countdown = function (options, callback) {
    const settings = $.extend({
      date: null,
      offset: null,
      day: 'Day',
      days: 'Days',
      hour: 'Hour',
      hours: 'Hours',
      minute: 'Minute',
      minutes: 'Minutes',
      second: 'Second',
      seconds: 'Seconds',
    }, options);

    // Throw error if date is not set
    if (!settings.date) {
      $.error('Date is not defined.');
    }

    // Throw error if date is set incorectly
    if (!Date.parse(settings.date)) {
      $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
    }

    // Save container
    const container = this;

    /**
		 * Change client's local date to match offset timezone
		 * @return {Object} Fixed Date object.
		 */
    const currentDate = function () {
      // get client's current date
      const date = new Date();

      // turn date to utc
      const utc = date.getTime() + (date.getTimezoneOffset() * 60000);

      // set new Date object
      const new_date = new Date(utc + (3600000 * settings.offset));

      return new_date;
    };

    /**
		 * Main countdown function that calculates everything
		 */
    function countdown() {
      const target_date = new Date(settings.date); // set target date
      const current_date = currentDate(); // get fixed current date

      // difference of dates
      const difference = target_date - current_date;

      // if difference is negative than it's pass the target date
      if (difference < 0) {
        // stop timer
        clearInterval(interval);

        if (callback && typeof callback === 'function') callback();

        return;
      }

      // basic math variables
      const _second = 1000;
      const _minute = _second * 60;
      const _hour = _minute * 60;
      const _day = _hour * 24;

      // calculate dates
      let days = Math.floor(difference / _day);
      let hours = Math.floor((difference % _day) / _hour);
      let minutes = Math.floor((difference % _hour) / _minute);
      let seconds = Math.floor((difference % _minute) / _second);

      // fix dates so that it will show two digets
      days = (String(days).length >= 2) ? days : `0${days}`;
      hours = (String(hours).length >= 2) ? hours : `0${hours}`;
      minutes = (String(minutes).length >= 2) ? minutes : `0${minutes}`;
      seconds = (String(seconds).length >= 2) ? seconds : `0${seconds}`;

      // based on the date change the refrence wording
      const text_days = (days === 1) ? settings.day : settings.days;
      const text_hours = (hours === 1) ? settings.hour : settings.hours;
      const text_minutes = (minutes === 1) ? settings.minute : settings.minutes;
      const text_seconds = (seconds === 1) ? settings.second : settings.seconds;

      // set to DOM
      container.find('.days').text(days);
      container.find('.hours').text(hours);
      container.find('.minutes').text(minutes);
      container.find('.seconds').text(seconds);

      container.find('.days_text').text(text_days);
      container.find('.hours_text').text(text_hours);
      container.find('.minutes_text').text(text_minutes);
      container.find('.seconds_text').text(text_seconds);
    }

    // start
    var interval = setInterval(countdown, 1000);
  };
}(jQuery));
