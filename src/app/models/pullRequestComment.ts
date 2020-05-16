import { Author } from './author';

export class PullRequestComment {
    html_url: string;
    user: Author;
    body: string;
    author_association: string;
}