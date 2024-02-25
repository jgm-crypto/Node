"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataMaster = void 0;
const index_1 = require("../index");
const getDataMaster = () => {
    const topic = 'java/request';
    const message = "master";
    index_1.mqtt.publishMessage(topic, message);
};
exports.getDataMaster = getDataMaster;
