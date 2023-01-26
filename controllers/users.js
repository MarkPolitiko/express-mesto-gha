const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BadRequestError = require('../errors/badRequestErr');
const NotFoundError = require('../errors/notFoundErr');
const UnauthorizedError = require('../errors/unauthorizedErr');
const RequestConflictError = require('../errors/requestConflictErr');
const User = require('../models/user');

const {
  SUCCESS,
  // BAD_REQUEST,
  // PAGE_NOT_FOUND,
  // INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(SUCCESS).send({ users });
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(SUCCESS).send({
      name: user.name, about: user.about, avatar, email: user.email,
    }))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверный логин и/или пароль'));
      } else if (err.name === 'CastError') {
        next(new RequestConflictError('Пользователь уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      }
      res.status(SUCCESS).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный Id'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      }
      res.status(SUCCESS).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный Id'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res
        .status(SUCCESS).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Передан некорректный запрос'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      }
      res.status(SUCCESS).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Передан некорректный запрос'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Ошибка авторизации');
      }
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' }, // токен будет просрочен неделю после создания
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 24 * 7,
      });
      res.send({ message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Передан некорректный запрос'));
      } else {
        next(err);
      }
    });
};

// exports.createUser = (req, res) => User.create({
//   email: req.body.email,
//   password: req.body.password,
// })
//   .then((user) => res.send(user))
//   .catch((err) => res.status(400).send(err));

// controllers/users.js

// exports.createUser = (req, res) => {
//   // хешируем пароль
//     .then(hash => User.create({
//       email: req.body.email,
//       password: hash, // записываем хеш в базу
//     }))
//     .then((user) => res.send(user))
//     .catch((err) => res.status(400).send(err));
// };

// app.post('/signup', (req, res) => {
//   User.create({
//   bcrypt.hash(req.body.password, 10)
//     .then(hash => User.create({
//       email: req.body.email,
//       password: hash, // записываем хеш в базу
//     }))
//   })
//     .then((user) => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });
