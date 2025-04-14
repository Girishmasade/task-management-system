import express from 'express';
import { meetingStart, sendMessage } from '../controllers/meeting.controller.js';
import { isAdminRoute, protectRoute } from '../middleware/authMiddleware.js';

const meetRoute = express.Router();

meetRoute.use(protectRoute)

meetRoute.post('/start', isAdminRoute, meetingStart);
meetRoute.post('/send-message', sendMessage);

export default meetRoute;
