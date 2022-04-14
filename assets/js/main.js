import apiCalls from "./api-calls.js";
import filters from "./filters.js";

window.addEventListener("load", async () => {
  await apiCalls.call();
  filters.init();
});
