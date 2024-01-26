import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://localhost:8000/mqtt');

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('leaderboard');
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === 'leaderboard') {
        console.log('Received leaderboard update:', JSON.parse(message.toString()));
        // Update the leaderboard state
        setLeaderboard(prevLeaderboard => [...prevLeaderboard, JSON.parse(message.toString())]);
      }
    });

    // Cleanup on component unmount
    return () => {
      mqttClient.end();
    };
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((elem, id) => {
            return <li key={id}>{elem}</li>
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;