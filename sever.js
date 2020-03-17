/** @format */

const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const router = express();
router.use(helmet());
router.use(cors());
router.use(cookieParser());
router.use(express.json());

module.exports = router;
