/**
 * DWMW: don't work might work
 ** #check_and_remove_from_selector("[aria-label^='cookie consent banner']", () => { return true; });
 ** #check_and_remove_from_selector("[id^='consentManagerMainDialog']", () => { return true; });
 *
 * CookieHub n.className.includes('ch2 ch2-region-g0')
 */


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
        n.className.includes('_4KjPzfFqnPyBgIgiXkX') ||
        n.className.includes('ytd-ad-slot-renderer') ||
        n.className.includes('ch2 ch2-region-g0') ||      // CookieHub
        n.className.includes('cookie__box') ||            // RudderStack
        n.className.includes('nas-slot') ||            // IMDB ads
        n.hasAttribute('data-google-query-id')
      );
    });

  check_and_remove_from_selector("[id^='div_netpub_ins_']", () => { return true; });
  check_and_remove_from_selector("[id^='player-ads']", () => { return true; }); // on youtube
  check_and_remove_from_selector("[id^='jpmasthead']", () => { return true; }); // on techcrunch
  check_and_remove_from_selector("[data-izone='uc-area']", () => { return true; });
  // Transcend Consent Manager: https://transcend.io/platform/consent-management ; used at blackhat.com
  check_and_remove_from_selector("[id^='transcend-consent-manager']", () => { return true; });
  // OneTrust Consent Manager; used at Reuters
  check_and_remove_from_selector("[id^='onetrust-consent-sdk']", () => { return true; });
  // consentmanager.net Cookie Consent
  check_and_remove_from_selector("[id^='cmpwrapper']", () => { return true; });
  // Amplitude.com Cookie Consent
  check_and_remove_from_selector("[id^='ccc-overlay']", () => { return true; });
  // CookieInformation.com Cookie Consent
  check_and_remove_from_selector("[id^='cookie-information-template-wrapper']", () => { return true; });
  // usercentrics.com Cookie Consent
  check_and_remove_from_selector("[id^='usercentrics-cmp-ui']", () => { return true; });
  // termly.io Cookie Consent
  check_and_remove_from_selector("[id^='termly-code-snippet-support']", () => { return true; });

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
        link.includes("//bk.birlersbhunder.com") ||
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
