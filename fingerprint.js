const getFingerprint = async (tabs) => {
  let tab = tabs.pop();

  var fingerprintExists = document.getElementById('fingerprint-exists');
  var fingerprintId = document.getElementById('fingerprint-id');

  const response = await browser.tabs.sendMessage(tab.id, {
    method: "fingerprintData"
  });

  var websiteSecurity = document.getElementById('fingertprint-security-status');
  var fingerprintSecurity = document.getElementById('fingerprint-status');

  var fingerprintData = response.data;

  if (fingerprintData) {
    fingerprintExists.innerHTML = "You are being fingerprinted";
    fingerprintId.innerHTML = "The fingerprinter is "+ fingerprintData;
    fingerprintExists.style.color="#BE2C2C";
    websiteSecurity.style.color = "#BE2C2C";
    fingerprintSecurity.setAttribute("value", "100");
  } else{
    fingerprintExists.innerHTML = "No one is fingerprinting you";
    fingerprintId.innerHTML = "";
    fingerprintExists.style.color = "green";
    fingerprintSecurity.setAttribute("value", "0");
  }
}

function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(getFingerprint);