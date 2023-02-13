const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  console.log("Token = " + token);

  if (token == null) return res.sendStatus(401)  

  jwt.verify(token, config.token_secret, (err) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    next()
  })
}