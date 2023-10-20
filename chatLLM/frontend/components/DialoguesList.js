import React, { useState } from 'react';
import Dialogue from './Dialogue';

function DialoguesList() {
  const [dialogues, setDialogues] = useState([]);

  const addDialogue = () => {
    setDialogues([...dialogues, { messages: [] }]);
  };

  return (
    <div>
      <button onClick={addDialogue}>Add Dialogue</button>
      {dialogues.map((dialogue, index) => (
        <Dialogue key={index} dialogue={dialogue} />
      ))}
    </div>
  );
}

export default DialoguesList;

