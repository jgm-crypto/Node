"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mqttRoutes.ts
const express_1 = require("express");
const mqttController_1 = require("../controllers/mqttController");
const router = (0, express_1.Router)();
router.get('/getData', mqttController_1.getDataMaster);
exports.default = router;
