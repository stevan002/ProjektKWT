import { User } from "./user.model";

export class Comment {
    public id: number = 0;
    public text: string = '';
    public creationDate: Date = new Date();
    public user: User = new User();
    public deleted: boolean = false;
    public comments: Comment[] = [];
    public parentCommentId: number = 0;
    public postId: number = 0;

}