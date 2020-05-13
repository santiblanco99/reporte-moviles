import { Author } from "./author";
export class Release {

    id: string;

    repository_id: number;

    upload_url: string;

    zipball_url: string;

    tag_name: string;

    prerelease: boolean;

    assets_url: string;

    author: Author;

    name: string;

    body: string;

    published_at: Date;

}