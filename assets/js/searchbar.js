import apiCalls from "./api-calls.js";
import cards from "./cards.js";
import filters from "./filters.js";

const searchbar = document.querySelector("#searchbar");
const searchBarClear = document.querySelector(".searchbar__clear");
clear(); // Be sure to have an empty searchbar

function init() {
  searchbar.addEventListener("keyup", (e) => {
    processChange(e.target.value);
  });

  searchBarClear.addEventListener("click", (e) => {
    clear();
    search("");
  });
}

function clear() {
  searchbar.value = "";
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

async function search(val) {
  await cards.clear();
  filters.resetFilters();
  if (val.length > 2) {
    apiCalls.search(val.toLowerCase());
  } else {
    apiCalls.getNfts(true);
  }
}

const processChange = debounce((val) => search(val));

export default { init, clear };
