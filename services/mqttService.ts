import * as mqtt from 'mqtt';
import { Server as WebSocketServer } from 'ws';
import { WebSocket } from 'ws';
import { mqttConfig } from '../utils/mqttConfig';

const topicResponse = 'sensor/data';

export class MqttService {
  private client: mqtt.MqttClient;
  private ws!: WebSocketServer;

  constructor(wss: WebSocketServer) {
    this.ws = wss;

    this.client = mqtt.connect(`mqtt://${mqttConfig.host}:${mqttConfig.port}`);

    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      this.subscribeToTopics();
    });

    this.client.on('message', (topic, messageBuffer) => {
      console.log(`Mensaje recibido en ${topic}: ${messageBuffer.toString()}`);

      if (topic === topicResponse) {
        const message = messageBuffer.toString();
        const data = JSON.parse(message);
        const dataAsString = JSON.stringify(data);
        console.log(data);
        if (this.ws && this.ws.clients) {
          this.ws.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(dataAsString)
            }
          })
        } else {
          console.log("WebSocket no definido.");
        }
      }
    });

    this.client.on('close', () => {
    })
  }

  private subscribeToTopics() {
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
    this.client.subscribe('sensor/data', (err) => {
      if (!err) {
        console.log('Suscripción a topic exitosa');
      }
    });
  }

  public publishMessage(topic: string, message: string) {

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
