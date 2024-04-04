import express from 'express';
import { pushUser } from '../controllers/userControllers.js';

const userRoutes = express.Router();
userRoutes.post('/pushUser',pushUser);

export default userRoutes;