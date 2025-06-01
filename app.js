import express from 'express';
import path from 'path';
import process from 'process';
const app = express();
const port = process.env.PORT || 3000;
const apikey = 'lsdksdjskdla387483748';

app.disable('x-powered-by');
app.use(express.static(path.join(process.cwd(), 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!', apikey);
});
