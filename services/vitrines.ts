import { FavoriteVitrineRepository } from "../Lib/Repositories/FavoriteVitrineRepository";
import { VitrineRepository } from "../Lib/Repositories/VitrineRepository";
import DecodeToken from "../helper/DecodeToken";
import { Vitrine } from "../models/Vitrine";
import { Request, Response } from "express";

export default class Vitrines {
  vitrineRepository: VitrineRepository

  constructor() {
    this.vitrineRepository = new VitrineRepository();
  }

  //Fonction permettant de récupérer la liste de toutes les vitrines
  public async GetAll(req: Request, res: Response) {
    try {
      let numPage: number;

      //On défini le numéro de page
      if (req.query.page == undefined) { numPage = 1 } else { numPage = parseInt(String(req.query.page)); }

      if (!Number.isNaN(numPage) && numPage >= 1) {
        await this.vitrineRepository.GetAll(numPage)
          .then((data: Vitrine[]) => {
            if (data.length > 0) {
              res.status(200).send(data);
            }
            else {
              res.status(204).send();
            }
          })
      }
      else {
        res.status(400).send({
          message: "Veuillez entrer un numéro de page valide"
        })
      }

    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la récupération de toutes les vitrines"
      })
    }
  }

  //Fonction permettant de récupérer la liste de toutes les vitrines Active
  public async GetAllActive(req: Request, res: Response) {
    try {
      let numPage: number;

      let idUser: number = 0;
      if (req.headers.authorization! != undefined) {
        idUser = DecodeToken(req.headers.authorization!).ID_USER
      }


      //On défini le numéro de page
      if (req.query.page == undefined) { numPage = 1 } else { numPage = parseInt(String(req.query.page)); }

      if (!Number.isNaN(numPage) && numPage >= 1) {
        await this.vitrineRepository.GetAllActive(numPage, idUser)
          .then((data: Vitrine[]) => {
            if (data.length > 0) {
              res.status(200).send(data);
            }
            else {
              res.status(204).send();
            }
          })
      }
      else {
        res.status(400).send({
          message: "Veuillez entrer un numéro de page valide"
        })
      }

    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la récupération de toutes les vitrines"
      })
    }
  }

  //Fonction permettant de récupérer la liste de toutes les vitrines Active
  public async GetById(req: Request, res: Response) {
    try {
      const idVitrine = parseInt(req.params.ID_VITRINE);

      if (!Number.isNaN(idVitrine)) {
        await this.vitrineRepository.GetById(idVitrine)
          .then((data: Vitrine | null) => {
            if (data != null) {
              res.status(200).send(data);
            }
            else {
              res.status(204).send();
            }
          })
      }
      else {
        res.status(400).send({
          message: "Veuillez entrer un ID valide de vitrine dans la requête"
        })
      }

    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la récupération de toutes les vitrines"
      })
    }
  }

  //Fonction permettant de récupérer les vitrines d'un utilisateur
  public async GetByUserId(req: Request, res: Response) {
    try {
      const idUser = parseInt(req.params.ID_USER);

      if (!Number.isNaN(idUser)) {
        await this.vitrineRepository.GetByUserId(idUser)
          .then((data: Vitrine[]) => {
            if (data.length > 0) {
              res.status(200).send(data);
            }
            else {
              res.status(204).send();
            }
          })
      }
      else {
        res.status(400).send({
          message: "Veuillez entrer un ID valide d'un utilisateur dans la requête"
        })
      }

    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la récupération de toutes les vitrines"
      })
    }
  }

  public async PostNewVitrine(req: Request, res: Response) {
    //Comme il s'agit d'un ajout, on modifie les valeurs de l'ID Vitrine ainsi que du champ "Actif"
    req.body.ID_VITRINE = 0;
    req.body.ACTIVATE = false;

    try {
      const resultCheck = await this.CheckDataVitrine(req.body);

      if (resultCheck == null) {
        await this.vitrineRepository.PostNewVitrine(req.body);

        res.status(201).send();
      }
      else {
        res.status(400).send({
          message: resultCheck
        })
      }
    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de l'ajout d'une vitrine"
      })
    }
  }

  public async PutVitrine(req: Request, res: Response) {
    try {
      const idVitrine = parseInt(req.params.ID_VITRINE);

      if (!Number.isNaN(idVitrine)) {
        req.body.ID_VITRINE = idVitrine;

        const resultCheck = await this.CheckDataVitrine(req.body);

        if (resultCheck == null) {
          await this.vitrineRepository.PutVitrine(req.body);

          res.status(204).send();
        }
        else {
          res.status(400).send({
            message: resultCheck
          });
        }

      }
      else {
        res.status(400).send({
          message: "Veuillez entrer un ID valide de vitrine dans la requête"
        })
      }

    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la modification de la vitrine"
      })
    }
  }

  //Fonction permettant de récupérer les vitrines d'un utilisateur
  public async DeleteVitrine(req: Request, res: Response) {
    try {
      const idVitrine = parseInt(req.params.ID_VITRINE);

      if (!Number.isNaN(idVitrine)) {
        await this.vitrineRepository.DeleteVitrine(idVitrine)
          .then((rowDeleted: number) => {
            if (rowDeleted == 1) {
              res.status(200).send({
                message: "La suppression de la vitrine à réussit"
              })
            }
            else {
              res.status(400).send({
                message: "La suppression de la vitrine à échouée"
              })
            }
          })

        res.status(204).send();
      }
      else {
        res.status(400).send({
          message: "Veuillez entrer un ID valide d'un utilisateur dans la requête"
        })
      }

    } catch (error: any) {
      res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la récupération de toutes les vitrines"
      })
    }
  }

  //Permet de vérifier que les données de la vitrine sont valide
  private async CheckDataVitrine(dataVitrine: Vitrine) {
    if (!dataVitrine.ID_USER) { return "L'ID de l'utilisateur n'est pas défini dans la requête !" }
    if (!dataVitrine.ID_CATEGORY_VITRINE) { return "Veuillez définir une catégorie de vitrine " }
    if (!dataVitrine.ID_TYPE_VITRINE) { return "Veuillez définir un type de vitrine" }
    if (!dataVitrine.NAME) { return "Veuillez définir un nom de vitrine" }
    if (!dataVitrine.IMAGE) { return "Veuillez définir une image à votre vitrine" }
    if (!dataVitrine.ADDRESS_STREET) { return "Veuillez entrer la rue de votre adresse" }
    if (!dataVitrine.ADDRESS_ZIP_CODE) { return "Veuillez entrer le code postal de votre adresse" }
    if (!dataVitrine.ADDRESS_CITY) { return "Veuillez entrer la ville de votre adresse" }
    if (!dataVitrine.DESCRIPTION) { return "Veuillez entrer une description" }
    if (!dataVitrine.CREATION_DATE) { return "La date de création est absent de la requête !" }
    if (dataVitrine.ACTIVATE == undefined) { return "Le champ 'Actif' est absent de la requête !" }

    return null;
  }

}