import constants from "./constants.js";
import favorites from "./favorites.js";
import seeMore from "./see-more.js";
import format from "./format.js";

const root = document.querySelector("body");
const cardsContainer = document.querySelector(".cards-container");

async function init(cards) {
  cards.assets.forEach((o) => {
    createCards(o);
  });
}

function createCards(el) {
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
  const sales = el.sales;
  const mainClass = "card";

  // CARD
  const cardEl = createElement(
    "article",
    {
      className: mainClass,
      data: {
        id,
        name,
        creator: creatorName,
        sales,
        fav: false,
        description,
        img: imgUrl,
        link,
        "collection-name": collectionName,
        "collection-banner": collectionBanner,
        "collection-description": collectionDescription,
      },
    },
    cardsContainer
  );
  // CARD IMG
  if (imgUrl) {
    createElement(
      "img",
      { className: `${mainClass}__img`, src: imgUrl },
      cardEl
    );
  }
  // CARD CONTENT
  const cardContentEl = createElement(
    "div",
    { className: `${mainClass}__content` },
    cardEl
  );
  //  CARD NAME
  createElement(
    "a",
    {
      className: `${mainClass}__name`,
      textContent: name,
      href: link,
      target: "_blank",
    },
    cardContentEl
  );
  // CARD CREATOR
  createElement(
    "p",
    {
      className: `${mainClass}__creator`,
      textContent: format.creator(creatorName),
    },
    cardContentEl
  );
  // CARD SALES
  createElement(
    "p",
    { className: `${mainClass}__sales`, textContent: format.sales(sales) },
    cardContentEl
  );

  // ADD FAV BUTTON
  createElement(
    "button",
    {
      className: `${mainClass}__fav-button`,
      textContent: constants.favText.notFav,
      events: [
        {
          type: "click",
          action: favorites.updateFavBtn,
          params: [cardEl, "this"],
        },
      ],
    },
    cardEl
  );

  // SEE MORE BUTTON
  createElement(
    "button",
    {
      className: `${mainClass}__see-more-button`,
      textContent: "See more",
      events: [{ type: "click", action: seeMore.open, params: [cardEl] }],
    },
    cardContentEl
  );
}

function createElement(tag, config, parent = null) {
  const element = document.createElement(tag);

  for (const el in config) {
    if (el === "data") {
      Object.keys(config[el]).forEach((key) => {
        element.setAttribute(`data-${key}`, config[el][key]);
      });
    } else if (el === "events") {
      config[el].forEach((event) => {
        const { type, action, params = [] } = event;
        let customParams = [];
        params.forEach((param) => {
          if (param === "this") {
            customParams.push(element);
          } else {
            customParams.push(param);
          }
        });
        element.addEventListener(type, function () {
          action(...customParams);
        });
      });
    } else if (el === "style") {
      Object.keys(config[el]).forEach((key) => {
        element.style[key] = config[el][key];
      });
      // TODO: add styles
    } else {
      element[el] = config[el];
    }
  }

  if (!parent) {
    root.appendChild(element);
  } else {
    parent.appendChild(element);
  }

  return element;
}

async function clear() {
  console.log("cards.clear()");
  cardsContainer.innerHTML = "";
}

export default {
  init,
  createCards,
  clear,
};
