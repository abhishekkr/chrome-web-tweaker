function remove_ads(){
  let div_nodes = document.getElementsByTagName("div");
  if (div_nodes.length > 0) {
    for (n in div_nodes) {
      if (n.className != undefined && n.className.includes("bg-ssp-")) {
        console.log("****************************", n.className);
        n.remove();
      }
    }
    console.log("hiding ads in div[bg-ssp-*] missed by css");
  }

  let h12_nodes = document.getElementsByTagName("h12");
  if (h12_nodes.length > 0) {
    for (n in h12_nodes) {
      if (n.hasAttribute("data-adunit")) {
        n.remove();
      }
    }
    console.log("hiding ads in h12[data-adunit] missed by css");
  }
  console.log("web-tweaker::remove_ads");
}

// remove_ads();
window.addEventListener('load', (event) => {
  remove_ads();
});
