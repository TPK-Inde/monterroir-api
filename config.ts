const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  listPerPage: process.env.LISTE_PAR_PAGE,
  token_secret: process.env.TOKEN_SECRET, //Clé privée
  token_life: process.env.TOKEN_LIFE, //Durée de vie d'un token
  keyAES: process.env.KEY_AES //Clé de chiffrement
};
module.exports = config;