import { Request, Response } from "express";

//Import des models
import { Comment } from "../models/Comment";
import { OrderHeader } from "../models/OrderHeader";
import { OrderLine } from "../models/OrderLine";
import { Product } from "../models/Product";
import { Vitrine } from "../models/Vitrine";
import { Rate } from "../models/Rate";
import { User } from "../models/User";

//Import des repository
import { CommentRepository } from "../Lib/Repositories/CommentRepository";
import { OrderHeaderRepository } from "../Lib/Repositories/OrderHeaderRepository";
import { OrderLineRepository } from "../Lib/Repositories/OrderLineRepository";
import { ProductRepository } from "../Lib/Repositories/ProductRepository";
import { RateRepository } from "../Lib/Repositories/RateRepository";
import { UsersRepository } from "../Lib/Repositories/UsersRepository";
import { VitrineRepository } from "../Lib/Repositories/VitrineRepository";

//Constante
const jwt = require('jsonwebtoken');
const conf = require('../config');

enum ResultCheckToken {
  OK,
  NO_TOKEN,
  EXPIRED_TOKEN,
  AUTHORIZATION_DENIED
}

export default class JwtAuthentification {
  // Propriétés
  _commentRepository: CommentRepository;
  _orderHeaderRepository: OrderHeaderRepository;
  _orderLineRepository: OrderLineRepository;
  _productRepository: ProductRepository;
  _rateRepository: RateRepository;
  _usersRepository: UsersRepository;
  _vitrineRepository: VitrineRepository;

  constructor() {
    this._commentRepository = new CommentRepository();
    this._orderHeaderRepository = new OrderHeaderRepository();
    this._orderLineRepository = new OrderLineRepository();
    this._productRepository = new ProductRepository();
    this._rateRepository = new RateRepository();
    this._usersRepository = new UsersRepository();
    this._vitrineRepository = new VitrineRepository();
  }

