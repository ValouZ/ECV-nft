import constants from "./constants.js";

// ************ FILTERS FUNCTIONS ************

function init() {
  constants.filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      activateFilterButton(e.target);
      const btnId = e.target.getAttribute("id");
      const cards = document.querySelectorAll(".card");
      resetOrder(cards);
      displayAll(cards);
      if (btnId === "fav") {
        favorite(cards);
      } else if (btnId === "creator") {
        creator(cards);
      } else if (btnId === "sales") {
        sales(cards);
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

function displayAll(cards) {
  cards.forEach((card) => {
    card.classList.remove(constants.notFavClass);
  });
}

function favorite(cards) {
  cards.forEach((card) => {
    if (card.getAttribute("data-fav") === "true") {
      card.classList.remove(constants.notFavClass);
    } else {
      card.classList.add(constants.notFavClass);
    }
  });
}

function sales(cards) {
  let tabCards = [];
  cards.forEach((card) => {
    tabCards.push(card);
  });
  tabCards
    .sort((a, b) => b.getAttribute("data-sales") - a.getAttribute("data-sales"))
    .map((card, i) => {
      card.style.order = i;
    });
}

function creator(cards) {
  let tabCards = [];
  cards.forEach((card) => {
    tabCards.push(card);
  });
  tabCards.sort((a, b) => {
    const creatorA = a.getAttribute("data-creator").toLowerCase();
    const creatorB = b.getAttribute("data-creator").toLowerCase();
    if (creatorB > creatorA) {
      return -1;
    }
    if (creatorB < creatorA) {
      return 1;
    }
    return 0;
  });
  let tabEmptyNames = [];
  tabCards.forEach((card) => {
    if (card.getAttribute("data-creator") === "") {
      tabEmptyNames.push(card);
    }
  });
  tabCards.splice(0, tabEmptyNames.length);
  tabCards = tabCards.concat(tabEmptyNames);
  tabCards.map((card, i) => {
    card.style.order = i;
  });
}

export default { init, activateFilterButton, resetOrder, displayAll, favorite, sales, creator };
