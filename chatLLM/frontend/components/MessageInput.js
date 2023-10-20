import React, { useState } from 'react';

function MessageInput() {
  const [message, setMessage] = useState('');

  const handleMessageSend = () => {
    // Handle sending the message (e.g., save to local storage or API)
    // Update the dialogue's messages state accordingly
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
}

export default MessageInput;

