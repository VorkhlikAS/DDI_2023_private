'use client'

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; // Import your CSS file

class MyNextApp extends Component {
  constructor(props) {
    super(props);
    this.messageContainerRef = React.createRef();
    this.state = {
      dialogues: [],
      currentDialogue: null,
      message: '',
    };
  }

  handleDialogueClick = (dialogue) => {
    this.setState({ currentDialogue: dialogue }, () => {
      this.scrollToBottom();
    });
  };
  

  handleAddDialogue = () => {
    const { dialogues } = this.state;
    dialogues.push({ messages: [] });
    this.setState({ dialogues });
  };

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };

handleSendMessage = () => {
  const { currentDialogue, message } = this.state;

  if (currentDialogue && message.trim() !== '') {
    const userMessage = { text: message, fromUser: true };
    const botMessage = {
      text: generateBotResponse(message),
      fromUser: false,
      liked: false,
      disliked: false,
    };

    currentDialogue.messages.push(userMessage, botMessage);

    this.setState({ currentDialogue, message: '' }, () => {
      this.scrollToBottomWithAnimation(); // Scroll after state update is complete
    });
  }
};


handleLike = (messageIndex) => {
  const { currentDialogue, dialogues } = this.state;
  if (currentDialogue) {
    const currentDialogueIndex = dialogues.indexOf(currentDialogue);
    const messages = currentDialogue.messages.slice();
    const message = messages[messageIndex];
    if (message) {
      message.liked = !message.liked;
      message.disliked = false; // Reset dislike
      dialogues[currentDialogueIndex].messages = messages;
      this.setState({ dialogues });
    }
  }
};

handleDislike = (messageIndex) => {
  const { currentDialogue, dialogues } = this.state;
  if (currentDialogue) {
    const currentDialogueIndex = dialogues.indexOf(currentDialogue);
    const messages = currentDialogue.messages.slice();
    const message = messages[messageIndex];
    if (message) {
      message.disliked = !message.disliked;
      message.liked = false; // Reset like
      dialogues[currentDialogueIndex].messages = messages;
      this.setState({ dialogues });
    }
  }
};

  scrollToBottom = () => {
    if (this.messageContainerRef.current) {
      this.messageContainerRef.current.scrollTop = this.messageContainerRef.current.scrollHeight;
    }
  };

  scrollToBottomWithAnimation = () => {
    if (this.messageContainerRef.current) {
      const messageContainer = this.messageContainerRef.current;
      const start = messageContainer.scrollTop;
      const end = messageContainer.scrollHeight - messageContainer.clientHeight;
      const duration = 500; // Adjust the duration to control the animation speed
  
      const startTime = performance.now();
  
      const scrollStep = (timestamp) => {
        const currentTime = timestamp - startTime;
        if (currentTime < duration) {
          const easing = easeInOutQuad(currentTime, 0, 1, duration);
          messageContainer.scrollTop = start + (end - start) * easing;
          window.requestAnimationFrame(scrollStep);
        } else {
          messageContainer.scrollTop = end;
        }
      };
  
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };
  
      window.requestAnimationFrame(scrollStep);
    }
  };

  render() {
    const { dialogues, currentDialogue, message } = this.state;

    return (
      <div className="container">
        <div className="dialogue-list"> {/* Apply CSS class to the left column */}
          <button onClick={this.handleAddDialogue} className="add-button">Add Dialogue</button>
          <ul>
            {dialogues.map((dialogue, index) => (
              <li
                key={index}
                onClick={() => this.handleDialogueClick(dialogue)}
                className={`dialogue-item ${currentDialogue === dialogue ? 'selected' : ''}`}
              >
                Dialogue {index + 1}
              </li>
            ))}
          </ul>
        </div>

        <div className="dialogue"> {/* Apply CSS class to the center dialogue */}
          <h3 className="dialogue-title">
            {currentDialogue ? `Dialogue ${dialogues.indexOf(currentDialogue) + 1}` : ''}
          </h3>
          <div className="message-container" ref={this.messageContainerRef}>
          {currentDialogue && currentDialogue.messages.map((msg, index) => (
            <div
            key={index}
            className={`message ${msg.fromUser ? 'user-message' : 'bot-message'}`}
          >
            <div
              className="message-icon"
              style={{ backgroundColor: msg.fromUser ? '#2ecc71' : '#4ecdc4' }}
            >
              {msg.fromUser ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <span className="message-text">
                {msg.fromUser ? `User: ${msg.text}` : `Bot: ${msg.text}`}
              </span>
            </div>
            {!msg.fromUser && (
              <div className="like-dislike">
                <button
                  className={`like-button ${msg.liked ? 'liked' : ''}`}
                  onClick={() => this.handleLike(index)}
                >
                  👍
                </button>
                <button
                  className={`dislike-button ${msg.disliked ? 'disliked' : ''}`}
                  onClick={() => this.handleDislike(index)}
                >
                  👎
                </button>
              </div>
            )}
          </div>
          
          ))}
          </div>
            <div className="input-container">
              <div className="input-buttons">
                <input
                  type="text"
                  className="message-input"
                  value={message}
                  onChange={this.handleMessageChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault(); // Prevents adding a newline in the input
                      this.handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                />
                  <button onClick={this.handleSendMessage} className="send-button">Send</button>
                  <button onClick={this.scrollToBottomWithAnimation} className="scroll-to-bottom-button">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
              </div>  
          </div>
        </div>
      </div>
    );
  }
}

export default MyNextApp;

// Simulated bot response generator
function generateBotResponse(userMessage) {
  // You can customize this function to generate bot responses based on user input.
  // For simplicity, it just echoes the user's message.
  return `${userMessage}`;
}

// Place the useClient pragma here, outside of the component class.
export const useClient = true;

