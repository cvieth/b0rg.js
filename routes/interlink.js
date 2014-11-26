var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res) {
    var response = {};
    response.session = req.sessionID;
    response.jobs = [];

    var remoteAddress = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);

    var currentDrone = drones.findOne({'name': req.param('d')});
    if (currentDrone.length == 0) {
        console.log("Adding drone ...");
        drones.insert({
            name: req.param('d'),
            session: req.sessionID,
            timestamp: new Date().toString(),
            remoteAddress: remoteAddress,
            jobs: []
        });
        hive.save(function () {
            //console.log("Wrote HIVE to disk!")
        });
    } else {
        currentDrone.timestamp = new Date().toString();
        currentDrone.session = req.sessionID;
        currentDrone.remoteAddress = remoteAddress;
        currentDrone.jobs.forEach(function (job) {
            //console.log(entry);
            if(!job.done) {
                response.jobs.push(job.src);
                job.done = true;
            }
        });
        hive.save(function () {
            //console.log("Wrote HIVE to disk!")
        });
    }

    res.json(response);
});

module.exports = router;