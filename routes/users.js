const router = require('express').Router();

router.get('/me', (req, res) => {
  res.send('Вот информация о Вас');
});

router.patch('/me', (req, res) => {
  res.send('Вот мы и поменяли информацию о Вас');
});

module.exports = router;