  //Permet de vérifier que l'utilisateur à un token valide
  public async CheckTokenValidity(req: Request, res: Response, next: () => void) {
    await this.CheckToken(String(req.headers['authorization']))
      .then((result: ResultCheckToken) => {
        switch (result) {
          case ResultCheckToken.OK:
            next();
            break;
          case ResultCheckToken.NO_TOKEN:
            return res.status(401).send({ message: "Vous devez vous authentifier pour réaliser cette action" });
          case ResultCheckToken.EXPIRED_TOKEN:
            return res.status(403).send({ message: "Votre token à expiré" });
          case ResultCheckToken.AUTHORIZATION_DENIED:
            return res.status(403).send({ message: "Vous ne disposez pas des authorisations nécessaires" })
          default:
            return res.status(500).send({ message: "Votre token n'a pas pu être authentifié. Tenter de vous authentifier à nouveau" })
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Une erreur s'est produite lors de la vérification de votre token"
        })
      })
  }

  //Permet de vérifier si l'utilisateur est propriétaire de la ressources qu'il souhaites modifier
  public async CheckIsOwner(req: Request, res: Response, next: () => void) {
    try {
      //Todo : En fonction de la route, il fait les appels SEQUELIZE nécessaires
      const routeUse = await this.ExtractRouteOrigin(req.originalUrl);
      const userDataToken = await this.ExtractUserDataFromAuthorisationHeader(String(req.headers['authorization']))

      switch (routeUse) {
        case "comments":
          //Les modérateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsModerator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }

          await this._commentRepository.GetCommentById(req.params.ID)
            .then((data: Comment | null) => {
              if (data != null) {
                data.ID_USER == userDataToken.ID_USER ? next() : res.status(403).send({ message: "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource" })
              }
              else {
                res.status(400).send({ message: "Impossible de récupérer/modifier/supprimer une ressource inexistante" })
              }
            })

          break;
        case "orderheader":
          //Les administrateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }

          await this._orderHeaderRepository.GetOrderHeaderById(req.params.id)
            .then((data: OrderHeader | null) => {
              if (data != null) {
                data.ID_USER == userDataToken.ID_USER ? next() : res.status(403).send({ message: "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource" })
              }
              else {
                res.status(400).send({ message: "Impossible de récupérer/modifier/supprimer une ressource inexistante" })
              }
            })

          break;
        case "orderline":
          //Les administrateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }

          await this._orderLineRepository.GetOrderLineById(req.params.id)
            .then(async (data: OrderLine | null) => {
              if (data != null) {
                await this._orderHeaderRepository.GetOrderHeaderById(data.ID_ORDER_HEADER.toString())
                  .then((dateHeader: OrderHeader | null) => {
                    if (dateHeader != null) {
                      dateHeader.ID_USER == userDataToken.ID_USER ? next() : res.status(403).send({ message: "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource" })
                    }
                    else {
                      res.status(400).send({ message: "Impossible de récupérer/modifier/supprimer une ressource inexistante" })
                    }
                  })
              }
              else {
                res.status(400).send({ message: "Impossible de récupérer/modifier/supprimer une ressource inexistante" })
              }
            })

          break;
        case "products":
          //Les administrateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }

          await this._productRepository.GetById(Number.parseInt(req.params.id))
            .then(async (data: Product | null) => {
              if (data != null) {
                await this._vitrineRepository.GetById(data.ID_VITRINE)
                  .then((dateHeader: Vitrine | null) => {
                    if (dateHeader != null) {
                      dateHeader.ID_USER == userDataToken.ID_USER ? next() : res.status(403).send({ message: "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource" })
                    }
                    else {
                      res.status(400).send({ message: "Impossible de récupérer/modifier/supprimer une ressource inexistante" })
                    }
                  })
              }
              else {
                res.status(400).send({ message: "Impossible de récupérer/modifier/supprimer une ressource inexistante" })
              }
            })

          break;
        case "rates":
          //Les modérateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsModerator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }

          await this._rateRepository.GetRateById(req.params.ID)
            .then((data: Rate | null) => {
              if (data != null) {
                data.ID_USER == userDataToken.ID_USER ? next() : res.status(403).send({ message: "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource" })
              }
              else {
                res.status(400).send({ message: "Impossible de récupérer/modifier/supprimer une ressource inexistante" })
              }
            })

          break;
        case "users":
          //Les modérateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsSuperAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }

          await this._usersRepository.GetUserById(Number.parseInt(req.params.ID_USER))
            .then((data: User | null) => {
              if (data != null) {
                data.ID_USER == userDataToken.ID_USER ? next() : res.status(403).send({ message: "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource" })
              }
              else {
                res.status(400).send({ message: "Impossible de récupérer/modifier/supprimer une ressource inexistante" })
              }
            })

          break;
        case "vitrines":
          //Les modérateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }

          await this._vitrineRepository.GetById(Number.parseInt(req.params.ID_USER))
            .then((data: Vitrine | null) => {
              if (data != null) {
                data.ID_USER == userDataToken.ID_USER ? next() : res.status(403).send({ message: "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource" })
              }
              else {
                res.status(400).send({ message: "Impossible de récupérer/modifier/supprimer une ressource inexistante" })
              }
            })

          break;
        default:
          res.status(500).send({ message: "Impossible de vérifier que vous êtes vien autorisé à utiliser cette appel" });

      }

    }
    catch (error: any) {
      res.status(500).send({ message: "Une erreur s'est produite lors de la vérification propriétaire du middleware" })
    }
  }

  //Permet de vérifier que l'utilisateur à un token valide ET qu'il est modérateur
  public async CheckUserIsModerator(req: Request, res: Response, next: () => void) {
    await this.CheckTokenIsModerator(String(req.headers['authorization']))
      .then((result: ResultCheckToken) => {
        switch (result) {
          case ResultCheckToken.OK:
            next();
            break;
          case ResultCheckToken.AUTHORIZATION_DENIED:
            return res.status(403).send({ message: "Vous ne disposez pas des droits nénessaire pour effectuer cette action" });
          default:
            return res.status(500).send({ message: "Votre token n'a pas pu être authentifié. Tenter de vous authentifier à nouveau" });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Une erreur s'est produite lors de la vérification de votre token"
        })
      })

    next();
  }

  //Permet de vérifier que l'utilisateur à un token valide ET qu'il est administrateur
  public async CheckUserIsAdministrator(req: Request, res: Response, next: () => void) {
    await this.CheckTokenIsAdministrator(String(req.headers['authorization']))
      .then((result: ResultCheckToken) => {
        switch (result) {
          case ResultCheckToken.OK:
            next();
            break;
          case ResultCheckToken.AUTHORIZATION_DENIED:
            return res.status(403).send({ message: "Vous ne disposez pas des droits nénessaire pour effectuer cette action" });
          default:
            return res.status(500).send({ message: "Votre token n'a pas pu être authentifié. Tenter de vous authentifier à nouveau" });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Une erreur s'est produite lors de la vérification de votre token"
        })
      })

    next();
  }

  //Permet de vérifier que l'utilisateur à un token valide ET qu'il est super administrateur
  public async CheckUserIsSuperAdministrator(req: Request, res: Response, next: () => void) {
    await this.CheckTokenIsSuperAdministrator(String(req.headers['authorization']))
      .then((result: ResultCheckToken) => {
        switch (result) {
          case ResultCheckToken.OK:
            next();
            break;
          case ResultCheckToken.AUTHORIZATION_DENIED:
            return res.status(403).send({ message: "Vous ne disposez pas des droits nénessaire pour effectuer cette action" });
          default:
            return res.status(500).send({ message: "Votre token n'a pas pu être authentifié. Tenter de vous authentifier à nouveau" });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Une erreur s'est produite lors de la vérification de votre token"
        })
      })

    next();
  }

  //#region Méthodes privées

  //Permet de vérifier que le token est valide
  private async CheckToken(authorizationHeader: string): Promise<ResultCheckToken> {
    const authHeader = authorizationHeader;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) { return ResultCheckToken.NO_TOKEN };

    await jwt.verify(token, conf.token_secret, (err: Error) => {
      if (err) {
        switch (err.message) {
          case "jwt expired":
            return ResultCheckToken.EXPIRED_TOKEN;
          default:
            return ResultCheckToken.AUTHORIZATION_DENIED;
        }
      }
    })

    return ResultCheckToken.OK;
  }

  //Permet de vérifier si dans le token, l'utilisateur est modérateur
  private async CheckTokenIsModerator(authorizationHeader: string): Promise<ResultCheckToken> {
    const resultExtract = await this.ExtractUserDataFromAuthorisationHeader(authorizationHeader);
    if (resultExtract.IS_MODERATOR == true) {
      return ResultCheckToken.OK;
    }
    else {
      return ResultCheckToken.AUTHORIZATION_DENIED;
    }
  }

  //Permet de vérifier si dans le token, l'utilisateur est administrateur
  private async CheckTokenIsAdministrator(authorizationHeader: string): Promise<ResultCheckToken> {
    const resultExtract = await this.ExtractUserDataFromAuthorisationHeader(authorizationHeader);
    if (resultExtract.IS_ADMINISTRATOR == true) {
      return ResultCheckToken.OK;
    }
    else {
      return ResultCheckToken.AUTHORIZATION_DENIED;
    }
  }

  //Permet de vérifier si dans le token, l'utilisateur est super administrateur
  private async CheckTokenIsSuperAdministrator(authorizationHeader: string): Promise<ResultCheckToken> {
    const resultExtract = await this.ExtractUserDataFromAuthorisationHeader(authorizationHeader);
    if (resultExtract.IS_SUPER_ADMINISTRATOR == true) {
      return ResultCheckToken.OK;
    }
    else {
      return ResultCheckToken.AUTHORIZATION_DENIED;
    }
  }

  //Permet d'extraire les données de l'utilisateur via le header
  private async ExtractUserDataFromAuthorisationHeader(authorizationHeader: string) {
    const authHeader = authorizationHeader;
    const token = authHeader && authHeader.split(' ')[1];

    return JSON.parse(Buffer.from(token.split(".")[1], 'base64').toString("utf-8"));
  }

  //Permet de retourner le point d'entrée de l'API
  private async ExtractRouteOrigin(url: string): Promise<string> {
    return url.split("/")[1].toLowerCase();
  }

  //#endregion

}