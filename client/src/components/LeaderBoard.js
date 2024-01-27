import React, { useEffect } from 'react';
import mqtt from 'mqtt';
import { toast, Bounce } from 'react-toastify';

export default function LeaderBoard() {
  useEffect(() => {
    const mqttClient = mqtt.connect('ws://localhost:8000/mqtt');

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('quiz-updates');
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === 'quiz-updates') {
        const quizUpdate = JSON.parse(message.toString());
        toast.info(`${quizUpdate}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
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