// import apiCalls from "./api-calls.js";
import constants from "./constants.js";

window.addEventListener("load", async () => {
  const id = window.location.search.slice(4);
  const url = `${constants.apiUrl}nft/${id}`;
  console.log(url);
  await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(async function (res) {
      fillDetails(res);
    })
    .catch(function (error) {
      console.warn(error);
    });
  // await apiCalls.getNfts(id.slice(4));
});

function fillDetails(nft) {
  console.log(nft);
  const detailsName = document.querySelector(".details__name");
  const detailsCreator = document.querySelector(".details__creator-name p");
  const detailsCreatorAvatar = document.querySelector(
    ".details__creator-avatar"
  );
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
  const detailsOwnerName = document.querySelector(".details__owner-name p");
  const detailsOwnerAvatar = document.querySelector(".details__owner-avatar");

  detailsName.textContent = nft.name;
  detailsName.setAttribute("href", nft.permalink);
  detailsImg.setAttribute("src", nft.image_url);
  detailsCreatorAvatar.setAttribute("src", nft.creator.profile_url);
  detailsCreator.textContent = nft.creator.username;

  nft.description !== ""
    ? (detailsDescription.textContent = nft.description)
    : (detailsDescription.style.display = "none");
}
