dr0ne = {};
dr0ne.assimilate = function () {
    dr0ne.log('We are b0rg!');
    dr0ne.log('We will comply!');
    /*
     var xmlhttp;
     if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
     xmlhttp = new XMLHttpRequest();
     }
     else {// code for IE6, IE5
     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
     }
     xmlhttp.onreadystatechange = function () {
     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
     console.log(xmlhttp.responseText);
     }
     }
     xmlhttp.open("GET", "/interlink?t=" + Math.random(), true);
     xmlhttp.send();
     */

    //dr0ne.interLinkCheck();
    setInterval(dr0ne.interLinkCheck, dr0ne.interLinkFrequency);
}
;
dr0ne.log = function (message) {
    console.log('[dr0ne] ' + message);
    //document.write('[dr0ne] ' + message + '<br />');
    // var logEntry = document.createTextNode('[dr0ne] ' + message + '<br />');
    //document.getElementById("log").appendChild(logEntry);
};

/**
 *   Create XHR Object for interLink
 **/
dr0ne.interLink = undefined;
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    dr0ne.interLink = new XMLHttpRequest();
}
else {// code for IE6, IE5
    dr0ne.interLink = new ActiveXObject("Microsoft.XMLHTTP");
}

dr0ne.interLinkFrequency = 1000;
dr0ne.interLinkInterval = undefined;
dr0ne.interLinkRequestCounter = 0;
dr0ne.interLinkResponseCounter = 0;

/**≠
 *   Create XHR Ready Callback
 **/
dr0ne.interLinkAnswer = function () {
    // Only react if reciving ansewer is complete
    if (dr0ne.interLink.readyState == 4) {
        //dr0ne.log('Response revived!');
        dr0ne.interLinkResponseCounter = dr0ne.interLinkResponseCounter + 1;
        dr0ne.log('Response Count: ' + dr0ne.interLinkResponseCounter);
        //console.log(dr0ne.interLink.responseText);
    }
};
dr0ne.interLink.onreadystatechange = dr0ne.interLinkAnswer;

dr0ne.interLinkCheck = function () {
    //dr0ne.log('Checking interLink ...');
    dr0ne.interLinkRequestCounter = dr0ne.interLinkRequestCounter + 1;
    dr0ne.log('Request Count: ' + dr0ne.interLinkRequestCounter);
    dr0ne.interLink.open("GET", "/interlink?t=" + Math.random(), true);
    dr0ne.interLink.send();
};

dr0ne.interLinkDisconnect = function () {
    dr0ne.log('Disconnecting dr0ne from HIVE ...');
    clearInterval(dr0ne.interLinkInterval);
}

dr0ne.assimilate();


