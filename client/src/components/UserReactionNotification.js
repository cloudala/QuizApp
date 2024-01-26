import React, { useEffect } from 'react';
import mqtt from 'mqtt';
import { toast, Bounce } from 'react-toastify';
import ToastContent from './ToastContent';

export default function UserReactionNotification() {
  useEffect(() => {
    const mqttClient = mqtt.connect('ws://localhost:8000/mqtt');

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('user-reactions');
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === 'user-reactions') {
        console.log('Received user reaction:', JSON.parse(message.toString()));
        const emojiUrl = JSON.parse(message.toString());
        toast.info(<ToastContent emojiUrl={emojiUrl}/>, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          body: <img alt="Emoji" style={{ width: '30px' }} src={emojiUrl} />,
        });
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  return (
    <div>
    </div>
  );
};