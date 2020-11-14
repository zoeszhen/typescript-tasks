import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import {execriseCalculator, HoursData} from "./exerciseCalculator"
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi?:height?:weight', (req, res) => {
  if(!(req.query.height&&req.query.weight)){
    res.status(400).json({ error: 'malformatted parameters' });
  }
  res.send(calculateBmi(Number(req.query.height), Number(req.query.weight) )); 
});

/** For rest client
  POST http://localhost:3003/execrise
  content-type: application/json

  {
    "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
    "target": 2.5
  }
*/

app.post('/execrise', (req,res) => {
    console.log("req.body",req.body)
    const execrise:HoursData = req.body;

    if(!(execrise.daily_exercises&& execrise.target)){

      res.status(400).json({ error: 'parameters missing' });
      return ;
    }
    
    if(!(Array.isArray(execrise.daily_exercises) && typeof execrise.target == 'number')){
      res.status(400).json({ error: 'malformatted parameters' });
      return ;
    }

    res.send(execriseCalculator(execrise)); 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});