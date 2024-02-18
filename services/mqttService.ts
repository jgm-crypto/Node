import * as mqtt from 'mqtt';
import { mqttConfig } from '../utils/mqttConfig';

export class MqttService {
  private client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect(`mqtt://${mqttConfig.host}:${mqttConfig.port}`);

    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      this.subscribeToTopics();
    });

    this.client.on('message', (topic, message) => {
      console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
      // Aquí puedes agregar lógica para manejar mensajes
    });
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
    this.client.subscribe('mi/tema', (err) => {
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
