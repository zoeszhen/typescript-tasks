import express from 'express';
import { calculateBmi } from "./bmiCalculator"
const app = express();

// app.get('/hello', (_req, res) => {
//     console.log("sfs")
//   res.send('Hello Full Stack');
// });

app.get('/bmi?:height?:weight', (req, res) => {
    res.send(calculateBmi(Number(req.query.height), Number(req.query.weight) )); 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});