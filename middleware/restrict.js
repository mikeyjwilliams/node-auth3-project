/** @format */

const jwt = require('jsonwebtoken');
const secret = require('../Secrets/secret');

function restrict() {
  const authErr = { message: 'Invalid Credentials' };

  return async (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json(authErr);
      }
      jwt.verify(token, secret.jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).json(authErr);
        } else {
          req.token = decoded;
          console.log('D ', decoded);
          next();
        }
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
module.exports = restrict;
