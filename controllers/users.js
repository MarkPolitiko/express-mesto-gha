const User = require('../models/user');
const {
  SUCCESS,
  BAD_REQUEST,
  PAGE_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' });
      }
      res.status(SUCCESS).send({ users });
    })
    .catch(() => res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(PAGE_NOT_FOUND).send({ message: 'Данные не найдены' });
      }
      res.status(SUCCESS).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(PAGE_NOT_FOUND).send({ message: 'Данные не найдены' });
      }
      res.status(SUCCESS).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(PAGE_NOT_FOUND).send({ message: 'Данные не найдены' });
      }
      res.status(SUCCESS).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};
