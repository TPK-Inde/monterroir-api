import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


//Import des models
import { Comment } from "../models/Comment";
import { OrderHeader } from "../models/OrderHeader";
import { OrderLine } from "../models/OrderLine";
import { Product } from "../models/Product";
import { Vitrine } from "../models/Vitrine";
import { Rate } from "../models/Rate";
import { User } from "../models/User";
import { Token } from "../models/Token";

//Import des repository
import { CommentRepository } from "../Lib/Repositories/CommentRepository";
import { OrderHeaderRepository } from "../Lib/Repositories/OrderHeaderRepository";
import { OrderLineRepository } from "../Lib/Repositories/OrderLineRepository";
import { ProductRepository } from "../Lib/Repositories/ProductRepository";
import { RateRepository } from "../Lib/Repositories/RateRepository";
import { UsersRepository } from "../Lib/Repositories/UsersRepository";
import { VitrineRepository } from "../Lib/Repositories/VitrineRepository";
import { TokenRepository } from "../Lib/Repositories/TokenRepository";

//Constante
const jwt = require('jsonwebtoken');
const conf = require('../config');

enum ResultCheckToken {
  OK,
  NO_TOKEN,
  EXPIRED_TOKEN,
  AUTHORIZATION_DENIED
}

enum ResultCheckDataBaseToken {
  OK,
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
  _tokenRepository: TokenRepository;

  constructor() {
    this._commentRepository = new CommentRepository();
    this._orderHeaderRepository = new OrderHeaderRepository();
    this._orderLineRepository = new OrderLineRepository();
    this._productRepository = new ProductRepository();
    this._rateRepository = new RateRepository();
    this._usersRepository = new UsersRepository();
    this._vitrineRepository = new VitrineRepository();
    this._tokenRepository = new TokenRepository();
  }

