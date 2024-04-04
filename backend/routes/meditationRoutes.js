import express from 'express';
import {addMeditation} from '../controllers/meditationController.js';
import { getMedData } from '../controllers/meditationController.js';

const meditationRoutes=express.Router();

meditationRoutes.post('/add',addMeditation);
meditationRoutes.get('/getMed',getMedData);

export default meditationRoutes;