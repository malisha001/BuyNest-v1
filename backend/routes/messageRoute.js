import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

// POST route to send a message
router.post('/', sendMessage);

// GET route to fetch messages for a specific user
router.get('/:userId', getMessages);

export default router;
