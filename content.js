document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  let nodes = document.getElementsByTagName("div");
  for (n in nodes) {
    if (n.hasAttribute("")) {
      n.innerHTML = "data-google-query-id";
    }
  }
  console.log("hiding ads in div[data-google-query-id] missed by css");
});
