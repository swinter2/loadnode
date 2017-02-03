var spawn = require('child_process').spawn;

var config = {
    daemonCount: 1, // the number of daemons that should hit the site.
    idleTime: 1, // how long a daemon should wait before hitting the site again in seconds
    url: ""
};

var args = process.argv.slice(2);
config.daemonCount = args[0] || config.daemonCount;
config.idleTime = args[1] || config.idleTime;
config.url = args[2] || config.url;

var host = config.url;
var paths = [
    "/"
    // "/about-us/",
    // "/etc/"
];
var url = [];
for(var i in paths) {
    url.push(host + paths[i]);
}

console.log("Spawning load tester processes...")

function daemons() {
    return `${config.daemonCount}`;
}
function r(len) {
    len = len || url.length;
    return Math.floor(Math.random() * len);
}
function rs(max) {
    return `${config.idleTime}`
    // return "1";
    // max = max || 3;
    // return "" + Math.floor((Math.random() * max) + 1);
}
function getUrl() {
    return config.url
    // return url[r()];
}

function makeWorker(id) {
    id = id || 0;
    var w = spawn('node', ['app.js', daemons(), rs(), getUrl()]);
    w.stdout.on("data", function (data) {
        console.log("worker-" + id + "| " + data);
    });
    return w;
}

var workers = [];
for (var i=1; i<=5; i++) {
    workers.push(makeWorker(i));
}

process.on("SIGINT", function () {
    console.log("Killing child processes...");
    for (var i in workers) {
        workers[i].kill("SIGINT");
    }
    console.log("Exiting...");
});
