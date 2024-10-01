import React, { useContext, useEffect, useState, useRef } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import useSpeechToText from '../../hooks/useSpeechToText'; // Import the custom hook

const FloatingChat = () => {
  const { isChatOpen, toggleChat, endSession } = useContext(ChatContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState(''); // New state for typed message
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Integrate the useSpeechToText hook
  const { isListning, transcript, startListning, stopListning } = useSpeechToText({
    lang: 'en-US',
    continuous: false,
    interimResults: false,
  });

  // Update the chat input with the transcribed text when available
  useEffect(() => {
    if (transcript) {
      setTypedMessage(transcript); // Set the transcribed text in the chat input
    }
  }, [transcript]);

  // Function to fetch messages
  const fetchMessages = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo || !userInfo.id || !userInfo.email) {
      console.error('User information not found in localStorage');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/messages/${userInfo.id}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  // Fetch messages every 2 seconds
  useEffect(() => {
    fetchMessages(); // Initial fetch

    const intervalId = setInterval(fetchMessages, 2000); // Refresh messages every 2 seconds

    return () => {
      clearInterval(intervalId); // Cleanup interval on unmount
    };
  }, []); // Empty dependency array to run on mount

  // Function to handle sending the message to the backend
  const handleSendMessage = async () => {
    if (typedMessage.trim() === '') return;

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo || !userInfo.id || !userInfo.email) {
      console.error('User information not found in localStorage');
      return;
    }

    const newMessage = { 
      userId: userInfo.id, 
      userEmail: userInfo.email, 
      from: 'user', 
      content: typedMessage 
    };

    try {
      await axios.post('http://localhost:4000/api/messages', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setTypedMessage(''); // Clear the input after sending
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Function to read the last message aloud
  const readLastMessage = () => {
    if (messages.length === 0) {
      console.log('No messages to read');
      return;
    }

    const lastMessage = messages[messages.length - 1].content;

    // Using the Web Speech API for text-to-speech
    const speech = new SpeechSynthesisUtterance(lastMessage);
    speech.lang = 'en-US'; // Set the language
    window.speechSynthesis.speak(speech);
  };

  return (
    <>
      {isChatOpen && (
        <div
          className="fixed bottom-4 right-4 w-80 p-6 bg-black bg-opacity-70 shadow-2xl rounded-3xl z-50"
          role="dialog"
          aria-labelledby="live-chat-title"
          aria-describedby="live-chat-description"
          style={{ backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <h2
            id="live-chat-title"
            className="text-xl font-semibold text-white mb-4"
            aria-live="polite"
          >
            Live Voice Chat
          </h2>

          {/* Message list */}
          <div className="mb-6 h-40 overflow-y-auto flex flex-col gap-4 p-4 bg-gray-900 bg-opacity-50 rounded-xl" role="log">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                aria-label={`Message from ${message.from === 'user' ? 'you' : 'the assistant'}`}
              >
                <div
                  className={`relative rounded-lg p-2 w-max max-w-xs ${
                    message.from === 'user' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                  }`}
                  style={{ borderRadius: '15px 15px 15px 5px' }}
                >
                  <p className="text-sm">{message.content || 'Audio message'}</p>
                  <audio ref={audioRef} src={message.audio} className="hidden" aria-hidden="true"></audio>
                  <p className="text-xs text-right mt-1 text-gray-300" aria-hidden="true">
                    {message.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Typing box for user input */}
          <div className="mb-4 flex items-center">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
            />
            {/* Microphone button to trigger voice input */}
            <button 
              onClick={isListning ? stopListning : startListning} 
              className={`ml-2 bg-${isListning ? 'red' : 'green'}-500 text-white rounded-full p-2 shadow-md`}
              aria-live="polite"
              aria-label="Start or stop voice input"
            >
              🎤
            </button>
          </div>

          {/* Send message button */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full px-4 py-2 shadow-md w-full text-base font-semibold transition-all focus:outline-none hover:from-blue-600 hover:to-blue-700"
              aria-live="polite"
              aria-label="Send your message"
            >
              Send Message
            </button>
          </div>

          {/* Button to read the last message */}
          <button
            onClick={readLastMessage}
            className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-bold w-full shadow-md hover:from-purple-600 hover:to-purple-700 transition-all focus:outline-none"
            aria-label="Read last message aloud"
          >
            Read Last Message
          </button>

          {/* End Session Button */}
          <button
            onClick={() => {
              endSession();
              navigate('/end-session');
            }}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold w-full shadow-md hover:from-red-600 hover:to-red-700 transition-all focus:outline-none"
            aria-label="End live voice session"
          >
            End Session
          </button>

          <button
            onClick={toggleChat}
            className="mt-4 text-blue-400 underline text-sm w-full text-center focus:outline-none hover:text-blue-500"
            aria-label="Minimize live chat"
          >
            Minimize Chat
          </button>
        </div>
      )}

      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all z-50 focus:outline-none"
          aria-label="Open live chat"
        >
          Open Chat
        </button>
      )}
    </>
  );
};

export default FloatingChat;
