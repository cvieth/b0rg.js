dr0ne = {};
dr0ne.assimilate = function () {
    dr0ne.log('We are b0rg!');
    dr0ne.log('We will comply!');

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
    xmlhttp.open("GET", "demo_get.asp?t=" + Math.random(), true);
    xmlhttp.send();

}
;
dr0ne.log = function (message) {
    console.log('[dr0ne] ' + message);
};
dr0ne.read = function () {

}
dr0ne.assimilate();


