const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const apikey = process.env.API_KEY || '';

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!', { data: apikey });
});

module.exports = app;
