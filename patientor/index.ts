import express from 'express';
import diagnosesRoute from './routes/diagnoses'
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

/** For rest client
  GET http://localhost:3001/api/diagnoses
*/
app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoute)

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});