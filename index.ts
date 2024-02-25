import express from 'express';
import * as bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'ws';
import router from './routes/routes';
import { initializeWebSocketServer } from './services/wsService';
import { MqttService } from './services/mqttService';

const app = express();
const port = 3000;

// Crear un servidor HTTP a partir de la instancia de Express
const server = createServer(app);

// Configurar el servidor WebSocket para que comparta el mismo puerto que HTTP
const wss = new WebSocketServer({ server });
const mqtt = new MqttService(wss);

// Configuración de bodyParser para analizar JSON en las solicitudes entrantes
app.use(bodyParser.json());

// Configuración de rutas
app.use('/api', router);

initializeWebSocketServer(server);

// Iniciar el servidor HTTP y WebSocket en el mismo puerto
server.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

export { wss, mqtt };