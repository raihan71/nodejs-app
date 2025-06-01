const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
