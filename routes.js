const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Exercise = require('./models/Exercise');

router.get('/', (req, res) => {
  //res.send('Server is up!')
  res.render('index');
});

router.post('/new-user', (req, res) => {
  const { username } = req.body;
  const user = new User({
    username
  });
  user.save(err => {
    if (err) return res.status(500).json({ err });
    return res.status(200).send({ success: true, user });
    res.render(index);
  });
});

router.post('/add', (req, res) => {
  const { userId, description, duration, date } = req.body;

  if (!userId || !description || !duration || !date) {
    return res.status(422).send({ success: false, msg: 'You must include all 4 fields' });
  }

  User.findById(userId, (err, user) => {
    if (err) return res.status(500).json({ err });
    if (!user) return res.status(404).send({ success: false, msg: 'userId does not exist' });
    const exercise = new Exercise({
      userId,
      description,
      duration,
      date
    });
    exercise.save(err => {
      if (err) return res.status(500).json({ err });
      return res.status(200).send({ success: true, exercise });
      res.render(index);
    });

  });
});

router.get('/log', (req, res) => {
  const { userId, from, to, limit } = req.query;
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).json({ err });
    if (!user) return res.status(404).send({ success: false, msg: 'userId does not exist' });
    Exercise.find({ userId }, (err, results) => {
      if (err) return res.status(500).json({ err });
      if (!results) return res.status(200).send({ success: true, msg: 'No exercise data', results });
      res.status(200).send({ success: true, results });
      res.render(index);
    });
  });
});

module.exports = router;
