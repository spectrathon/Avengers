import express from 'express';
import { getJournal, storeJournal } from '../controllers/journalControllers.js';
const journalRouter = express.Router();

journalRouter.post('/push',storeJournal);
journalRouter.get('/pull',getJournal);
export default journalRouter;
