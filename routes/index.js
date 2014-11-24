var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('command', {
      numDrones: drones.data.length
        });
});

router.get('/stats', function(req, res) {
    res.render('stats', {
        title: 'b0rg.js',
        subline: 'resistance is futile',
        numDrones: drones.data.length
    });
});

router.get('/list', function(req, res) {
    console.log(drones);
    res.render('list', {
        drones: drones.data
    });
});

router.get('/details', function(req, res) {
    res.render('details', {
    });
});

module.exports = router;
