import favorites from "./favorites.js";
import cards from "./cards.js";
import constants from "./constants.js";
import infiniteScroll from "./infinite-scroll.js";

let page = 1;
let noMorePages = false;

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

async function call(url) {
  await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(async function (res) {
      if (checkNextPage(res.next)) {
        await cards.init(res);
        await favorites.init();
        await infiniteScroll.init();
      } else {
        noMorePages = true;
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
  await array.forEach(async (creator) => {
    const url = `${constants.apiUrl}creators/${creator}`;
    console.log("%cCreators : " + url, "color:lime");
    await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(async function (res) {
        await cards.init(res);
        favorites.init();
      })
      .catch(function (error) {
        console.warn(error);
      });
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
      await cards.init(res);
      await favorites.init();
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
  getCreators,
  getNftsByCreators,
  getFavorites,
  search,
  noMorePages,
};
