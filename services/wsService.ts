import { wss } from '../index';

const { getDataMaster } = require('../controllers/mqttController');

export const initializeWebSocketServer = (server: any) => {

  wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado');

    ws.on('message', (message) => {
      console.log('Mensaje recibido:', message);

      const msgAsString = message.toString();
      const parsedMessage = JSON.parse(msgAsString);
      console.log(parsedMessage.action);

      switch (parsedMessage.action) {
        case 'master':
          // Llama al método para la acción uno
          getDataMaster();
          break;
        default:
          // Manejar acción desconocida o enviar un mensaje de error
          ws.send(JSON.stringify({ error: 'Acción desconocida' }));
      }
    });

    ws.on('close', () => {
      console.log('Cliente WebSocket desconectado');
    });
  });
};