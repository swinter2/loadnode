var spawn = require('child_process').spawn;

console.log("Spawning load tester processes...")
var worker1 = spawn('node', ['app.js', '20', '1', "http://pepco.demo.ekdev.silvertech.net/outage-center/"]);
var worker2 = spawn('node', ['app.js', '20', '1', "http://pepco.demo.ekdev.silvertech.net/default.aspx"]);
var worker3 = spawn('node', ['app.js', '20', '1', "http://pepco.demo.ekdev.silvertech.net/press-releases/"]);
var worker4 = spawn('node', ['app.js', '20', '1', "http://pepco.demo.ekdev.silvertech.net/outage-center/"]);
var worker5 = spawn('node', ['app.js', '20', '3', "http://pepco.demo.ekdev.silvertech.net/default.aspx"]);

// var worker1 = spawn('node', ['app.js', '20', '1', "http://www.pepco.com/home/"]);
// var worker2 = spawn('node', ['app.js', '20', '1', "http://www.pepco.com/home/"]);
// var worker3 = spawn('node', ['app.js', '20', '1', "http://www.pepco.com/home/"]);
// var worker4 = spawn('node', ['app.js', '20', '1', "http://www.pepco.com/home/"]);
// var worker5 = spawn('node', ['app.js', '20', '3', "http://www.pepco.com/home/"]);

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
