import apiCalls from "./api-calls.js";
import filters from "./filters.js";
import searchbar from "./searchbar.js";

window.addEventListener("load", async () => {
  apiCalls.getNfts();
  filters.init();
  searchbar.init();
});
