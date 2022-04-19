import constants from "./constants.js";
import filters from "./filters.js";

// ************ FAVORITES SECTION ************
/* //TODO : Régler le problème de l'affichage des favoris, les favoris de la page 1
  se suppriment lorsque l'on passe à la page 2. VOIR COMMENTAIRE SI DESSOUS
*/
async function init() {
  const favIds = JSON.parse(localStorage.getItem("favorites"));
  if (favIds) {
    favIds.forEach((id) => {
      const card = document.querySelector(`.card[data-id="${id}"]`);
      // console.log(id, card);
      //! updateFavBtn() qui provoque l'erreur
      if (card) add(card, card.querySelector(".card__fav-button"));
    });
  }
}

function add(card, btn) {
  // console.log("favorites.add()");
  const dataId = card.getAttribute("data-id");
  card.setAttribute(constants.dataFav, "true");
  btn.textContent = constants.favText.isFav;
  addLocalStorage(dataId);
}

function remove(card, btn) {
  // console.log("favorites.remove()");
  const dataId = card.getAttribute("data-id");
  card.setAttribute(constants.dataFav, "false");
  btn.textContent = constants.favText.notFav;
  removeLocalStorage(dataId);
}

function updateFavBtn(card, btn) {
  // console.log("updateFavBtn");
  const filterFavBtn = document.querySelector(".filters__fav");

  // Remove from favorites
  if (card.getAttribute(constants.dataFav) === "true") {
    remove(card, btn);

    // If we are on the favorites filter, we need to update the card favorite status when we remove a card from the favorites
    if (filterFavBtn.classList.contains("filters__button--active")) {
      // filters.favorite(document.querySelectorAll(".card"));
      card.remove();
    }
  }
  // Add to favorites
  else {
    add(card, btn);
  }

  // console.log(JSON.parse(localStorage.getItem("favorites")));
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
