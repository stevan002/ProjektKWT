import { Post } from "./post";

export class Community {
    id: number = 0;
    name: string = '';
    description: string = '';
    creationDate: Date = new Date();
    isSuspended: boolean = false;
    suspendedReason: string = '';
    posts: Post[] = [];
}