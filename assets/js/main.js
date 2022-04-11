const favText = { isFav: "Remove from favorites", notFav: "Add to favorites" };
const root = document.querySelector("body");
const cardsContainer = document.querySelector(".cards-container");
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
  const creator = el.creator;
  const creatorName = creator.username;
  const imgUrl = el.image_url;
  const description = el.description;
  const id = el.id;
  // const sales = el.sales;
  const sales = parseInt(Math.random() * 100);
  const mainClass = "card";
  // CARD
  const cardEl = document.createElement("article");
  cardEl.className = mainClass;

  // CARD CONTENT
  const cardContentEl = document.createElement("div");
  cardContentEl.className = `${mainClass}__content`;

  // TITLE
  const titleEl = document.createElement("h2");
  titleEl.className = `${mainClass}__title`;
  titleEl.textContent = el.name;
  cardContentEl.appendChild(titleEl);

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
  creatorEl.textContent = `Creator : ${creatorName ? creatorName : "Unknown"}`;
  cardContentEl.appendChild(creatorEl);

  // SALES
  const salesEl = document.createElement("p");
  salesEl.className = `${mainClass}__sales`;
  salesEl.textContent = `Sales : ${sales > 0 ? sales : "None"}`;
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

  cardEl.setAttribute("data-creator", creatorName);
  cardEl.setAttribute("data-sales", sales);
  cardEl.setAttribute("data-fav", false);
  cardEl.setAttribute("data-id", id);

  cardEl.appendChild(cardContentEl);
  cardEl.appendChild(favButtonEl);
  cardContentEl.appendChild(seeMoreButtonEl);
  cardsContainer.appendChild(cardEl);
}

function updateFavBtn(card, btn) {
  card.setAttribute(
    "data-fav",
    card.getAttribute("data-fav") === "true" ? "false" : "true"
  );
  btn.textContent =
    card.getAttribute("data-fav") === "true" ? favText.isFav : favText.notFav;
}

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
    card.style.display = "";
  });
}

function favoriteFilter(cards) {
  cards.forEach((card) => {
    if (card.getAttribute("data-fav") === "true") {
      card.style.display = "";
    } else {
      card.style.display = "none";
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
      if (creatorB > creatorA) return -1;
      if (creatorB < creatorA) return 1;
      return 0;
    })
    .map((card, i) => {
      card.style.order = i;
    });
}
