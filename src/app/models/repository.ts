import {Author} from "./author";

export class Repository {
    name: string;
    owner: Author;
    description: string;
    language: string;
    watchers_count: number;
    open_issues_count: number;
    created_at: Date;
    updated_at: Date;
    forks_count: number;
    subscribers_count: number;
}