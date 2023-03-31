import { Vitrine } from "../models/Vitrine";
const config = require("../config");

//Fonction permettant de récupérer la liste de toutes les vitrines
exports.findAll = (req: { query: { page: number; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: Vitrine[] | { message: string }): void; new(): any; }; }; }) => {
  const numPage: number = req.query.page || 1;

  //On renvoi un maximum de X vitrines (X = config.listPerPage)
  Vitrine.findAll({ limit: parseInt(config.listPerPage!), offset: ((numPage - 1) * parseInt(config.listPerPage!)) })
    .then((data: Vitrine[]) => {
      res.status(200).send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération de toutes les vitrines"
      });
    })
}

//Fonction permettant de récupérer la liste de toutes les vitrines Active
exports.findAllActive = (req: { query: { page: number; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: Vitrine[] | { message: string }): void; new(): any; }; }; }) => {
  const numPage: number = req.query.page || 1;

  //On renvoi un maximum de X vitrines (X = config.listPerPage)
  Vitrine.findAll({ where: { ACTIVATE: true }, limit: parseInt(config.listPerPage!), offset: ((numPage - 1) * parseInt(config.listPerPage!)) })
    .then((data: Vitrine[]) => {
      res.status(200).send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération de toutes les vitrines actives"
      });
    })
}

//Fonction permettant de récupérer une vitrine en particulier
exports.findOne = (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: Vitrine | { message: string }): void; new(): any; }; }; sendStatus: (arg0: number) => void; }) => {
  const idVitrine = req.params.id;

  Vitrine.findByPk(idVitrine)
    .then((data: Vitrine | null) => {
      if (data) {
        res.status(200).send(data);
      }
      else {
        res.sendStatus(204);
      }
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération d'une vitrine"
      });
    })
}

//Fonction permettant de récupérer les vitrines d'un utilisateur
exports.findFromUser = (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: Vitrine[] | { message: string }): void; new(): any; }; }; sendStatus: (arg0: number) => void; }) => {
  const idUtilisateur = req.params.id;

  Vitrine.findAll({ where: { ID_USER: idUtilisateur } })
    .then((data: Vitrine[]) => {
      if (data) {
        res.status(200).send(data);
      }
      else {
        res.sendStatus(204);
      }
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des vitrines d'un utilisateur"
      });
    })
}

//Fonction permettant l'ajout d'une vitrine
//Todo : Ajouter vérification du nombre de vitrine (Une fois les règles définies)
exports.addOne = (req: { body: Vitrine }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  //Comme il s'agit d'un ajout, on modifie les valeurs de l'ID Vitrine ainsi que du champ "Actif"
  req.body.ID_VITRINE = 0;
  req.body.ACTIVATE = false;

  const donneesValide = checkDataIntegrity(req.body);

  if (donneesValide) {
    res.status(400).send({
      message: donneesValide
    })
  }
  else {
    Vitrine.create(req.body)
      .then(() => {
        res.status(201).send({ message: "Création de la vitrine réussit" });
      })
      .catch((err: { message: any; }) => {
        res.status(500).send({
          message: err.message || "Une erreur s'est produite lors de la création de la vitrine"
        });
      })
  }
}

//Fonction permettant de modifier une vitrine
exports.update = (req: { params: { id: number; }; body: Vitrine }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  const idVitrine = req.params.id;

  if (!idVitrine) {
    res.status(400).send({ message: "Veuillez entrer un id de vitrine à modifier" })
  }

  Vitrine.findByPk(idVitrine)
    .then(async (data) => {
      //Les élements qui ne doivent pas changer
      req.body.ID_VITRINE = data!.ID_VITRINE;
      req.body.ID_USER = data!.ID_USER;

      const donneesValide = checkDataIntegrity(req.body);

      if (donneesValide) {
        res.status(400).send({
          message: donneesValide
        })
      }
      else {
        Vitrine.update(req.body, { where: { ID_VITRINE: idVitrine } })
          .then(() => {
            res.status(200).send({ message: "Vitrine mise à jour" });
          })
          .catch((err: { message: any; }) => {
            res.status(500).send({
              message: err.message || "Une erreur s'est produite lors de la modification de la vitrine"
            });
          })
      }
    })
    .catch((err: { message: any; }) => {
      res.status(400).send({
        message: err.message || "La récupération des données de la vitrine avant modification a échouée"
      });
    })
}

//Fonction permettat de suprimer une vitrine
exports.delete = (req: { params: { id: number; }; }, res: { send: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const idVitrine = req.params.id;

  Vitrine.destroy({ where: { ID_VITRINE: idVitrine } })
    .then((num: number) => {
      if (num == 1) {
        res.send({ message: `La vitrine id ${idVitrine} a bien été supprimée` })
      }
      else {
        res.status(400).send({ message: `La vitrine id ${idVitrine} n'a pas pu être supprimée, peut-être que cette id n'exite pas ?` })
      }
    })
    .catch((err: { message: string; }) => {
      console.log("Une erreur s'est produite lors de la suppression de la vitrine : " + err.message)
      res.status(500).send({ message: `Impossible de supprimer la vitrine id ${idVitrine}` })
    })
}

//Fonction permettant de vérifier l'intégrité des données avant ajout ou modification
function checkDataIntegrity(donneesVitrine: Vitrine) {
  if (!donneesVitrine.ID_USER) { return "L'ID de l'utilisateur n'est pas défini dans la requête !" }
  if (!donneesVitrine.ID_CATEGORY_VITRINE) { return "Veuillez définir une catégorie de vitrine " }
  if (!donneesVitrine.ID_TYPE_VITRINE) { return "Veuillez définir un type de vitrine" }
  if (!donneesVitrine.NAME) { return "Veuillez définir un nom de vitrine" }
  if (!donneesVitrine.IMAGE) { return "Veuillez définir une image à votre vitrine" }
  if (!donneesVitrine.ADDRESS_STREET) { return "Veuillez entrer la rue de votre adresse" }
  if (!donneesVitrine.ADDRESS_ZIP_CODE) { return "Veuillez entrer le code postal de votre adresse" }
  if (!donneesVitrine.ADDRESS_CITY) { return "Veuillez entrer la ville de votre adresse" }
  if (!donneesVitrine.DESCRIPTION) { return "Veuillez entrer une description" }
  if (!donneesVitrine.CREATION_DATE) { return "La date de création est absent de la requête !" }
  if (donneesVitrine.ACTIVATE == undefined) { return "Le champ 'Actif' est absent de la requête !" }

  return null;
}