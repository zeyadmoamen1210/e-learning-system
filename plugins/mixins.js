import Vue from 'vue';

Vue.mixin({
  methods: {
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
  }
})
