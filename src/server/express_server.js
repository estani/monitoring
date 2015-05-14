'use strict';

var express = require('express');
var app = express();
var config = require('../../package.json').config;
var colors = require('colors');
var path = require('path');
var fs = require('fs');
var sh = require('shelljs');
var fixtures = config.fixtures || 'test/fixtures';

app.get(/^\/rest\/.*/, function (req, res) {
    var file = fixtures + req.path + '.json';

    console.log('Sending fixture: %s'.yellow , file);
    try {
        res.json(JSON.parse(fs.readFileSync(file, 'utf8')));
    } catch (err) {
        console.log('Error processing %s: %s'.red, req.path, err);
        res.status(404).end();
    }
});

if (config.static) {
    var dirs = config.static;
    if (typeof config.static === 'string') {
        dirs = [config.static];
    }
    for (var i in dirs) {
        app.use(express.static(dirs[i]));
    }
    console.log('Serving static content from:'.green, dirs.join().cyan);
}

var server = app.listen(config.port || 8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at '.green + 'http://%s:%s'.cyan, host, port);
});
