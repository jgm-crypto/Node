"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqttService_1 = require("./services/mqttService");
// Instanciar el servicio
const mqttService = new mqttService_1.MqttService();
// Publicar un mensaje de prueba
const topic = 'mi/tema';
const message = 'Mensaje de prueba';
setInterval(() => {
    try {
        // Se pueden mandar datos a diferentes topics o canales en el mismo proceso
        mqttService.publishMessage(topic, message);
    }
    catch (e) {
        console.error(e);
    }
}, 5000);
// El manejo de mensajes entrantes ya está configurado en la clase MqttService
