const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
// const { PAGE_NOT_FOUND } = require('./utils/constants');
const rateLimit = require('express-rate-limit');

const { loginUser, createUser, unauthorized } = require('./controllers/users');
const auth = require('./middlewares/auth');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const NotFoundError = require('./errors/notFoundErr');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  loginUser,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^(https?:\/\/)?(w{3}\.)?[a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.post('/signout', unauthorized);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: `На сервере произошла ошибка': ${err.message}` });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
