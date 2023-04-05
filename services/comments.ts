import { CommentRepository } from "../Lib/Repositories/CommentRepository";
import { Comment } from "../models/Comment";
import { CommentDTO } from "../Lib/DTO/CommentDTO";
import { Request, Response } from 'express';

class Comments {
    // Constructor 
    constructor() {}

    // Get Methods
    public async GetAll(req: Request, res: Response) {
        const commentRepository = new CommentRepository();
        try {
            await commentRepository.GetAllComments()
                .then((data: Comment[]) => {
                    res.status(200).send(data);
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
        try {
            await commentRepository.GetCommentById(req.params.ID)
            .then((data: Comment) => {
                res.status(200).send(data);
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
    }

    public async GetUserComments(req: Request, res: Response) {        
        const commentRepository = new CommentRepository();
        try {
            await commentRepository.GetUserComments(req.params.ID_USER)
            .then((data: Comment[]) => {
                res.status(200).send(data);
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
                .then(data => res.status(204).send())
                .catch((err: { message: any; }) => {
                    res.status(500).send({
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
            .then(data => res.status(204).send())
            .catch((err: { message: any; }) => {
                res.status(500).send({
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
            .then(data => res.status(200).send())
            .catch((err: { message: any; }) => {
                res.status(500).send({
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