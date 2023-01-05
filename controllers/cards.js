const Card = require('../models/card');
const {
  SUCCESS,
  BAD_REQUEST,
  PAGE_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        res.status(PAGE_NOT_FOUND).send({ message: 'Данные не найдены' });
      }
      res.status(SUCCESS).send({ cards });
    })
    .catch(() => res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' }); // здесь нужен next()?
      } else if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' }); // здесь нужен next()?
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(PAGE_NOT_FOUND).send({ message: 'Данные не найдены' });
      } else if (!req.params.cardId) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный id' });
      }
      res.status(SUCCESS).send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' }); // здесь нужен next()?
      } else if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' }); // здесь нужен next()?
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(PAGE_NOT_FOUND).send({ message: 'Данные не найдены' });
    }
    res.status(SUCCESS).send({ card });
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' }); // здесь нужен next()?
      } else if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' }); // здесь нужен next()?
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(PAGE_NOT_FOUND).send({ message: 'Данные не найдены' });
    }
    res.status(SUCCESS).send({ card });
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' }); // здесь нужен next()?
      } else if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' }); // здесь нужен next()?
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
