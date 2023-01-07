const Card = require('../models/card');
const {
  SUCCESS,
  BAD_REQUEST,
  PAGE_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CREATED,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((cards) => {
      res.status(SUCCESS).send({ cards });
    })
    .catch(() => res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner', 'likes'))
    .then((card) => res.status(CREATED).send({ card }))
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

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res
          .status(PAGE_NOT_FOUND)
          .send({ message: 'Карточка с указанным id не найдена' });
      }
      res.status(SUCCESS).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res
          .status(PAGE_NOT_FOUND)
          .send({ message: 'Передан несуществующий id карточки' });
      }
      res.status(SUCCESS).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res
          .status(PAGE_NOT_FOUND)
          .send({ message: 'Передан несуществующий id карточки' });
      }
      res.status(SUCCESS).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный запрос' });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};
