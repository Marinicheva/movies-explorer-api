const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

// Не защищенные роуты
// TODO: Роут ниже лишний потом удалить
router.get('/', (req, res) => {
  res.send('На главной все спокойно');
});

router.post('/signup', (req, res) => {
  res.send('Тут мы регистрируемся');
});

router.post('/signin', (req, res) => {
  res.send('Тут мы авторизируемся');
});

// Защищенные роуты
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.post('/signout', (req, res) => {
  res.send('Тут мы разлогиниваемся');
});

module.exports = router;
