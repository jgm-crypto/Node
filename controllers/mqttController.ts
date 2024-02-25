import { mqtt } from "../index";

export const getDataMaster = () => {
    const topic = 'java/request';
    const message = "master";

    mqtt.publishMessage(topic, message);
};
