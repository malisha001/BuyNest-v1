import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { AuthContextProvider } from "./context/authContext.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx"; // Import ChatProvider
import AccessibilityTaskbar from "./pages/Accessibility/AccessibilityTaskbar.jsx"; // Import the taskbar component

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ShopContextProvider>
        <ChatProvider>
          {/* Global Accessibility Taskbar */}
          <AccessibilityTaskbar />  
          <App />
        </ChatProvider>
      </ShopContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
