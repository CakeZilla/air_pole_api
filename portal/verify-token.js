const fs            = require('fs-extra');
const path          = require('path');
const jwt           = require('jsonwebtoken');
const sql_command   = require('../utils/sql_command');
const publicKEY     = fs.readFileSync(path.join(__dirname, './key/public.key'), 'utf8');

const verifyOptions = {
  issuer: 'IPST Co Ltd', // Issuer (Software organization who issues the token)
  audience: 'https://ipstthailand.com', // Audience (Domain within which this token will live and function)
  expiresIn: '1d', // 1 days validity,
  algorithm: 'RS256'
};

const Authenticate = (req, res, next) => {
  const token = req.header('x-access-token')
  if (token) {
    jwt.verify(token, publicKEY, verifyOptions, async (err, decoded) => {
      if (!err) {
        const results = await sql_command.query_ipst(
          'SELECT `user_id` FROM `user` WHERE `user_id` = ? AND `is_active` = 1', [decoded.user.user_id]
        );
        if (results.length > 0) {
          req.user = decoded.user;
          next();
        } else {
          return res.status(401).send({ success: 0, message: 'Invalid user data.' });
        }
      } else {
        return res.status(401).send({ success: 0, message: 'Failed to authenticate token.' });
      }
    })
  } else {
    return res.status(401).send({ success: 0, message: 'No token provided.' });
  }
};

module.exports = Authenticate;
