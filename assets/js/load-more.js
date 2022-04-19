function hide() {
  document.querySelector(".load-more").style.display = "none";
}

function display() {
  document.querySelector(".load-more").style.display = "";
}

export default { hide, display };
