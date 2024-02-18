"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("mqtt/*"));
const client = _1.default.connect('mqtt://broker.hivemq.com');
client.on('connect', function () {
    client.subscribe('mytopic', function (err) {
        if (!err) {
            client.publish('mytopic', 'Hello MQTT');
        }
    });
});
client.on('message', function (topic, message) {
    // message is a Buffer
    console.log(message.toString());
    client.end();
});
