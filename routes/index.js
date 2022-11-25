const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { auth } = require('../middlewares/auth');
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const { unregisteredUserSchema, unloginedUserSchema } = require('../utils/userJoiSchemas');

// Не защищенные роуты
// TODO: Роут ниже лишний потом удалить
router.get('/', (req, res) => {
  res.send('На главной все спокойно');
});

router.post('/signup', celebrate(unregisteredUserSchema), createUser);
router.post('/signin', celebrate(unloginedUserSchema), loginUser);

router.use(auth);

// Защищенные роуты
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.post('/signout', logoutUser);

module.exports = router;
