var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

    if (req.param('command') != undefined) {
        drones.data.forEach(function (drone) {
            console.log(drone);
            var job = {
                done: false,
                src: req.param('command')
            };
            if (drone.jobs == undefined) {
                drone.jobs = [];
            }
            drone.jobs.push(job);
        })
    }
    console.log(req.param('name'));

    ;
    res.render('command', {
        numDrones: drones.data.length
    });
});

router.get('/stats', function (req, res) {
    res.render('stats', {
        title: 'b0rg.js',
        subline: 'resistance is futile',
        numDrones: drones.data.length
    });
});

router.get('/list', function (req, res) {
    console.log(drones);
    res.render('list', {
        drones: drones.data
    });
});

router.get('/details', function (req, res) {
    var currentDrone = drones.findOne({'name': req.param('name')});
    console.log(currentDrone);
    if (currentDrone.length == 0) {

    } else {
        res.render('details', {
            drone: currentDrone
        });
    }

});

module.exports = router;
