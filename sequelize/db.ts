import { Sequelize } from 'sequelize-typescript';
const configuration = require("../config");

//Configuration de la connexion à la base de données avec Sequelize
const sequelize = new Sequelize(configuration.db.database, configuration.db.user, configuration.db.password, {
  host: configuration.db.host,
  dialect: "mysql",
  repositoryMode: true,

  pool: {
    max: configuration.db.pool.max,
    min: configuration.db.pool.min,
    acquire: configuration.db.pool.acquire,
    idle: configuration.db.pool.idle
  }
});

//Importation des modèles de la base de données
sequelize.addModels([`${__dirname}//..//models`]);

sequelize.models["FavoriteVitrine"].removeAttribute("id");

export default sequelize;