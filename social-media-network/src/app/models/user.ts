import { Post } from "./post";

export class User {
    public id: number = 0;
    public username: string = "";
    public password: string = "";
    public email: string = "";
    public firstName: string = "";
    public lastName: string = "";
    public image: string = "";
    public friends: User[] = [];
    public displayName: string = "";
    public description: string = "";
    public registrationDate: Date = new Date();
    public posts: Post[] = [];
}
