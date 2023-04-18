import {OrderHeader} from "../models/OrderHeader";
const config = require("../config")

//Fonction permettant de récupérer la liste de tout les en-tetes de commandes
exports.findAll = (
    req: { query: { page: number; }; },
    res: { status: (arg0: number) => { (): any; new(): any;
        send: { (arg0: OrderHeader[] | { message: string }): void; new(): any; }; }; }) => {

    const numPage: number = req.query.page || 1;

    OrderHeader.findAll({limit : parseInt(config.listPerPage), offset : ((numPage - 1) * parseInt(config.listPerPage!)) })
        .then((data : OrderHeader[]) => {
            res.status(200).send(data)
        })
        .catch((err : {message: any}) => {
            res.status(500).send({
                message : err.message || "Une erreur s'est produite lors de la récupération de tout les en-têtes de commandes"
            })
        })
}

//Fonction permettant de récupérer un en-tête de commande par son id
exports.findOne = (
    req: { params: { id: any; }; },
    res: { status: (arg0: number) => { (): any; new(): any;
        send: { (arg0: OrderHeader | { message: string }): void; new(): any; }; };
        sendStatus: (arg0: number) => void; }) => {

    const idOrderHeader = req.params.id;

    OrderHeader.findByPk(idOrderHeader)
        .then((data : OrderHeader | null) => {
            if(data){
                res.status(200).send(data);
            }else{
                res.sendStatus(204)
            }
        })
        .catch((err : {message : any}) => {
            res.status(500).send({
                message : err.message || "Une erreur s'est produite lors de la récupération de l'en-tête de commande"
            })
        })
}

//Fonction permettant de récupérer les en-têtes de commandes d'un utilisateur
exports.findFromUser = (
    req: { params: { id: any; }; },
    res: { status: (arg0: number) => { (): any; new(): any;
        send: { (arg0: OrderHeader[] | { message: string }): void; new(): any; }; };
        sendStatus: (arg0: number) => void; }) => {

    const idUtilisateur = req.params.id;

    OrderHeader.findAll({ where: { ID_USER: idUtilisateur } })
        .then((data: OrderHeader[]) => {
            if (data) {
                res.status(200).send(data);
            }
            else {
                res.sendStatus(204);
            }
        })
        .catch((err: { message: any; }) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des en-têtes de commandes d'un utilisateur"
            });
        })
}

exports.findFromUserAndStatus = (
    req: { params: { idStatus: any }; body : { idUser: any } },
    res: { status: (arg0: number) => { (): any; new(): any;
        send: { (arg0: OrderHeader[] | { message: string }): void; new(): any; }; };
        sendStatus: (arg0: number) => void; }) => {

    const idStatus = req.params.idStatus
    const idUser = req.body.idUser

    OrderHeader.findAll({where : {ID_ORDER_STATUS : idStatus , ID_USER : idUser }})
        .then((data : OrderHeader[]) => {
            if (data) {
                res.status(200).send(data);
            }
            else {
                res.sendStatus(204);
            }
        })
        .catch((err: { message: any; }) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des en-têtes de commandes"
            });
        })
}
exports.addOne = (
    req : { body : OrderHeader;},
    res : { status: (arg0 : number) => { ():any; new(): any;
        send: { (arg0: {message: any; }) : void; new(): any;};};}) => {

    req.body.ID_ORDER_HEADER = 0

    const validatedData = checkDataIntegrity(req.body)

    if(validatedData){
        res.status(400).send({
            message : validatedData
        })
    }
    else{
        OrderHeader.create(req.body)
            .then(() => {
                res.status(201).send({message : "Création de l'en-tête de commande réussit"});
            })
            .catch((err : {message : any}) => {
                res.status(500).send({
                    message : err.message || "Une erreur s'est produite lors de la création de l'en-tête de commande"
                })
            })
    }
}

exports.update = (
    req: { params: { id: number; }; body: OrderHeader },
    res: { status: (arg0: number) => { (): any; new(): any;
        send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {

    const idOrderHeader = req.params.id

    if(!idOrderHeader){
        res.status(400).send({message : "Veuillez entrer un id d'en-tête de commande à modifier"})
    }

    OrderHeader.findByPk(idOrderHeader)
        .then(async (data) => {
            req.body.ID_ORDER_HEADER = data!.ID_ORDER_HEADER;
            req.body.ID_USER = data!.ID_USER;

            const validatedData = checkDataIntegrity(req.body);

            if(validatedData){
                res.status(400).send({
                    message : validatedData
                })
            }else{
                OrderHeader.update(req.body, { where : { ID_ORDER_HEADER : idOrderHeader} })
                    .then(() => {
                        res.status(200).send({ message : "En-tête de commande mis à jour"})
                    })
                    .catch((err : {message : any}) => {
                        res.status(500).send({
                            message : err.message || "Une erreur s'est produite lors de la modification de l'en-tête de commande"
                        })
                    })
            }
        })
        .catch((err : {message : any}) => {
            res.status(400).send({
                message : err.message ||"La récupération des données de l'en-tête de commande avant modification a échouée"
            })
        })
}

exports.delete = (req: { params: { id: number; }; }, res: { send: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {

    const idOrderHeader = req.params.id;

    OrderHeader.destroy({ where : {ID_ORDER_HEADER : idOrderHeader}})
        .then((num : number) => {
            if(num == 1){
                res.send({message : `${idOrderHeader} : L'en-tête de commande a bien été supprimé.`})
            }else{
                res.status(400).send({message : `${idOrderHeader} : L'en-tête de commande n'a pas pu être supprimée, peut-être que cette id n'exite pas ?\``})
            }
        })
        .catch((err : {message : string}) => {
            res.status(500).send({message : `${idOrderHeader} : Impossible de supprimer l'en-tête de commande.`})
        })
}

//Fonction permettant de vérifier l'intégrité des données
function checkDataIntegrity(orderHeaderData : OrderHeader){
    if(!orderHeaderData.ID_ORDER_HEADER){return "ID_ORDER_HEADER"}
    if(!orderHeaderData.ID_ORDER_STATUS){return "ID_ORDER_STATUS"}
    if(!orderHeaderData.ID_USER){return "ID_USER"}
    if(!orderHeaderData.DATE){return "DATE"}

    return null;
}