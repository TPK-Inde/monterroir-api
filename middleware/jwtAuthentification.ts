const jwt = require('jsonwebtoken');
const conf = require('../config');

//Si l'accès à la ressource nécessite un token mais que l'utilisateur n'en renseigne pas, alors on rejete la requête

//Todo : Amélioration en fonction des droits (En attente de la définition des droits)
module.exports = function authenticateToken(req: { headers: { [x: string]: any; }; }, res: { sendStatus: (arg0: number) => any; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string }): any; new(): any; }; }; }, next: () => void) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, conf.token_secret, (err: Error) => {
    if (err) {
      switch (err.message) {
        case "jwt expired":
          return res.status(403).send({ message: "Le token a expiré" });
        default:
          return res.status(403).send({ message: "Vous ne disposez pas des droits pour effectuer cette action" });
      }
    }

    next()
  })
}