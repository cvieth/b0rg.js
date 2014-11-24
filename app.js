var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

var routes = require('./routes/index');
//var users = require('./routes/users');
var assimilate = require('./routes/assimilate');
var interlink = require('./routes/interlink');
var app = express();

package = require('./package.json');

/**
 * Initializing Database
 * @type {loki|exports}
 */
var loki = require('lokijs');
var hiveFile = 'databases/hive.json';
hive = new loki(hiveFile);
var fs = require('fs');

if (fs.existsSync(hiveFile)) {
    hive.loadDatabase(function () {
        console.log('HIVE Loaded!')
        drones = hive.getCollection('drones');

    });
} else {
    hive.save(function () {
        console.log("Wrote HIVE to disk!");
        drones = hive.addCollection('drones');
    });
}





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: '1234567890QWERTY'}));

app.use('/', routes);
//app.use('/users', users);
app.use('/assimilate', assimilate);
app.use('/interlink', interlink);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    console.log("foo");
    if (options.cleanup) console.log('clean');
    if (err) {
        console.log(err);
        console.log(err.stack);
    };
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup: true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit: true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit: true}));