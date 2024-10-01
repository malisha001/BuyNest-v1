import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  userId: { type: String,}, // Storing the user ID
  userEmail: { type: String,}, // Storing the user's email
  content: { type: String, required: true }, // Message content
  from: { type: String, enum: ['user', 'assistant'], required: true }, // Identifies whether the message is from the user or assistant
  createdAt: { type: Date, default: Date.now }, // Timestamp of when the message was created
});

export default mongoose.model('Message', MessageSchema);
