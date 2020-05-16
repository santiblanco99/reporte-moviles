import { Author } from './author';

export class PullRequest {
    html_url: string;
    comments_url: string;
    title: string;
    body: string;
    user: Author;
}