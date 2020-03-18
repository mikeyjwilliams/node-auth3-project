/** @format */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../Secrets/secret');
const Auth = require('./auth-model');
const restrict = require('../middleware/restrict');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { username, password, department } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'username is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'password is required' });
  }
  if (!department) {
    return res.status(400).json({ message: 'department is required' });
  }
  try {
    const userCheck = await Auth.findBy({ username }).first();
    if (userCheck) {
      return res.status(409).json({ message: 'username is taken already.' });
    }

    const userReg = {
      username: username,
      password: password,
      department: department,
    };
    const user = await Auth.add(userReg);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await Auth.findPassBy({ username }).first();

    const passwordCheck = bcrypt.compare(password, user.password);
    if (!user && !passwordCheck) {
      res.status(401).json({ message: 'You shall not Pass!' });
    }
    const payload = {
      subject: user.id,
      access: user.department,
    };
    const token = jwt.sign(payload, secret.jwtSecret);

    res.cookie('token', token);
    res.json({
      message: `Greetings ${user.username}!`,
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/users', restrict(), async (req, res, next) => {
  try {
    console.log('ACCESS ', req.token.access);
    const access = req.token.access;
    const users = await Auth.findBy({ department: access });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
