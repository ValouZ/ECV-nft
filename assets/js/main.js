const favText = { isFav: "Remove from favorites", notFav: "Add to favorites" };
const root = document.querySelector("body");
const cardsContainer = document.querySelector(".cards-container");
const notSearchedClass = "not-searched";
const notFavClass = "not-fav";

// function createElement(tag, config, parent = null) {
//   const { text, color, src } = config || {};
//   const element = document.createElement(tag);

//   if (color) {
//     element.style.color = color;
//   }

//   if (text) {
//     element.innerHTML = text;
//   }

//   if (tag === "img") {
//     if (src) {
//       element.setAttribute("src", src);
//     }
//   }

//   if (!parent) {
//     root.appendChild(element);
//   } else {
//     parent.appendChild(element);
//   }

//   return element;
// }

// const myDiv = createElement("div");
// const data = ["Hello", "world", "toto", "tata"];
// function createCards() {
//   data.forEach((el) => {
//     createElement("p", { text: el, color: "red" }, myDiv);
//   });
// }

function createCards(el) {
  console.log(el);
  const collection = el.collection;
  const collectionName = collection.name;
  const collectionBanner = collection.banner_image_url;
  const collectionDescription = collection.description;
  const creator = el.creator;
  const name = el.name;
  const creatorName = creator.username;
  const imgUrl = el.image_url;
  const description = el.description;
  const id = el.id;
  const link = el.permalink;

  // const sales = el.sales;
  const sales = parseInt(Math.random() * 100);
  const mainClass = "card";
  // CARD
  const cardEl = document.createElement("article");
  cardEl.className = mainClass;

  // CARD CONTENT
  const cardContentEl = document.createElement("div");
  cardContentEl.className = `${mainClass}__content`;

  // name
  const nameEl = document.createElement("a");
  nameEl.className = `${mainClass}__name`;
  nameEl.textContent = el.name;
  nameEl.setAttribute("href", link);
  nameEl.setAttribute("target", "_blank");
  cardContentEl.appendChild(nameEl);

  // NFT IMAGE
  if (imgUrl) {
    const imgEl = document.createElement("img");
    imgEl.className = `${mainClass}__img`;
    imgEl.setAttribute("src", el.image_url);
    cardEl.appendChild(imgEl);
  }

  // CREATOR
  const creatorEl = document.createElement("p");
  creatorEl.className = `${mainClass}__creator`;
  creatorEl.textContent = formatCreator(creatorName);
  cardContentEl.appendChild(creatorEl);

  // SALES
  const salesEl = document.createElement("p");
  salesEl.className = `${mainClass}__sales`;
  salesEl.textContent = formatSales(sales);
  cardContentEl.appendChild(salesEl);

  // DESCRIPTION
  // if (description) {
  //   const descriptionEl = document.createElement("p");
  //   descriptionEl.className = `${mainClass}__description`;
  //   descriptionEl.textContent = el.description;
  //   cardContentEl.appendChild(descriptionEl);
  // }

  // ADD FAV BUTTON
  const favButtonEl = document.createElement("button");
  favButtonEl.className = `${mainClass}__fav-button`;
  favButtonEl.textContent = favText.notFav;

  // ADD FAV BUTTON EVENT
  favButtonEl.addEventListener("click", () => {
    updateFavBtn(cardEl, favButtonEl);
  });

  // SEE MORE BUTTON
  const seeMoreButtonEl = document.createElement("button");
  seeMoreButtonEl.className = `${mainClass}__see-more-button`;
  seeMoreButtonEl.textContent = "See more";
  seeMoreButtonEl.addEventListener("click", () => {
    seeMore(cardEl);
  });

  cardEl.setAttribute("data-id", id);
  cardEl.setAttribute("data-name", name);
  cardEl.setAttribute("data-creator", creatorName);
  cardEl.setAttribute("data-sales", sales);
  cardEl.setAttribute("data-fav", false);
  cardEl.setAttribute("data-description", description);
  cardEl.setAttribute("data-img", imgUrl);
  cardEl.setAttribute("data-link", link);
  cardEl.setAttribute("data-link", link);
  cardEl.setAttribute("data-collection-name", collectionName);
  cardEl.setAttribute("data-collection-banner", collectionBanner);
  cardEl.setAttribute("data-collection-description", collectionDescription);

  cardEl.appendChild(cardContentEl);
  cardEl.appendChild(favButtonEl);
  cardContentEl.appendChild(seeMoreButtonEl);
  cardsContainer.appendChild(cardEl);
}

function formatSales(sales) {
  return `Sales : ${sales > 0 ? sales : "None"}`;
}

function formatCreator(creator) {
  return `Creator : ${creator ? creator : "Unknown"}`;
}

