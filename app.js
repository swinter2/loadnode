var request = require('request');

var config = {
    daemonCount: 1, // the number of daemons that should hit the site.
    idleTime: 1, // how long a daemon should wait before hitting the site again in seconds

    // url: "http://pepco.local/press-releases/?site=pepco",
    // url: "http://pepco.demo.ekdev.silvertech.net/press-releases/",
    url: "http://pepco.demo.ekdev.silvertech.net/default.aspx",
    // url: "http://pepco.demo.ekdev.silvertech.net/outage-center/",
    // url: "http://pepco.demo.ekdev.silvertech.net/connect-with-us/newsroom/",
    // url: "http://pepco.local/outage-center/?site=pepco",
    // url: "http://pepco.local/default.aspx?site=pepco",
    // url: "http://www.ektron.com/",
    // url: "http://pepco.demo.ekdev.silvertech.net/LoadTest.aspx"
    // url: "http://pepco.demo.ekdev.silvertech.net/forms/Pepco/other/OutageCode.aspx"
    // url : "http://pepco.demo.ekdev.silvertech.net/uploadedImages/MainSite/Content/Home/home-bg-1.jpg"
    // url : "http://pepco.demo.ekdev.silvertech.net/library/javascript/scripts.js"
    // url : "http://pepco.demo.ekdev.silvertech.net/favicon.ico"
    // url: "http://pepco.demo.ekdev.silvertech.net/forms/ace/GiftOfEnergy.aspx"
};

var args = process.argv.slice(2);
config.daemonCount = args[0] || config.daemonCount;
config.idleTime = args[1] || config.idleTime;
config.url = args[2] || config.url;

process.on("SIGINT", function () {
    console.log("Exiting...");
    process.exit();
});

console.log("Starting load test for " + config.url);

function Daemon(id) {
    this.id = id;
    this.go = function() {
        var me = this;
        var start = new Date();
        // console.log(me.id + ": Starting request - " + config.url);
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

