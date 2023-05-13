import { FavoriteVitrine as FavoriteVitrineModel } from "../models/FavoriteVitrine";
import { FavoriteVitrineRepository } from "../Lib/Repositories/FavoriteVitrineRepository";
import { Request, Response } from "express";

export default class FavoriteVitrine {
    vitrineFavoriteRepository: FavoriteVitrineRepository;

    constructor() {
        this.vitrineFavoriteRepository = new FavoriteVitrineRepository();        
    }

    //Fonction permettant d'ajouter une vitrine en favorie
    public async GetFavoriteVitrineByUserID(req: Request, res: Response) {
      try{
          const idUser = parseInt(req.params.ID_USER);

          if (!Number.isNaN(idUser)) {
            const listVitrineFavorite : FavoriteVitrineModel[] = await this.vitrineFavoriteRepository.GetFavoriteVitrineByUserID(idUser);

            res.status(200).send(listVitrineFavorite);            
          }
          else {
            res.status(400).send({
              message: "Veuillez entrer un ID de vitrine et utilisateur valide dans la requête"
            })
          }

      } catch (error: any) {
          res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de l'ajout de la vitrine au favori'"
          })
      }
    }

    //Fonction permettant de récupérer un booléan sur l'ID de la vitrine et utilisateur
    public async GetByIdVitrineAndUser(req: Request, res: Response) {
      try{
          const idVitrine = parseInt(req.params.ID_VITRINE);
          const idUser = parseInt(req.params.ID_USER);

          if (!Number.isNaN(idVitrine) || !Number.isNaN(idUser)) {
            const resultDuplicate : boolean = await this.vitrineFavoriteRepository.GetFavoriteVitrine(idVitrine, idUser);

            res.status(200).send({ isFavorite: resultDuplicate });
          }
          else {
            res.status(400).send({
              message: "Veuillez entrer un ID de vitrine et utilisateur valide dans la requête"
            })
          }

      } catch (error: any) {
          res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de l'ajout de la vitrine au favori'"
          })
      }
    }

    //Fonction permettant d'ajouter une vitrine en favorie
    public async PostFavoriteVitrine(req: Request, res: Response) {
        try{
            const resultCheck = await this.CheckDataVitrineFavorite(req.body);
            
            if (resultCheck == null){
                const resultDuplicate : boolean = await this.vitrineFavoriteRepository.GetFavoriteVitrine(req.body.ID_VITRINE, req.body.ID_USER);

                if (resultDuplicate == true){
                    res.status(400).send({
                        message: "Cette vitrine est déjà en favori !"
                    });
                }
                else{
                    await this.vitrineFavoriteRepository.PostFavoriteVitrine(req.body);
                }

            }
            else{
                res.status(400).send({
                    message: resultCheck
                });
            }
            

            res.status(201).send();
        } catch (error: any) {
            res.status(500).send({
              message: error.message || "Une erreur s'est produite lors de l'ajout de la vitrine au favori'"
            })
        }
    }

    //Fonction permettant de supprimer une vitrine des favoris
    public async DeleteFavoriteVitrine(req: Request, res: Response) {
        try {
            const idVitrine = parseInt(req.params.ID_VITRINE);
            const idUser = parseInt(req.params.ID_USER);
      
            if (!Number.isNaN(idVitrine) || !Number.isNaN(idUser)) {
              await this.vitrineFavoriteRepository.DeleteFavoriteVitrine(idVitrine, idUser)
                .then((rowDeleted: number) => {
                  if (rowDeleted == 1) {
                    res.status(200).send({
                      message: "La suppression du favori à réussit"
                    })
                  }
                  else {
                    res.status(400).send({
                      message: "La suppression du favori à échouée"
                    })
                  }
                })      
            }
            else {
              res.status(400).send({
                message: "Veuillez entrer un ID de vitrine et utilisateur valide dans la requête"
              })
            }
      
          } catch (error: any) {
            res.status(500).send({
              message: error.message || "Une erreur s'est produite lors de la suppression de la vitrine des favoris"
            })
          }
    }

    private async CheckDataVitrineFavorite(favoriteVitrine: FavoriteVitrineModel){
        if (favoriteVitrine.ID_USER <= 0) { return "L'ID de l'utilisateur n'est pas valide !" }
        if (favoriteVitrine.ID_VITRINE <= 0) { return "L'ID de la vitrine n'est pas valide !" }

        return null;
    }
}