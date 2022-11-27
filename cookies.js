const showCookiesForTab = (tabs) => {
  let tab = tabs.pop();
  let countCookies = 0;
  let countFirstPartyCookies = 0;
  let countThirdPartyCookies = 0;
  let url = new URL(tab.url)
  var gettingAllCookies = browser.cookies.getAll({
    url: tab.url
  });

  gettingAllCookies.then((cookies) => {
    var activeTabUrl = document.getElementById('header-title-cookies');
    var text = document.createTextNode("Cookies at: "+tab.title);
    var cookieList = document.getElementById('cookie-list');
    var numberOfCookies = document.getElementById('number-cookies');
    activeTabUrl.appendChild(text);

    var firstPartyCookieList = document.getElementById('first-party-cookie-list');
    var numberOfFirstPartyCookies = document.getElementById('number-first-party-cookies');
    var thirdPartyCookieList = document.getElementById('third-party-cookie-list');
    var numberOfThirdPartyCookies = document.getElementById('number-third-party-cookies');

    if (cookies.length > 0) {
      for (let cookie of cookies) {
        let li = document.createElement("li");
        let content = document.createTextNode(cookie.name + ": "+ cookie.value);
        li.appendChild(content);
        cookieList.appendChild(li);
        countCookies++;

        let li2 = document.createElement("li");
        let content2 = document.createTextNode(cookie.name + ": "+ cookie.value);
        //let content2 = document.createTextNode(cookie.domain + ": "+ url.hostname);
        li2.appendChild(content2);
        if (url.hostname.endsWith(cookie.domain)) {
          firstPartyCookieList.appendChild(li2);
          countFirstPartyCookies++;
        }
        else {
          thirdPartyCookieList.appendChild(li2);
          countThirdPartyCookies++;
        }

      }
      let cookiesText = document.createElement("p");
      let cookiesContent = document.createTextNode("Number of cookies: "+countCookies);
      cookiesText.appendChild(cookiesContent);
      numberOfCookies.appendChild(cookiesText);

      let firstPartyCookiesText = document.createElement("p");
      let firstPartyCookiesContent = document.createTextNode("Number of first-party cookies: "+countFirstPartyCookies);
      let thirdPartyCookiesText = document.createElement("p");
      let thirdPartyCookiesContent = document.createTextNode("Number of third-party cookies: "+countThirdPartyCookies);
      firstPartyCookiesText.appendChild(firstPartyCookiesContent);
      thirdPartyCookiesText.appendChild(thirdPartyCookiesContent);
      numberOfFirstPartyCookies.appendChild(firstPartyCookiesText);
      numberOfThirdPartyCookies.appendChild(thirdPartyCookiesText);
    } else {
      let p = document.createElement("p");
      let content = document.createTextNode("No cookies here.");
      let parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);

    }

    var cookiesSecurity = document.getElementById('cookies-status');
    
    var cookieScore = countFirstPartyCookies + 3*countThirdPartyCookies

    cookiesSecurity.setAttribute("value", cookieScore.toString());
  });
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
          return true;
      }
  }

  return false;
}

const showFirstPartyCookiesForTab = (tabs) => {
  let tab = tabs.pop();
  let countFirstPartyCookies = 0;
  var gettingAllFirstPartyCookies = browser.cookies.getAll({
    url: tab.url,
    firstPartyDomain: tab.url.hostname
  });

  gettingAllFirstPartyCookies.then((cookies) => {
    var activeTabUrl = document.getElementById('header-title-first-party-cookies');
    var text = document.createTextNode("Cookies at: "+tab.title);
    var firstPartyCookieList = document.getElementById('first-party-cookie-list');
    var numberOfCookies = document.getElementById('number-first-party-cookies');
    activeTabUrl.appendChild(text);

    if (cookies.length > 0) {
      for (let cookie of cookies) {
        let li = document.createElement("li");
        let content = document.createTextNode(cookie.name + ": "+ cookie.value);
        li.appendChild(content);
        firstPartyCookieList.appendChild(li);
        countFirstPartyCookies++;
      }
      let cookiesText = document.createElement("p");
      let cookiesContent = document.createTextNode("Number of first-party cookies: "+countFirstPartyCookies);
      cookiesText.appendChild(cookiesContent);
      numberOfCookies.appendChild(cookiesText);
    } else {
      let p = document.createElement("p");
      let content = document.createTextNode("No first-party cookies in this tab.");
      let parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);
    }

    var websiteSecurity = document.getElementById('first-party-cookies-security-status');
    var cookiesSecurity = document.getElementById('first-party-cookies-status');

    
    if(countCookies >= 200){
      websiteSecurity.style.color = "#F4364C";
      cookiesSecurity.setAttribute("value", "100");
    } else if(countCookies > 100 && countCookies < 200){
      websiteSecurity.style.color = "#FDB44E";
      cookiesSecurity.setAttribute("value", countCookies.toString());
    } else {
      cookiesSecurity.setAttribute("value", countCookies.toString());
    }
    
  });
}

function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(showCookiesForTab);
//getActiveTab().then(showFirstPartyCookiesForTab);