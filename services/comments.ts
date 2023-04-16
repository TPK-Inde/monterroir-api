import { CommentRepository } from "../Lib/Repositories/CommentRepository";
import { Comment } from "../models/Comment";
import { CommentDTO } from "../Lib/DTO/CommentDTO";
import { Request, Response } from 'express';
import { error } from "console";
import { ParamsDictionary } from "express-serve-static-core";

class Comments {
    // Constructor 
    constructor() {}

    // Get Methods
    public async GetAll(req: Request, res: Response) {
        const commentRepository = new CommentRepository();
        try {
            await commentRepository.GetAllComments()
                .then((data: Comment[]) => {
                    if(data != null && data.length > 0) {
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
        const commentRepository = new CommentRepository();
        if(parseInt(req.params.ID) > 0){
            try {
                await commentRepository.GetCommentById(req.params.ID)
                .then((data: Comment|null) => {
                    if(data != null) {
                        res.status(200).send(data);
                    } else {
                        res.status(204).send();
                    }
                }).catch((err: {message: any;}) => {
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
                message: `attention, l'ID ${req.params.ID} n'est pas correct.`
            })
        }
    }

    public async GetUserComments(req: Request, res: Response) {        
        const commentRepository = new CommentRepository();
        if(parseInt(req.params.ID_USER) > 0) {
            try {
                await commentRepository.GetUserComments(req.params.ID_USER)
                .then((data: Comment[]) => {
                    if(data != null){
                        res.status(200).send(data);
                    } else {
                        res.status(204).send();
                    }
                }).catch((err: {message: any;}) => {
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
            console.log(`attention, l'ID ${req.params.ID_USER} n'est pas correct.` )
        }
    }

    // Post Method
    public async PostNewComment(req: Request, res: Response) {
        const commentRepository = new CommentRepository();
        try {
            let newComment: CommentDTO = new CommentDTO;
            newComment.ID_RATE = req.body.ID_RATE
            newComment.ID_USER = req.body.ID_USER
            newComment.ID_PARENT = req.body.ID_PARENT
            newComment.COMMENT = req.body.COMMENT
            newComment.DATE = req.body.DATE
            await commentRepository.PostNewComment(newComment)
                .then(() => res.status(204).send())
                .catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || "Une erreur s'est produite de l'envoi du nouveau commentaire"
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite de l'envoi du nouveau commentaire"
            })
        }
    }

    public async PutComment(req: Request, res: Response) {
        const commentRepository = new CommentRepository();
        try {
            let commentToModify: CommentDTO = new CommentDTO;
            commentToModify.ID_COMMENT = parseInt(req.params.ID_COMMENT)
            commentToModify.ID_RATE = req.body.ID_RATE
            commentToModify.ID_USER = req.body.ID_USER
            commentToModify.ID_PARENT = req.body.ID_PARENT
            commentToModify.COMMENT = req.body.COMMENT
            commentToModify.DATE = req.body.DATE
            await commentRepository.PutComment(commentToModify)
            .then(() => res.status(204).send())
            .catch((err: { message: any; }) => {
                res.status(400).send({
                    message: err.message || "Une erreur s'est produite lors de la modification du commentaire."
                })
            })
        }catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la modification du commentaire."
            })
        }
    }

    public async DeleteComment(req: Request, res: Response) {
        const commentRepository = new CommentRepository();
        try {
            commentRepository.DeleteComment(req.params.ID_COMMENT)
            .then(rowDeleted => {
                if(rowDeleted == 1){
                    res.status(200).send({ 
                        message: `Le commentaire d'ID_COMMENT ${req.params.ID_COMMENT} a bien été supprimé.`});
                } else {
                    res.status(400).send({
                        message: `Le commentaire d'ID_COMMENT ${req.params.ID_COMMENT} n'a pas pu être supprimé (rowDeleted = ${rowDeleted})`
                    });
                }
            }).catch((err: {message: any;}) => {
                res.status(400).send({
                    message: err.message || "Une erreur s'est produite lors de la suppression du commentaire."
                })
            })
        }catch (error: any) {
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