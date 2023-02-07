module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
      ID_UTILISATEUR: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_STATUT_COMPTE : {
        type: Sequelize.INTEGER(1)
      },
      PSEUDONYME : {
        type: Sequelize.STRING
      },
      NOM : {
        type: Sequelize.STRING
      },
      PRENOM : {
        type: Sequelize.STRING
      },
      DATE_DE_NAISSANCE : {
        type: Sequelize.DATE
      },
      ADRESSE_EMAIL : {
        type: Sequelize.STRING
      },
      ADRESSE_RUE : {
        type: Sequelize.STRING
      },
      ADRESSE_CODE_POSTAL : {
        type: Sequelize.STRING
      },
      ADRESSE_VILLE : {
        type: Sequelize.STRING
      },
      MOT_DE_PASSE : {
        type: Sequelize.STRING
      },
      PHOTO_DE_PROFIL: {
        type: Sequelize.TEXT
      }
    },
    {
      sequelize,
      tableName : 'f_utilisateurs',
      createdAt: false,
      updatedAt: false
    });
  
    return Utilisateur;
  };