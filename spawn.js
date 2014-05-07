var spawn = require('child_process').spawn;

// var url = "http://pepco.local:8013/";
// var url = "http://pepco.demo.ekdev.silvertech.net/";
// var url = "http://pepco.demo.ekdev.silvertech.net/outage-center/";
// var url = "http://pepco.local:8013/library/templates/Interior.aspx?pageid=740&site=pepco";
// var url = "http://pepco.demo.ekdev.silvertech.net/outage-center/";
// var url = "http://pepco.demo.ekdev.silvertech.net/press-releases/";
// var url = "http://pepco.local:8013/library/templates/Interior.aspx?pageid=591&site=pepco";

var url = [
    "http://pepco.demo.ekdev.silvertech.net/",
    "http://pepco.demo.ekdev.silvertech.net/press-releases/",
    "http://pepco.demo.ekdev.silvertech.net/outage-center/"
];

console.log("Spawning load tester processes...")

var worker1 = spawn('node', ['app.js', '20', '1', url[0]]);
var worker2 = spawn('node', ['app.js', '20', '1', url[1]]);
var worker3 = spawn('node', ['app.js', '20', '1', url[2]]);
var worker4 = spawn('node', ['app.js', '20', '1', url[0]]);
var worker5 = spawn('node', ['app.js', '20', '3', url[1]]);

worker1.stdout.on("data", function (data) {
    console.log("worker-1| " + data);
});
worker2.stdout.on("data", function (data) {
    console.log("worker-2| " + data);
});
worker3.stdout.on("data", function (data) {
    console.log("worker-3| " + data);
});
worker4.stdout.on("data", function (data) {
    console.log("worker-4| " + data);
});
worker5.stdout.on("data", function (data) {
    console.log("worker-5| " + data);
});

process.on("SIGINT", function () {
    console.log("Killing child processes...");
    worker1.kill("SIGINT");
    worker2.kill("SIGINT");
    worker3.kill("SIGINT");
    worker4.kill("SIGINT");
    worker5.kill("SIGINT");
    console.log("Exiting...");
});
