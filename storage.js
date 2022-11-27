const showAllLocalStorage = async (tabs) => {
  let tab = tabs.pop();
  var listHTML = document.getElementById('local-storage-list');
  var sizeHTML = document.getElementById('size-local-storage');
  let localStorageLength = 0;

  const response = await browser.tabs.sendMessage(tab.id, { 
    method: "localStorageData"
  });

  var localStorageSecurity = document.getElementById('local-storage-status');

  if (response.data.length > 0) {
    for (let localStorageItem of response.data) {
      if (localStorageItem) {
        localStorageLength++;
        let li = document.createElement("li");
        let content = document.createTextNode(localStorageItem);
        li.appendChild(content);
        listHTML.appendChild(li);
      }
    }
    let sizeContent = document.createTextNode("Number of items on Local Storage: " + localStorageLength);
    sizeHTML.appendChild(sizeContent);
    
    if(localStorageLength > 50){
      localStorageSecurity.setAttribute("value", "50");
    } else if (localStorageLength > 25 && localStorageLength < 50){
      localStorageSecurity.setAttribute("value", localStorageLength.toString());
    } else {
      localStorageSecurity.setAttribute("value", localStorageLength.toString());
    }

  } else {
    var localStorageDropdown = document.getElementById('local-storage-dropdown');
    //localStorageDropdown.style.display = "None";
    let noLocalStorageTag = document.createElement("h4");
    let noLocalStorageData = document.createTextNode("No local storage data here.");

    noLocalStorageTag.appendChild(noLocalStorageData);
    listHTML.appendChild(noLocalStorageTag);
  }
}
  

const showAllSessionStorage = async (tabs) => {
  let tab = tabs.pop();
  var listHTML = document.getElementById('session-storage-list');
  var sizeHTML = document.getElementById('size-session-storage');
  let sessionStorageLength = 0;

  const response = await browser.tabs.sendMessage(tab.id, { 
    method: "sessionStorageData" 
  });

  var sessionStorageSecurity = document.getElementById('session-storage-status');

  if (response.data.length > 0) {
    for (let sessionStorageItem of response.data) {
      if (sessionStorageItem) {
        sessionStorageLength++;
        let li = document.createElement("li");
        let content = document.createTextNode(sessionStorageItem);
        li.appendChild(content);
        listHTML.appendChild(li);
      }
    }
    let sizeContent = document.createTextNode("Number of items on Session Storage: " + sessionStorageLength);
    sizeHTML.appendChild(sizeContent);

    

    if(sessionStorageLength > 20){
      sessionStorageSecurity.setAttribute("value", "20");
    } else if (sessionStorageLength > 10 && sessionStorageLength < 20){
      sessionStorageSecurity.setAttribute("value", sessionStorageLength.toString());
    } else {
      sessionStorageSecurity.setAttribute("value", sessionStorageLength.toString());
    }
  } else {
    var sessionStorageDropdown = document.getElementById('session-storage-dropdown');
    //sessionStorageDropdown.style.display = "None";
    let noSessionStorageTag = document.createElement("h4");
    let noSessionStorageData = document.createTextNode("No session storage here.");

    noSessionStorageTag.appendChild(noSessionStorageData);
    listHTML.appendChild(noSessionStorageTag);
  }
}
  
function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(showAllLocalStorage);
getActiveTab().then(showAllSessionStorage);