import React from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

function Dialogue({ dialogue }) {
  return (
    <div>
      {dialogue.messages.map((message, index) => (
        <Message key={index} text={message} />
      ))}
      <MessageInput />
    </div>
  );
}

export default Dialogue;