function updateFavBtn(card, btn) {
  const filterFavBtn = document.querySelector(".filters__fav");
  card.setAttribute(
    "data-fav",
    card.getAttribute("data-fav") === "true" ? "false" : "true"
  );
  btn.textContent =
    card.getAttribute("data-fav") === "true" ? favText.isFav : favText.notFav;
  // If we are on the favorites filter, we need to update the card favorite status when we remove a card from the favorites
  if (
    card.getAttribute("data-fav") === "false" &&
    filterFavBtn.classList.contains("filters__button--active")
  ) {
    favoriteFilter(document.querySelectorAll(".card"));
  }
}

// ************ SEE MORE SECTION ************

async function seeMore(card) {
  await resetDetails();

  document.querySelector(".details").classList.add("details--opened");
  document.querySelector("body").classList.add("modal-opened");

  const details = document.querySelector(".details");
  const detailsName = document.querySelector(".details__name");
  const detailsCreator = document.querySelector(".details__creator");
  const detailsSales = document.querySelector(".details__sales");
  const detailsDescription = document.querySelector(".details__description");
  const detailsImg = document.querySelector(".details__img img");
  const detailsCollectionName = document.querySelector(
    ".details__collection-name"
  );
  const detailsCollectionBanner = document.querySelector(
    ".details__collection-banner"
  );
  const detailsCollectionDescription = document.querySelector(
    ".details__collection-description"
  );

  detailsName.textContent = card.getAttribute("data-name");
  detailsName.setAttribute("href", card.getAttribute("data-link"));
  detailsImg.setAttribute("src", card.getAttribute("data-img"));
  detailsCreator.textContent = formatCreator(card.getAttribute("data-creator"));
  card.getAttribute("data-description") !== ""
    ? (detailsDescription.textContent = card.getAttribute("data-description"))
    : (detailsDescription.style.display = "none");
  detailsSales.textContent = formatSales(card.getAttribute("data-sales"));
  detailsCollectionName.textContent = card.getAttribute("data-collection-name");
  detailsCollectionBanner.setAttribute(
    "src",
    card.getAttribute("data-collection-banner")
  );
  card.getAttribute("data-collection-description") !== ""
    ? (detailsCollectionDescription.textContent = card.getAttribute(
        "data-collection-description"
      ))
    : (detailsCollectionDescription.style.display = "none");
}

async function resetDetails() {
  const detailsName = document.querySelector(".details__name");
  detailsName.textContent = "";
  detailsName.setAttribute("href", "");
  document.querySelector(".details__img img").setAttribute("src", "");
  document.querySelector(".details__creator").textContent = "";
  const detailsDescription = document.querySelector(".details__description");
  detailsDescription.textContent = "";
  detailsDescription.style.display = "";
  document.querySelector(".details__sales").textContent = "";
  document.querySelector(".details__collection-name").textContent = "";
  document.querySelector(".details__collection-banner").setAttribute("src", "");
  const detailsCollectionDescription = document.querySelector(
    ".details__collection-description"
  );
  detailsCollectionDescription.textContent = "";
  detailsCollectionDescription.style.display = "";
}

// Close modal
document.querySelector(".details__close").addEventListener("click", () => {
  document.querySelector(".details").classList.remove("details--opened");
  document.querySelector("body").classList.remove("modal-opened");
});

// ************ FILTERS FUNCTIONS ************

const filterBtns = document.querySelectorAll(".filters__buttons button");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    activateFilterButton(e.target);
    const btnId = e.target.getAttribute("id");
    const cards = document.querySelectorAll(".card");
    resetOrder(cards);
    displayAll(cards);
    if (btnId === "fav") {
      favoriteFilter(cards);
    } else if (btnId === "creator") {
      creatorFilter(cards);
    } else if (btnId === "sales") {
      salesFilter(cards);
    }
  });
});

function activateFilterButton(btn) {
  filterBtns.forEach((btn) => {
    btn.classList.remove("filters__button--active");
  });
  btn.classList.add("filters__button--active");
}

function resetOrder(cards) {
  cards.forEach((card) => {
    card.style.order = "";
  });
}

function displayAll(cards) {
  cards.forEach((card) => {
    card.classList.remove(notFavClass);
    // card.classList.remove(notSearchedClass);
  });
}

function favoriteFilter(cards) {
  cards.forEach((card) => {
    if (card.getAttribute("data-fav") === "true") {
      card.classList.remove(notFavClass);
    } else {
      card.classList.add(notFavClass);
    }
  });
}

function salesFilter(cards) {
  let tabCards = [];
  cards.forEach((card) => {
    tabCards.push(card);
  });
  tabCards
    .sort((a, b) => b.getAttribute("data-sales") - a.getAttribute("data-sales"))
    .map((card, i) => {
      card.style.order = i;
    });
}

function creatorFilter(cards) {
  let tabCards = [];
  cards.forEach((card) => {
    tabCards.push(card);
  });
  tabCards
    .sort((a, b) => {
      const creatorA = a.getAttribute("data-creator").toLowerCase();
      const creatorB = b.getAttribute("data-creator").toLowerCase();
      if (creatorB > creatorA) {
        return -1;
      }
      if (creatorB < creatorA) {
        return 1;
      }
      return 0;
    })
    .map((card, i) => {
      card.style.order = i;
    });
}
