const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Вот Ваши любимые фильмы');
});

router.post('/', (req, res) => {
  res.send('Хорошо, добавим и этот к Вашим любимым фильмам');
});

router.delete('/:id', (req, res) => {
  res.send('Удаляю, раз Вы этот фильм разлюбили');
});

module.exports = router;
