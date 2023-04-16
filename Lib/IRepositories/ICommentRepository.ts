import { Comment } from "../../models/Comment";
import { CommentDTO } from "../DTO/CommentDTO";
import { Response } from 'express';

export interface ICommentRepository {

    GetAllComments(): Promise<Comment[]>;
    GetCommentById(id: string): Promise<Comment|null>;
    GetUserComments(userId: string): Promise<Comment[]>;
    PostNewComment(newComment: CommentDTO): void;
    PutComment(commentToModify: CommentDTO): void;
    DeleteComment(commentId: string, res: Response): void;
}