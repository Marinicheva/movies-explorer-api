const router = require('express').Router();
const { celebrate } = require('celebrate');

const { loginedUserSchema } = require('../utils/userJoiSchemas');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', celebrate(loginedUserSchema), getUserInfo);
router.patch('/me', celebrate(loginedUserSchema), updateUserInfo);

module.exports = router;
