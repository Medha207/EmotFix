import React, { useState } from 'react';
import './index.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey there! Tell me your mood and I’ll suggest some movies 🎬", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    const response = getBotResponse(input);

    setMessages([...messages, newMessage, { text: response, sender: "bot" }]);
    setInput("");
  };

  const getBotResponse = (msg) => {
    const mood = msg.toLowerCase();
    if (mood.includes("happy")) return "Try 'Zindagi Na Milegi Dobara' or 'Oh My Kadavule'!";
    if (mood.includes("sad")) return "Watch 'Anand' or 'The Pursuit of Happyness'.";
    if (mood.includes("angry")) return "Cool down with 'Inside Out' or '3 Idiots'.";
    if (mood.includes("thrilled")) return "Try 'Inception' or 'Interstellar'.";
    return "Hmm... I didn’t catch that! Tell me how you feel 😄";
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your mood..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
