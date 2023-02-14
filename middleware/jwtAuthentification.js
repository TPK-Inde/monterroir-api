const jwt = require('jsonwebtoken');
const config = require('../config');

//Si l'accès à la ressource nécessite un token mais que l'utilisateur n'en renseigne pas, alors on rejete la requête

//Todo : Amélioration en fonction des droits (En attente de la définition des droits)
module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)  

  jwt.verify(token, config.token_secret, (err) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    next()
  })
}