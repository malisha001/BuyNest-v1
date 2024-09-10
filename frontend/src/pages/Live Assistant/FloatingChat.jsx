import React, { useContext, useEffect, useState, useRef } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { useNavigate } from 'react-router-dom';

const FloatingChat = () => {
  const { isChatOpen, toggleChat, endSession } = useContext(ChatContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, from: 'assistant', audio: 'assistant-voice1.mp3', duration: '00:12' },
    { id: 2, from: 'user', audio: 'user-voice1.mp3', duration: '00:15' },
  ]); // Array to hold chat messages

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = (id) => {
    // Handle play and pause behavior for individual voice messages
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Floating Chat Box */}
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

          {/* Voice Chat Area with Differentiated Background */}
          <div className="mb-6 h-40 overflow-y-auto flex flex-col gap-4 p-4 bg-gray-900 bg-opacity-50 rounded-xl" role="log">
            {messages.slice(-2).map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.from === 'user' ? 'justify-end' : 'justify-start'
                }`}
                aria-label={`Voice message from ${message.from === 'user' ? 'you' : 'the assistant'}`}
              >
                <div
                  className={`relative rounded-lg p-2 w-max max-w-xs ${
                    message.from === 'user' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                  }`}
                  style={{ borderRadius: '15px 15px 15px 5px' }}
                >
                  {/* Play/Pause Button and Waveform */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayPause(message.id)}
                      className="focus:outline-none"
                      aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
                    >
                      {isPlaying ? (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fillRule="evenodd" d="M5 4a1 1 0 012 0v12a1 1 0 01-2 0V4zm8 0a1 1 0 112 0v12a1 1 0 11-2 0V4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 5.293a1 1 0 011.414 0L12 11.586V4a1 1 0 112 0v12a1 1 0 01-2 0v-7.586l-6.293 6.293a1 1 0 01-1.414-1.414l7-7a1 1 0 010-1.414l-7-7a1 1 0 00-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Waveform Simulation */}
                    <div className="w-24 h-4 bg-green-400 rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-green-500 animate-pulse"></div>
                    </div>
                  </div>

                  <audio ref={audioRef} src={message.audio} className="hidden" aria-hidden="true"></audio>
                  <p className="text-xs text-right mt-1 text-gray-300" aria-hidden="true">{message.duration}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Record Audio Button */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {}}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full px-4 py-2 shadow-md w-full text-base font-semibold transition-all focus:outline-none hover:from-green-600 hover:to-green-700"
              aria-live="polite"
              aria-label="Record your voice message"
            >
              Record Voice Message
            </button>
          </div>

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

          {/* Close/Minimize Chat Button */}
          <button
            onClick={toggleChat}
            className="mt-4 text-blue-400 underline text-sm w-full text-center focus:outline-none hover:text-blue-500"
            aria-label="Minimize live chat"
          >
            Minimize Chat
          </button>
        </div>
      )}

      {/* Floating button to reopen the chat if minimized */}
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
