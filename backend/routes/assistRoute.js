import express from 'express'
import { getAssist, requestAssist } from '../controllers/assistController.js'

const assistRouter = express.Router()

assistRouter.post('/',requestAssist)
assistRouter.get('/',getAssist)

export default assistRouter