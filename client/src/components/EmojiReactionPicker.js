import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import mqtt from 'mqtt'

export default function EmojiPicker() {
  const mqttClient = mqtt.connect('ws://localhost:8000/mqtt');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject)
    setChosenEmoji(emojiObject);
    const emojiCode = emojiObject.target.src;
    mqttClient.publish('user-reactions', JSON.stringify(`${emojiCode}`))
    setIsPickerVisible(false);
  };

  const togglePickerVisibility = () => {
    setIsPickerVisible((prev) => !prev);
  };

  return (
    <div>
      {chosenEmoji ? (
        <div>
          Your Emoji:
          <img alt="Emoji" style={{ width: '30px' }} src={chosenEmoji.target.src} />
        </div>
      ) : (
        <div>No Emoji</div>
      )}
      <button onClick={togglePickerVisibility}>Toggle Emoji Picker</button>
      <div>
        {isPickerVisible && <Picker reactionsDefaultOpen={true} onEmojiClick={onEmojiClick} />}
      </div>
    </div>
  );
}
