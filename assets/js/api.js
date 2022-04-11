// api key : YzcxYTQ4NGItMDU4MC00MDlhLTkzY2UtYWE1MzBlNDI4MDY3

// let myInit = {
//   method: "GET",
//   mode: "cors",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Credentials": "true",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//     "Access-Control-Allow-Headers":
//       "X-Requested-With, content-type, Authorization",
//   },
// };

// fetch("https://api.m3o.com/v1/nft/Assets", myInit)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (myJson) {
//     console.log(myJson);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

axios
  .get("https://api.m3o.com/v1/nft/Assets", {
    headers: {
      Authorization: "Bearer YzcxYTQ4NGItMDU4MC00MDlhLTkzY2UtYWE1MzBlNDI4MDY3",
    },
  })
  .then(function (response) {
    response.data.assets.forEach((o) => {
      // createElement("img", { text: "cac", src: c.banner_image_url }, myDiv);
      createCards(o);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
