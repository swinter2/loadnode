var request = require('request');

var config = {
    daemonCount: 1, // the number of daemons that should hit the site.
    idleTime: 1, // how long a daemon should wait before hitting the site again in seconds
    url: ""
};

var args = process.argv.slice(2);
config.daemonCount = args[0] || config.daemonCount;
config.idleTime = args[1] || config.idleTime;
config.url = args[2] || config.url;

process.on("SIGINT", function () {
    console.log("Exiting...");
    process.exit();
});

console.log("Starting load test for " + config.url + "\nDaemons: " + config.daemonCount + "\nIdle Time: " + config.idleTime + " seconds.");

function Daemon(id) {
    this.id = id;
    this.go = function() {
        var me = this;
        var start = new Date();
        request(config.url, function (error, response, body) {
            var stop = new Date();
            var duration = Math.abs(stop - start) / 1000; // in milliseconds, so convert to seconds
            var message = me.id + ": " + duration + " seconds - ";

            if (error) {
                message += "Error: " + config.url;
            }
            else {
                message += response.statusCode + " - " + config.url;
            }
            console.log(message);

            setTimeout(function () {
                me.go();
            }, config.idleTime * 1000);
        });
    };
}

var daemons = [];
for (var i=0; i < config.daemonCount; i++) {
    var d = new Daemon("daemon-" + i);
    daemons.push(d);
    d.go();
}

