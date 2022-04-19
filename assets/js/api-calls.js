import favorites from "./favorites.js";
import cards from "./cards.js";
import constants from "./constants.js";

let page = 1;

async function getNfts(resetPageBool = false) {
  resetPage(resetPageBool);
  const url = `${constants.apiUrl}?page=${page}`;
  console.log(url);
  call(url);
}

async function getNftsBySales(resetPageBool = false) {
  resetPage(resetPageBool);
  const url = `${constants.apiUrl}?page=${page}&sales=true`;
  console.log(url);
  call(url);
}

async function getNftsByCreators(resetPageBool = false) {
  resetPage(resetPageBool);
  const url = `${constants.apiUrl}creators`;
  console.log(url);
  // call(url);
}

async function getFavorites(array) {
  await array.forEach(async (id) => {
    const url = `${constants.apiUrl}nft/${id}`;
    console.log(url);
    await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(async function (res) {
        cards.createCard(res);
        favorites.init();
      })
      .catch(function (error) {
        console.warn(error);
      });
  });
}

async function call(url) {
  await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(async function (res) {
      if (checkNextPage(res.next)) {
        await cards.init(res);
        await favorites.init();
      } else {
        alert("NO MORE NFTS");
      }
    })
    .catch(function (error) {
      console.warn(error);
    });
  page++;
}

function resetPage(reset) {
  if (reset) page = 1;
}

function checkNextPage(next) {
  return page + 1 === next;
}

document.querySelector(".load-more").addEventListener("click", () => {
  const btnId = [...constants.filterBtns]
    .find((btn) => btn.classList.contains("filters__button--active"))
    .getAttribute("id");
  switch (btnId) {
    case "fav":
      break;
    case "creator":
      break;
    case "sales":
      getNftsBySales();
      break;
    default:
      getNfts();
  }
});

export default {
  getNfts,
  getNftsBySales,
  getNftsByCreators,
  getFavorites,
  page,
};
