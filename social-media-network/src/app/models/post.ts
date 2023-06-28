import { Community } from "./community";
import { User } from "./user";

export class Post {
    id: number = 0;
    content: string = '';
    creationDate: Date = new Date();
    image: string = '';
    user: User = new User();
    community: Community = new Community();
    
}