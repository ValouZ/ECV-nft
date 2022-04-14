const searchbar = document.querySelector("#searchbar");
const searchBarClear = document.querySelector(".searchbar__clear");
searchbar.value = ""; // Be sure to have an empty searchbar

searchbar.addEventListener("keyup", (e) => {
  const search = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const name = card.querySelector(".card__name").innerText.toLowerCase();
    if (name.indexOf(search) != -1) {
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
