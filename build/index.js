"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqtt = exports.wss = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const http_1 = require("http");
const ws_1 = require("ws");
const routes_1 = __importDefault(require("./routes/routes"));
const wsService_1 = require("./services/wsService");
const mqttService_1 = require("./services/mqttService");
const app = (0, express_1.default)();
const port = 3000;
// Crear un servidor HTTP a partir de la instancia de Express
const server = (0, http_1.createServer)(app);
// Configurar el servidor WebSocket para que comparta el mismo puerto que HTTP
const wss = new ws_1.Server({ server });
exports.wss = wss;
const mqtt = new mqttService_1.MqttService(wss);
exports.mqtt = mqtt;
// Configuración de bodyParser para analizar JSON en las solicitudes entrantes
app.use(bodyParser.json());
// Configuración de rutas
app.use('/api', routes_1.default);
(0, wsService_1.initializeWebSocketServer)(server);
// Iniciar el servidor HTTP y WebSocket en el mismo puerto
server.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
