/** @format */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('./auth-model');
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

module.exports = router;

//  const name = await Auth.findByPass({ username }).first();
//  if (name.username) {
//    return res.status(409).json({ message: 'name is already in use' });
//  }

//  const passwordValid = bcrypt.compare(password, name.password);

//  if (!name && !passwordValid) {
//    res.status(401).json({ message: 'Invalid Credentials' });
//  }
