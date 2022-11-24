const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('На главной все спокойно');
});

module.exports = router;
