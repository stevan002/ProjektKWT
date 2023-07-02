import { Post } from "./post.model";

export interface Group {
    id: number;
    name: string;
    description: string;
    creationDate: Date;
    isSuspended: boolean;
    suspendedReason: string;
    posts: Post[];
}