# BuyNest - Shopping Application for Visually Challenged Users

BuyNest is an innovative shopping platform designed to enhance the online shopping experience for visually impaired users. The application integrates live human assistance, real-time voice navigation, and customizable accessibility settings to ensure that visually challenged users can shop with ease and independence. Built using the MERN stack, BuyNest supports a fully interactive and inclusive shopping experience.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
  - [Live Human Experience](#live-human-experience)
  - [Accessibility and Customization](#accessibility-and-customization)
  - [Order & Payment Management](#order--payment-management)
  - [User and Product Management](#user-and-product-management)
- [Technologies Used](#technologies-used)
- [Deployment Links](#deployment-links)
- [Installation](#installation)


## Project Overview

BuyNest is designed to empower visually impaired users by providing accessible online shopping with the assistance of live human helpers, voice commands, and screen reader compatibility. The app offers an intuitive interface that allows users to browse products, add them to their cart, and complete purchases with ease. With real-time voice assistance, customizable accessibility settings, and robust order management, BuyNest ensures a seamless shopping experience.

## Features

### Live Human Experience
- **Real-Time Assistance**: Users can connect with registered helpers who provide verbal guidance through live voice chat. Helpers describe the website's layout, navigation, and product details.
- **Voice Interaction**: Users can interact with helpers via voice chat and issue voice commands for navigation and product exploration.
- **Request Handling**: Registered helpers receive and respond to assistance requests, guiding users through the website’s functionalities.

### Accessibility and Customization
- **Adjustable Settings**: Users can modify font size, page colors, and voice-over options to personalize their browsing experience.
- **Voice Command Navigation**: Navigate and interact with the app using customizable voice commands, enabling easier use for visually impaired users.
- **Screen Reader Compatibility**: Full compatibility with screen readers ensures efficient content access for users.
- **Audio Descriptions**: Detailed audio descriptions are provided for products, categories, and other elements on the website.
- **Accessibility Bar**: A floating accessibility toolbar provides users with immediate access to key features such as:
  - **Adjustable Text Sizes**: Quickly adjust the text size for better readability.
  - **High-Contrast Mode**: Toggle between high-contrast color schemes for better visibility.
  - **Voice Command Navigation**: Activate voice navigation for hands-free interaction with the app.
  - **Screen Narration**: Enable or disable screen narration for step-by-step guidance through the app.


### Order & Payment Management
- **Cart and Checkout**: Users can manage their cart, proceed to checkout, and complete purchases with voice-assisted guidance.
- **Secure Payment Options**: Multiple secure payment methods are supported, with voice confirmations for transactions, ensuring user confidence.
- **Order Tracking**: Audio updates on order status, shipping, and delivery information are provided to keep users informed.


### User and Product Management
- **User Profiles**: Users can manage their information, preferences, and saved settings, improving personalization.
- **Product Listings**: Product details, availability status, and audio descriptions are made accessible for easy browsing.
- **Voice-Enabled Search and Filter**: Users can search for and filter products using voice commands, making it easy to find specific items.
- **Audio Tags and Descriptions**: Audio tags and descriptions are provided for additional context and accessibility across the platform.

## Technologies Used

- **Frontend**: React.js, with integrations for voice commands and live chat.
- **Backend**: Node.js, Express.js for API management, and WebSockets for live communication.
- **Database**: MongoDB (MERN Stack).
- **Real-Time Communication**: WebSockets for live voice chat and real-time assistance.
- **Screen Reader Compatibility**: Fully accessible with screen readers.
- **Audio Cues**: Integration of custom audio cues for events.
- **Voice Command Handling**: Integrated voice command capabilities for navigation.
- **Accessibility Bar**: A floating toolbar with quick access to customization features.

## Deployment Links

- **For Users**: [BuyNest Frontend](https://buynest-v2-frontend.onrender.com/)
- **For Admins**: [BuyNest Admin Dashboard](https://buynest-v2-admin.onrender.com)

## Installation

To run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/malisha001/BuyNest-v1

```

### 2. Install Dependencies

#### Frontend (React)

```bash
cd frontend
npm install
```

#### Backend (Node.js with Express)

```bash
cd backend
npm install
```

### 3. Set up Environment Variables

Create `.env` files in both the frontend and backend directories, and configure the necessary environment variables. Example:
- `MONGO_URI` for the database connection.
- `SECRET_KEY` for JWT authentication.
- `API_URL` for backend API endpoints.


### 4. Run the Project

#### Frontend:

```bash
cd frontend
npm start
```



#### Backend:

```bash
cd backend
npm start
```



## Usage

Once the app is up and running, users can:

1. **Create an account or log in**: Set up a profile to start shopping.
2. **Browse products**: Use voice commands or screen reader compatibility to explore product categories and details.
3. **Request live assistance**: Call for help from a registered assistant who will guide you through the site.
4. **Manage your cart**: Add items to your cart and proceed to checkout with voice-assisted guidance.
5. **Make secure payments**: Complete transactions with multiple secure payment options.
6. **Track orders**: Get live updates on your orders, including shipping and delivery status.

Admins can:

1. **Monitor user activity**: Review requests for assistance and ensure the platform is accessible and functional.
2. **Manage products**: Add, remove, and update product listings.
3. **Oversee order and payment processing**: Ensure secure payments and timely order fulfillment.

Helper's Role:

1. **Log in as a Helper**: Use the credentials helper@gmail.com to log in as a helper.
2. **Assist Users**: Provide live voice assistance through real-time voice chat.
3. **View Live Cart**: View users' live cart via WebSockets and guide them through the checkout process.

