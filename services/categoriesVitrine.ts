import { CategoriesVitrine } from "../models/CategoriesVitrine";

//Fonction permettant de récupérer la liste de toutes les catégories de vitrine
exports.findAll = (req: { query: { page: number; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: CategoriesVitrine[] | { message: string }): void; new(): any; }; }; }) => {
  //On renvoi un maximum de X vitrines (X = config.listPerPage)
  CategoriesVitrine.findAll()
    .then((data: CategoriesVitrine[]) => {
      res.status(200).send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération de toutes les catégories de vitrine"
      });
    })
}

//Fonction permettant de récupérer une catégorie de vitrine via son ID
exports.findOne = (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: CategoriesVitrine | { message: string }): void; new(): any; }; }; sendStatus: (arg0: number) => void; }) => {
  const idCategorieVitrine = req.params.id;

  CategoriesVitrine.findByPk(idCategorieVitrine)
    .then((data: CategoriesVitrine | null) => {
      if (data) {
        res.status(200).send(data);
      }
      else {
        res.sendStatus(204);
      }
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération d'une catégorie de vitrine"
      });
    })
}

//Fonction permettant l'ajout d'une catégorie de vitrine
exports.addOne = (req: { body: CategoriesVitrine }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  req.body.ID_CATEGORY_VITRINE = 0;

  const donneesValide = checkDataIntegrity(req.body);

  if (donneesValide) {
    res.status(400).send({
      message: donneesValide
    })
  }
  else {
    CategoriesVitrine.create(req.body)
      .then(() => {
        res.status(201).send({ message: "Création de la catégorie de vitrine réussit" });
      })
      .catch((err: { message: any; }) => {
        res.status(500).send({
          message: err.message || "Une erreur s'est produite lors de la création de la catégorie de vitrine"
        });
      })
  }
}

//Fonction permettant de modifier une catégorie de vitrine
exports.update = (req: { params: { id: number; }; body: CategoriesVitrine }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  const idCategorieVitrine = req.params.id;

  if (!idCategorieVitrine) {
    res.status(400).send({ message: "Veuillez entrer un id de vitrine à modifier" })
  }

  CategoriesVitrine.findByPk(idCategorieVitrine)
    .then(async (data) => {
      //Les élements qui ne doivent pas changer
      req.body.ID_CATEGORY_VITRINE = data!.ID_CATEGORY_VITRINE;

      const donneesValide = checkDataIntegrity(req.body);

      if (donneesValide) {
        res.status(400).send({
          message: donneesValide
        })
      }
      else {
        CategoriesVitrine.update(req.body, { where: { ID_CATEGORY_VITRINE: idCategorieVitrine } })
          .then(() => {
            res.status(200).send({ message: "Catégorie de vitrine mise à jour" });
          })
          .catch((err: { message: any; }) => {
            res.status(500).send({
              message: err.message || "Une erreur s'est produite lors de la modification de la catégorie de vitrine"
            });
          })
      }
    })
    .catch((err: { message: any; }) => {
      res.status(400).send({
        message: err.message || "La récupération des données de la catégorie de vitrine avant modification a échouée"
      });
    })
}

//Fonction permettat de suprimer une catégorie de vitrine
exports.delete = (req: { params: { id: number; }; }, res: { send: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const idCategorieVitrine = req.params.id;

  CategoriesVitrine.destroy({ where: { ID_CATEGORY_VITRINE: idCategorieVitrine } })
    .then((num: number) => {
      if (num == 1) {
        res.send({ message: `La catégorie de vitrine id ${idCategorieVitrine} a bien été supprimée` })
      }
      else {
        res.status(400).send({ message: `La catégorie de vitrine id ${idCategorieVitrine} n'a pas pu être supprimée, peut-être que cette id n'exite pas ?` })
      }
    })
    .catch((err: { message: string; }) => {
      console.log("Une erreur s'est produite lors de la suppression de la catégorie de vitrine : " + err.message)
      res.status(500).send({ message: `Impossible de supprimer la catégorie de vitrine id ${idCategorieVitrine}` })
    })
}

//Fonction permettant de vérifier l'intégrité des données avant ajout ou modification
function checkDataIntegrity(donneesVitrine: CategoriesVitrine) {
  if (!donneesVitrine.WORDING) { return "Veuillez entrer un libellé !" }

  return null;
}