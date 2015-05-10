;(function() {
    var path = require('path');
    var appDir = path.dirname(require.main.filename);
    var httpServer = require('http-server');
    var config = require('../../package.json').config;
    var colors = require('colors');

    var log = config.silent ? (function(){}) : console.log;

    var host =  config.host || '0.0.0.0',
        port =  config.port || 8080,
        ssl =   config.ssl,
        showDir = config.showDir,
        proxy = config.proxy;

    var options = {
        cache:  config.cache_time || -1,
        root:   config.root || appDir + '/../..'
    }

    var server = httpServer.createServer(options);

    server.listen(port, host, function () {
        var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
            protocol      = ssl ? 'https:' : 'http:';

        log('Starting up http-server, serving '.yellow
            + server.root.cyan
            + (ssl ? (' through'.yellow + ' https'.cyan) : '')
            + ' on: '.yellow
            + (protocol + '//' + host + ':' + port).cyan);

        if (typeof proxy === 'string') {
            log('Unhandled requests will be served from: ' + proxy);
        }

        log('Hit CTRL-C to stop the server');
    });
    if (process.platform === 'win32') {
        require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }).on('SIGINT', function () {
            process.emit('SIGINT');
        });
    }

    process.on('SIGINT', function() {
        log('http-server stopped.'.red);
        process.exit();
    });
    
})();
