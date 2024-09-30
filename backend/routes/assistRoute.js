import express from 'express'
import { getAssist, requestAssist, updateAssistStatus, deleteAssist } from '../controllers/assistController.js'

const assistRouter = express.Router();

// Route to get all unaccepted assist requests
assistRouter.get('/', getAssist);

// Route to create a new assist request
assistRouter.post('/', requestAssist);

// Route to update the assist request acceptance status
assistRouter.put('/:id', updateAssistStatus);

// Route to delete an assist request
assistRouter.delete('/:id', deleteAssist);

export default assistRouter