import { CommentAttributes } from "../IModels/CommentAttributes";


export class CommentDTO implements CommentAttributes {
    ID_COMMENT: number;
    ID_RATE: number;
    ID_USER: number;
    ID_PARENT: number;
    COMMENT: string;
    DATE: Date;

    constructor() {}
}