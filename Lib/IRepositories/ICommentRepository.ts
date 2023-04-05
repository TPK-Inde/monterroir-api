import { Comment } from "../../models/Comment";
import { CommentDTO } from "../DTO/CommentDTO";

export interface ICommentRepository {

    GetAllComments(): Promise<Comment[]>;
    GetCommentById(id: string): Promise<Comment>;
    GetUserComments(userId: string): Promise<Comment[]>;
    PostNewComment(newComment: CommentDTO): void;
    PutComment(commentToModify: CommentDTO): void;
    DeleteComment(commentId: string): void;
}