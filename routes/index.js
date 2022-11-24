const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { createUser, loginUser, logoutUser } = require('../controllers/users');

// Не защищенные роуты
// TODO: Роут ниже лишний потом удалить
router.get('/', (req, res) => {
  res.send('На главной все спокойно');
});

router.post('/signup', createUser);

router.post('/signin', loginUser);

// Защищенные роуты
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.post('/signout', logoutUser);

module.exports = router;
