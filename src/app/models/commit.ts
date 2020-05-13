import { Author } from "./author";

export class Commit {
    
    id: string;

    commit: {
        author: Author,
        message : string,
        comment_count: number
    }

    html_url : string;
}
