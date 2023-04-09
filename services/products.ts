import { Product } from "../models/Product";
import { Vitrine } from "../models/Vitrine";
import jwt_decode from "jwt-decode";
import { User } from "../models/User";

//Fonction permettant de récupérer un produit via son ID
exports.findOne = (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: Product | { message: string }): void; new(): any; }; }; sendStatus: (arg0: number) => void; }) => {
    const idProduct = req.params.id;

    Product.findByPk(idProduct)
        .then((data: Product | null) => {
            if (data) {
                res.status(200).send(data);
            }
            else {
                res.sendStatus(204);
            }
        })
        .catch((err: { message: any; }) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération du produit"
            });
        })
}

//Fonction d'ajout d'un porduit
exports.addOne = async (req: { body: Product, headers: { [x: string]: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
    //Comme il s'agit d'un ajout, on modifie les valeurs de l'ID Produit
    req.body.ID_PRODUCT = 0;

    const donneesValide = checkDataIntegrity(req.body);

    if (donneesValide) {
        res.status(400).send({
            message: donneesValide
        })
    }
    else {
        //Vérification si propriétaire vitrine 
        const ownerCheck = await checkVitrineOwner(req.body.ID_VITRINE, req.headers['authorization'])

        if (ownerCheck){
            res.status(401).send({
                message: ownerCheck
            })
        }
        else{
            Product.create(req.body)
            .then(() => {
                res.status(201).send({ message: "Création du produit réussit" });
            })
            .catch((err: { message: any; }) => {
                res.status(500).send({
                    message: err.message || "Une erreur s'est produite lors de la création du produit"
                });
            })
        }
        
    }
}

//Fonction de modification d'un produit
exports.update = (req: { params: { id: number; }; body: Product, headers: { [x: string]: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
    const idProduct = req.params.id;

    if (!idProduct) {
        res.status(400).send({ message: "Veuillez entrer un id de produit à modifier" })
    }

    Product.findByPk(idProduct)
        .then(async (data) => {
            //Les élements qui ne doivent pas changer
            req.body.ID_PRODUCT = data!.ID_PRODUCT;

            const donneesValide = checkDataIntegrity(req.body);

            if (donneesValide) {
                res.status(400).send({
                    message: donneesValide
                })
            }
            else {
                //Vérification si propriétaire vitrine 
                const ownerCheck = await checkVitrineOwner(req.body.ID_VITRINE, req.headers['authorization'])

                if (ownerCheck){
                    res.status(401).send({
                        message: ownerCheck
                    })
                }
                else
                {
                    Product.update(req.body, { where: { ID_PRODUCT: idProduct } })
                        .then(() => {
                            res.status(200).send({ message: "Produit mis à jour" });
                        })
                        .catch((err: { message: any; }) => {
                            res.status(500).send({
                                message: err.message || "Une erreur s'est produite lors de la modification du produit"
                            });
                        })
                }
            }
        })
        .catch((err: { message: any; }) => {
            res.status(400).send({
                message: err.message || "La récupération des données du produit avant modification a échouée"
            });
        })
}

//Fonction de suppression d'un produit
exports.delete = async (req: { params: { id: number; }, headers: { [x: string]: any; }; }, res: { send: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    const idProduct = req.params.id;

    await Product.findByPk(idProduct)
        .then(async data => {
            if (data == null){ res.status(400).send({ message: `Le produit id ${idProduct} n'existe pas, il ne peux donc pas être supprimé` }) }

            //Vérification si propriétaire vitrine 
            const ownerCheck = await checkVitrineOwner(data!.ID_VITRINE, req.headers['authorization'])

            if (ownerCheck){
                res.status(401).send({
                    message: ownerCheck
                })
            }
            else
            {
                Product.destroy({ where: { ID_PRODUCT: idProduct } })
                    .then((num: number) => {
                        if (num == 1) {
                            res.send({ message: `Le produit id ${idProduct} a bien été supprimé` })
                        }
                        else {
                            res.status(400).send({ message: `Le produit id ${idProduct} n'a pas pu être supprimé, peut-être que cette id n'exite pas ?` })
                        }
                    })
                    .catch((err: { message: string; }) => {
                        console.log("Une erreur s'est produite lors de la suppression du produit : " + err.message)
                        res.status(500).send({ message: `Impossible de supprimer le produit id ${idProduct}` })
                    })
            }
        })    
}

//Fonction permettant la vérification de l'intégrité des données avant ajout ou modification en BDD
function checkDataIntegrity(productData: Product) {
    if (!productData.ID_VITRINE) { return "Un produit doit être associé à une vitrine !" }
    if (!productData.NAME) { return "Veuillez entrer un nom de produit" }
    if (!productData.IMAGE) { return "Veuillez entrer une image" }
    if (!productData.QUANTITY_STOCK) { return "Veuillez entrer une quantité de stock" }
    if (!productData.UNIT_PRICE_HT) { return "Veuillez entrer un prix HT unitaire" }
    if (!productData.DESCRIPTION) { return "Veuillez entrer une description au produit" }
}

//Fonction qui permet de vérifier que le produit modifié/ajouté appartient à l'utilisateur
async function checkVitrineOwner(idVitrine: number, token: string) : Promise<string | undefined> {
    //Récupération du propriétaire de la vitrine
    let result : string | undefined = undefined;

    await Vitrine.findByPk(idVitrine)
        .then((data: Vitrine | null) => {
            if (data) {
                //Récupération de l'id utilisateur dans le token
                let stringDecode : User = jwt_decode(token);

                //Comparaison
                if (data.ID_USER != stringDecode.ID_USER){
                    result = "Vous ne pouvez pas ajouter un produit sur une vitrine qui ne vous appartient pas !";
                }

                result = undefined;
            }
            else {
                result = "La vitrine indiquée n'éxiste pas !";
            }
        })
        .catch((err: { message: any; }) => {
            result = err.message || "Une erreur s'est produite lors de la vérification du propriétaire de la vitrine";
        })

    return result;
}
