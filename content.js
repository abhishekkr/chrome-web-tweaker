function check_and_remove_from_tagname(selector, check){
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

function check_and_remove_from_selector(selector, check){
  let tag_nodes = document.querySelectorAll(selector);
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
  check_and_remove_from_tagname("iframe", function(n){
      return (n.style != undefined && n.style.display == "none") ||
        n.src == "about:blank" ||
        n.src == "" ||
        n.src.includes('ad.a-ads.com') ||
        n.src == document.URL;
    });

  check_and_remove_from_tagname("div", function(n){
      return n.className != undefined && (
        n.className.includes("bg-ssp-") ||
        n.className.includes("h12container") ||
        n.className.includes("IL_BASE") ||
        n.className.includes("OUTBRAIN") ||
        n.className.includes("st-adunit-ad") ||
        n.hasAttribute('data-google-query-id')
      );
    });

  check_and_remove_from_selector("[id^='div_netpub_ins_']", () => { return true; });

  check_and_remove_from_tagname("h12", function(n){
      return n.hasAttribute("data-adunit");
    });

  check_and_remove_from_selector("[src],[href]", function(n){
      let link = "";
      if (n.hasAttribute("src")) {
        link = n.getAttribute("src");
      } else if (n.hasAttribute("href")) {
        link = n.getAttribute("href");
      }
      return link.includes("shameful-leader.com") ||
        link.includes("//equipmentapes.com") ||
        link.includes("//platform.bidgear.com") ||
        link.includes("//cdn.pubfuture-ad.com");
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
