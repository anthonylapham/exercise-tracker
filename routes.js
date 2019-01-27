const express = require('express');
const router = express.Router();
const User = require('./models/User');

router.get('/', (req, res) => {
  res.send('Server is up!')
});

router.post('/new-user', (req, res) => {
  const { username } = req.body;
  const user = new User({
    username
  });
  user.save(err => {
    if (err) return res.status(500).json({ err });
    return res.status(200).json({ user });
  });
});

module.exports = router;
