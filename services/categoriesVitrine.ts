import { CategoryVitrineRepository } from "../Lib/Repositories/CategoryVitrineRepository";
import { CategoryVitrine } from "../models/CategoryVitrine";
import { Request, Response } from "express";

export default class CategoriesVitrine {

  constructor() { }

  //Permet de récupérer toutes les catégories de vitrines
  public async GetAll(req: Request, res: Response) {
    const categoryVitrineRepository = new CategoryVitrineRepository();

    try {
      await categoryVitrineRepository.GetAll()
        .then((data: CategoryVitrine[]) => {
          if (data != null && data.length > 0) {
            res.status(200).send(data);
          }
          else {
            res.status(204);
          }
        })
        .catch((err: { message: string }) => {
          res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la récupération de tous les commentaires"
          })
        })
    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la récupération de tous les commentaires"
      })
    }
  }

  //Permet de récupérer une catégorie de vitrine via son ID
  public async GetById(req: Request, res: Response) {
    const idCategorieVitrine = req.params.ID_CATEGORY_VITRINE;
    const categoryVitrineRepository = new CategoryVitrineRepository();

    try {
      if (parseInt(idCategorieVitrine) > 0) {
        await categoryVitrineRepository.GetById(idCategorieVitrine)
          .then((data: CategoryVitrine | null) => {
            if (data != null) {
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
      else {
        res.status(400).send({
          message: "Veuillez entrer un ID valide de catégorie de vitrine dans la requête"
        })
      }
    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la récupération d'une catégorie de vitrine"
      })
    }
  }

  //Permet d'ajouter une nouvelle catégorie de vitrine
  public async PostNewCategoryVitrine(req: Request, res: Response) {
    const categoryVitrineRepository = new CategoryVitrineRepository();

    try {
      //Vérification de la request
      if (req.body.WORDING == null || req.body.WORDING.length == 0) {
        res.status(400).send({ message: "Veuillez entrer un libellé !" })
      }
      else {
        //Ajout de la nouvelle catégorie de vitrine
        await categoryVitrineRepository.PostNewCategoryVitrine(req.body);
        res.status(201).send({ message: "Création de la catégorie de vitrine réussit" });
      }

    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la création de la catégorie de vitrine"
      })
    }
  }

  public async PutCategoryVitrine(req: Request, res: Response) {
    const categoryVitrineRepository = new CategoryVitrineRepository();

    try {
      if (parseInt(req.params.ID_CATEGORY_VITRINE) > 0) {
        req.body.ID_CATEGORY_VITRINE = parseInt(req.params.ID_CATEGORY_VITRINE);

        //Vérifie la validité des données
        if (req.body.WORDING == null || req.body.WORDING.length == 0) {
          res.status(400).send({ message: "Veuillez entrer un libellé !" })
        }
        else {
          //Modifie la catégorie de vitrine
          await categoryVitrineRepository.PutCategoryVitrine(req.body);
          res.status(200).send({ message: "La modification de la catégorie de vitrine à réussit" });
        }
      }
      else {
        res.status(400).send({
          message: "Veuillez entrer un ID valide de catégorie de vitrine dans la requête"
        })
      }
    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la modification de la catégorie de vitrine"
      })
    }
  }

  public async DeleteCategoryVitrine(req: Request, res: Response) {
    const categoryVitrineRepository = new CategoryVitrineRepository();

    try {
      if (parseInt(req.params.ID_CATEGORY_VITRINE) > 0) {
        await categoryVitrineRepository.DeleteCategoryVitrine(req.params.ID_CATEGORY_VITRINE)
          .then((num: number) => {
            if (num == 1) {
              res.status(200).send({ message: `La catégorie de vitrine id ${req.params.ID_CATEGORY_VITRINE} a bien été supprimée` })
            }
            else {
              res.status(400).send({ message: `La catégorie de vitrine id ${req.params.ID_CATEGORY_VITRINE} n'a pas pu être supprimée, peut-être que cette id n'exite pas ?` })
            }
          })

      }
      else {
        res.status(400).send({
          message: "Veuillez entrer un ID valide de catégorie de vitrine dans la requête"
        })
      }
    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la suppresion de la catégorie de vitrine"
      })
    }
  }
}