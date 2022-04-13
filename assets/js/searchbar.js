const searchbar = document.querySelector("#searchbar");
const searchBarClear = document.querySelector(".searchbar__clear");
const cards = document.querySelectorAll(".card");
searchbar.value = ""; // Be sure to have an empty searchbar

searchbar.addEventListener("keyup", (e) => {
  const search = e.target.value.toLowerCase();
  cards.forEach((card) => {
    const title = card.querySelector(".card__name").innerText.toLowerCase();
    if (title.indexOf(search) != -1) {
      card.classList.remove("not-searched");
    } else {
      card.classList.add("not-searched");
    }
  });
});

searchBarClear.addEventListener("click", (e) => {
  searchbar.value = "";
  cards.forEach((card) => {
    card.classList.remove("not-searched");
  });
});
