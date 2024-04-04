import express from 'express';
import { getYoga } from '../controllers/yogaController.js';
import { addYoga } from '../controllers/yogaController.js';

const yogaRoutes=express.Router();

yogaRoutes.get('/getYoga',getYoga);
yogaRoutes.post('/addYoga',addYoga);

export default yogaRoutes;
