var spawn = require('child_process').spawn;

var host = 'http://localhost:80';
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
    return "" + 20;
}
function r(len) {
    len = len || url.length;
    return Math.floor(Math.random() * len);
}
function rs(max) {
    // return "1";
    max = max || 3;
    return "" + Math.floor((Math.random() * max) + 1);
}
function getUrl() {
    return url[r()];
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
