const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PAGE_NOT_FOUND } = require('./utils/constants');

mongoose.set('strictQuery', true);

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '63b72b4c555a554000d4a918',
  };

  next();
});

app.use('*', (req, res) => {
  res.status(PAGE_NOT_FOUND).send({ message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
