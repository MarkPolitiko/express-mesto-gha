const router = require('express').Router();
const {
  getUsers, createUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.post('/', createUser);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
