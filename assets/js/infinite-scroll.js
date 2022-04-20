import apiCalls from "./api-calls.js";
import constants from "./constants.js";

/**
 * Function to add an IntersectionObserver on the last card to infinity scroll
 */
async function init() {
  const lastCardObserver = new IntersectionObserver(
    async (entries) => {
      const lastCard = entries[0];
      if (!lastCard.isIntersecting) return;
      await callApi();
      lastCardObserver.disconnect();
    },
    {
      rootMargin: "100px",
      threshold: 1,
    }
  );

  lastCardObserver.observe(document.querySelector(".card:last-child"));
}

/**
 * Function to call the API based on the actual filter
 */
async function callApi() {
  const btnId = [...constants.filterBtns]
    .find((btn) => btn.classList.contains("filters__button--active"))
    .getAttribute("id");
  switch (btnId) {
    case "fav":
      break;
    case "creator":
      break;
    case "sales":
      await apiCalls.getNftsBySales();
      break;
    default:
      await apiCalls.getNfts();
  }
}

export default { init };
