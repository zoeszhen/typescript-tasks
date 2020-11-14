import express from 'express';
import diagonsesService from '../services/diagnosesService'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagonsesService.getEntries());
})


router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
})

export default router;