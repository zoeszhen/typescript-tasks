import express from 'express';
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

/** For rest client
  GET http://localhost:3001/api/ping
*/
app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});