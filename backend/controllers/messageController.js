import Message from '../models/messageModel.js';

// Controller to handle sending a new message
export const sendMessage = async (req, res) => {
  const { userId, userEmail, content, from } = req.body;

  try {
    const newMessage = new Message({
      userId,
      userEmail,
      content,
      from,
    });

    await newMessage.save();

    return res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Error saving message:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};

// Controller to get all messages for a specific user
export const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({ userId }).sort({ createdAt: 1 }); // Sort messages by creation time

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
