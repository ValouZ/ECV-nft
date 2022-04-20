const favText = { isFav: "Remove from favorites", notFav: "Add to favorites" };
const filterBtns = document.querySelectorAll(".filters__buttons button");
const dataFav = "data-fav";
const apiUrl = `https://awesome-nft-app.herokuapp.com/`;

export default {
  favText,
  filterBtns,
  dataFav,
  apiUrl,
};
