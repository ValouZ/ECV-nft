import format from "./format.js";

// ************ SEE MORE SECTION ************

async function open(card) {
  await resetDetails();
  document.querySelector(".details").classList.add("details--opened");
  document.querySelector("body").classList.add("modal-opened");

  const detailsName = document.querySelector(".details__name");
  const detailsCreator = document.querySelector(".details__creator");
  const detailsSales = document.querySelector(".details__sales");
  const detailsDescription = document.querySelector(".details__description");
  const detailsImg = document.querySelector(".details__img img");
  const detailsCollectionName = document.querySelector(".details__collection-name");
  const detailsCollectionBanner = document.querySelector(".details__collection-banner");
  const detailsCollectionDescription = document.querySelector(".details__collection-description");

  detailsName.textContent = card.getAttribute("data-name");
  detailsName.setAttribute("href", card.getAttribute("data-link"));
  detailsImg.setAttribute("src", card.getAttribute("data-img"));
  detailsCreator.textContent = format.creator(card.getAttribute("data-creator"));
  card.getAttribute("data-description") !== ""
    ? (detailsDescription.textContent = card.getAttribute("data-description"))
    : (detailsDescription.style.display = "none");
  detailsSales.textContent = format.sales(card.getAttribute("data-sales"));
  detailsCollectionName.textContent = card.getAttribute("data-collection-name");
  detailsCollectionBanner.setAttribute("src", card.getAttribute("data-collection-banner"));
  card.getAttribute("data-collection-description") !== ""
    ? (detailsCollectionDescription.textContent = card.getAttribute("data-collection-description"))
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
  const detailsCollectionDescription = document.querySelector(".details__collection-description");
  detailsCollectionDescription.textContent = "";
  detailsCollectionDescription.style.display = "";
}

function close() {
  document.querySelector(".details").classList.remove("details--opened");
  document.querySelector("body").classList.remove("modal-opened");
}

// Close modal
document.querySelector(".details__close").addEventListener("click", close);

export default { open, resetDetails };
