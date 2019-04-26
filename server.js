const express = require('express');
const mongoose = require('mongoose');

const app = express();

const db = require('./config/keys').mongoURI

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  return res.send('Hello')
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runnig on port: ${port}`));