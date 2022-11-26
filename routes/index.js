const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { auth } = require('../middlewares/auth');
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const { unregisteredUserSchema, unloginedUserSchema } = require('../utils/userJoiSchemas');

const NotFoundError = require('../errors/NotFoundError');

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

// Роут для всех не существующих маршрутов
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
