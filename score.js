const sumScore = () => {
    var webSec = document.getElementById('website-security-status');
    var scorePrint = document.getElementById("website-score");
    var links = document.getElementById('links-status').getAttribute('value');
    var cookies = document.getElementById('cookies-status').getAttribute('value');
    var localStorage = document.getElementById('local-storage-status').getAttribute('value');
    var sessionStorage = document.getElementById('session-storage-status').getAttribute('value');
    var fingerprint = document.getElementById('fingerprint-status').getAttribute('value');
    var privacy = document.getElementById('privacy-status').getAttribute('value');


    var linksScore = parseInt(links);
    var cookiesScore = parseInt(cookies);
    var lSScore = parseInt(localStorage);
    var sSScore = parseInt(sessionStorage);
    var fingerprintScore = parseInt(fingerprint);
    var privacyScore = parseInt(privacy);
  
    var progBar = document.getElementById('score-progress-bar');
  
    var score = linksScore + cookiesScore + lSScore + sSScore + fingerprintScore + privacyScore;
    scorePrint.innerHTML = "Total risk score: " + score +"/400";
    
    if(score > 250){
      webSec.innerHTML = "Website is Unsafe :(";
      webSec.style.color = "red";
      progBar.setAttribute("value", score);
    }
    else if(score > 150){
      webSec.innerHTML = "Website is Suspicious XP";
      webSec.style.color = "orange";
      progBar.setAttribute("value", score);
    }
    else{
      webSec.innerHTML = "Website is Safe XD";
      webSec.style.color = "green";
      progBar.setAttribute("value", score);
    }
  }
  
  function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }
  
  setTimeout(() => {
    getActiveTab().then(sumScore);
  }, 500);