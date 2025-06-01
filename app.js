const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const apikey = 'googlepai-key232323';

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!', apikey);
});

module.exports = app;
