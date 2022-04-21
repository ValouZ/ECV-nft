import favorites from "./favorites.js";
import cards from "./cards.js";
import constants from "./constants.js";
import infiniteScroll from "./infinite-scroll.js";

let page = 1;

async function getNfts(resetPageBool = false) {
  resetPage(resetPageBool);
  const url = `${constants.apiUrl}?page=${page}`;
  console.log("%cNfts : " + url, "color:pink");
  await call(url);
}

async function getNftsBySales(resetPageBool = false) {
  resetPage(resetPageBool);
  const url = `${constants.apiUrl}?page=${page}&sales=true`;
  console.log("%cNft by sales : " + url, "color:orange");
  await call(url);
}

async function getNftsById(id) {
  const url = `${constants.apiUrl}nft/${id}`;
  console.log("%cNft by sales : " + url, "color:orange");
  await call(url);
}

async function call(url) {
  await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(async function (res) {
      if (checkNextPage(res.next)) {
        cards.init(res);
        favorites.init();
        infiniteScroll.init();
      } else {
        alert("NO MORE NFTS");
      }
    })
    .catch(function (error) {
      console.warn(error);
    });
  page++;
}

async function getCreators() {
  const url = `${constants.apiUrl}creators`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(async function (res) {
        resolve(res);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

async function getNftsByCreators(array) {
  await Promise.all(
    array.map(async (creator) => {
      const url = `${constants.apiUrl}creators/${creator}`;
      console.log("%cCreators : " + url, "color:lime");
      const res = await fetch(url);
      const data = await res.json();
      cards.init(data);
    })
  );
  favorites.init();
  const cardsEl = [...document.querySelectorAll(".card")];
  cardsEl.sort((a, b) => {
    a = a.getAttribute("data-creator-name").toLowerCase();
    b = b.getAttribute("data-creator-name").toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  console.log(cardsEl);
  cardsEl.forEach((card, i) => {
    card.style.order = i;
  });
}

async function getFavorites(array) {
  await array.forEach(async (id) => {
    const url = `${constants.apiUrl}nft/${id}`;
    console.log("%cFavorites : " + url, "color:yellow");
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

async function search(name) {
  const url = `${constants.apiUrl}search?q=${name}`;
  console.log("%cSearch : " + url, "color:cyan");
  await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(async function (res) {
      cards.init(res);
      favorites.init();
    })
    .catch(function (error) {
      console.warn(error);
    });
}

function resetPage(reset) {
  if (reset) page = 1;
}

function checkNextPage(next) {
  return page + 1 === next;
}

export default {
  getNfts,
  getNftsBySales,
  getNftsById,
  getCreators,
  getNftsByCreators,
  getFavorites,
  search,
};
