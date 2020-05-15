import { Author } from './author';

export class Issue {
    id: number;
    html_url: string;
    title: string;
    body: string;
    user: Author;
    created_at: Date;
    updated_at: Date;
}