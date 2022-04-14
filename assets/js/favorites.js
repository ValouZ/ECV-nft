import constants from "./constants.js";
import filters from "./filters.js";

// ************ FAVORITES SECTION ************
function init() {
  const favIds = JSON.parse(localStorage.getItem("favorites"));
  if (favIds) {
    favIds.forEach((id) => {
      const card = document.querySelector(`.card[data-id="${id}"]`);
      console.log(card);
      updateFavBtn(card, card.querySelector(".card__fav-button"));
      card.querySelector(".card__fav-button").textContent = constants.favText.isFav;
    });
  }
}

function updateFavBtn(card, btn) {
  const filterFavBtn = document.querySelector(".filters__fav");
  const dataId = card.getAttribute("data-id");

  const dataFav = "data-fav";
  if (card.getAttribute(dataFav) === "true") {
    card.setAttribute(dataFav, "false");
    btn.textContent = constants.favText.notFav;
    removeLocalStorage(dataId);
  } else {
    card.setAttribute(dataFav, "true");
    btn.textContent = constants.favText.isFav;
    addLocalStorage(dataId);

    // If we are on the favorites filter, we need to update the card favorite status when we remove a card from the favorites
    if (filterFavBtn.classList.contains("filters__button--active")) {
      filters.favorite(document.querySelectorAll(".card"));
    }
  }

  // card.setAttribute(dataFav, card.getAttribute(dataFav) === "true" ? "false" : "true");
  // btn.textContent = card.getAttribute(dataFav) === "true" ? constants.favText.isFav : constants.favText.notFav;

  if (card.getAttribute(dataFav) === "false" && filterFavBtn.classList.contains("filters__button--active")) {
    favoriteFilter(document.querySelectorAll(".card"));
  }
  console.log(JSON.parse(localStorage.getItem("favorites")));
}

function addLocalStorage(id) {
  const favorites = localStorage.getItem("favorites");
  if (favorites) {
    const favs = JSON.parse(favorites);
    const index = favs.indexOf(id);
    if (index == -1) {
      favs.push(id);
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  } else {
    localStorage.setItem("favorites", JSON.stringify([id]));
  }
}

function removeLocalStorage(id) {
  const favorites = localStorage.getItem("favorites");
  if (favorites) {
    const favs = JSON.parse(favorites);
    const index = favs.indexOf(id);
    if (index > -1) {
      favs.splice(index, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
}

export default { init, updateFavBtn, addLocalStorage, removeLocalStorage };
