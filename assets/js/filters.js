import constants from "./constants.js";
import apiCalls from "./api-calls.js";
import cards from "./cards.js";
import searchbar from "./searchbar.js";

// ************ FILTERS FUNCTIONS ************

function init() {
  constants.filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      activateFilterButton(e.target);
      const btnId = e.target.getAttribute("id");
      searchbar.clear();
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

function resetFilters() {
  constants.filterBtns.forEach((btn) => {
    btn.classList.remove("filters__button--active");
  });
  constants.filterBtns[0].classList.add("filters__button--active");
}

async function displayAll() {
  await cards.clear();
  apiCalls.getNfts(true);
}

async function favorite() {
  await cards.clear();
  const favs = JSON.parse(localStorage.getItem("favorites"));
  apiCalls.getFavorites(favs);
}

async function sales() {
  await cards.clear();
  apiCalls.getNftsBySales(true);
}

async function creator() {
  try {
    await cards.clear();
    let res = await apiCalls.getCreators(true);
    let creatorTab = [];
    res.creators.forEach((creator) => {
      if (creator.username !== "") {
        creatorTab.push(creator.username);
      }
    });
    creatorTab = [...new Set(creatorTab)];
    await apiCalls.getNftsByCreators(creatorTab);
  } catch (e) {
    console.warn(e);
  }
}

export default {
  init,
  activateFilterButton,
  resetFilters,
  resetOrder,
  displayAll,
  favorite,
  sales,
  creator,
};
