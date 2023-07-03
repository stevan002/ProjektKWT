import { Comment } from "./comment.model";
import { Group } from "./group.model";
import { User } from "./user.model";

export interface Post {
    id?: any;
    content: string
    createdAt?: Date
    createdBy?: User;
    containedBy?: number;
    isDeleted?: boolean;
    isEditing: boolean
    updatedContent: string
    isUpdating: boolean
    showComments: boolean
    comments: Comment[]

}