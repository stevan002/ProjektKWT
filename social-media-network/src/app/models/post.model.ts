import { Comment } from "./comment.model";
import { User } from "./user.model";

export interface Post {
    id?: any;
    content: string
    createdAt?: Date
    createdBy?: User;
    isDeleted?: boolean;
    isEditing: boolean
    updatedContent: string
    isUpdating: boolean
    showComments: boolean
    comments: Comment[]

}