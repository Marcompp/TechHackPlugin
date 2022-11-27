
const getPrivacy = async (tabs) => {
    let tab = tabs.pop();
    let countPrivacy = 0;

    const html = (await (await fetch(tab.url)).text()); // html as text
    const doc = new DOMParser().parseFromString(html, 'text/html');


    var privacyExists = document.getElementById('privacy-exists');
    var privacyList = document.getElementById('privacy-list');

    var find = html.toLowerCase().search('privacy');
    var end = 0;

    breakpoints = [" ",">","<","}","{","[","]","(",")",'"']

    while (find > 0) {//html.length
        end = find;
        while (end > 0) {
            end--;
            if (breakpoints.includes(html[end])) {
                end++;
                break;
            }
        }
        while (find <html.length) {
            find++;
            if (breakpoints.includes(html[find])) {
                break;
            }
        }
        if ((find-end) > 7) {
            let li = document.createElement("li");
            let content = document.createTextNode(html.substring(end,find));
            li.appendChild(content);
            privacyList.appendChild(li);
            countPrivacy++;
        }
        end = html.substring(find).toLowerCase().search('privacy');
        if (end > 0) {
            find += end;
        }
        else {
            find = end;
        }
    }

    var privacyDropdown = document.getElementById('privacy-dropdown');
    var privacySecurity = document.getElementById('privacy-status');

    if (countPrivacy > 0) {
        privacyExists.innerHTML = "Mentions of privacy in source: "+countPrivacy;
        privacyExists.style.color = "green";
        privacySecurity.setAttribute("value", "0");
    }
    else {
        privacyExists.innerHTML = "No mentions of privacy found in source";
        websiteSecurity.style.color = "#BE2C2C";
        fingerprintSecurity.setAttribute("value", "50");
        //privacyDropdown.style.display = "None";
        //privacyExists.style.color = "red";
    }
    //privacyList.innerHTML = html;

}

getActiveTab().then(getPrivacy);
