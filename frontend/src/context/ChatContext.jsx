// ChatContext.js
import React, { createContext, useState } from 'react';

// Create context
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(true); // Controls chat visibility
  const [isMuted, setIsMuted] = useState(false); // Controls mute/unmute
  const [sessionTime, setSessionTime] = useState(0); // Tracks session time

  // Function to toggle mute state
  const toggleMute = () => setIsMuted((prev) => !prev);

  // Function to open or close chat
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  // Function to end session
  const endSession = () => {
    setIsChatOpen(false);
    setSessionTime(0); // Reset session time on end
  };

  return (
    <ChatContext.Provider value={{ isChatOpen, toggleChat, isMuted, toggleMute, sessionTime, setSessionTime, endSession }}>
      {children}
    </ChatContext.Provider>
  );
};
