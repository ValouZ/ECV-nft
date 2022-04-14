import favorites from "./favorites.js";
import cards from "./cards.js";

let page = 1;

async function call() {
  await fetch(`https://awesome-nft-app.herokuapp.com/?page=${page}`)
    .then(function (response) {
      return response.json();
    })
    .then(async function (res) {
      await cards.init(res);
      await favorites.init();
    })
    .catch(function (error) {
      console.warn(error);
    });
  console.log(page++);
}

document.querySelector(".load-more").addEventListener("click", call);

export default { call };
