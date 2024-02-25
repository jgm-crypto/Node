interface MqttConfig {
    host: string;
    port: number;
    username?: string;
    password?: string;
  }
  
  // Configuración del broker MQTT
  export const mqttConfig: MqttConfig = {
    host: 'localhost', // Cambia esto por tu broker MQTT
    port: 1883, // Puerto estándar para MQTT sin cifrado, cambia según tu configuración
    username: '', // Opcional, dependiendo de tu broker
    password: '', // Opcional, dependiendo de tu broker
  };
  