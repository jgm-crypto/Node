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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttService = void 0;
const mqtt = __importStar(require("mqtt"));
const mqttConfig_1 = require("../utils/mqttConfig");
class MqttService {
    constructor() {
        this.client = mqtt.connect(`mqtt://${mqttConfig_1.mqttConfig.host}:${mqttConfig_1.mqttConfig.port}`);
        this.client.on('connect', () => {
            console.log('Conectado al broker MQTT');
            this.subscribeToTopics();
        });
        this.client.on('message', (topic, message) => {
            console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
            // Aquí puedes agregar lógica para manejar mensajes
        });
    }
    subscribeToTopics() {
        /*
          // Suscribirse a varios temas
          const topics = ['mi/tema', 'otro/tema', 'tercer/tema'];
          topics.forEach(topic => {
            this.client.subscribe(topic, (err) => {
              if (!err) {
                console.log(`Suscripción exitosa al tema: ${topic}`);
              } else {
                console.error(`Error al suscribirse al tema: ${topic}`, err);
              }
            });
          });
        */
        this.client.subscribe('mi/tema', (err) => {
            if (!err) {
                console.log('Suscripción a topic exitosa');
            }
        });
    }
    publishMessage(topic, message) {
        this.client.publish(topic, message);
        this.client.on('error', (error) => {
            console.error('Error de conexión:', error);
            this.client.end();
        });
        this.client.on('reconnect', () => {
            console.log('Reconectando al broker MQTT...');
        });
        this.client.on('offline', () => {
            console.log('El cliente MQTT está offline');
        });
        this.client.on('close', () => {
            console.log('Conexión cerrada');
        });
    }
}
exports.MqttService = MqttService;
