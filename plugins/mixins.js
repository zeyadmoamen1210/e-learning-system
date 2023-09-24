import Vue from 'vue';

Vue.mixin({
  methods: {
    formatMinutes(minutes) {
      var mins = Math.floor(minutes);
      var secs = Math.floor((minutes % 1) * 60);

      var formattedMins = mins < 10 ? '0' + mins : mins;
      var formattedSecs = secs < 10 ? '0' + secs : secs;

      return formattedMins + ':' + formattedSecs;
    },
    minutesToHours(minutes) {
      let hours = minutes / 60;
      return hours;
    },
    formatPrice(price) {
      // Convert the price to a number
      price = Number(price);

      // Check if the price is a valid number
      if (isNaN(price)) {
        return "Invalid price";
      }

      // Format the price with commas as thousand separators
      const formattedPrice = price.toLocaleString("en-EG", {
        style: "currency",
        currency: "EGP",
      });

      return formattedPrice;
    },
    formatNumber(num) {
      if(isNaN(+num)) return;
      return +num.toLocaleString('en-US');
    }
  }
})
