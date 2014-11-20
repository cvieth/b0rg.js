var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res) {
    //res.sendFile('interlink.js', {root: path.join(__dirname, '../modules')});
    //res.write('OK');
    var response = {};
    response.session = req.sessionID;
    response.jobs = [];
    response.jobs.push('console.log("WORKS!");');
    //res.json("OK");
    res.json(response);
    console.log('[interLink] Request from :' + req.sessionID);
    //console.log(req.session);
});

module.exports = router;