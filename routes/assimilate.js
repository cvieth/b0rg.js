var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res) {
    res.sendFile('assimilation.js', {root: path.join(__dirname, '../modules')});
    console.log(req.sessionID);
    //console.log(req.session);
});

module.exports = router;