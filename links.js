const setThirdPartyDomains = async (tabs) => {
  let tab = tabs.pop();
  var thirdPartyDomainsList = document.getElementById('third-party-list');
  var threatsList = document.getElementById('threat-list');

  const response = await browser.tabs.sendMessage(tab.id, {
    method: "thirdPartyDomains"
  });
  
  var thirdPartyDomains = response.data.links;
  var numberOfLinks = response.data.numberOfLinks;
  var countLinks = 0;

  var countThreats = 0;


  thirdPartyDomains.map(domain => {
    if (domain.length > 0) {
      if ((domain.substring(0,5) != "https")&&(domain.substring(0,5) != "http")) {
        var li2 = document.createElement('li');
        li2.innerText = domain;
        threatsList.appendChild(li2);
        countThreats++;
      }
      var li = document.createElement('li');
      li.innerText = domain;
      thirdPartyDomainsList.appendChild(li);
      countLinks++;
    }
  });
  var sizeLinks = document.getElementById("size-third-party");
  sizeLinks.innerHTML = (countLinks +" External links detected");
  sizeLinks.style.color = "blue";
  //sizeLinks.appendChild(sizeLinksText);

  if (countThreats > 0) {
    var threatExists = document.getElementById('threat-exists');
    threatExists.innerHTML = countThreats + " Hijacking or Hook Threats Detected"
    threatExists.style.color="#BE2C2C";
  }
  else {
    let p = document.createElement("p");
    let content = document.createTextNode("No suspicious links here.");
    let parent = threatsList.parentNode;
  }
  var threatScore = Math.floor(countLinks/2)+(countThreats *5);
  var linksSecurity = document.getElementById('links-status');

  linksSecurity.setAttribute("value", threatScore.toString());
}

function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(setThirdPartyDomains);