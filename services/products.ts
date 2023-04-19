import { Product } from "../models/Product";
import jwt_decode from "jwt-decode";
import { Request, Response } from "express";
import { ProductRepository } from "../Lib/Repositories/ProductRepository";

//Todo : Vérifier que celui qui manipule le produit est le propriétaire du produit => MT - 0103

export default class Products {
    //Properties
    productRepository: ProductRepository;

    //Constructor
    constructor() {
        this.productRepository = new ProductRepository();
    }

    public async GetById(req: Request, res: Response) {
        try {
            const productId = parseInt(req.params.ID_PRODUCT);

            if (!Number.isNaN(productId) && productId > 0) {
                this.productRepository.GetById(productId)
                    .then((data: Product | null) => {
                        if (data != null) {
                            res.status(200).send(data);
                        }
                        else {
                            res.status(204).send();
                        }
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la récupération du produit"
                        });
                    })
            }
            else {
                res.status(400).send({
                    message: "Veuillez entrer un ID valide"
                })
            }

        }
        catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la récupération d'un produit'"
            })
        }
    }

    public async PostNewProduct(req: Request, res: Response) {
        try {
            const resultCheck = await this.CheckProductData(req.body);

            if (resultCheck == null) {
                await this.productRepository.PostNewProduct(req.body);

                res.status(201).send({
                    message: "La création du produit a réussit"
                })
            }
            else {
                res.status(400).send({
                    message: resultCheck
                })
            }
        }
        catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la création d'un produit'"
            })
        }
    }

    public async PutProduct(req: Request, res: Response) {
        try {
            const productId = parseInt(req.params.ID_PRODUCT);

            if (!Number.isNaN(productId) && productId > 0) {
                const resultCheck = await this.CheckProductData(req.body);

                if (resultCheck == null) {
                    await this.productRepository.PutProduct(req.body);

                    res.status(204).send()
                }
                else {
                    res.status(400).send({
                        message: resultCheck
                    })
                }
            }
            else {
                res.status(400).send({
                    message: "Veuillez entrer un ID de produit valide"
                })
            }

        }
        catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la création d'un produit'"
            })
        }
    }

    public async DeleteProduct(req: Request, res: Response) {
        try {
            const productId = parseInt(req.params.ID_PRODUCT);

            if (!Number.isNaN(productId) && productId > 0) {
                await this.productRepository.DeleteProduct(productId)
                    .then((rowDeleted: number) => {
                        if (rowDeleted == 1) {
                            res.status(200).send({
                                message: "La suppression du produit a réussit"
                            })
                        }
                        else {
                            res.status(400).send({
                                message: "La suppression du produit a échouée"
                            })
                        }
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la suppression du produit"
                        });
                    })
            }
            else {
                res.status(400).send({
                    message: "Veuillez entrer un ID de produit valide"
                })
            }
        }
        catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la création d'un produit'"
            })
        }
    }

    //Permet de vérifier que l'objet produit est conforme
    private async CheckProductData(productData: Product) {
        if (!productData.ID_VITRINE) { return "Un produit doit être associé à une vitrine !" }
        if (!productData.NAME) { return "Veuillez entrer un nom de produit" }
        if (!productData.IMAGE) { return "Veuillez entrer une image" }
        if (!productData.QUANTITY_STOCK) { return "Veuillez entrer une quantité de stock" }
        if (!productData.UNIT_PRICE_HT) { return "Veuillez entrer un prix HT unitaire" }
        if (!productData.DESCRIPTION) { return "Veuillez entrer une description au produit" }

        return null;
    }

    //Fonction qui permet de vérifier que le produit modifié/ajouté appartient à l'utilisateur
    //EN ATTENTE DE MERGE DU USER REPOSITORY => MT - 0103
    private async CheckVitrineOwner(idVitrine: number, token: string): Promise<string | undefined> {
        //Récupération du propriétaire de la vitrine
        let result: string | undefined = undefined;

        // await Vitrine.findByPk(idVitrine)
        //     .then((data: Vitrine | null) => {
        //         if (data) {
        //             //Récupération de l'id utilisateur dans le token
        //             let stringDecode: User = jwt_decode(token);

        //             //Comparaison
        //             if (data.ID_USER != stringDecode.ID_USER) {
        //                 result = "Vous ne pouvez pas ajouter un produit sur une vitrine qui ne vous appartient pas !";
        //             }

        //             result = undefined;
        //         }
        //         else {
        //             result = "La vitrine indiquée n'éxiste pas !";
        //         }
        //     })
        //     .catch((err: { message: any; }) => {
        //         result = err.message || "Une erreur s'est produite lors de la vérification du propriétaire de la vitrine";
        //     })

        return result;
    }
}