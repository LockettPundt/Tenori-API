import express from 'express'
import cors from "cors";
import { PORT } from '../config'

const app = express();
app.use(cors());
// add apollo server.
// add body parser.

app.get('/', (req, res) => res.send('yay!'));
app.listen(PORT, () => {
  console.log(`⚡️Server is running at https://localhost:${PORT}`);
});