  //Permet de vérifier que l'utilisateur à un token valide
  public async CheckTokenValidity(req: Request, res: Response, next: () => void) {
    await this.CheckToken(String(req.headers['authorization']))
      .then(async (result: ResultCheckToken) => {
        switch (result) {
          case ResultCheckToken.OK:
            //Vérification de si le token est celui dans la base de données
            await this.CheckTokenInDataBase(String(req.headers['authorization']))
              .then((resultDataBase: ResultCheckDataBaseToken) => {
                if (resultDataBase == ResultCheckDataBaseToken.OK) {
                  return next();
                }
                else {
                  res.status(403).send({ message: "Votre token n'est pas valide, veuillez vous authentifier à nouveau" })
                }
              })
            break;
          case ResultCheckToken.NO_TOKEN:
            res.status(401).send({ message: "Vous devez vous authentifier pour réaliser cette action" });
            break;
          case ResultCheckToken.EXPIRED_TOKEN:
            res.status(403).send({ message: "Votre token à expiré" });
            break;
          case ResultCheckToken.AUTHORIZATION_DENIED:
            res.status(403).send({ message: "Vous ne disposez pas des authorisations nécessaires" })
            break;
          default:
            res.status(500).send({ message: "Votre token n'a pas pu être authentifié. Tenter de vous authentifier à nouveau" })
            break;
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
      const routeUse = await this.ExtractRouteOrigin(req.originalUrl);
      const userDataToken = await this.ExtractUserDataFromAuthorisationHeader(String(req.headers['authorization']))

      switch (routeUse) {
        case "comments":
          //Les modérateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsModerator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }
          else {
            //Vérification du propriétaire en fonction des paramètres
            await this.CheckParamsOwner(req.params, userDataToken)
              .then((result: string) => {
                if (result != "") {
                  return res.status(403).send({ message: result })
                }
                else {
                  next();
                }
              })
          }

          break;
        case "orderheader":
          //Les administrateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }
          else {
            //Vérification du propriétaire en fonction des paramètres
            await this.CheckParamsOwner(req.params, userDataToken)
              .then((result: string) => {
                if (result != "") {
                  return res.status(403).send({ message: result })
                }
                else {
                  next();
                }
              })
          }

          break;
        case "orderline":
          //Les administrateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }
          else {
            //Vérification du propriétaire en fonction des paramètres
            await this.CheckParamsOwner(req.params, userDataToken)
              .then((result: string) => {
                if (result != "") {
                  return res.status(403).send({ message: result })
                }
                else {
                  next();
                }
              })
          }

          break;
        case "products":
          //Les administrateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }
          else {
            //Vérification du propriétaire en fonction des paramètres
            await this.CheckParamsOwner(req.params, userDataToken)
              .then((result: string) => {
                if (result != "") {
                  return res.status(403).send({ message: result })
                }
                else {
                  next();
                }
              })
          }

          break;
        case "rates":
          //Les modérateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsModerator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }
          else {
            //Vérification du propriétaire en fonction des paramètres
            await this.CheckParamsOwner(req.params, userDataToken)
              .then((result: string) => {
                if (result != "") {
                  return res.status(403).send({ message: result })
                }
                else {
                  next();
                }
              })
          }

          break;
        case "users":
          //Les modérateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsAdministratorOrSuperAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }
          else {
            //Vérification du propriétaire en fonction des paramètres
            await this.CheckParamsOwner(req.params, userDataToken)
              .then((result: string) => {
                if (result != "") {
                  return res.status(403).send({ message: result })
                }
                else {
                  next();
                }
              })
          }

          break;
        case "vitrines":
          //Les modérateurs ont le droit de modifier et supprimer un commentaire
          if (await this.CheckTokenIsModeratorOrAdministrator(String(req.headers['authorization'])) == ResultCheckToken.OK) { next() }
          else {
            //Vérification du propriétaire en fonction des paramètres
            await this.CheckParamsOwner(req.params, userDataToken)
              .then((result: string) => {
                if (result != "") {
                  return res.status(403).send({ message: result })
                }
                else {
                  next();
                }
              })
          }

          break;
        case "favoritevitrine":
          //Vérifie si l'ID dans le token est le même que celui dans le body
          if (req.method == "POST") {
            if (userDataToken.ID_USER != req.body.ID_USER) {
              return res.status(403).send({
                message: "Vous ne pouvez pas ajouter une vitrine au favori d'un autre utilisateur !"
              })
            }
            else {
              next();
            }
          }
          else if (req.method == "DELETE") {
            if (userDataToken.ID_USER != req.params.ID_USER) {
              return res.status(403).send({
                message: "Vous ne pouvez pas supprimer une vitrine des favoris d'un autre utilisateur !"
              })
            }
            else {
              next();
            }
          }
          else if (req.method == "GET") {
            if (userDataToken.ID_USER != req.params.ID_USER) {
              return res.status(403).send({
                message: "Vous ne pouvez pas récupérer les favoris d'un autre utilisateur !"
              })
            }
            else {
              next();
            }
          }

          break;
        default:
          return res.status(500).send({ message: "Impossible de vérifier que vous êtes bien autorisé à utiliser cette appel" });
      }
    }
    catch (error: any) {
      return res.status(500).send({ message: "Une erreur s'est produite lors de la vérification propriétaire du middleware" })
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
  }

  //Permet de vérifier que l'utilisateur à un token valide ET qu'il est modérateur OU administrateur
  public async CheckUserIsModeratorOrAdministrator(req: Request, res: Response, next: () => void) {
    await this.CheckTokenIsModeratorOrAdministrator(String(req.headers['authorization']))
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
  }

  //Permet de vérifier que l'utilisateur à un token valide ET qu'il est modérateur OU administrateur
  public async CheckUserAdministratorOrSuperAdministrator(req: Request, res: Response, next: () => void) {
    await this.CheckTokenIsAdministratorOrSuperAdministrator(String(req.headers['authorization']))
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

  //Permet de vérifier si le token est dans la base de données
  private async CheckTokenInDataBase(authorizationHeader: string): Promise<ResultCheckDataBaseToken> {
    const userDataToken = await this.ExtractUserDataFromAuthorisationHeader(authorizationHeader);

    const authHeader = authorizationHeader;
    const token = authHeader && authHeader.split(' ')[1];

    let result = ResultCheckDataBaseToken.AUTHORIZATION_DENIED;

    await this._tokenRepository.GetByUserIdAndToken(userDataToken.ID_USER, token)
      .then((data: Token | null) => {
        if (data == null) {
          result = ResultCheckDataBaseToken.AUTHORIZATION_DENIED;
        }
        else {
          result = ResultCheckDataBaseToken.OK;
        }
      })

    return result;
  }

  private async CheckParamsOwner(params: ParamsDictionary, userDataToken: any): Promise<string> {
    let result: string = "";

    //Vérification du propriétaire du commentaire
    if (params.ID_COMMENT != undefined) {
      await this._commentRepository.GetCommentById(params.ID_COMMENT)
        .then((data: Comment | null) => {
          if (data != null) {
            data.ID_USER == userDataToken.ID_USER ? null : result = "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource";
          }
          else {
            result = "Impossible de récupérer/modifier/supprimer une ressource inexistante";
          }
        })
    }

    //Vérification du propriétaire de la commande
    if (result == "" && params.ID_ORDER_HEADER != undefined) {
      await this._orderHeaderRepository.GetOrderHeaderById(params.ID_ORDER_HEADER)
        .then((data: OrderHeader | null) => {
          if (data != null) {
            data.ID_USER == userDataToken.ID_USER ? null : result = "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource"
          }
          else {
            result = "Impossible de récupérer/modifier/supprimer une ressource inexistante"
          }
        })
    }

    //Vérification du propriétaire de la ligne de commande
    if (result == "" && params.ID_ORDER_LINE != undefined) {
      await this._orderLineRepository.GetOrderLineById(params.ID_ORDER_LINE)
        .then(async (data: OrderLine | null) => {
          if (data != null) {
            await this._orderHeaderRepository.GetOrderHeaderById(data.ID_ORDER_HEADER.toString())
              .then((dateHeader: OrderHeader | null) => {
                if (dateHeader != null) {
                  dateHeader.ID_USER == userDataToken.ID_USER ? null : result = "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource"
                }
                else {
                  result = "Impossible de récupérer/modifier/supprimer une ressource inexistante"
                }
              })
          }
          else {
            result = "Impossible de récupérer/modifier/supprimer une ressource inexistante"
          }
        })
    }

    //Vérification du propriétaire du produit
    if (result == "" && params.ID_PRODUCT != undefined) {
      await this._productRepository.GetById(Number.parseInt(params.ID_PRODUCT))
        .then(async (data: Product | null) => {
          if (data != null) {
            await this._vitrineRepository.GetById(data.ID_VITRINE, 0)
              .then((dateHeader: Vitrine | null) => {
                if (dateHeader != null) {
                  dateHeader.ID_USER == userDataToken.ID_USER ? null : result = "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource"
                }
                else {
                  result = "Impossible de récupérer/modifier/supprimer une ressource inexistante"
                }
              })
          }
          else {
            result = "Impossible de récupérer/modifier/supprimer une ressource inexistante"
          }
        })
    }

    //Vérification du propriétaire de la note
    if (result == "" && params.ID_RATE != undefined) {
      await this._rateRepository.GetRateById(params.ID_RATE)
        .then((data: Rate | null) => {
          if (data != null) {
            data.ID_USER == userDataToken.ID_USER ? null : result = "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource"
          }
          else {
            result = "Impossible de récupérer/modifier/supprimer une ressource inexistante"
          }
        })
    }

    //Vérification de si c'est bien l'utilisateur
    if (result == "" && params.ID_USER != undefined) {
      await this._usersRepository.GetUserById(Number.parseInt(params.ID_USER))
        .then((data: User | null) => {
          if (data != null) {
            data.ID_USER == userDataToken.ID_USER ? null : result = "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource"
          }
          else {
            result = "Impossible de récupérer/modifier/supprimer une ressource inexistante"
          }
        })
    }

    //Vérification du propriétaire de la vitrine
    if (result == "" && params.ID_VITRINE != undefined) {
      await this._vitrineRepository.GetById(Number.parseInt(params.ID_VITRINE), 0)
        .then((data: Vitrine | null) => {
          if (data != null) {
            data.ID_USER == userDataToken.ID_USER ? null : result = "Vous ne disposez pas des autorisations nécessaires à la modifications/suppression de cette ressource"
          }
          else {
            result = "Impossible de récupérer/modifier/supprimer une ressource inexistante"
          }
        })
    }

    return result;
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

  //Permet de vérifier si dans le token, l'utilisateur est modérateur ou administrateur
  private async CheckTokenIsModeratorOrAdministrator(authorizationHeader: string): Promise<ResultCheckToken> {
    const resultExtract = await this.ExtractUserDataFromAuthorisationHeader(authorizationHeader);
    if (resultExtract.IS_MODERATOR == true || resultExtract.IS_ADMINISTRATOR == true) {
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

  //Permet de vérifier si dans le token, l'utilisateur est modérateur ou administrateur
  private async CheckTokenIsAdministratorOrSuperAdministrator(authorizationHeader: string): Promise<ResultCheckToken> {
    const resultExtract = await this.ExtractUserDataFromAuthorisationHeader(authorizationHeader);
    if (resultExtract.IS_ADMINISTRATOR == true || resultExtract.IS_SUPER_ADMINISTRATOR == true) {
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