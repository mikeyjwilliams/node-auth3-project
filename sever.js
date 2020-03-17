/** @format */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const authRouter = require('./auth/auth-router');

const router = express();
router.use(helmet());
router.use(cors());
router.use(cookieParser());
router.use(express.json());

router.use('/api', authRouter);

router.use((req, res) => {
  res.status(404).json({ message: '404 page fail whale' });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: 'internal server error' });
});

module.exports = router;
