function check_and_remove_from_selector(selector, check){
  let tag_nodes = document.getElementsByTagName(selector);
  for (let i = 0; i < tag_nodes.length; ++i) {
    let n = tag_nodes[i];
    try {
      if (check(n) === true) {
        n.remove();
        console.log("****[INFO] WEB-TWEAKER::", selector, " removed for", n);
      }
    } catch(err) {
      console.log("****[ERROR] WEB-TWEAKER::", selector, " remove for", n);
    }
  }

}


function remove_ads(timer=0){
  check_and_remove_from_selector("iframe", function(n){
      return n.style != undefined && n.style.display == "none";
    });

  check_and_remove_from_selector("div", function(n){
      return n.className != undefined && n.className.includes("bg-ssp-");
    });

  check_and_remove_from_selector("h12", function(n){
      return n.hasAttribute("data-adunit");
    });

  console.log("web-tweaker::remove_ads");
  timer += 1000;
  setTimeout(() => {
    remove_ads(timer);
  }, timer); // run every 10sec for re-injecting scripts
}

// remove_ads();
window.addEventListener('load', (event) => {
  remove_ads();
});
