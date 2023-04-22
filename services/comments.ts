import { CommentRepository } from "../Lib/Repositories/CommentRepository";
import { Comment } from "../models/Comment";
import { CommentDTO } from "../Lib/DTO/CommentDTO";
import { Request, Response } from 'express';

export default class Comments {

    // Propriétés
    _repository: CommentRepository;

    // Constructor 
    constructor() {
        this._repository = new CommentRepository();
    }

    // Get Methods
    public async GetAll(req: Request, res: Response) {
        try {
            await this._repository.GetAllComments()
                .then((data: Comment[]) => {
                    if (data != null && data.length > 0) {
                        res.status(200).send(data);
                    } else {
                        res.status(204).send();
                    }
                })
                .catch((err: { message: any; }) => {
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

    public async GetById(req: Request, res: Response) {
        if (parseInt(req.params.ID_COMMENT) > 0) {
            try {
                await this._repository.GetCommentById(req.params.ID_COMMENT)
                    .then((data: Comment | null) => {
                        if (data != null) {
                            res.status(200).send(data);
                        } else {
                            res.status(204).send();
                        }
                    }).catch((err: { message: any; }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la récupération du commentaire."
                        })
                    })
            } catch (error: any) {
                res.status(500).send({
                    message: error.message || "Une erreur s'est produite lors de la récupération du commentaire."
                })
            }
        } else {
            res.status(400).send({
                message: `attention, l'ID ${req.params.ID_COMMENT} n'est pas correct.`
            })
        }
    }

    public async GetUserComments(req: Request, res: Response) {
        if (parseInt(req.params.ID_USER) > 0) {
            try {
                await this._repository.GetUserComments(req.params.ID_USER)
                    .then((data: Comment[]) => {
                        if (data != null && data.length > 0) {
                            res.status(200).send(data);
                        } else {
                            res.status(204).send();
                        }
                    }).catch((err: { message: any; }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la récupérations des commentaires de l'utilisateur."
                        })
                    })
            } catch (error: any) {
                res.status(500).send({
                    message: error.message || "Une erreur s'est produite lors de la récupérations des commentaires de l'utilisateur."
                })
            }
        } else {
            console.log(`attention, l'ID ${req.params.ID_USER} n'est pas correct.`)
        }
    }

    // Post Method
    public async PostNewComment(req: Request, res: Response) {
        try {
            let newComment: CommentDTO = new CommentDTO;
            if (req.body.ID_RATE != null) {
                newComment.ID_RATE = req.body.ID_RATE
            } else {
                res.status(400).send({
                    message: "L'ID_RATE est NULL"
                })
            }
            if (req.body.ID_USER != null) {
                newComment.ID_USER = req.body.ID_USER
            } else {
                res.status(400).send({
                    message: "L'ID_USER est NULL"
                })
            }
            if (req.body.ID_PARENT != null) {
                newComment.ID_PARENT = req.body.ID_PARENT
            } else {
                res.status(400).send({
                    message: "L'ID_PARENT est NULL"
                })
            }
            if (req.body.COMMENT != null) {
                newComment.COMMENT = req.body.COMMENT
            } else {
                res.status(400).send({
                    message: "Le COMMENT est NULL"
                })
            }
            if (req.body.DATE != null) {
                newComment.DATE = req.body.DATE
            } else {
                res.status(400).send({
                    message: "La DATE est NULL"
                })
            }
            await this._repository.PostNewComment(newComment)
                .then(() => res.status(204).send())
                .catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || "Une erreur s'est produite de l'envoi du nouveau commentaire, l'un des paramètres est NULL"
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite de l'envoi du nouveau commentaire"
            })
        }
    }

    public async PutComment(req: Request, res: Response) {
        try {
            let commentToModify: CommentDTO = new CommentDTO;
            commentToModify.ID_COMMENT = parseInt(req.params.ID_COMMENT)
            commentToModify.ID_RATE = req.body.ID_RATE;
            commentToModify.ID_USER = req.body.ID_USER;
            commentToModify.ID_PARENT = req.body.ID_PARENT;
            commentToModify.COMMENT = req.body.COMMENT;
            commentToModify.DATE = req.body.DATE;
            await this._repository.PutComment(commentToModify)
                .then(() => res.status(204).send())
                .catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || "Une erreur s'est produite lors de la modification du commentaire."
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la modification du commentaire."
            })
        }
    }

    public async DeleteComment(req: Request, res: Response) {
        try {
            if (parseInt(req.params.ID_COMMENT) > 0) {
                this._repository.DeleteComment(req.params.ID_COMMENT)
                    .then(rowDeleted => {
                        if (rowDeleted == 1) {
                            res.status(200).send({
                                message: `Le commentaire d'ID_COMMENT ${req.params.ID_COMMENT} a bien été supprimé.`
                            });
                        } else {
                            res.status(400).send({
                                message: `Le commentaire d'ID_COMMENT ${req.params.ID_COMMENT} n'a pas pu être supprimé (rowDeleted = ${rowDeleted})`
                            });
                        }
                    }).catch((err: { message: any; }) => {
                        res.status(400).send({
                            message: err.message || "Une erreur s'est produite lors de la suppression du commentaire."
                        })
                    })
            } else {
                res.status(400).send({
                    message: "l'ID n'est pas correcte."
                })
            }
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la suppression du commentaire."
            })
        }
    }
}

const commentService = new Comments()

exports.GetAll = commentService.GetAll;
exports.GetById = commentService.GetById;
exports.GetUserComments = commentService.GetUserComments;
exports.PostNewComment = commentService.PostNewComment;
exports.PutComment = commentService.PutComment;
exports.DeleteComment = commentService.DeleteComment;