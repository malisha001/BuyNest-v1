import React, { useContext, useEffect, useState, useRef } from 'react';
import { FaPaperPlane, FaVolumeUp, FaMicrophone, FaCut } from 'react-icons/fa'; // Import the FaCut icon
import { ChatContext } from '../../context/ChatContext';
import axios from 'axios';
import useSpeechToText from '../../hooks/useSpeechToText';

const FloatingChat = () => {
  const { isChatOpen, toggleChat } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState('');
  const audioRef = useRef(null);

  const { isListning, transcript, startListning, stopListning } = useSpeechToText({
    lang: 'en-US',
    continuous: false,
    interimResults: false,
  });

  useEffect(() => {
    if (transcript) {
      setTypedMessage(transcript);
    }
  }, [transcript]);

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

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
      content: typedMessage,
    };

    try {
      await axios.post('http://localhost:4000/api/messages', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setTypedMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const readLastMessage = () => {
    if (messages.length === 0) {
      console.log('No messages to read');
      return;
    }

    const lastMessage = messages[messages.length - 1].content;
    const speech = new SpeechSynthesisUtterance(lastMessage);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  };

  const handleCutMessage = () => {
    setTypedMessage(''); // Clears the message input when "Cut" button is pressed
  };

  return (
    <>
      {isChatOpen && (
        <div
          className="fixed bottom-4 right-4 w-80 p-6 bg-black bg-opacity-70 shadow-2xl rounded-3xl z-50 backdrop-filter backdrop-blur-md border border-gray-800"
          role="dialog"
          aria-labelledby="live-chat-title"
          aria-describedby="live-chat-description"
        >
          <h2 id="live-chat-title" className="text-xl font-semibold text-white mb-4" aria-live="polite">
            Live Voice Chat
          </h2>

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

          <div className="mb-4 flex items-center">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={isListning ? stopListning : startListning}
              className={`ml-2 bg-${isListning ? 'red' : 'green'}-500 text-white rounded-full p-2 shadow-md transition-all hover:shadow-lg focus:outline-none`}
              aria-live="polite"
              aria-label="Start or stop voice input"
            >
              <FaMicrophone />
            </button>
          </div>

          {/* Redesigned Buttons in the same row */}
          <div className="flex justify-between items-center space-x-4 mt-4">
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full p-4 shadow-lg text-lg font-semibold transition-transform transform hover:scale-105 hover:from-green-500 hover:to-green-600 focus:outline-none"
              aria-live="polite"
              aria-label="Send your message"
            >
              <FaPaperPlane size={20} />
            </button>

            <button
              onClick={readLastMessage}
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full p-4 shadow-lg font-bold transition-transform transform hover:scale-105 hover:from-blue-500 hover:to-blue-600 focus:outline-none"
              aria-label="Read last message aloud"
            >
              <FaVolumeUp size={20} />
            </button>

            {/* Cut button */}
            <button
              onClick={handleCutMessage}
              className="bg-red-500 text-white rounded-full p-4 shadow-lg font-bold transition-transform transform hover:scale-105 focus:outline-none"
              aria-label="Clear the message"
            >
              <FaCut size={20} />
            </button>
          </div>

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
