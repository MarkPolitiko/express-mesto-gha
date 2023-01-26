/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  // const token = req.rawHeaders.find((el) => el.match('jwt'))
  // ? req.rawHeaders.find((el) => el.match('jwt')).replace('jwt=', '') : 0; // ?!?!?!?!?

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
