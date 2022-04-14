import favorites from "./favorites.js";
import cards from "./cards.js";
import filters from "./filters.js";

window.addEventListener("load", () => {
  fetch("https://awesome-nft-app.herokuapp.com/")
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      cards.init(res);
      favorites.init();
      filters.init();
    })
    .catch(function (error) {
      console.warn(error);
    });
});
