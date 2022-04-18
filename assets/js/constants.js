const favText = { isFav: "Remove from favorites", notFav: "Add to favorites" };
const filterBtns = document.querySelectorAll(".filters__buttons button");
const notSearchedClass = "not-searched";
const notFavClass = "not-fav";
const dataFav = "data-fav";
const apiUrl = `https://awesome-nft-app.herokuapp.com/`;

export default {
  favText,
  filterBtns,
  notSearchedClass,
  notFavClass,
  dataFav,
  apiUrl,
};
