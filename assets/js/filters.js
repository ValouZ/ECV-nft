import constants from "./constants.js";
import apiCalls from "./api-calls.js";
import cards from "./cards.js";
import loadMore from "./load-more.js";

// ************ FILTERS FUNCTIONS ************

function init() {
  constants.filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      activateFilterButton(e.target);
      const btnId = e.target.getAttribute("id");
      const cards = document.querySelectorAll(".card");
      // resetOrder(cards);
      // displayAll(cards);
      loadMore.display();
      switch (btnId) {
        case "fav":
          favorite();
          break;
        case "creator":
          creator();
          break;
        case "sales":
          sales();
          break;
        default:
          displayAll();
      }
    });
  });
}

function activateFilterButton(btn) {
  constants.filterBtns.forEach((btn) => {
    btn.classList.remove("filters__button--active");
  });
  btn.classList.add("filters__button--active");
}

function resetOrder(cards) {
  cards.forEach((card) => {
    card.style.order = "";
  });
}

async function displayAll() {
  await cards.clear();
  apiCalls.getNfts(true);
}

async function favorite() {
  await cards.clear();
  loadMore.hide();
  const favs = JSON.parse(localStorage.getItem("favorites"));
  apiCalls.getFavorites(favs);
}

async function sales() {
  console.log("sales()");
  await cards.clear();
  apiCalls.getNftsBySales(true);
}

async function creator() {
  await cards.clear();
  // apiCalls.getNftsByCreators(true);

  // let tabCards = [];
  // cards.forEach((card) => {
  //   tabCards.push(card);
  // });
  // tabCards.sort((a, b) => {
  //   const creatorA = a.getAttribute("data-creator").toLowerCase();
  //   const creatorB = b.getAttribute("data-creator").toLowerCase();
  //   if (creatorB > creatorA) {
  //     return -1;
  //   }
  //   if (creatorB < creatorA) {
  //     return 1;
  //   }
  //   return 0;
  // });
  // let tabEmptyNames = [];
  // tabCards.forEach((card) => {
  //   if (card.getAttribute("data-creator") === "") {
  //     tabEmptyNames.push(card);
  //   }
  // });
  // tabCards.splice(0, tabEmptyNames.length);
  // tabCards = tabCards.concat(tabEmptyNames);
  // tabCards.map((card, i) => {
  //   card.style.order = i;
  // });
}

export default {
  init,
  activateFilterButton,
  resetOrder,
  displayAll,
  favorite,
  sales,
  creator,
};
