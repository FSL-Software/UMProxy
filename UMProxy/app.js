var dgram = require('dgram');
var EventEmitter = require('events').EventEmitter;
var inspect = require('object-inspect');

var config = require('./config.json');

var serverIp = config.serverIp;
var serverPort = config.serverPort;

var client = dgram.createSocket("udp4");
var proxy = new EventEmitter();

var connections = {};

function proxyStart() {
    client.bind(config.proxyPort, "0.0.0.0");
    client.on("message", function (msg, info) {
        packetReceive(msg, info);
    });
}

function packetReceive(msg, info) {
    if (!connections[info.port]) {
            console.log("[Connection] New connection from " + info.address + ":" + info.port);
            connections[info.port] = {
                port: info.port,
                ip: info.address,
                time: new Date().getTime(),
                socket: dgram.createSocket("udp4")
            };
            connections[info.port].socket.bind(info.port);
            connections[info.port].socket.on("message", function (msg2, info2) {
                client.send(msg2, 0, msg2.length, info.port, info.address);
            });
        }
        connections[info.port].socket.send(msg, 0, msg.length, serverPort, serverIp);
}

proxyStart();
console.log("[Proxy] Proxy listening on port " + config.proxyPort);
console.log("[Proxy] To stop proxy-script use Ctrl+C");