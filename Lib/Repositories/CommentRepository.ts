import { ICommentRepository } from "../IRepositories/ICommentRepository";
import sequelize from "../../sequelize/db";
import { Comment } from "../../models/Comment";
import { CommentDTO } from "../DTO/CommentDTO";
import { Response } from 'express';

export class CommentRepository implements ICommentRepository {

    // Properties
    commentRepository = sequelize.getRepository(Comment);

    // Constructor
    constructor() {}

    async GetAllComments(): Promise<Comment[]> {
        const comments = await this.commentRepository.findAll();
        return comments;
    }
    async GetCommentById(id: string): Promise<Comment|null> {
        const comment = await this.commentRepository.findByPk(id);
        return comment;
    }
    async GetUserComments(userId: string): Promise<Comment[]> {        
        const commentsOfuser = await this.commentRepository.findAll({
            where: {
                ID_USER: userId
            }
        });
        if (commentsOfuser != null) {
            return commentsOfuser;
        } else {
            const emptyComments: Comment[] = [];
            return emptyComments;
        }
    }
    async PostNewComment(newComment: CommentDTO): Promise<void> {
        await this.commentRepository.create({
            ID_RATE: newComment.ID_RATE,
            ID_USER: newComment.ID_USER,
            ID_PARENT: newComment.ID_PARENT,
            COMMENT: newComment.COMMENT,
            DATE: newComment.DATE
        })
    }
    async PutComment(commentToModify: CommentDTO): Promise<void> {
        await this.commentRepository.update({
            ID_RATE: commentToModify.ID_RATE,
            ID_USER: commentToModify.ID_USER,
            ID_PARENT: commentToModify.ID_PARENT,
            COMMENT: commentToModify.COMMENT,
            DATE: commentToModify.DATE
        }, {
            where: {
                ID_COMMENT: commentToModify.ID_COMMENT
            }
        });
    }
    async DeleteComment(commentId: string): Promise<number> {
        let rowIsDeleted: number = 0;
        await this.commentRepository.destroy({
            where: {
                ID_COMMENT: commentId
            }
        }).then(rowDeleted => {
            if(rowDeleted === 1) {
                rowIsDeleted = 1;
            }
        })
        return rowIsDeleted
    }    
}