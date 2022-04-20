// ************ SEE MORE SECTION ************

async function open(card) {
  window.location = `details.html?id=${card.getAttribute("data-id")}`;
}

export default { open };
