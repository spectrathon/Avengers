import express from 'express';
import { getSleepStory } from '../controllers/sleepStoryController.js';
import { addSleepStory } from '../controllers/sleepStoryController.js';

const sleepRoutes=express.Router();

sleepRoutes.post('/addSleep',addSleepStory);
sleepRoutes.get('/getSleep',getSleepStory);
export default sleepRoutes;