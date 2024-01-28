import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import mqtt from 'mqtt'

export default function EmojiPicker({ user, quizTitle }) {
  const mqttClient = mqtt.connect('ws://localhost:8000/mqtt');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject)
    setChosenEmoji(emojiObject);
    const emojiCode = emojiObject.target.src;
    mqttClient.publish('user-reactions', JSON.stringify({ emojiCode, user, quizTitle }));
    setIsPickerVisible(false);
  };

  const togglePickerVisibility = () => {
    setIsPickerVisible((prev) => !prev);
  };

  return (
    <div>
      {chosenEmoji ? (
        <div>
          <span className='font-semibold text-l'>Your Reaction:</span>
          <img alt="Emoji" style={{ width: '30px' }} src={chosenEmoji.target.src} />
        </div>
      ) : (
        <div>React to quiz to see your reaction here!</div>
      )}
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-3" onClick={togglePickerVisibility}>React to Quiz</button>
      <div>
        {isPickerVisible && <Picker reactionsDefaultOpen={true} onEmojiClick={onEmojiClick} />}
      </div>
    </div>
  );
}
