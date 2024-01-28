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
        const { emojiCode, user, quizTitle } = JSON.parse(message.toString());
        console.log('Received user reaction:', emojiCode, user, quizTitle);
        toast.info(<ToastContent emojiUrl={emojiCode} user={user} quizTitle={quizTitle}/>, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce
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